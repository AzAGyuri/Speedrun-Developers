package hu.speedrundev.sulipedia;

import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Hidden
/**
 * HomeController
 *
 * A simple Rest Controller, that returns a welcome message on root.
 */
public class HomeController {

  /**
   * <h3>GET(/)</h3>
   * 
   * A get mapping for root, that returns a hello world and greeting text message.
   * 
   * @return a string, containing the message
   */
  @RequestMapping("/")
  public String home() {
    return "Helló világ!\nÜdvözöljük a sulipédia vizsgaremek projekt API-jának root oldalán.";
  }
}
