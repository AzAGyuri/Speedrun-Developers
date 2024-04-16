package hu.speedrundev.sulipedia.dto.user;

import hu.speedrundev.sulipedia.dto.group.GroupList;
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
public class GetUserWithGroups extends GetUser {

  public GetUserWithGroups(
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
    GroupList groups
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
    this.groups = groups;
  }

  public GetUserWithGroups(User user) {
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
      new GroupList(user.getJoinedGroups())
    );
  }

  private GroupList groups;
}
