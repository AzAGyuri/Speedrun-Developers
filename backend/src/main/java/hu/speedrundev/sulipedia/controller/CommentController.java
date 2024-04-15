package hu.speedrundev.sulipedia.controller;

import hu.speedrundev.sulipedia.dto.comment.CommentList;
import hu.speedrundev.sulipedia.dto.comment.GetCommentWithID;
import hu.speedrundev.sulipedia.dto.comment.PostComment;
import hu.speedrundev.sulipedia.service.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

/**
 * <h3>Comment API Controller</h3>
 *
 * {@code @RestController} class for the Comment API's endpoints,
 */
@Tag(
  name = "Comment API",
  description = "A Sulipédia projekt Komment táblához kötött RESTful API, CRUD+ műveletekkel"
)
@RestController
public class CommentController {

  /**
   * <h3>SERVICE</h3>
   *
   * Service for the controller of type {@code CommentService}
   * responsible for serving the controller
   */
  @Autowired
  private CommentService service;

  /**
   * <h3>GET(/comment/{entryId})</h3>
   *
   * Get a list of comments from the DB based on an entry's ID
   *
   * @param entryId the ID of the entry whose comments is to be requested
   *
   * @return a new {@code CommentList} containing the list of comments for
   * the given entry that comments were requested for
   *
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.INTERNAL_SERVER_ERROR} and reason
   * {@code UNEXPECTED_NULL_POINTER_EXCEPTION} if the service
   * for some reason recieves a null value for the entryId input
   *
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.NOT_FOUND} and reason
   * {@code ENTRY_NOT_FOUND} if the id does not correspond
   * to any of the entries in the DB
   *
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.BAD_REQUEST} and reason
   * {@code COMMENTS_REQUESTED_FOR_ENTRY_IS_TEST} if entry that was
   * found for the ID was a test entry
   */
  @Operation(
    summary = "Get comments for a given entry based on ID",
    description = "Az adatbázisban tárolt bejegyzéshez tartozó kommentek lekérése azon bejegyzés azonosítója alapján"
  )
  @GetMapping("/comment/{entryId}")
  public CommentList getCommentsByOptionalEntryId(
    @PathVariable Integer entryId
  ) {
    return service.getCommentsByEntryId(entryId);
  }

  /**
   * <h3>POST(/comment)</h3>
   *
   * Create a new comment for a given entry
   *
   * @param comment a {@code PostComment} {@code RequestBody}
   * Data Transfer Object, containing the content of the comment,
   * and the entry id to which the comment is added
   * @param jwt the JSON Web Token of the user, requesting the creation
   * of the new comment
   *
   * @return a new {@code GetCommentWithID} containing the new
   * saved comment's content, the date of creation, the author user's info,
   * and commented entry's info, as well as the ID the created comment was
   * given by the DB
   *
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.INTERNAL_SERVER_ERROR} and reason
   * {@code UNEXPECTED_NULL_POINTER_EXCEPTION} if the service
   * for some reason recieves a null value on any of the inputs
   *
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.NOT_FOUND} and reason
   * {@code ENTRY_TO_WRITE_COMMENT_FOR_NOT_FOUND} if the ID did not
   * correspond to any entry stored in the DB
   *
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.NOT_FOUND} and reason
   * {@code AUTHOR_USERNAME_NOT_FOUND} if the author's user data could
   * not be properly extracted from the JWT
   */
  @Operation(
    summary = "Create a comment and save it in the database",
    description = "Egy új komment létrehozása az adatbázisban a megadott bejegyzéshez"
  )
  @PostMapping("/comment")
  @ResponseStatus(code = HttpStatus.CREATED)
  public GetCommentWithID createComment(
    @RequestBody PostComment comment,
    @RequestHeader(name = "Authorization") String jwt
  ) {
    return service.createComment(
      comment,
      jwt.substring("Bearer".length()).trim()
    );
  }

  /**
   * <h3>DELETE(/comment/{id})</h3>
   *
   * Delete a comment from the DB by ID
   *
   * @param id the ID of the comment to be deleted
   * @param jwt the JSON Web Token of the user, requesting the deletion
   * of the comment
   *
   * @return a new {@code GetCommentWithID} with the old data of
   * the now deleted comment from DB
   *
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.INTERNAL_SERVER_ERROR} and reason
   * {@code UNEXPECTED_NULL_POINTER_EXCEPTION} if the service
   * for some reason recieves a null value on any of the inputs
   *
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.NOT_FOUND} and reason
   * {@code COMMENT_NOT_FOUND} if the comment to be deleted was not
   * found by the ID input
   *
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.NOT_FOUND} and reason
   * {@code USER_NOT_FOUND} if the user could not be properly extracted
   * from the JWT
   *
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.FORBIDDEN} and reason
   * {@code USER_REQUESTING_COMMENT_DELETION_IS_NOT_AUTHOR} if
   * the user that made the deletion request is not the author of the comment
   */
  @Operation(
    summary = "Delete a comment from DB by ID",
    description = "Az adatbázisban tárolt adott komment törlése ID alapján"
  )
  @DeleteMapping("/comment/{id}")
  public boolean deleteComment(
    @PathVariable Integer id,
    @RequestHeader(name = "Authorization") String jwt
  ) {
    return service.deleteComment(id, jwt.substring("Bearer".length()).trim());
  }
}
