package hu.speedrundev.sulipedia.dto.user;

import hu.speedrundev.sulipedia.model.User;

import java.util.Base64;
import java.util.Date;
import java.util.Set;

public class UserListItem extends GetUserWithID {

  public UserListItem(
    String userName,
    String email,
    String profilePictureBase64,
    Date birthDate,
    Date lastLogin,
    Date lastLogoff,
    Set<RoleDto> roles,
    Date createdOn,
    Integer id
  ) {
    super(
      userName,
      email,
      profilePictureBase64,
      birthDate,
      lastLogin,
      lastLogoff,
      roles,
      createdOn,
      id
    );
  }

  public UserListItem() {}

  public UserListItem(User user) {
    this(
      user.getUsername(),
      user.getEmail(),
      Base64.getEncoder().encodeToString(user.getProfilePicture()),
      user.getBirthDate(),
      user.getLastLogin(),
      user.getLastLogoff(),
      RoleDto.dtoFrom(user.getRoles()),
      user.getCreatedOn(),
      user.getId()
    );
  }
}
