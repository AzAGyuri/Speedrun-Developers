package hu.speedrundev.sulipedia.dto.user;

import hu.speedrundev.sulipedia.model.User;
import java.util.Base64;
import java.util.Date;
import java.util.Set;
import lombok.NoArgsConstructor;

@NoArgsConstructor
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
      userName,
      email,
      profilePictureBase64,
      birthDate,
      createdOn,
      lastLogin,
      lastLogoff,
      roles,
      id
    );
  }

  public UserListItem(User user) {
    this(
      user.getUsername(),
      user.getEmail(),
      user.getProfilePicture() == null
        ? ""
        : Base64.getEncoder().encodeToString(user.getProfilePicture()),
      user.getBirthDate(),
      user.getLastLogin(),
      user.getLastLogoff(),
      RoleDto.dtoFrom(user.getRoles()),
      user.getCreatedOn(),
      user.getId()
    );
  }
}
