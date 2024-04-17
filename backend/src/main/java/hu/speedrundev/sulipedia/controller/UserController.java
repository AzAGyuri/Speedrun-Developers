package hu.speedrundev.sulipedia.controller;

import hu.speedrundev.sulipedia.dto.user.GetUser;
import hu.speedrundev.sulipedia.dto.user.GetUserWithAvailabilities;
import hu.speedrundev.sulipedia.dto.user.GetUserWithGroups;
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
import java.time.LocalDateTime;
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
import org.springframework.web.bind.annotation.RequestHeader;
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
   * Service for the controller of type {@code UserService}
   * responsible for serving the controller
   */
  @Autowired
  private UserService service;

  // /**
  //  * <h3>GET(/user)</h3>
  //  *
  //  * Request all users from DB
  //  *
  //  * @return a new {@code UserList},
  //  * containing a list of {@code UserListItem}s
  //  * with IDs, and all other data of the user
  //  */
  // @Operation(
  //   summary = "List all users",
  //   description = "Az adatbázisban tárolt összes felhasználó lekérdezése"
  // )
  // @GetMapping("/user")
  // public UserList listAllUsers() {
  //   return service.listAllUsers();
  // }

  // /**
  //  * <h3>GET(/user/teacher)</h3>
  //  *
  //  * Request all teacher users from the DB
  //  *
  //  * @return a new {@code UserList},
  //  * containing a list of {@code UserListItem}s
  //  * with IDs, and all other data of the user,
  //  * that qualify as teachers
  //  */
  // @Operation(
  //   summary = "List all teachers",
  //   description = "Az adatbázisban tárolt, tanári felhasználók lekérdezése"
  // )
  // @GetMapping("/user/teacher")
  // public UserList getTeachers() {
  //   return service.getTeachers();
  // }

  // /**
  //  * <h3>GET(/user/teacher)</h3>
  //  *
  //  * Request all underage student users from the DB
  //  *
  //  * @return a new {@code UserList},
  //  * containing a list of {@code UserListItem}s
  //  * with IDs, and all other data of the user,
  //  * that qualify as underage students
  //  */
  // @Operation(
  //   summary = "List all underage students",
  //   description = "Az adatbázisban tárolt, 18 éven aluli felhasználók lekérdezése"
  // )
  // @GetMapping("/user/underage")
  // public UserList getUnderageStudents() {
  //   return service.getUnderageStudents();
  // }

  // /**
  //  * <h3>GET(/user/since?date=yyyy-MM-dd/HH:mm:ss)</h3>
  //  *
  //  * Request all users created in the DB since a given date (e.g. last login)
  //  *
  //  * @param date a date to base the search on (required) ({@code Date})
  //  *
  //  * @return a new {@code UserList}
  //  * containing a list of {@code UserListItem}s
  //  * with IDs, and all other data of the user
  //  * that were created since the given {@code Date} (and {@code LocalTime})
  //  *
  //  * @throws ResponseStatusException
  //  * with {@code HttpStatus.INTERNAL_SERVER_ERROR}
  //  * and reason {@code UNEXPECTED_NULL_POINTER_EXCEPTION}
  //  * if the service for some reason
  //  * recieves a {@code null} as the date
  //  */
  // @Operation(
  //   summary = "List all users created since a date (e.g. last login)",
  //   description = "Az adatbázisban lévő felhasználók kiszűrése RequestParam-ban érkező év-hónap-nap dátum óta"
  // )
  // @GetMapping("/user/since")
  // public UserList getNewUsersSinceDate(
  //   @RequestParam(value = "date") @DateTimeFormat(
  //     pattern = "yyyy-MM-dd/HH:mm:ss"
  //   ) @Valid LocalDateTime date
  // ) {
  //   return service.getNewUsersSinceDate(date);
  // }

  /**
   * <h3>GET(/user/{id})</h3>
   *
   * Request a user from the DB by ID
   *
   * @param id the ID of the user we're looking for
   * (required) ({@code @PathVariable} {@code Integer})
   *
   * @return a new {@code GetUserWithEntries}
   * containing the data of
   * the {@code User} and its {@code Entries}
   *
   * @throws ResponseStatusException
   * with {@code HttpStatus.INTERNAL_SERVER_ERROR}
   * and reason {@code UNEXPECTED_NULL_POINTER_EXCEPTION}
   * if the service for some reason
   * recieves a {@code null} as the ID
   *
   * @throws ResponseStatusException
   * with {@code HttpStatus.NOT_FOUND}
   * and reason {@code USER_NOT_FOUND}
   * if the user couldn't be found by the given ID
   */
  @Operation(
    summary = "Get one user by ID",
    description = "Az adatbázisban tárolt egy felhasználó lekérdezése ID alapján az útvonalban, saját bejegyzéseivel együtt"
  )
  @GetMapping("/user/{id}")
  public GetUserWithAvailabilities getUser(@PathVariable Integer id) {
    return service.getUser(id);
  }

  // /**
  //  * <h3>POST(/user)</h3>
  //  *
  //  * Create a user in the DB
  //  *
  //  * @param user the user to be created
  //  * with its date sent in via RequestBody, in JSON format
  //  * (required) ({@code @Valid} {@code @RequestBody} {@code PostUser})
  //  *
  //  * @return a new {@code GetUserWithID}
  //  * as conformation of creation
  //  * with the new user's data, and its assigned ID
  //  * and an {@code HttpStatus.CREATED} status code response
  //  *
  //  * @throws ResponseStatusException
  //  * with {@code HttpStatus.INTERNAL_SERVER_ERROR}
  //  * and reason {@code UNEXPECTED_NULL_POINTER_EXCEPTION}
  //  * if the service for some reason
  //  * recieves a {@code null} as the {@code PostUser} parameter
  //  *
  //  * @throws ResponseStatusException
  //  * with {@code HttpStatus.CONFLICT}
  //  * and reason {@code USER_ALREADY_EXISTS}
  //  * if the new user's name is not unique
  //  */
  // @Operation(
  //   summary = "Create one user",
  //   description = "Az adatbázisban létrehozni egy felhasználót" +
  //   "<br/>RequestBody-ban, JSON formátumban megadjuk az adatokat"
  // )
  // @ResponseStatus(code = HttpStatus.CREATED)
  // @PostMapping("/user")
  // public GetUserWithID createUser(@Valid @RequestBody PostUser user) {
  //   return service.createUser(user);
  // }

  /**
   * <h3>PUT(/user/{id})</h3>
   *
   * Update a user's information stored in the DB
   *
   * @param changes a {@code UpdateUser} {@code @RequestBody}
   * Data Transfer Object, containing any and all new information
   * for the user
   * @param jwt the JSON Web Token of the user, requesting the modification
   * of its own data
   *
   * @return a new {@code GetUser}
   * as conformation of successful update
   * with updated user information
   *
   * @throws ResponseStatusException
   * with {@code HttpStatus.INTERNAL_SERVER_ERROR}
   * and reason {@code UNEXPECTED_NULL_POINTER_EXCEPTION}
   * if the service for some reason
   * recieves a {@code null} on any input params
   *
   * @throws ResponseStatusException
   * with {@code HttpStatus.BAD_REQUEST}
   * and reason {@code INPUTS_ALL_NULL}
   * if the new input data is all null
   *
   * @throws ResponseStatusException
   * with {@code HttpStatus.NOT_FOUND}
   * and reason {@code USER_NOT_FOUND}
   * if the user couldn't be found by the given JWT
   *
   * @throws ResponseStatusException
   * with {@code HttpStatus.CONFLICT}
   * and reason {@code USER_EMAIL_ALREADY_TAKEN}
   * if the new username has already been taken
   *
   * @throws ResponseStatusException
   * with {@code HttpStatus.BAD_REQUEST}
   * and reason {@code NEW_DATA_IDENTICAL_TO_OLD}
   * if all new input data matched the old data
   *
   * @throws ResponseStatusException
   * with {@code HttpStatus.BAD_REQUEST}
   * and reason {@code UPDATED_ENTITY_DATA_MATCHED_OLD}
   * if even after updating the new data matched all the old ones
   */
  @Operation(
    summary = "Update a user's data",
    description = "Az adatbázisban tárolt felhasználó adatainak frissítése"
  )
  @PutMapping("/user")
  public GetUser updateUser(
    @Valid @RequestBody UpdateUser changes,
    @RequestHeader(name = "Authorization") String jwt
  ) {
    return service.updateUser(changes, jwt.substring("Bearer".length()).trim());
  }

  // /**
  //  * <h3>PATCH(/user/{id})</h3>
  //  *
  //  * Update a user's permissions and roles stored in the DB
  //  *
  //  * @param id the ID of the user, whose data to be updated
  //  * (required) ({@code @PathVariable} {@code Integer})
  //  *
  //  * @param roles the data of the updates to be made to the user
  //  * ({@code @Valid} {@code @RequestBody} {@code Set<RoleDto>})
  //  *
  //  * @return a new {@code GetUser}
  //  * as conformation of successful update
  //  * with updated user information
  //  *
  //  * @throws ResponseStatusException
  //  * with {@code HttpStatus.INTERNAL_SERVER_ERROR}
  //  * and reason {@code UNEXPECTED_NULL_POINTER_EXCEPTION}
  //  * if the service for some reason
  //  * recieves a {@code null} on any input params
  //  *
  //  * @throws ResponseStatusException
  //  * with {@code HttpStatus.NOT_FOUND}
  //  * and reason {@code USER_NOT_FOUND}
  //  * if the user couldn't be found by the given ID
  //  *
  //  * @throws ResponseStatusException
  //  * with {@code HttpStatus.BAD_REQUEST}
  //  * and reason {@code THERE_WERE_NO_NEW_ROLES_TO_BE_ADDED}
  //  * if there were no new roles that could be added to the user
  //  */

  // @Operation(
  //   summary = "Update a user's roles",
  //   description = "Az adatbázisban tárolt felhasználó jogosultságainak frissítése"
  // )
  // @PatchMapping("/user/{id}")
  // public GetUser updateUserRoles(
  //   @PathVariable Integer id,
  //   @RequestBody Set<RoleDto> roles,
  //   @RequestHeader(name = "Authorization") String jwt
  // ) {
  //   return service.updateUserRoles(
  //     id,
  //     roles,
  //     jwt.substring("Bearer".length()).trim()
  //   );
  // }

  /**
   * <h3>DELETE(/user/{id})</h3>
   *
   * Delete a user logically
   *
   * @param id the ID of the user to be set for deletion
   * (required) ({@code @PathVariable} {@code Integer})
   *
   * @return a new {@code GetUser}
   * as conformation of successful logical deletion
   *
   * @throws ResponseStatusException
   * with {@code HttpStatus.INTERNAL_SERVER_ERROR}
   * and reason {@code UNEXPECTED_NULL_POINTER_EXCEPTION}
   * if the service for some reason
   * recieves a {@code null} on any input params
   *
   * @throws ResponseStatusException
   * with {@code HttpStatus.NOT_FOUND}
   * and reason {@code USER_NOT_FOUND}
   * if the user could not be properly extracted from the JWT
   */
  @Operation(
    summary = "Delete one user from DB logically",
    description = "Az adatbázisban tárolt felhasználót logikailag töröljük"
  )
  @DeleteMapping("/user")
  public GetUser logicalDeletionOfUser(
    @RequestHeader(name = "Authorization") String jwt
  ) {
    return service.logicalDeletionOfUser(
      jwt.substring("Bearer".length()).trim()
    );
  }

  // /**
  //  * <h3>DELETE(/user/nulled/{id})</h3>
  //  *
  //  * Set one user's information to empty, and logically delete it
  //  *
  //  * @param id the ID of the user, whose data to be deleted
  //  * (required) ({@code @PathVariable} {@code Integer})
  //  *
  //  * @return a new {@code NulledUser}
  //  * containing oldData {@code GetUser} and nulledData {@code GetUser}
  //  * to confirm the nulling of the users previous data
  //  * and confirm successful flagging for deletion
  //  *
  //  * @throws ResponseStatusException with status code
  //  * {@code HttpStatus.INTERNAL_SERVER_ERROR} and reason
  //  * {@code UNEXPECTED_NULL_POINTER_EXCEPTION} if the service
  //  * for some reason recieves a null value for the JWT token
  //  *
  //  * @throws ResponseStatusException with status code
  //  * {@code HttpStatus.NOT_FOUND} and reason
  //  * {@code USER_NOT_FOUND} if the user could not be properly
  //  * extracted from the JWT
  //  */
  // @Operation(
  //   summary = "Flag a user for deletion, and null all of its data",
  //   description = "Az adatbázisban tárolt felhasználót beállítjuk törlendőre, adatait nullázzuk"
  // )
  // @DeleteMapping("/user/nulled")
  // public NulledUser nullDeleteUser(
  //   @RequestHeader(name = "Authorization") String jwt
  // ) {
  //   return service.nullDeleteUser(jwt.substring("Bearer".length()).trim());
  // }

  /**
   * <h3>PATCH(/user/group/{id})</h3>
   * 
   * Make user exit from a particular group based on the group's ID
   * 
   * @param id the ID of the group that the user wants to exit from
   * @param jwt the JSON Web Token of the user, requesting its exit
   * from the above given group
   * 
   * @return a new {@code GetUserWithGroups} containing the new list of
   * groups the user is a part of, that now excludes the group it has
   * exited
   * 
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.INTERNAL_SERVER_ERROR} with reason
   * {@code UNEXPECTED_NULL_POINTER_EXCEPTION} if the service
   * for some reason recieved a null value on any inputs
   * 
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.NOT_FOUND} with reason
   * {@code GROUP_NOT_FOUND} if the ID of the group did not
   * correspond to any stored in the DB
   * 
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.NOT_FOUND} with reason
   * {@code USER_NOT_FOUND} if the user could not be properly
   * extracted from the JWT
   * 
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.BAD_REQUEST} with reason
   * {@code USER_REQUESTING_EXIT_IS_NOT_MEMBER_IN_GROUP} if
   * the user making the exit request is not a member in the agiven group
   * 
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.BAD_REQUEST} with reason
   * {@code USER_REQUESTING_EXIT_IS_GROUP_CREATOR} if
   * the user making the exit request is the group's creator
   */
  @PatchMapping("/user/group/{id}")
  public GetUserWithGroups removeUserFromGroup(
    @PathVariable Integer id,
    @RequestHeader(name = "Authorization") String jwt
  ) {
    return service.removeUserFromGroup(
      id,
      jwt.substring("Bearer".length()).trim()
    );
  }
}
