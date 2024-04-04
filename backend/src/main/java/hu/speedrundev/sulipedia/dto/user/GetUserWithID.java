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
public class GetUserWithID extends GetUser {

  public GetUserWithID(
    String username,
    String email,
    String nickname,
    String phoneNumber,
    String profilePictureBase64,
    Date birthDate,
    Date createdOn,
    Date lastLogin,
    Date lastLogoff,
    Set<RoleDto> roles,
    Integer id
  ) {
    super(
      username,
      email,
      nickname,
      phoneNumber,
      profilePictureBase64,
      birthDate,
      createdOn,
      lastLogin,
      lastLogoff,
      roles
    );
    this.id = id;
  }

  public GetUserWithID(User user) {
    this(
      user.getUsername(),
      user.getEmail(),
      user.getNickname(),
      user.getPhoneNumber(),
      user.getProfilePicture() == null
        ? ""
        : Base64.getEncoder().encodeToString((user.getProfilePicture())),
      user.getBirthDate(),
      user.getCreatedOn(),
      user.getLastLogin(),
      user.getLastLogoff(),
      RoleDto.dtoFrom(user.getRoles()),
      user.getId()
    );
  }

  private Integer id;
}
