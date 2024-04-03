package hu.speedrundev.sulipedia.dto.user;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostUser extends BaseUser {

  public PostUser() {}

  public PostUser(
    String userName,
    String email,
    Date birthDate,
    String passwordRaw
  ) {
    super(userName, email, birthDate);
    this.passwordRaw = passwordRaw;
  }

  private String passwordRaw;
}
