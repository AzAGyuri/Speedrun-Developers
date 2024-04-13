package hu.speedrundev.sulipedia.dto.group;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroupUserPutterResponse {

  private GetGroupWithUsers groupWithUsers;

  private List<String> usernamesNotFound;
}
