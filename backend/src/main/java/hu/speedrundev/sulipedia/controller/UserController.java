package hu.speedrundev.sulipedia.controller;

import hu.speedrundev.sulipedia.dto.user.GetUser;
import hu.speedrundev.sulipedia.dto.user.GetUserWithEntries;
import hu.speedrundev.sulipedia.dto.user.GetUserWithID;
import hu.speedrundev.sulipedia.dto.user.NulledUser;
import hu.speedrundev.sulipedia.dto.user.PostUser;
import hu.speedrundev.sulipedia.dto.user.RoleDto;
import hu.speedrundev.sulipedia.dto.user.UpdateUser;
import hu.speedrundev.sulipedia.dto.user.UserList;
import hu.speedrundev.sulipedia.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.Date;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

/**
 * <h3>User API Controller</h3>
 * 
 * {@code @RestController} class for the User API's endpoints,
 */
@Tag(
  name = "User API",
  description = "A Sulipédia projekt Felhasználó táblához kötött RESTful API, CRUD+ műveletekkel"
)
@RestController
public class UserController {

  /**
   * <h3>SERVICE</h3>
   * 
   * Service for the controller of type {@code UserService},<br></br>
   * responsible for serving the controller
   */
  @Autowired
  private UserService service;

  /**
   * <h3>GET(/user)</h3>
   * 
   * Request all users from DB
   *
   * @return a new {@code UserList},
   * containing a list of {@code UserListItem}s
   * with IDs, and all other data of the user
   */
  @Operation(
    summary = "List all users",
    description = "Az adatbázisban tárolt összes felhasználó lekérdezése"
  )
  @GetMapping("/user")
  public UserList listAllUsers() {
    return service.listAllUsers();
  }

  /**
   * <h3>GET(/user/teacher)</h3>
   * 
   * Request all teacher users from the DB
   *
   * @return a new {@code UserList},
   * containing a list of {@code UserListItem}s
   * with IDs, and all other data of the user,
   * that qualify as teachers
   */
  @Operation(
    summary = "List all teachers",
    description = "Az adatbázisban tárolt, tanári felhasználók lekérdezése"
  )
  @GetMapping("/user/teacher")
  public UserList getTeachers() {
    return service.getTeachers();
  }

  /**
   * <h3>GET(/user/teacher)</h3>
   * 
   * Request all underage student users from the DB
   *
   * @return a new {@code UserList},
   * containing a list of {@code UserListItem}s
   * with IDs, and all other data of the user,
   * that qualify as underage students
   */
  @Operation(
    summary = "List all underage students",
    description = "Az adatbázisban tárolt, 18 éven aluli felhasználók lekérdezése"
  )
  @GetMapping("/user/underage")
  public UserList getUnderageStudents() {
    return service.getUnderageStudents();
  }

  /**
   * <h3>GET(/user/since?date=yyyy-MM-dd&time=HH:mm:ss)</h3>
   * 
   * Request all users created in the DB since a given date (e.g. last login)
   *
   * @param date a date to base the search on (required) ({@code Date})
   *
   * @return a new {@code UserList},<br></br>
   * containing a list of {@code UserListItem}s<br></br>
   * with IDs, and all other data of the user,<br></br>
   * that were created since the given {@code Date} (and {@code LocalTime})
   *
   * @throws ResponseStatusException <br></br>
   * with {@code HttpStatus.INTERNAL_SERVER_ERROR}<br></br>
   * and reason {@code UNEXPECTED_NULL_POINTER_EXCEPTION}<br></br>
   * if the service for some reason<br></br>
   * recieves a {@code null} as the date
   */
  @Operation(
    summary = "List all users created since a date (e.g. last login)",
    description = "Az adatbázisban lévő felhasználók kiszűrése RequestParam-ban érkező év-hónap-nap dátum óta"
  )
  @GetMapping("/user/since")
  public UserList getNewUsersSinceDate(
    @RequestParam(value = "date") @DateTimeFormat(
      pattern = "yyyy-MM-dd_hh:mm:ss"
    ) @Valid Date date
  ) {
    return service.getNewUsersSinceDate(date);
  }

  /**
   * <h3>GET(/user/{id})</h3>
   * 
   * Request a user from the DB by ID
   *
   * @param id the ID of the user we're looking for<br></br>
   * (required) ({@code @PathVariable} {@code Integer})
   *
   * @return a new {@code GetUserWithEntries},<br></br>
   * containing the data of<br></br>
   * the {@code User} and its {@code Entries}
   *
   * @throws ResponseStatusException <br></br>
   * with {@code HttpStatus.INTERNAL_SERVER_ERROR}<br></br>
   * and reason {@code UNEXPECTED_NULL_POINTER_EXCEPTION}<br></br>
   * if the service for some reason<br></br>
   * recieves a {@code null} as the ID
   *
   * @throws ResponseStatusException <br></br>
   * with {@code HttpStatus.NOT_FOUND}<br></br>
   * and reason {@code USER_NOT_FOUND}<br></br>
   * if the user couldn't be found by the given ID
   */
  @Operation(
    summary = "Get one user by ID",
    description = "Az adatbázisban tárolt egy felhasználó lekérdezése ID alapján az útvonalban, saját bejegyzéseivel együtt"
  )
  @GetMapping("/user/{id}")
  public GetUserWithEntries getUser(@PathVariable Integer id) {
    return service.getUser(id);
  }

  /**
   * <h3>POST(/user)</h3>
   * 
   * Create a user in the DB
   *
   * @param user the user to be created,<br></br>
   * with its date sent in via RequestBody, in JSON format<br></br>
   * (required) ({@code @Valid} {@code @RequestBody} {@code PostUser})
   *
   * @return a new {@code GetUserWithID}<br></br>
   * as conformation of creation,<br></br>
   * with the new user's data, and its assigned ID,<br></br>
   * and an {@code HttpStatus.CREATED} status code response
   *
   * @throws ResponseStatusException <br></br>
   * with {@code HttpStatus.INTERNAL_SERVER_ERROR}<br></br>
   * and reason {@code UNEXPECTED_NULL_POINTER_EXCEPTION}<br></br>
   * if the service for some reason<br></br>
   * recieves a {@code null} as the {@code PostUser} parameter
   *
   * @throws ResponseStatusException <br></br>
   * with {@code HttpStatus.CONFLICT}<br></br>
   * and reason {@code USER_ALREADY_EXISTS}<br></br>
   * if the new user's name is not unique
   */
  @Operation(
    summary = "Create one user",
    description = "Az adatbázisban létrehozni egy felhasználót" +
    "<br/>RequestBody-ban, JSON formátumban megadjuk az adatokat"
  )
  @ResponseStatus(code = HttpStatus.CREATED)
  @PostMapping("/user")
  public GetUserWithID createUser(@Valid @RequestBody PostUser user) {
    return service.createUser(user);
  }

  /**
   * <h3>PUT(/user/{id})</h3>
   * 
   * Update a user's information stored in the DB
   *
   * @param id the ID of the user, whose data to be updated<br></br>
   * (required) ({@code @PathVariable} {@code Integer})
   *
   * @param changes the data of the updates to be made to the user<br></br>
   * ({@code @Valid} {@code @RequestBody} {@code UpdateUser})
   *
   * @return a new {@code GetUser}<br></br>
   * as conformation of successful update,<br></br>
   * with updated user information
   *
   * @throws ResponseStatusException <br></br>
   * with {@code HttpStatus.INTERNAL_SERVER_ERROR}<br></br>
   * and reason {@code UNEXPECTED_NULL_POINTER_EXCEPTION}<br></br>
   * if the service for some reason<br></br>
   * recieves a {@code null} on any input params
   *
   * @throws ResponseStatusException <br></br>
   * with {@code HttpStatus.BAD_REQUEST}<br></br>
   * and reason {@code INPUTS_ALL_NULL}<br></br>
   * if the new input data is all null
   *
   * @throws ResponseStatusException <br></br>
   * with {@code HttpStatus.NOT_FOUND}<br></br>
   * and reason {@code USER_NOT_FOUND}<br></br>
   * if the user couldn't be found by the given ID
   *
   * @throws ResponseStatusException <br></br>
   * with {@code HttpStatus.CONFLICT}<br></br>
   * and reason {@code USERNAME_ALREADY_TAKEN}<br></br>
   * if the new username has already been taken
   *
   * @throws ResponseStatusException <br></br>
   * with {@code HttpStatus.BAD_REQUEST}<br></br>
   * and reason {@code NEW_DATA_IDENTICAL_TO_OLD}<br></br>
   * if all new input data matched the old data
   *
   * @throws ResponseStatusException <br></br>
   * with {@code HttpStatus.BAD_REQUEST}<br></br>
   * and reason {@code UPDATED_ENTITY_DATA_MATCHED_OLD}<br></br>
   * if even after updating the new data matched all the old ones
   */
  @Operation(
    summary = "Update a user's data",
    description = "Az adatbázisban tárolt felhasználó adatainak frissítése"
  )
  @PutMapping("/user/{id}")
  public GetUser updateUser(
    @PathVariable Integer id,
    @Valid @RequestBody UpdateUser changes
  ) {
    return service.updateUser(id, changes);
  }

  /**
   * <h3>PATCH(/user/{id})</h3>
   * 
   * Update a user's permissions and roles stored in the DB
   *
   * @param id the ID of the user, whose data to be updated<br></br>
   * (required) ({@code @PathVariable} {@code Integer})
   *
   * @param roles the data of the updates to be made to the user<br></br>
   * ({@code @Valid} {@code @RequestBody} {@code Set<RoleDto>})
   *
   * @return a new {@code GetUser}<br></br>
   * as conformation of successful update,<br></br>
   * with updated user information
   *
   * @throws ResponseStatusException <br></br>
   * with {@code HttpStatus.INTERNAL_SERVER_ERROR}<br></br>
   * and reason {@code UNEXPECTED_NULL_POINTER_EXCEPTION}<br></br>
   * if the service for some reason<br></br>
   * recieves a {@code null} on any input params
   *
   * @throws ResponseStatusException <br></br>
   * with {@code HttpStatus.NOT_FOUND}<br></br>
   * and reason {@code USER_NOT_FOUND}<br></br>
   * if the user couldn't be found by the given ID
   *
   * @throws ResponseStatusException <br></br>
   * with {@code HttpStatus.CONFLICT}<br></br>
   * and reason {@code USERNAME_ALREADY_TAKEN}<br></br>
   * if the new username has already been taken
   *
   * @throws ResponseStatusException <br></br>
   * with {@code HttpStatus.BAD_REQUEST}<br></br>
   * and reason {@code THERE_WERE_NO_NEW_ROLES_TO_BE_ADDED}<br></br>
   * if there were no new roles that could be added to the user
   */

  @Operation(
    summary = "Update a user's roles",
    description = "Az adatbázisban tárolt felhasználó jogosultságainak frissítése"
  )
  @PatchMapping("/user/{id}")
  public GetUser updateUserRoles(
    @PathVariable Integer id,
    @Valid @RequestBody Set<RoleDto> roles
  ) {
    return service.updateUserRoles(id, roles);
  }

  /**
   * <h3>DELETE(/user/{id})</h3>
   * 
   * Delete a user logically<br></br>
   *
   * @param id the ID of the user to be set for deletion<br></br>
   * (required) ({@code @PathVariable} {@code Integer})
   *
   * @return a new {@code GetUser}<br></br>
   * as conformation of successful logical deletion
   *
   * @throws ResponseStatusException <br></br>
   * with {@code HttpStatus.INTERNAL_SERVER_ERROR}<br></br>
   * and reason {@code UNEXPECTED_NULL_POINTER_EXCEPTION}<br></br>
   * if the service for some reason<br></br>
   * recieves a {@code null} on any input params
   *
   * @throws ResponseStatusException <br></br>
   * with {@code HttpStatus.NOT_FOUND}<br></br>
   * and reason {@code USER_NOT_FOUND}<br></br>
   * if the user couldn't be found by the given ID
   */
  @Operation(
    summary = "Delete one user from DB logically",
    description = "Az adatbázisban tárolt felhasználót logikailag töröljük"
  )
  @DeleteMapping("/user/{id}")
  public GetUser logicalDeletionOfUser(@PathVariable Integer id) {
    return service.logicalDeletionOfUser(id);
  }

  /**
   * <h3>DELETE(/user/nulled/{id})</h3>
   * 
   * Set one user's information to empty, and logically delete it<br></br>
   * 
   * @param id the ID of the user, whose data to be deleted<br></br>
   * (required) ({@code @PathVariable} {@code Integer})
   * 
   * @return a new {@code NulledUser}<br></br>
   * containing oldData {@code GetUser} and nulledData {@code GetUser}<br></br>
   * to confirm the nulling of the users previous data,<br></br>
   * and confirm successful flagging for deletion
   */
  @Operation(
    summary = "Flag a user for deletion, and null all of its data",
    description = "Az adatbázisban tárolt felhasználót beállítjuk törlendőre, adatait nullázzuk"
  )
  @DeleteMapping("/user/nulled/{id}")
  public NulledUser nullDeleteUser(@PathVariable Integer id) {
    return service.nullDeleteUser(id);
  }
}
