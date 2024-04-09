package hu.speedrundev.sulipedia.service;

import static hu.speedrundev.sulipedia.util.ExceptionUtils.*;

import hu.speedrundev.sulipedia.dto.user.GetUser;
import hu.speedrundev.sulipedia.dto.user.GetUserWithEntries;
import hu.speedrundev.sulipedia.dto.user.GetUserWithID;
import hu.speedrundev.sulipedia.dto.user.NulledUser;
import hu.speedrundev.sulipedia.dto.user.PostUser;
import hu.speedrundev.sulipedia.dto.user.RoleDto;
import hu.speedrundev.sulipedia.dto.user.UpdateUser;
import hu.speedrundev.sulipedia.dto.user.UserList;
import hu.speedrundev.sulipedia.model.Roles;
import hu.speedrundev.sulipedia.model.User;
import hu.speedrundev.sulipedia.repository.UserRepository;
import hu.speedrundev.sulipedia.util.JwtUtil;
import jakarta.validation.Valid;
import java.time.Instant;
import java.util.Date;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  @Autowired
  private UserRepository repository;

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

  public UserList getNewUsersSinceDate(Date date) {
    if (date == null) throw nullPointer();

    return new UserList(repository.getUsersCreatedSinceDate(date));
  }

  public GetUserWithEntries getUser(Integer id) {
    if (id == null) throw nullPointer();
    if (isNotUserById(id)) throw modelNotFound("USER_NOT_FOUND");

    return new GetUserWithEntries(repository.getReferenceById(id));
  }

  private boolean isNotUserById(Integer id) {
    if (id == null) throw nullPointer();

    return !repository.existsById(id);
  }

  public GetUserWithID createUser(PostUser user) {
    if (user == null) throw nullPointer();
    if (
      repository.existsUserByUsername(user.getUsername()) ||
      repository.existsUserByEmail(user.getEmail())
    ) throw notUnique("USER_ALREADY_EXISTS");

    user.setPasswordRaw(
      new BCryptPasswordEncoder().encode(user.getPasswordRaw())
    );

    return new GetUserWithID(repository.save(new User(user)));
  }

  public GetUser updateUser(UpdateUser changes, String jwt) {
    if (jwt == null || changes == null) throw nullPointer();
    if (changes.isAllNull()) throw badRequest("INPUTS_ALL_NULL");

    String subject = jwtUtil.getSubject(jwt);

    if (!repository.existsUserByUsername(subject)) throw modelNotFound(
      "USER_NOT_FOUND"
    );

    if (
      repository.existsUserByUsername(changes.getNickname()) &&
      repository.existsUserByEmail(changes.getEmail())
    ) throw notUnique("USERNAME_ALREADY_TAKEN");

    User oldData = repository.getByUsername(subject);

    if (
      passwordEncoder.matches(
        changes.getPassword(),
        oldData.getUserPassword()
      ) &&
      oldData.isAllUnchanged(changes)
    ) throw badRequest("NEW_DATA_IDENTICAL_TO_OLD");

    User updatingUser = repository.getByUsername(subject);

    if (changes.getEmail() != null) {
      updatingUser.setEmail(changes.getEmail());
    }

    if (changes.getNickname() != null) {
      updatingUser.setUsername(changes.getNickname());
    }

    if (changes.getPassword() != null) {
      updatingUser.setUserPassword(changes.getPassword());
    }

    if (changes.getPhoneNumber() != null) {
      updatingUser.setPhoneNumber(changes.getPhoneNumber());
    }

    if (oldData.isAllUnchanged(updatingUser)) throw badRequest(
      "UPDATED_ENTITY_DATA_MATCHED_OLD"
    );

    return new GetUser(repository.save(updatingUser));
  }

  public GetUser updateUserRoles(Integer id, @Valid Set<RoleDto> roles) {
    if (id == null || roles == null) throw nullPointer();
    if (isNotUserById(id)) throw modelNotFound("USER_NOT_FOUND");

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

  public GetUser logicalDeletionOfUser(Integer id) {
    if (id == null) throw nullPointer();
    if (isNotUserById(id)) throw modelNotFound("USER_NOT_FOUND");

    User softDeletedUser = repository.getReferenceById(id);
    softDeletedUser.setDeleted(true);
    softDeletedUser.setDeletedOn(Date.from(Instant.now()));

    return new GetUser(repository.save(softDeletedUser));
  }

  public NulledUser nullDeleteUser(Integer id) {
    if (id == null) throw nullPointer();
    if (isNotUserById(id)) throw modelNotFound("USER_NOT_FOUND");

    User nulledUser = repository.getReferenceById(id);
    User oldData = repository.getReferenceById(id);

    nulledUser.nulledDelete();

    return new NulledUser(
      new GetUser(oldData),
      new GetUser(repository.save(nulledUser))
    );
  }
}
