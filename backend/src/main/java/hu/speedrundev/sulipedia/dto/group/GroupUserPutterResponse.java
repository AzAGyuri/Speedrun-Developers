package hu.speedrundev.sulipedia.dto.group;

import hu.speedrundev.sulipedia.dto.user.UserList;
import hu.speedrundev.sulipedia.model.Group;
import hu.speedrundev.sulipedia.model.Specialization;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GroupUserPutterResponse extends GetGroupWithUsers {

  public GroupUserPutterResponse(
    String groupName,
    Set<SpecializationDto> specializations,
    Integer id,
    String descriptionContent,
    String randomAvatarBgColor,
    Integer creatorId,
    UserList users,
    List<String> usernamesNotFound
  ) {
    super(
      groupName,
      specializations,
      id,
      descriptionContent,
      randomAvatarBgColor,
      creatorId,
      users
    );
    this.usernamesNotFound = usernamesNotFound;
  }

  public GroupUserPutterResponse(Group group, List<String> usernamesNotFound) {
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
      group.getCreator().getId(),
      new UserList(group.getUsers()),
      usernamesNotFound
    );
  }

  private List<String> usernamesNotFound;
}
