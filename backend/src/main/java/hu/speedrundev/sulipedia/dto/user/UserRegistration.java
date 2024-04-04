package hu.speedrundev.sulipedia.dto.user;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserRegistration extends PostUser {

  public UserRegistration(
    String userName,
    String email,
    String passwordRaw,
    String nickname,
    String phoneNumber
  ) {
    super(userName, email, passwordRaw);
    this.nickname = nickname;
    this.phoneNumber = phoneNumber;
  }

  private String nickname;

  private String phoneNumber;
}
