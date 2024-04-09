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
    String username,
    String email,
    String nickname,
    String phoneNumber,
    String randomPfPBgColor,
    String profilePictureBase64,
    Date birthDate,
    Date createdOn,
    Date lastLogin,
    Date lastLogoff,
    Set<RoleDto> roles
  ) {
    super(username, email, nickname, phoneNumber);
    this.randomPfPBgColor = randomPfPBgColor;
    this.profilePictureBase64 = profilePictureBase64;
    this.birthDate = birthDate;
    this.createdOn = createdOn;
    this.lastLogin = lastLogin;
    this.lastLogoff = lastLogoff;
    this.roles = roles;
  }

  public GetUser(User user) {
    this(
      user.getUsername(),
      user.getEmail(),
      user.getNickname(),
      user.getPhoneNumber(),
      user.getRandomPfPBgColor(),
      user.getProfilePicture() == null
        ? ""
        : Base64.getEncoder().encodeToString(user.getProfilePicture()),
      user.getBirthDate(),
      user.getCreatedOn(),
      user.getLastLogin(),
      user.getLastLogoff(),
      RoleDto.dtoFrom(user.getRoles())
    );
  }

  private String randomPfPBgColor, profilePictureBase64;

  private Date birthDate, createdOn, lastLogin, lastLogoff;

  private Set<RoleDto> roles;
}
