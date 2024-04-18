package hu.speedrundev.sulipedia;

import hu.speedrundev.sulipedia.model.Roles;
import hu.speedrundev.sulipedia.repository.GroupRepository;
import hu.speedrundev.sulipedia.repository.UserRepository;
import hu.speedrundev.sulipedia.util.MiscUtils;
import io.jsonwebtoken.lang.Arrays;
import java.util.HashSet;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class FirstTimeAppStartup implements CommandLineRunner {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private GroupRepository groupRepository;

  @Autowired
  private BCryptPasswordEncoder passwordEncoder;

  @Override
  public void run(String... args) throws Exception {
    if (
      userRepository
        .getByUsername("admin")
        .getUserPassword()
        .equalsIgnoreCase("admin")
    ) {
      userRepository
        .findAll()
        .forEach(user -> {
          if (user.getId() == 100000001) {
            user.setRoles(
              Arrays.asList(Roles.values()).stream().collect(Collectors.toSet())
            );
          } else {
            HashSet<Roles> roles = new HashSet<>();
            roles.add(Roles.ROLE_STUDENT);
            user.setRoles(roles);
          }

          user.setUserPassword(passwordEncoder.encode(user.getUserPassword()));
          user.setRandomAvatarBgColor(MiscUtils.generateThreeRandomColors());

          userRepository.save(user);
        });

      groupRepository
        .findAll()
        .forEach(group -> {
          group.setRandomAvatarBgColor(MiscUtils.generateThreeRandomColors());
          groupRepository.save(group);
        });
    }
  }
}
