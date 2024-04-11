package hu.speedrundev.sulipedia.dto.group;

import hu.speedrundev.sulipedia.model.Group;
import java.util.List;
import java.util.Set;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GroupList {

  public GroupList(List<Group> groups) {
    this.groups = groups.stream().map(GroupListItem::new).toList();
  }

  public GroupList(Set<Group> groups) {
    this.groups = groups.stream().map(GroupListItem::new).toList();
  }

  private List<GroupListItem> groups;
}
