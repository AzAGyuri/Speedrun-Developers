package hu.speedrundev.sulipedia;

import hu.speedrundev.sulipedia.model.Roles;
import hu.speedrundev.sulipedia.model.User;
import hu.speedrundev.sulipedia.repository.UserRepository;
import hu.speedrundev.sulipedia.util.MiscUtils;
import io.jsonwebtoken.lang.Arrays;
import java.util.Date;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class CommandLineAppStartupRunner implements CommandLineRunner {

  @Autowired
  private UserRepository repository;

  @Override
  public void run(String... args) throws Exception {
    if (!repository.existsUserByUsername("admin")) {
      User admin = new User();
      admin.setCreatedOn(new Date());
      admin.setUsername("admin");
      admin.setUserPassword(new BCryptPasswordEncoder().encode("admin"));
      admin.setRoles(
        Arrays.asList(Roles.values()).stream().collect(Collectors.toSet())
      );
      admin.setEmail("CHANGE_ME@example.com");
      admin.setRandomPfPBgColor(MiscUtils.generateThreeRandomColors());
      
      repository.save(admin);
    }
  }
}
