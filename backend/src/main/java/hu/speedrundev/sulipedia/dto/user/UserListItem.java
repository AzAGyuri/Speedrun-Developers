package hu.speedrundev.sulipedia.dto.user;

import hu.speedrundev.sulipedia.dto.group.GroupList;
import hu.speedrundev.sulipedia.model.User;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Set;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class UserListItem extends GetUserWithID {

  public UserListItem(
    String userName,
    String email,
    String nickname,
    String phoneNumber,
    String randomPfPBgColor,
    String profilePictureBase64,
    GroupList groups,
    LocalDateTime birthDate,
    LocalDateTime createdOn,
    LocalDateTime lastLogin,
    LocalDateTime lastLogoff,
    Set<RoleDto> roles,
    Integer id
  ) {
    super(
      userName,
      email,
      nickname,
      phoneNumber,
      randomPfPBgColor,
      profilePictureBase64,
      groups,
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
      user.getNickname(),
      user.getPhoneNumber(),
      user.getRandomAvatarBgColor(),
      user.getProfilePicture() == null
        ? ""
        : Base64.getEncoder().encodeToString(user.getProfilePicture()),
      new GroupList(user.getJoinedGroups()),
      user.getBirthDate(),
      user.getCreatedOn(),
      user.getLastLogin(),
      user.getLastLogoff(),
      RoleDto.dtoFrom(user.getRoles()),
      user.getId()
    );
  }
}
