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
      /* 
       * ezt írja át azon domain cím és végpontra,
       * melyen a PROD szerver található
       */
      url = "https://sulipedia.duckdns.org/api/v1",
      description = "Sulipédia vizsgaremek projekt; PROD környezeti végpontok alap url-e"
    ),
    @Server(
      url = "http://localhost:8081/api/v1",
      description = "Sulipédia vizsgremek projekt; DEV környezeti végpontok alap url-e"
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
