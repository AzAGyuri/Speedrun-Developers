package hu.speedrundev.sulipedia;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * HomeController
 *
 * Manages redirects - for now it is only for swagger
 */
@Controller
public class SwaggerController {

  /**
   * <h3>GET(/swagger)</h3>
   * 
   * Redirect to the proper swagger-ui page
   * 
   * @return a redirect string, that hopefully does its magic
   */
  @GetMapping("/swagger")
  public String swaggerRedirect() {
    return "redirect:/swagger-ui/index.html";
  }
}
