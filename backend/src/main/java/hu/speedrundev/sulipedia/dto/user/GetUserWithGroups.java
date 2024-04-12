package hu.speedrundev.sulipedia.dto.user;

import hu.speedrundev.sulipedia.dto.group.GroupList;
import java.time.LocalDateTime;
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
    String randomPfPBgColor,
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
      randomPfPBgColor,
      profilePictureBase64,
      birthDate,
      createdOn,
      lastLogin,
      lastLogoff,
      roles
    );
    this.groups = groups;
  }

  private GroupList groups;
}
