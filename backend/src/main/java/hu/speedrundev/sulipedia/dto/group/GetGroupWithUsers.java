package hu.speedrundev.sulipedia.dto.group;

import java.util.Set;
import java.util.stream.Collectors;

import hu.speedrundev.sulipedia.dto.user.UserList;
import hu.speedrundev.sulipedia.model.Group;
import hu.speedrundev.sulipedia.model.Specialization;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GetGroupWithUsers extends GetGroupWithID {

  public GetGroupWithUsers(
    String groupName,
    Set<SpecializationDto> specializations,
    Integer id,
    String descriptionContent,
    UserList users
  ) {
    super(groupName, specializations, id, descriptionContent);
    this.users = users;
  }

  public GetGroupWithUsers(Group group) {
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
      new UserList(group.getUsers())
    );
  }

  private UserList users;
}
