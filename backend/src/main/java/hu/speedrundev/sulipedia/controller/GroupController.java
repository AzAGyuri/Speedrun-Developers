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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

  @Autowired
  private GroupService service;

  @Operation(
    summary = "List all csoport from DB by optional user",
    description = "Az adatbázisban eltárolt összes csoport kilistázása, opcionális szűréssel felhasználó id alapján"
  )
  @GetMapping("/group")
  public GroupList listGroupsByOptionalUserId(
    @RequestParam(required = false) Integer userId
  ) {
    return service.listGroupsByOptionalUserId(userId);
  }

  @Operation(
    summary = "Get one group from DB with all data",
    description = "Az adatbázisban eltárolt egy csoport lekérdezése minden adatával"
  )
  @GetMapping("/group/{id}")
  public GetGroupWithUsers getGroup(@PathVariable Integer id) {
    return service.getGroup(id);
  }

  @Operation(
    summary = "Create one group in DB",
    description = "Az adatbázisban létrehozni és eltárolni egy új csoportot"
  )
  @PostMapping("/group")
  public GetGroupWithUsers createGroup(
    @RequestBody PostGroup group,
    @RequestHeader(name = "Authorization") String jwt
  ) {
    return service.createGroup(group, jwt.substring("Bearer".length()).trim());
  }

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
