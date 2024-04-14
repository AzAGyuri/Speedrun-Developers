package hu.speedrundev.sulipedia.dto.user;

import hu.speedrundev.sulipedia.dto.availability.AvailabilityList;
import hu.speedrundev.sulipedia.model.User;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Set;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GetUserWithAvailabilities extends GetUser {

  public GetUserWithAvailabilities(
    String username,
    String email,
    String nickname,
    String phoneNumber,
    String randomAvatarBgColor,
    String profilePictureBase64,
    LocalDateTime birthDate,
    LocalDateTime createdOn,
    LocalDateTime lastLogin,
    LocalDateTime lastLogoff,
    Set<RoleDto> roles,
    AvailabilityList availabilities
  ) {
    super(
      username,
      email,
      nickname,
      phoneNumber,
      randomAvatarBgColor,
      profilePictureBase64,
      birthDate,
      createdOn,
      lastLogin,
      lastLogoff,
      roles
    );
    this.availabilities = availabilities;
  }

  public GetUserWithAvailabilities(User user) {
    this(
      user.getUsername(),
      user.getEmail(),
      user.getNickname(),
      user.getPhoneNumber(),
      user.getRandomAvatarBgColor(),
      user.getProfilePicture() == null
        ? ""
        : Base64.getEncoder().encodeToString(user.getProfilePicture()),
      user.getBirthDate(),
      user.getCreatedOn(),
      user.getLastLogin(),
      user.getLastLogoff(),
      RoleDto.dtoFrom(user.getRoles()),
      new AvailabilityList(user.getAvailabilities())
    );
  }

  private AvailabilityList availabilities;
}
