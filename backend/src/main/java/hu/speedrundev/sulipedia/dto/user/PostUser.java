package hu.speedrundev.sulipedia.dto.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostUser extends BaseUser {

  public PostUser() {}

  public PostUser(
    String userName,
    String email,
    String passwordRaw
  ) {
    super(userName, email);
    this.passwordRaw = passwordRaw;
  }

  private String passwordRaw;
}
