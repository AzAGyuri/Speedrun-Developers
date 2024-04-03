package hu.speedrundev.sulipedia.dto.user;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class UpdateUser {

  private String userName;

  private String email;

  private String password;

  public boolean isAllNull() {
    return userName == null && email == null && password == null;
  }
}
