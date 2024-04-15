package hu.speedrundev.sulipedia;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@OpenAPIDefinition(
  servers = {
    @Server(
      url = "https://api.sulipedia.duckdns.org",
      description = "Sulipédia vizsgaremek projekt"
    ),
  }
)
@SpringBootApplication
public class SulipediaApplication {

  public static void main(String[] args) {
    SpringApplication.run(SulipediaApplication.class, args);
  }

  @Bean
  public BCryptPasswordEncoder bCryptPasswordEncoder() {
    return new BCryptPasswordEncoder();
  }
}
