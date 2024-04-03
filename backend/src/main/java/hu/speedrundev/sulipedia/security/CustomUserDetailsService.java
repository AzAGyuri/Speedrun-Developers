package hu.speedrundev.sulipedia.security;

import static hu.speedrundev.sulipedia.util.ExceptionUtils.nullPointer;
import static hu.speedrundev.sulipedia.util.ExceptionUtils.itsGoneBud;

import hu.speedrundev.sulipedia.model.Roles;
import hu.speedrundev.sulipedia.model.User;
import hu.speedrundev.sulipedia.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

  @Autowired
  private UserRepository repository;

  @Override
  public UserDetails loadUserByUsername(String username)
    throws UsernameNotFoundException {
    if (username == null) throw nullPointer();
    if (!repository.existsUserByUsername(username)) throw new UsernameNotFoundException(
      "USERNAME_NOT_FOUND"
    );

    User user = repository.getByUsername(username);

    if (user.getDeleted()) throw itsGoneBud("USER_WAS_ALREADY_DELETED");

    return new org.springframework.security.core.userdetails.User(
      user.getUsername(),
      user.getUserPassword(),
      !user.getDeleted(),
      false,
      false,
      !user.getDeleted(),
      Roles.authoritiesFrom(user.getRoles())
    );
  }
}
