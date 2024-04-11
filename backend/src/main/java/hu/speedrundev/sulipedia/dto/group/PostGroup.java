package hu.speedrundev.sulipedia.dto.group;

import java.util.Set;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostGroup extends BaseGroup {

  public PostGroup(
    String groupName,
    Set<SpecializationDto> specializations
  ) {
    super(groupName, specializations);
  }
}
