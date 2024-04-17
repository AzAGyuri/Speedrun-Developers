package hu.speedrundev.sulipedia.service;

import static hu.speedrundev.sulipedia.util.ExceptionUtils.*;

import hu.speedrundev.sulipedia.dto.user.GetUser;
import hu.speedrundev.sulipedia.dto.user.GetUserWithAvailabilities;
import hu.speedrundev.sulipedia.dto.user.GetUserWithGroups;
import hu.speedrundev.sulipedia.dto.user.GetUserWithID;
import hu.speedrundev.sulipedia.dto.user.NulledUser;
import hu.speedrundev.sulipedia.dto.user.PostUser;
import hu.speedrundev.sulipedia.dto.user.RoleDto;
import hu.speedrundev.sulipedia.dto.user.UpdateUser;
import hu.speedrundev.sulipedia.dto.user.UserList;
import hu.speedrundev.sulipedia.model.Group;
import hu.speedrundev.sulipedia.model.Roles;
import hu.speedrundev.sulipedia.model.User;
import hu.speedrundev.sulipedia.repository.GroupRepository;
import hu.speedrundev.sulipedia.repository.UserRepository;
import hu.speedrundev.sulipedia.util.JwtUtil;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  @Autowired
  private UserRepository repository;

  @Autowired
  private GroupRepository groupRepository;

  @Autowired
  private JwtUtil jwtUtil;

  @Autowired
  private BCryptPasswordEncoder passwordEncoder;

  public UserList listAllUsers() {
    return new UserList(repository.findAllNotDeleted());
  }

  public UserList getTeachers() {
    return new UserList(repository.getTeachers());
  }

  public UserList getUnderageStudents() {
    return new UserList(repository.getUnderageStudents());
  }

  public UserList getNewUsersSinceDate(LocalDateTime date) {
    if (date == null) throw nullPointer();

    return new UserList(repository.getUsersCreatedSinceDate(date));
  }

  public GetUserWithAvailabilities getUser(Integer id) {
    if (id == null) throw nullPointer();
    if (isNotUserById(id)) throw modelNotFound("USER_NOT_FOUND");

    return new GetUserWithAvailabilities(repository.getReferenceById(id));
  }

  private boolean isNotUserById(Integer id) {
    if (id == null) throw nullPointer();

    return !repository.existsById(id);
  }

  public GetUserWithID createUser(PostUser user) {
    if (user == null) throw nullPointer();
    if (repository.existsUserByEmail(user.getEmail())) throw notUnique(
      "USER_ALREADY_EXISTS"
    );

    user.setPasswordRaw(
      new BCryptPasswordEncoder().encode(user.getPasswordRaw())
    );

    return new GetUserWithID(repository.save(new User(user)));
  }

  public GetUser updateUser(UpdateUser changes, String token) {
    if (token == null || changes == null) throw nullPointer();
    if (changes.isAllNull()) throw badRequest("INPUTS_ALL_NULL");

    if (changes.getNewPasswordRaw() != null) {
      if (changes.getOldPasswordRaw() == null) throw badRequest(
        "OLD_PASSWORD_REQUIRED_FOR_PASSWORD_CHANGE"
      ); else if (changes.getOldPasswordRaw().isBlank()) throw badRequest(
        "OLD_PASSWORD_REQUIRED_FOR_PASSWORD_CHANGE"
      );
    }

    Optional<User> updater = repository.findByUsername(
      jwtUtil.getSubject(token)
    );

    if (updater.isEmpty()) throw modelNotFound("USER_NOT_FOUND");

    User oldData = new User(updater.get());

    if (
      passwordEncoder.matches(
        changes.getNewPasswordRaw() == null ? "" : changes.getNewPasswordRaw(),
        oldData.getUserPassword()
      ) &&
      oldData.doesAllMatch(changes)
    ) throw badRequest("NEW_DATA_IDENTICAL_TO_OLD");

    User updatingUser = repository.getByUsername(jwtUtil.getSubject(token));

    if (
      changes.getEmail() != null &&
      !oldData.getEmail().equalsIgnoreCase(changes.getEmail())
    ) {
      if (repository.existsUserByEmail(changes.getEmail())) throw notUnique(
        "USER_EMAIL_ALREADY_TAKEN"
      );
      updatingUser.setEmail(changes.getEmail());
    }

    if (changes.getNickname() != null) {
      if (oldData.getNickname() == null) updatingUser.setNickname(
        changes.getNickname()
      ); else if (
        !oldData.getNickname().equalsIgnoreCase(changes.getNickname())
      ) updatingUser.setNickname(changes.getNickname());
    }

    if (changes.getNewPasswordRaw() != null) if (
      !passwordEncoder.matches(
        changes.getNewPasswordRaw(),
        oldData.getUserPassword()
      )
    ) {
      if (
        !passwordEncoder.matches(
          changes.getOldPasswordRaw(),
          updatingUser.getUserPassword()
        )
      ) throw unauthorized("PROVIDED_PASSWORD_DOES_NOT_MATCH_FOR_USER");
      updatingUser.setUserPassword(
        passwordEncoder.encode(changes.getNewPasswordRaw())
      );
    }

    if (changes.getPhoneNumber() != null) {
      if (oldData.getPhoneNumber() == null) updatingUser.setPhoneNumber(
        changes.getPhoneNumber()
      ); else if (
        !oldData.getPhoneNumber().equalsIgnoreCase(changes.getPhoneNumber())
      ) updatingUser.setPhoneNumber(changes.getPhoneNumber());
    }

    if (oldData.isAllUnchanged(updatingUser)) throw badRequest(
      "UPDATED_ENTITY_DATA_MATCHED_OLD"
    );

    return new GetUser(repository.save(updatingUser));
  }

  public GetUser updateUserRoles(Integer id, Set<RoleDto> roles, String token) {
    if (id == null || roles == null || token == null) throw nullPointer();

    Optional<User> roleUpdater = repository.findByUsername(
      jwtUtil.getSubject(token)
    );

    if (roleUpdater.isEmpty()) throw modelNotFound("USER_NOT_FOUND");

    User updatedUser = repository.getReferenceById(id);

    Set<Roles> currentRoles = updatedUser.getRoles();
    Set<Roles> newRoles = Roles.modelFrom(roles);

    newRoles.removeAll(currentRoles);

    if (roles.isEmpty()) throw badRequest(
      "THERE_WERE_NO_NEW_ROLES_TO_BE_ADDED"
    );

    currentRoles.addAll(newRoles);
    updatedUser.setRoles(newRoles);

    return new GetUser(repository.save(updatedUser));
  }

  public GetUser logicalDeletionOfUser(String token) {
    if (token == null) throw nullPointer();

    Optional<User> deletedUser = repository.findByUsername(
      jwtUtil.getSubject(token)
    );

    if (deletedUser.isEmpty()) throw modelNotFound("USER_NOT_FOUND");

    User softDeletedUser = deletedUser.get();
    softDeletedUser.setDeleted(true);
    softDeletedUser.setDeletedOn(LocalDateTime.now());

    return new GetUser(repository.save(softDeletedUser));
  }

  public NulledUser nullDeleteUser(String token) {
    if (token == null) throw nullPointer();

    Optional<User> deletedUser = repository.findByUsername(
      jwtUtil.getSubject(token)
    );

    if (deletedUser.isEmpty()) throw modelNotFound("USER_NOT_FOUND");

    User nulledUser = deletedUser.get();
    User oldData = deletedUser.get();

    nulledUser.nulledDelete();

    return new NulledUser(
      new GetUser(oldData),
      new GetUser(repository.save(nulledUser))
    );
  }

  public GetUserWithGroups removeUserFromGroup(Integer id, String token) {
    if (id == null || token == null) throw nullPointer();

    if (!groupRepository.existsById(id)) throw modelNotFound("GROUP_NOT_FOUND");

    Optional<User> user = repository.findByUsername(jwtUtil.getSubject(token));

    if (user.isEmpty()) throw modelNotFound("USER_NOT_FOUND");

    User realUser = user.get();

    boolean isUserInGroup = false;
    boolean isUserCreator = false;
    for (Group joinedGroup : realUser.getJoinedGroups()) {
      boolean currentGroupIsRequestedGroup =
        joinedGroup.getId() == id.intValue();

      isUserInGroup |= currentGroupIsRequestedGroup;

      if (currentGroupIsRequestedGroup) isUserCreator |=
        joinedGroup.getCreator().getId() == realUser.getId();
    }

    if (!isUserInGroup) throw badRequest(
      "USER_REQUESTING_EXIT_IS_NOT_MEMBER_IN_GROUP"
    );

    if (isUserCreator) throw badRequest(
      "USER_REQUESTING_EXIT_IS_GROUP_CREATOR"
    );

    Group exitedGroup = groupRepository.getReferenceById(id);
    realUser.getJoinedGroups().remove(exitedGroup);

    return new GetUserWithGroups(repository.save(realUser));
  }
}
