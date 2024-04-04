package hu.speedrundev.sulipedia.dto.user;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserRegistration extends PostUser {

  public UserRegistration(
    String username,
    String email,
    String nickname,
    String phoneNumber,
    String passwordRaw
  ) {
    super(username, email, nickname, phoneNumber, passwordRaw);
  }
}
