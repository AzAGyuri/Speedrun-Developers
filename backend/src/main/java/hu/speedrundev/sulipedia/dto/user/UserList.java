package hu.speedrundev.sulipedia.dto.user;

import hu.speedrundev.sulipedia.model.User;
import java.util.List;
import java.util.Set;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserList {

  private List<UserListItem> users;

  public UserList(List<User> users) {
    this.users = users.stream().map(UserListItem::new).toList();
  }

  public UserList(Set<User> users) {
    this.users = users.stream().map(UserListItem::new).toList();
  }
}
