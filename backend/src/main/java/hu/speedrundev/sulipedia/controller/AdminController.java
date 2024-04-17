package hu.speedrundev.sulipedia.controller;

import hu.speedrundev.sulipedia.dto.entry.GetEntryWithID;
import hu.speedrundev.sulipedia.service.AdminService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@Tag(
  name = "Admin API",
  description = "A Sulipédia projekt Adminisztrátor által használható API végpontok"
)
@RestController
public class AdminController {

  @Autowired
  private AdminService service;

  @Operation(
    summary = "Admin deletes an entry from the DB by ID",
    description = "Adminisztrátor által indított törlés egy bejegyzésre ID-ja alapján"
  )
  @DeleteMapping("/admin/entry/{id}")
  public GetEntryWithID adminDeleteEntry(@PathVariable Integer id) {
    return service.adminDeleteEntry(id);
  }

  @Operation(
    summary = "Admin deletes a comment from the DB by ID",
    description = "Adminisztrátor által indított törlés egy kommentre ID-ja alapján"
  )
  @DeleteMapping("/admin/comment/{id}")
  public boolean adminDeleteComment(@PathVariable Integer id) {
    return service.adminDeleteComment(id);
  }
}
