package hu.speedrundev.sulipedia.controller;

import hu.speedrundev.sulipedia.dto.availability.AvailabilityList;
import hu.speedrundev.sulipedia.dto.availability.DeletedAvailability;
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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

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
   * Service for the controller of type {@code AvailabilityService},<br></br>
   * responsible for serving the controller
   */
  @Autowired
  private AvailabilityService service;

  /**
   * <h3>GET(/availability)</h3>
   * 
   * List all stored availabilities from the DB
   * 
   * @return new {@code AvailabilityList},<br></br>
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
   * <h3>GET(/availability/{id})</h3>
   * 
   * @param userId
   * @return
   */
  @Operation(
    summary = "Get all availabilites of a user from DB",
    description = "Az adatbázisban eltárolt felhasználónak az elérhetősége(i) kilistázása"
  )
  @GetMapping("/availability/{id}")
  public AvailabilityList getUserAvailabilities(@PathVariable Integer userId) {
    return service.getUserAvailabilities(userId);
  }

  /**
   * <h3>POST(/availability)</h3>
   * 
   * @param availability
   * @return
   */
  @Operation(
    summary = "Create one availability for a user",
    description = "Egy elérhetőség létrehozása és elmentése az adatbázisban egy felhasználó számára"
  )
  @PostMapping("/availability")
  @ResponseStatus(code = HttpStatus.CREATED)
  public GetAvailabilityWithID createAvailability(
    @Valid @RequestBody PostAvailability availability
  ) {
    return service.createAvailability(availability);
  }

  /**
   * <h3>PUT(/availability/{id})</h3>
   * 
   * @param update
   * @param id
   * @return
   */
  @Operation(
    summary = "Update an availability in DB",
    description = "Az adatbázisban eltárolt elérhetőség frissítése új adatokkal"
  )
  @PutMapping("/availability/{id}")
  public GetAvailability updateAvailability(
    @Valid @RequestBody UpdateAvailability update,
    @PathVariable Integer id
  ) {
    return service.updateAvailability(update, id);
  }

  /**
   * <h3>DELETE(/availability/{id})</h3>
   * 
   * @param id
   * @return
   */
  @Operation(
    summary = "Delete an availability from DB",
    description = "Az adatbázisban eltárolt elérhetőség törlése; ez a folyamat nem visszafordítható!"
  )
  @DeleteMapping("/availability/{id}")
  public DeletedAvailability deleteAvailability(@PathVariable Integer id) {
    return service.deleteAvailability(id);
  }
}
