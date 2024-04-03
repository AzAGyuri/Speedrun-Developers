package hu.speedrundev.sulipedia.dto.user;

import java.util.Date;

public class UserRegistration extends PostUser {

  public UserRegistration() {}

  public UserRegistration(
    String userName,
    String email,
    Date birthDate,
    String password
  ) {
    super(userName, email, birthDate, password);
  }
}
