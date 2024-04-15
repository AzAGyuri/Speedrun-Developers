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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

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

  /**
   * <h3>SERVICE</h3>
   *
   * Service for the controller of type {@code GroupService}
   * responsible for serving the controller
   */
  @Autowired
  private SecurityService service;

  /**
   * <h3>JWTUTIL</h3>
   *
   * The {@code JwtUtil} component of the entire API; here it's
   * responsible for generated JWTs for the user logging in/registering
   */
  @Autowired
  private JwtUtil jwtUtil;

  /**
   * <h3>POST(/login)</h3>
   * 
   * Authenticate a registered user from the DB
   * 
   * @param loginInfo a {@code UserLogin} {@code RequestBody}
   * Data Transfer Object, containing the username or email and raw password
   * 
   * @return a {@code ResponseEntity} that contains a {@code GetUserWithID}
   * with the information of the registered user who was successfully
   * authenticated and also in the response headers a generated JWT
   * header for the user
   * 
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.INTERNAL_SERVER_ERROR} and reason
   * {@code UNEXPECTED_NULL_POINTER_EXCEPTION} if the service
   * for some reason recieves a null value on any of its required input data
   * 
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.NOT_FOUND} and reason
   * {@code USERNAME_OR_EMAIL_NOT_FOUND} if the user was not found by
   * neither username nor password
   * 
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.GONE} and reason
   * {@code USER_HAS_BEEN_DELETED} if the user has been logically or null
   * deleted from the database
   * 
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.UNAUTHORIZED} and reason
   * {@code PROVIDED_PASSWORD_DOES_NOT_MATCH_FOR_USERNAME} if the provided
   * password did not match for the agiven username or email
   */
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

  /**
   * <h3>POST(/register)</h3>
   * 
   * Register a brand new user into the DB
   * 
   * @param registrationInfo a {@code UserRegistration} {@code RequestBody}
   * Data Transfer Object, containing the users username, raw password, email,
   * and potentially phone number and nickname for the user.
   * 
   * @return a {@code ResponseEntity} that contains a {@code GetUserWithID}
   * with the information of the new user who was successfully registered
   * and also in the response headers a generated JWT header for the user
   * 
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.INTERNAL_SERVER_ERROR} and reason
   * {@code UNEXPECTED_NULL_POINTER_EXCEPTION} if the service
   * for some reason recieves a null value on any of its required input data
   * 
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.CONFLICT} and reason
   * {@code USER_EMAIL_ALREADY_TAKEN} if the email address has already been
   * used by another user in the DB
   * 
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.BAD_REQUEST} and reason
   * {@code SOME_REQUIRED_INPUT_DATA_IS_NULL} if some of the required inputs
   * are of null value
   * 
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.BAD_REQUEST} and reason
   * {@code SOME_REQUIRED_INPUT_DATA_IS_EMPTY} if some of the required inputs
   * are empty values
   * 
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.BAD_REQUEST} and reason
   * {@code INPUT_PASSWORD_IS_INVALID} if the input password is invalid
   */
  @Operation(
    summary = "Register a new user",
    description = "Egy új felhasználó regisztrálása a backend-en, és eltárolni az adatbázisban, titkosított jelszóval"
  )
  @PostMapping("/register")
  @ResponseStatus(code = HttpStatus.CREATED)
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

  /**
   * <h3>GET(/logout)</h3>
   * 
   * Logout an already logged in user, and save the date of logout
   * 
   * @param jwt the JSON Web Token of the user, requesting to logout
   * 
   * @return a true value, signifying a successful logout
   * 
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.INTERNAL_SERVER_ERROR} and reason
   * {@code UNEXPECTED_NULL_POINTER_EXCEPTION} if the service
   * for some reason recieves a null value on any of the inputs
   * 
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.NOT_FOUND} and reason
   * {@code USER_NOT_FOUND} if 
   */
  @Operation(
    summary = "Logout a logged in user",
    description = "Egy már bejelentkezett felhasználó kijelentkeztetése"
  )
  @GetMapping("/logout")
  public boolean logout(
    @RequestHeader(name = "Authorization") String jwt
  ) {
    return service.logout(jwt.substring("Bearer".length()).trim());
  }

  /**
   * <h3>GET(/validatetoken)</h3>
   * 
   * Test the expiry of the JWT from the request header
   * 
   * @param jwt the JSON Web Token of the user, requesting validation of it
   * 
   * @return a true value; since there's additional Component logic for the
   * API, that should catch an invalid token, based on expiry, or
   * non-existence of JWT in authorization header, or potentially missing
   * user in the database, this endpoint should always respond true, if the
   * JWT validation didn't fail to pass anywhere else in the API, which
   * signifies the validation being successful
   */
  @Operation(
    summary = "Test expiry of JWT",
    description = "A frontend-en localStorage-ban lementett JWT-t teszteljük, hogy lejárt-e már;<br>" +
    "hogyha a token eleve lejárt, azt már a JwtAuthenticationEntryPoint-nál érzékelésre kerül,<br>" +
    "mert nem is enged hozzáférni a védett végpontokhoz<br>" +
    "ezért ennek a végpontnak mindig igaz értéket kell elméletileg visszaküldenie"
  )
  @GetMapping("/validatetoken")
  public boolean isJWTValid(
    @RequestHeader(name = "Authorization") String jwt
  ) {
    return service.isJWTValid(jwt.substring("Bearer".length()).trim());
  }

  /**
   * <h3>convertRolesToStringArr</h3>
   * 
   * A private helper method for the /register and /login endpoints, used
   * prior to generating a token for the user
   * 
   * @param roles a set of roles for the user to be converted
   * 
   * @return an array of strings, with the string representation of the
   * user's roles
   */
  private String[] convertRolesToStringArr(Set<RoleDto> roles) {
    return roles
      .stream()
      .map(RoleDto::toString)
      .collect(Collectors.toSet())
      .toArray(new String[0]);
  }

  /**
   * <h3>getJwtHeader</h3>
   * 
   * A private helper method for the /register and /login endpoints, used
   * to give the {@code ResponseEntity} response data the jwt response header,
   * that's then stored and used on the frontend side
   * 
   * @param username name of the user, that will be the subject of the JWT
   * @param authorities otherwise called roles of the user that will be stored
   * in the JWT
   * 
   * @return a new {@code HttpHeader} with the generated jwt value added to it
   */
  private HttpHeaders getJwtHeader(String username, String[] authorities) {
    HttpHeaders header = new HttpHeaders();
    header.add("JWT", jwtUtil.generateToken(username, authorities));
    return header;
  }
}
