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

  public boolean isAnyRequiredNull() {
    return (
      getUsername() == null || getEmail() == null || getPasswordRaw() == null
    );
  }

  public boolean isAnyRequiredEmpty() {
    return (
      getUsername().isBlank() ||
      getPhoneNumber().isBlank() ||
      getPasswordRaw().isBlank()
    );
  }

  public boolean invalidPassword() {
    String passwordRaw = getPasswordRaw();
    return (
      passwordRaw.isBlank() ||
      passwordRaw.length() < 8 ||
      !passwordRaw.matches(".*\\d.*")
    );
  }
}
