package hu.speedrundev.sulipedia.dto.user;

import hu.speedrundev.sulipedia.model.User;

import java.util.Base64;
import java.util.Date;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetUserWithID extends GetUser {

  public GetUserWithID(User user) {
    this(
      user.getUsername(),
      user.getEmail(),
      user.getProfilePicture() == null ? "" : Base64.getEncoder().encodeToString(user.getProfilePicture()),
      user.getBirthDate(),
      user.getLastLogin(),
      user.getLastLogoff(),
      RoleDto.dtoFrom(user.getRoles()),
      user.getCreatedOn(),
      user.getId()
    );
  }

  public GetUserWithID(
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
    super(userName, email, birthDate, profilePictureBase64, roles, createdOn, lastLogin, lastLogoff);
    this.id = id;
  }

  public GetUserWithID() {}

  private Integer id;
}
