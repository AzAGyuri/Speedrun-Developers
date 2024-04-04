package hu.speedrundev.sulipedia.dto.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostUser extends BaseUser {

  public PostUser(
    String username,
    String email,
    String nickname,
    String phoneNumber,
    String passwordRaw
  ) {
    super(username, email, nickname, phoneNumber);
    this.passwordRaw = passwordRaw;
  }

  private String passwordRaw;
}
