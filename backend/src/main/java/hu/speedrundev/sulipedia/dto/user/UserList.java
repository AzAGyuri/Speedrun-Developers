package hu.speedrundev.sulipedia.dto.user;

import java.util.List;

import hu.speedrundev.sulipedia.model.User;
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
}
