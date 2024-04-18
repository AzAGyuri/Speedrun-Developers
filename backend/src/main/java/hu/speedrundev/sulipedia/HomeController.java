package hu.speedrundev.sulipedia;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * HomeController
 *
 * Manages some simple redirects and a hello world endpoint
 */
@Controller
public class HomeController {

  /**
   * <h3>GET(/)</h3>
   * 
   * a basic hello world endpoint on root
   * 
   * @return a hello world and welcome message
   */
  @GetMapping("/")
  public String getHome() {
    return "Helló világ!\nÜdvözöljük a sulipédia vizsgaremek projekt API-jának root oldalán.";
  }

  /**
   * <h3>GET(/swagger)</h3>
   * 
   * Redirect to the proper swagger-ui page
   * 
   * @return a redirect string, that hopefully does its magic
   */
  @GetMapping("/swagger-ui")
  public String swaggerRedirect() {
    return "redirect:/api/v1/swagger-ui/index.html";
  }
}
