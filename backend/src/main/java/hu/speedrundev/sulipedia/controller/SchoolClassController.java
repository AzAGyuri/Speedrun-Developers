package hu.speedrundev.sulipedia.controller;

import hu.speedrundev.sulipedia.dto.schoolclass.GetSchoolClassWithEverything;
import hu.speedrundev.sulipedia.dto.schoolclass.GetSchoolClassWithID;
import hu.speedrundev.sulipedia.dto.schoolclass.PostSchoolClass;
import hu.speedrundev.sulipedia.dto.schoolclass.SchoolClassList;
import hu.speedrundev.sulipedia.service.SchoolClassService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * <h3>School Class API Controller</h3>
 *
 * {@code @RestController} class for the School Class API's endpoints,
 */
@Tag(
  name = "School Class API",
  description = "A Sulipédia projekt Iskolai Osztály táblához kötött RESTful API, CRUD+ műveletekkel"
)
@RestController
public class SchoolClassController {

  @Autowired
  private SchoolClassService service;

  @Operation(
    summary = "List all school classes from DB by optional user",
    description = "Az adatbázisban eltárolt összes iskolai osztály kilistázása, opcionális szűréssel felhasználó id alapján"
  )
  @GetMapping("/class/{userId}")
  public SchoolClassList listSchoolClasses(
    @PathVariable(required = false) Integer userId
  ) {
    return service.listSchoolClasses(userId);
  }

  @Operation(
    summary = "Get one school class from DB with all data",
    description = "Az adatbázisban eltárolt egy iskolai osztály lekérdezése minden adatával"
  )
  @GetMapping("/class/{id}")
  public GetSchoolClassWithEverything getSchoolClass(@PathVariable Integer id) {
    return service.getSchoolClass(id);
  }

  @Operation(
    summary = "Create one school class in DB",
    description = "Az adatbázisban létrehozni és eltárolni egy új iskolai osztályt"
  )
  @PostMapping("/class")
  public GetSchoolClassWithID createSchoolClass(
    @RequestBody PostSchoolClass schoolClass
  ) {
    return service.createSchoolClass(schoolClass);
  }
}
