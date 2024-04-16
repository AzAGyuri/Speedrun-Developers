package hu.speedrundev.sulipedia.dto.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

  private String nickname;

  private String email;

  private String newPasswordRaw;

  private String phoneNumber;

  private String oldPasswordRaw;

  @JsonIgnore
  public boolean isAllNull() {
    return nickname == null && email == null && newPasswordRaw == null && phoneNumber == null;
  }
}
