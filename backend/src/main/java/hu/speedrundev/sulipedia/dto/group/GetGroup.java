package hu.speedrundev.sulipedia.dto.group;

import java.util.Set;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GetGroup extends BaseGroup {

  public GetGroup(
    String groupName,
    Set<SpecializationDto> specializations,
    String descriptionContent,
    String randomAvatarBgColor,
    Integer creatorId
  ) {
    super(groupName, descriptionContent, specializations);
    this.randomAvatarBgColor = randomAvatarBgColor;
    this.creatorId = creatorId;
  }

  private String randomAvatarBgColor;

  private Integer creatorId;
}
