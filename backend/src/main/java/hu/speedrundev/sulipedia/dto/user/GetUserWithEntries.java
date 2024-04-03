package hu.speedrundev.sulipedia.dto.user;

import hu.speedrundev.sulipedia.dto.entry.EntryList;
import hu.speedrundev.sulipedia.model.User;

import java.util.Base64;
import java.util.Date;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetUserWithEntries extends GetUser {

  public GetUserWithEntries(User user) {
    this(
      user.getUsername(),
      user.getEmail(),
      Base64.getEncoder().encodeToString(user.getProfilePicture()),
      user.getBirthDate(),
      user.getLastLogin(),
      user.getLastLogoff(),
      RoleDto.dtoFrom(user.getRoles()),
      user.getCreatedOn(),
      new EntryList(user.getEntries())
    );
  }

  public GetUserWithEntries() {}

  public GetUserWithEntries(
    String userName,
    String email,
    String profilePictureBase64,
    Date birthDate,
    Date lastLogin,
    Date lastLogoff,
    Set<RoleDto> roles,
    Date createdOn,
    EntryList entries
  ) {
    super(userName, email, birthDate, profilePictureBase64, roles, createdOn, lastLogin, lastLogoff);
    this.entries = entries;
  }

  private EntryList entries;
}
