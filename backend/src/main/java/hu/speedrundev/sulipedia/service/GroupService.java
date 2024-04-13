package hu.speedrundev.sulipedia.service;

import static hu.speedrundev.sulipedia.util.ExceptionUtils.*;

import hu.speedrundev.sulipedia.dto.group.GetGroupWithID;
import hu.speedrundev.sulipedia.dto.group.GetGroupWithUsers;
import hu.speedrundev.sulipedia.dto.group.GroupList;
import hu.speedrundev.sulipedia.dto.group.GroupUserPutterResponse;
import hu.speedrundev.sulipedia.dto.group.PostGroup;
import hu.speedrundev.sulipedia.model.Group;
import hu.speedrundev.sulipedia.model.User;
import hu.speedrundev.sulipedia.repository.GroupRepository;
import hu.speedrundev.sulipedia.repository.UserRepository;
import hu.speedrundev.sulipedia.util.JwtUtil;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GroupService {

  @Autowired
  private GroupRepository groupRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private JwtUtil jwtUtil;

  public GroupList listGroupsByOptionalUserId(Integer userId) {
    if (userId == null) return new GroupList(groupRepository.findAll());
    return new GroupList(groupRepository.findAllByUserId(userId));
  }

  public GetGroupWithUsers getGroup(Integer id) {
    if (id == null) throw nullPointer();
    if (!groupRepository.existsById(id)) throw modelNotFound("GROUP_NOT_FOUND");

    return new GetGroupWithUsers(groupRepository.getReferenceById(id));
  }

  public GetGroupWithUsers createGroup(PostGroup group, String token) {
    if (group == null) throw nullPointer();

    Optional<User> creator = userRepository.findByUsername(
      jwtUtil.getSubject(token)
    );

    if (creator.isEmpty()) throw modelNotFound("USER_NOT_FOUND");

    if (
      group.getSpecializations() == null || group.getSpecializations().isEmpty()
    ) throw badRequest("NO_SPECIALIZATIONS_SUPPLIED");

    User realCreator = creator.get();

    Group createdGroup = new Group(group, realCreator);

    if (realCreator.getJoinedGroups() == null) {
      HashSet<Group> joinedGroups = new HashSet<>();
      joinedGroups.add(createdGroup);
      realCreator.setJoinedGroups(joinedGroups);
    } else {
      realCreator.getJoinedGroups().add(createdGroup);
    }

    return new GetGroupWithUsers(groupRepository.save(createdGroup));
  }

  public GroupUserPutterResponse putUserIntoGroup(
    Integer id,
    String token,
    List<String> usernames
  ) {
    if (id == null || token == null || usernames == null) throw nullPointer();

    if (!groupRepository.existsById(id)) throw modelNotFound("GROUP_NOT_FOUND");

    if (usernames.isEmpty()) throw badRequest("USERNAME_LIST_IS_EMPTY");

    Optional<User> adder = userRepository.findByUsername(
      jwtUtil.getSubject(token)
    );

    if (adder.isEmpty()) throw modelNotFound("USERNAME_NOT_FOUND");

    User realAdder = adder.get();
    Group group = groupRepository.getReferenceById(id);

    if (group.getCreator().getId() != realAdder.getId()) throw noYouDont(
      "USER_REQUESTING_ADD_IS_NOT_GROUP_CREATOR"
    );

    Set<User> potentialAddedUsers = new HashSet<>();
    Set<User> alreadyAddedUsers = group.getUsers();
    List<String> usernamesNotFound = new ArrayList<>();

    usernames.forEach(username -> {
      Optional<User> potentialUser = userRepository.findByUsername(username);
      if (potentialUser.isPresent()) potentialAddedUsers.add(
        potentialUser.get()
      ); else usernamesNotFound.add(username);
    });

    final Group groupCopy = group;
    potentialAddedUsers.forEach(user -> {
      if (user.getJoinedGroups() == null) {
        Set<Group> joinedGroups = new HashSet<>();
        joinedGroups.add(groupCopy);
        user.setJoinedGroups(joinedGroups);
      } else {
        user.getJoinedGroups().add(groupCopy);
      }
    });

    potentialAddedUsers.addAll(alreadyAddedUsers);
    group.setUsers(potentialAddedUsers);

    group = groupRepository.save(group);

    group.getUsers().removeAll(alreadyAddedUsers);

    return new GroupUserPutterResponse(
      new GetGroupWithUsers(group),
      usernamesNotFound
    );
  }

  public GetGroupWithUsers deleteUserFromGroup(
    Integer groupId,
    Integer userId,
    String token
  ) {
    if (groupId == null || userId == null || token == null) throw nullPointer();

    if (!groupRepository.existsById(groupId)) throw modelNotFound(
      "GROUP_NOT_FOUND"
    );

    Optional<User> remover = userRepository.findByUsername(
      jwtUtil.getSubject(token)
    );

    if (
      !userRepository.existsById(userId) || remover.isEmpty()
    ) throw modelNotFound("USER_NOT_FOUND");

    Group groupToRemoveFrom = groupRepository.getReferenceById(groupId);

    if (
      groupToRemoveFrom
        .getUsers()
        .stream()
        .filter(user -> user.getId() == userId.intValue())
        .findAny()
        .isEmpty()
    ) throw badRequest("USER_NOT_IN_GROUP");

    User realRemover = remover.get();
    User removingUser = userRepository.getReferenceById(userId);
    Set<User> removedUsers = new HashSet<>();
    removedUsers.add(removingUser);

    if (
      groupToRemoveFrom.getCreator().getId() != realRemover.getId()
    ) throw noYouDont("USER_REQUESTING_REMOVAL_IS_NOT_GROUP_CREATOR");

    if (
      groupToRemoveFrom.getCreator().getId() == removingUser.getId()
    ) throw badRequest("USER_REQUESTING_REMOVAL_IS_GROUP_CREATOR");

    removingUser.getJoinedGroups().remove(groupToRemoveFrom);
    groupToRemoveFrom.getUsers().remove(removingUser);

    groupToRemoveFrom = groupRepository.save(groupToRemoveFrom);
    userRepository.save(removingUser);

    groupToRemoveFrom.setUsers(removedUsers);

    return new GetGroupWithUsers(groupToRemoveFrom);
  }

  public GetGroupWithID deleteGroup(Integer id, String token) {
    if (id == null || token == null) throw nullPointer();

    if (!groupRepository.existsById(id)) throw modelNotFound("GROUP_NOT_FOUND");

    Optional<User> deleter = userRepository.findByUsername(
      jwtUtil.getSubject(token)
    );

    if (deleter.isEmpty()) throw modelNotFound("USER_NOT_FOUND");

    User realDeleter = deleter.get();
    Group deletingGroup = groupRepository.getReferenceById(id);

    if (
      deletingGroup.getCreator().getId() != realDeleter.getId()
    ) throw noYouDont("USER_REQUESTING_GROUP_DELETE_IS_NOT_CREATOR");

    Set<User> emptyUserList = deletingGroup.getUsers();
    emptyUserList.remove(realDeleter);
    if (!emptyUserList.isEmpty()) throw badRequest(
      "GROUP_REQUESTED_FOR_DELETION_IS_NOT_EMPTY"
    );

    realDeleter.getJoinedGroups().remove(deletingGroup);
    groupRepository.delete(deletingGroup);

    return new GetGroupWithID(deletingGroup);
  }
}
