package hu.speedrundev.sulipedia.controller;

import hu.speedrundev.sulipedia.dto.entry.GetEntryWithID;
import hu.speedrundev.sulipedia.service.AdminService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@Tag(
  name = "Admin API",
  description = "A Sulipédia projekt Adminisztrátor által használható API végpontok"
)
@RestController
public class AdminController {

  @Autowired
  private AdminService service;

  /**
   * <h3>DELETE(/admin/entry/{id})</h3>
   *
   * Delete an entry from the DB based on its ID - equivalent to the
   * EntryService.logicalDeleteEntry function and its API endpoint;
   * this operation is performed by a user who has ROLE_ADMIN rights
   *
   * @param id the ID of the entry to be deleted
   *
   * @return a new {@code GetEntryWithID} with all old data of the now
   * logically deleted entry - this includes the generated data indicating
   * the logical deleteion of the entry; this entry will no longer appear
   * in lister type endpoints
   *
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.INTERNAL_SERVER_ERROR} and reason
   * {@code UNEXPECTED_NULL_POINTER_EXCEPTION} if the service
   * for some reason recieves a null value on its ID input
   *
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.NOT_FOUND} and reason
   * {@code ENTRY_NOT_FOUND} if the ID of the entry did not correspond
   * to any stored in the DB
   */
  @Operation(
    summary = "Admin deletes an entry from the DB by ID",
    description = "Adminisztrátor által indított törlés egy bejegyzésre ID-ja alapján"
  )
  @DeleteMapping("/admin/entry/{id}")
  public GetEntryWithID adminDeleteEntry(@PathVariable Integer id) {
    return service.adminDeleteEntry(id);
  }

  /**
   * <h3>DELETE(/admin/comment/{id})</h3>
   *
   * Delete an entry from the DB based on its ID - equivalent to the
   * CommentService.deleteComment function and its API endpoint;
   * this operation is performed by a user who has ROLE_ADMIN rights
   *
   * @param id the ID of the comment to be deleted
   *
   * @return a true value, indicating successful deletion
   *
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.INTERNAL_SERVER_ERROR} and reason
   * {@code UNEXPECTED_NULL_POINTER_EXCEPTION} if the service
   * for some reason recieves a null value on its ID input
   *
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.NOT_FOUND} and reason
   * {@code COMMENT_NOT_FOUND} if the ID of the comment did not correspond
   * to any stored in the DB
   */
  @Operation(
    summary = "Admin deletes a comment from the DB by ID",
    description = "Adminisztrátor által indított törlés egy kommentre ID-ja alapján"
  )
  @DeleteMapping("/admin/comment/{id}")
  public boolean adminDeleteComment(@PathVariable Integer id) {
    return service.adminDeleteComment(id);
  }
}
