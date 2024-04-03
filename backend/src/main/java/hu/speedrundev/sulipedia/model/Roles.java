package hu.speedrundev.sulipedia.model;

import hu.speedrundev.sulipedia.dto.user.RoleDto;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

public enum Roles {
  ROLE_ADMIN,
  ROLE_TEACHER,
  ROLE_STUDENT,
  ;

  public static Set<Roles> modelFrom(Set<RoleDto> roles) {
    return roles
      .stream()
      .map(RoleDto::toString)
      .map(Roles::valueOf)
      .collect(Collectors.toSet());
  }

  public static Collection<? extends GrantedAuthority> authoritiesFrom(
    Set<Roles> roles
  ) {
    return roles
      .stream()
      .map(Roles::toString)
      .map(SimpleGrantedAuthority::new)
      .collect(Collectors.toSet());
  }
}
