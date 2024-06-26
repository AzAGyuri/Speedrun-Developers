package hu.speedrundev.sulipedia.dto.group;

import hu.speedrundev.sulipedia.model.Group;
import hu.speedrundev.sulipedia.model.Specialization;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GetGroupWithID extends GetGroup {

  public GetGroupWithID(
    String groupName,
    Set<SpecializationDto> specializations,
    Integer id,
    String descriptionContent,
    String randomAvatarBgColor,
    Integer creatorId
  ) {
    super(
      groupName,
      specializations,
      descriptionContent,
      randomAvatarBgColor,
      creatorId
    );
    this.id = id;
  }

  public GetGroupWithID(Group group) {
    this(
      group.getGroupName(),
      group
        .getSpecializations()
        .stream()
        .map(Specialization::toString)
        .map(SpecializationDto::valueOf)
        .collect(Collectors.toSet()),
      group.getId(),
      group.getDescriptionContent(),
      group.getRandomAvatarBgColor(),
      group.getCreator().getId()
    );
  }

  private Integer id;
}
