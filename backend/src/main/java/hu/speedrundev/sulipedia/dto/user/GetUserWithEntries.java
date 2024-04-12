package hu.speedrundev.sulipedia.dto.user;

import hu.speedrundev.sulipedia.dto.entry.EntryList;
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
public class GetUserWithEntries extends GetUser {

  public GetUserWithEntries(
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
    EntryList entries
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
    this.entries = entries;
  }

  public GetUserWithEntries(User user) {
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
      new EntryList(user.getEntries())
    );
  }

  private EntryList entries;
}
