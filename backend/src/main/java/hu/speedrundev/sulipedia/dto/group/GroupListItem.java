package hu.speedrundev.sulipedia.dto.group;

import java.util.Set;
import java.util.stream.Collectors;

import hu.speedrundev.sulipedia.model.Group;
import hu.speedrundev.sulipedia.model.Specialization;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class GroupListItem extends GetGroupWithID {

  public GroupListItem(
    String groupName,
    Set<SpecializationDto> specializations,
    Integer id,
    String descriptionContent,
    String randomAvatarBgColor,
    Integer creatorId
  ) {
    super(groupName, specializations, id, descriptionContent, randomAvatarBgColor, creatorId);
  }

  public GroupListItem(Group group) {
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
}
