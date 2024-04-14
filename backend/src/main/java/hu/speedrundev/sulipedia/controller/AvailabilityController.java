package hu.speedrundev.sulipedia.controller;

import hu.speedrundev.sulipedia.dto.availability.AvailabilityList;
import hu.speedrundev.sulipedia.dto.availability.GetAvailability;
import hu.speedrundev.sulipedia.dto.availability.GetAvailabilityWithID;
import hu.speedrundev.sulipedia.dto.availability.PostAvailability;
import hu.speedrundev.sulipedia.dto.availability.UpdateAvailability;
import hu.speedrundev.sulipedia.service.AvailabilityService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
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
 * <h3>Availability API Controller</h3>
 *
 * {@code @RestController} class for the Availability API's endpoints,
 */
@Tag(
  name = "Availability API",
  description = "A Sulipédia projekt Elérhetőség táblához kötött RESTful API, CRUD+ műveletekkel"
)
@RestController
public class AvailabilityController {

  /**
   * <h3>SERVICE</h3>
   *
   * Service for the controller of type {@code AvailabilityService}
   * responsible for serving the controller
   */
  @Autowired
  private AvailabilityService service;

  /**
   * <h3>GET(/availability)</h3>
   *
   * List all stored availabilities from the DB
   *
   * @return new {@code AvailabilityList},
   * containing all availabilities for any and all users
   */
  @Operation(
    summary = "List all availabilites from DB",
    description = "Az adatbázisban eltárolt összes elérhetőség lekérdezése"
  )
  @GetMapping("/availability")
  public AvailabilityList listAllAvailabilities() {
    return service.listAllAvailabilities();
  }

  /**
   * <h3>POST(/availability)</h3>
   *
   * Create a new availability in the DB,
   * for a particular user, based on their JWT Authorization token
   *
   * @param availability a {@code PostAvailability} {@code RequestBody}
   * Data Transfer Object containing the link to the availability,
   * and the type of the availability in the form of {@code AvailTypeDto} enum
   * @param jwt the JSON Web Token of the user, requesting the creation
   * of the new availability
   *
   * @return a new {@code GetAvailabilityWithID} containing
   * the same data that was acquired in the request body, and the ID
   * that the saved model recieved when adding it to the database
   *
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.INTERNAL_SERVER_ERROR} and reason
   * {@code UNEXPECTED_NULL_POINTER_EXCEPTION} if the service
   * for some reason recieves null values as any of the inputs
   *
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.NOT_FOUND} and reason
   * {@code LINKED_USER_NOT_FOUND} if the user could not be
   * properly extracted from the JWT
   */
  @Operation(
    summary = "Create one availability for a user",
    description = "Egy elérhetőség létrehozása és elmentése az adatbázisban egy felhasználó számára"
  )
  @PostMapping("/availability")
  @ResponseStatus(code = HttpStatus.CREATED)
  public GetAvailabilityWithID createAvailability(
    @Valid @RequestBody PostAvailability availability,
    @RequestHeader(name = "Authorization") String jwt
  ) {
    return service.createAvailability(
      availability,
      jwt.substring("Bearer".length()).trim()
    );
  }

  /**
   * <h3>PUT(/availability/{id})</h3>
   *
   * Update the information for an availability stored in the DB,
   * based on its ID, and update either one of or both the link and
   * type of the availability
   *
   * @param update a {@code UpdateAvailiability} {@code RequestBody}
   * Data Transfer Object, containing the new link and type of the new availability
   * @param id the ID of the availability to be updated
   * @param jwt the JSON Web Token of the user, requesting the modification
   * of the availability
   *
   * @return a new {@code GetAvailability} containing the updated information for
   * the availability
   *
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.INTERNAL_SERVER_ERROR} and reason
   * {@code UNEXPECTED_NULL_POINTER_EXCEPTION} if the service
   * for some reason recieves null values as any of the inputs
   *
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.NOT_FOUND} and reason
   * {@code AVAILABILITY_NOT_FOUND} if the id does not
   * correspond for any of the stored availabilities in the DB
   *
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.NOT_FOUND} and reason
   * {@code USER_NOT_FOUND} if the user could not be
   * properly extracted from the JWT
   *
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.GONE} and reason
   * {@code THE_LINKED_USER_OF_THE_AVAILABILITY_IS_DELETED} if
   * the requested availability to be updated had its user logically deleted
   *
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.FORBIDDEN} and reason
   * {@code USER_REQUESTING_AVAILABILITY_UPDATE_IS_NOT_LINKED_USER} if
   * the user that made the request for the modification is not the user
   * whose linked with that availability
   *
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.BAD_REQUEST} and reason
   * {@code ALL_UPDATE_DATA_MATCH_EXISTING_ENTITY_DATA} if
   * the update data matches every and all existing data from the DB
   *
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.BAD_REQUEST} and reason
   * {@code UPDATED_ENTITY_DATA_STILL_MATCHES_OLD_DATA} if
   * even after updating, there was no change to the stored entity in the DB
   */
  @Operation(
    summary = "Update an availability in DB",
    description = "Az adatbázisban eltárolt elérhetőség frissítése új adatokkal"
  )
  @PutMapping("/availability/{id}")
  public GetAvailability updateAvailability(
    @Valid @RequestBody UpdateAvailability update,
    @PathVariable Integer id,
    @RequestHeader(name = "Authorization") String jwt
  ) {
    return service.updateAvailability(
      update,
      id,
      jwt.substring("Bearer".length()).trim()
    );
  }

  /**
   * <h3>DELETE(/availability/{id})</h3>
   *
   * Delete an availability from the DB based on ID
   *
   * @param id the ID of the availability to be deleted
   * @param jwt the JSON Web Token of the user, requesting the deletion
   * of the availability
   *
   * @return a new {@code GetAvailabilityWithID} with the old data of
   * the now deleted availabilty from the DB
   *
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.INTERNAL_SERVER_ERROR} and reason
   * {@code UNEXPECTED_NULL_POINTER_EXCEPTION} if the service
   * for some reason recieves null values as any of the inputs
   *
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.NOT_FOUND} and reason
   * {@code AVAILABILITY_NOT_FOUND} if the id does not
   * correspond for any of the stored availabilities in the DB
   *
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.NOT_FOUND} and reason
   * {@code USER_NOT_FOUND} if the user could not be
   * properly extracted from the JWT
   *
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.FORBIDDEN} and reason
   * {@code USER_REQUESTING_AVAILABILITY_DELETION_IS_NOT_LINKED_USER} if
   * the user that made the request for the deletion is not the user
   * whose linked with that availability
   */
  @Operation(
    summary = "Delete an availability from DB",
    description = "Az adatbázisban eltárolt elérhetőség törlése; ez a folyamat nem visszafordítható!"
  )
  @DeleteMapping("/availability/{id}")
  public GetAvailabilityWithID deleteAvailability(
    @PathVariable Integer id,
    @RequestHeader(name = "Authorization") String jwt
  ) {
    return service.deleteAvailability(
      id,
      jwt.substring("Bearer".length()).trim()
    );
  }
}
