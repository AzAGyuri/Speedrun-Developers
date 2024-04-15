package hu.speedrundev.sulipedia.controller;

import hu.speedrundev.sulipedia.dto.group.GetGroupWithID;
import hu.speedrundev.sulipedia.dto.group.GetGroupWithUsers;
import hu.speedrundev.sulipedia.dto.group.GroupList;
import hu.speedrundev.sulipedia.dto.group.GroupUserPutterResponse;
import hu.speedrundev.sulipedia.dto.group.PostGroup;
import hu.speedrundev.sulipedia.service.GroupService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

/**
 * <h3>Group API Controller</h3>
 *
 * {@code @RestController} class for the Group API's endpoints,
 */
@Tag(
  name = "Group API",
  description = "A Sulipédia projekt csoport táblához kötött RESTful API, CRUD+ műveletekkel"
)
@RestController
public class GroupController {

  /**
   * <h3>SERVICE</h3>
   *
   * Service for the controller of type {@code GroupService}
   * responsible for serving the controller
   */
  @Autowired
  private GroupService service;

  /**
   * <h3>GET(/group)</h3>
   *
   * List all groups from the DB based on the user's JWT
   *
   * @param jwt the JSON Web Token of the user, requesting the listing
   * of its groups
   *
   * @return a new {@code GroupList} containing all of the
   * groups, that the user that made the request is a part of
   *
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.NOT_FOUND} and reason
   * {@code USER_NOT_FOUND} if the user could not be properly
   * extracted from the JWT
   */
  @Operation(
    summary = "List all groups from DB by user",
    description = "Az adatbázisban eltárolt összes csoport kilistázása a felhasználó JWT-je alapján"
  )
  @GetMapping("/group")
  public GroupList listGroupsByUserJWT(
    @RequestHeader(name = "Authorization") String jwt
  ) {
    return service.listGroupsByUserJWT(jwt.substring("Bearer".length()).trim());
  }

  /**
   * <h3>GET(/group/{id})</h3>
   *
   * Get one groups information from the DB with its users
   *
   * @param id the ID of the group to be requested
   * @param jwt the JSON Web Token of the user, requesting the information
   * of its group
   *
   * @return a new {@code GetGroupWithUsers} containing the list of users
   * that are part of the group
   * 
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.INTERNAL_SERVER_ERROR} and reason
   * {@code UNEXPECTED_NULL_POINTER_EXCEPTION} if the service
   * for some reason recieves a null value on any of its inputs
   * 
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.NOT_FOUND} and reason
   * {@code USER_NOT_FOUND} if the user could not be properly
   * extracted from the JWT
   * 
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.NOT_FOUND} and reason
   * {@code GROUP_NOT_FOUND} if ID of the group did not correspond
   * to any stored in the DB
   * 
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.FORBIDDEN} and reason
   * {@code USER_REQUESTING_INFO_IS_NOT_PART_OF_GROUP} if user
   * who made the request is not a part of the group
   */
  @Operation(
    summary = "Get one group from DB with all data",
    description = "Az adatbázisban eltárolt egy csoport lekérdezése minden adatával"
  )
  @GetMapping("/group/{id}")
  public GetGroupWithUsers getGroup(
    @PathVariable Integer id,
    @RequestHeader(name = "Authorization") String jwt
  ) {
    return service.getGroup(id, jwt.substring("Bearer".length()).trim());
  }

  /**
   * <h3>POST(/group)</h3>
   *
   * Create a new group in the DB
   *
   * @param group a {@code PostGroup} {@code RequestBody}
   * Data Transfer Object, containing the information about the new group
   * - group name, specializations, description
   * @param jwt the JSON Web Token of the user, requesting the creation
   * of the new group
   *
   * @return a new {@code GetGroupWithUsers} containing the input data,
   * the ID of the newly created group, a randomly generated avatar background
   * color the creator's ID, and the list of users that have become part
   * of the group - at first, just the creator itself
   * 
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.INTERNAL_SERVER_ERROR} and reason
   * {@code UNEXPECTED_NULL_POINTER_EXCEPTION} if the service
   * for some reason recieves a null value on any of its inputs
   * 
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.NOT_FOUND} and reason
   * {@code USER_NOT_FOUND} if the user could not be properly
   * extracted from the JWT
   * 
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.BAD_REQUEST} and reason
   * {@code NO_SPECIALIZATIONS_SUPPLIED} if in the request body
   * the specialization list is a null or empty
   */
  @Operation(
    summary = "Create one group in DB",
    description = "Az adatbázisban létrehozni és eltárolni egy új csoportot"
  )
  @PostMapping("/group")
  @ResponseStatus(code = HttpStatus.CREATED)
  public GetGroupWithUsers createGroup(
    @RequestBody PostGroup group,
    @RequestHeader(name = "Authorization") String jwt
  ) {
    return service.createGroup(group, jwt.substring("Bearer".length()).trim());
  }

  /**
   * <h3>PUT(/group/{id})</h3>
   *
   * Put a user into the group in the DB based on its username; if the
   * username is not found, send it back in the response
   *
   * @param id the ID of the group, into which the users are inserted into
   * @param jwt the JSON Web Token of the user, requesting the adding of
   * the user into the group
   * @param usernames a {@code List} of username {@code String}s in
   * {@code RequestBody} that, if found in the DB, will be added into the
   * group
   *
   * @return a new {@code GroupUserPutterResponse} containing the 
   * list of users with only the newly added users - possibly an 
   * empty list -,and a list of usernames, that were not found in 
   * the database, and were ignored
   * 
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.INTERNAL_SERVER_ERROR} and reason
   * {@code UNEXPECTED_NULL_POINTER_EXCEPTION} if the service
   * for some reason recieves a null value on any of its inputs
   * 
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.NOT_FOUND} and reason
   * {@code GROUP_NOT_FOUND} if the ID of the group did not correspond
   * to any stored in the DB
   * 
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.BAD_REQUEST} and reason
   * {@code USERNAME_LIST_IS_EMPTY} if the list of usernames given
   * is a null value or is empty
   * 
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.NOT_FOUND} and reason
   * {@code USERNAME_NOT_FOUND} if the user could not be properly extracted
   * from the JWT
   * 
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.FORBIDDEN} and reason
   * {@code USER_REQUESTING_ADD_IS_NOT_GROUP_CREATOR} if the user
   * making the request for adding another user is not the creator
   * of the group
   */
  @Operation(
    summary = "Put a user based on name into group in DB",
    description = "Az adatbázisban eltárolt csoportba beszúrni egy új felhasználót név szerint"
  )
  @PutMapping("/group/{id}")
  public GroupUserPutterResponse putUserIntoGroup(
    @PathVariable Integer id,
    @RequestHeader(name = "Authorization") String jwt,
    @RequestBody List<String> usernames
  ) {
    return service.putUserIntoGroup(
      id,
      jwt.substring("Bearer".length()).trim(),
      usernames
    );
  }

  /**
   * <h3>DELETE(/group/{groupId}/{userId}</h3>
   *
   * Delete a user from the group; first path variable is the group's id,
   * second one is the user's id to be kicked from the group
   *
   * @param groupId the ID of the group, where the kicking operation will
   * take place
   * @param userId the ID of the user, who will be kicked from the given group
   * @param jwt the JSON Web Token of the user, requesting the deletion
   * of the user from the group
   *
   * @return a new {@code GetGroupWithUsers} containing the list of users,
   * who have been removed from the group
   * 
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.INTERNAL_SERVER_ERROR} and reason
   * {@code UNEXPECTED_NULL_POINTER_EXCEPTION} if the service
   * for some reason recieves a null value on any of its inputs
   * 
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.NOT_FOUND} and reason
   * {@code GROUP_NOT_FOUND} if the ID of the group did not correspond
   * to any stored in DB
   * 
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.NOT_FOUND} and reason
   * {@code USER_NOT_FOUND} if the ID of the user did not correspond
   * to any stored in DB
   * 
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.BAD_REQUEST} and reason
   * {@code USER_NOT_IN_GROUP} if the user found by ID is not part of
   * the group where it's removed from
   * 
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.FORBIDDEN} and reason
   * {@code USER_REQUESTING_REMOVAL_IS_NOT_GROUP_CREATOR} if the user
   * making the request for the kicking of another user is not the
   * creator of the group
   * 
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.BAD_REQUEST} and reason
   * {@code USER_REQUESTING_DELETION_IS_GROUP_CREATOR} if the user
   * making the request for the deletion is the creator of the group itself
   */
  @Operation(
    summary = "Delete one user by ID from group by ID in DB",
    description = "Az adatbázisban eltárolt csoportból egy felhasználó törlése saját ID-jaik alapján"
  )
  @DeleteMapping("/group/{groupId}/{userId}")
  public GetGroupWithUsers deleteUserFromGroup(
    @PathVariable Integer groupId,
    @PathVariable Integer userId,
    @RequestHeader(name = "Authorization") String jwt
  ) {
    return service.deleteUserFromGroup(
      groupId,
      userId,
      jwt.substring("Bearer".length()).trim()
    );
  }

  /**
   * <h3>DELETE(/group/{id})</h3>
   *
   * Delete a group from the DB entirely
   *
   * @param id the ID of the group to be deleted
   * @param jwt the JSON Web Token of the user, requesting the deletion
   * of the group
   *
   * @return a new {@code GetGroupWithID} containing the old data of the
   * group that has been deleted
   * 
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.INTERNAL_SERVER_ERROR} and reason
   * {@code UNEXPECTED_NULL_POINTER_EXCEPTION} if 
   * 
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.NOT_FOUND} and reason
   * {@code GROUP_NOT_FOUND} if 
   * 
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.NOT_FOUND} and reason
   * {@code USER_NOT_FOUND} if 
   * 
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.FORBIDDEN} and reason
   * {@code USER_REQUESTING_GROUP_DELETE_IS_NOT_CREATOR} if 
   * 
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.BAD_REQUEST} and reason
   * {@code GROUP_REQUESTED_FOR_DELETION_IS_NOT_EMPTY} if 
   */
  @Operation(
    summary = "Delete on group from DB by ID",
    description = "Az adatbázisban eltárolt csoport kitörlése ID alapján"
  )
  @DeleteMapping("/group/{id}")
  public GetGroupWithID deleteGroup(
    @PathVariable Integer id,
    @RequestHeader(name = "Authorization") String jwt
  ) {
    return service.deleteGroup(id, jwt.substring("Bearer".length()).trim());
  }
}
