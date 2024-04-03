package hu.speedrundev.sulipedia.dto.user;

import hu.speedrundev.sulipedia.model.Roles;
import java.util.Set;
import java.util.stream.Collectors;

public enum RoleDto {
  ROLE_ADMIN,
  ROLE_TEACHER,
  ROLE_STUDENT;

  static Set<RoleDto> dtoFrom(Set<Roles> set) {
    return set
      .stream()
      .map(Roles::toString)
      .map(RoleDto::valueOf)
      .collect(Collectors.toSet());
  }
}
