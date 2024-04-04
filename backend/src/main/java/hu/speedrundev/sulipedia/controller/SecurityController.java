package hu.speedrundev.sulipedia.controller;

import hu.speedrundev.sulipedia.dto.user.GetUserWithID;
import hu.speedrundev.sulipedia.dto.user.RoleDto;
import hu.speedrundev.sulipedia.dto.user.UserLogin;
import hu.speedrundev.sulipedia.dto.user.UserRegistration;
import hu.speedrundev.sulipedia.service.SecurityService;
import hu.speedrundev.sulipedia.util.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

/**
 * <h3>Security API Controller</h3>
 *
 * {@code @RestController} class for the Security API's endpoints,
 */
@RestController
@Tag(
  name = "Security API",
  description = "A Sulipédia projekt biztonságot kezelő API-ja (bejelentkezés, JWT, regisztráció, kijelentkezés)"
)
public class SecurityController {

  @Autowired
  private SecurityService service;

  @Autowired
  private JwtUtil jwtUtil;

  @Operation(
    summary = "Authenticate a registered user",
    description = "Regisztrált felhasználó bejelentkeztetése a backend-hez"
  )
  @PostMapping("/login")
  public ResponseEntity<GetUserWithID> login(@RequestBody UserLogin loginInfo) {
    GetUserWithID user = service.login(loginInfo);
    return new ResponseEntity<>(
      user,
      getJwtHeader(
        user.getUsername(),
        convertRolesToStringArr(user.getRoles())
      ),
      HttpStatus.OK
    );
  }

  @Operation(
    summary = "Register a new user",
    description = "Egy új felhasználó regisztrálása a backend-en, és eltárolni az adatbázisban, titkosított jelszóval"
  )
  @PostMapping("/register")
  public ResponseEntity<GetUserWithID> register(
    @RequestBody UserRegistration registrationInfo
  ) {
    GetUserWithID user = service.register(registrationInfo);
    return new ResponseEntity<>(
      user,
      getJwtHeader(
        user.getUsername(),
        convertRolesToStringArr(user.getRoles())
      ),
      HttpStatus.CREATED
    );
  }

  @Operation(
    summary = "Logout a logged in user",
    description = "Egy már bejelentkezett felhasználó kijelentkeztetése"
  )
  @GetMapping("/logout")
  public boolean logout(
    @RequestHeader(name = "Authorization") String jwtToken
  ) {
    return service.logout(jwtToken.substring("Bearer".length()).trim());
  }

  @Operation(
    summary = "Test expiry of saved JWT",
    description = "A frontend-en localStorage-ban lementett JWT-t teszteljük, hogy lejárt-e már;<br>" +
    "hogyha a token eleve lejárt, azt már a JwtAuthenticationEntryPoint-nál érzékelésre kerül,<br>" +
    "mert nem is enged hozzáférni a védett végpontokhoz<br>" +
    "ezért ennek a végpontnak mindig igaz értéket kell elméletileg visszaküldenie"
  )
  @GetMapping("/validatetoken")
  public boolean isJWTValid(
    @RequestHeader(name = "Authorization") String jwtToken
  ) {
    return service.isJWTValid(jwtToken.substring("Bearer".length()).trim());
  }

  private String[] convertRolesToStringArr(Set<RoleDto> roles) {
    return roles
      .stream()
      .map(RoleDto::toString)
      .collect(Collectors.toSet())
      .toArray(new String[0]);
  }

  private HttpHeaders getJwtHeader(String username, String[] authorities) {
    HttpHeaders header = new HttpHeaders();
    header.add("JWT", jwtUtil.generateToken(username, authorities));
    return header;
  }
}
