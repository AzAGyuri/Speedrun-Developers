package hu.speedrundev.sulipedia.dto.user;

import hu.speedrundev.sulipedia.model.User;
import java.util.Base64;
import java.util.Date;
import java.util.Set;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GetUser extends BaseUser {

  public GetUser(
    String userName,
    String email,
    Date birthDate,
    String profilePictureBase64,
    Set<RoleDto> roles,
    Date createdOn,
    Date lastLogin,
    Date lastLogoff
  ) {
    super(userName, email);
    this.profilePictureBase64 = profilePictureBase64;
    this.roles = roles;
    this.birthDate = birthDate;
    this.createdOn = createdOn;
    this.lastLogin = lastLogin;
    this.lastLogoff = lastLogoff;
  }

  public GetUser(User user) {
    this(
      user.getUsername(),
      user.getEmail(),
      user.getBirthDate(),
      Base64.getEncoder().encodeToString(user.getProfilePicture()),
      RoleDto.dtoFrom(user.getRoles()),
      user.getCreatedOn(),
      user.getLastLogin(),
      user.getLastLogoff()
    );
  }

  private String profilePictureBase64;

  private Date birthDate, createdOn, lastLogin, lastLogoff;

  private Set<RoleDto> roles;
}
