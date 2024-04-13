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

  public GetGroupWithID createGroup(PostGroup group, String token) {
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

    return new GetGroupWithID(groupRepository.save(createdGroup));
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
}
