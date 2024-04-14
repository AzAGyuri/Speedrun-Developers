package hu.speedrundev.sulipedia.controller;

import hu.speedrundev.sulipedia.dto.comment.CommentList;
import hu.speedrundev.sulipedia.dto.comment.GetCommentWithID;
import hu.speedrundev.sulipedia.dto.comment.PostComment;
import hu.speedrundev.sulipedia.service.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

  @Autowired
  private CommentService service;

  @Operation(
    summary = "Get comments for a given entry based on ID",
    description = "Az adatbázisban tárolt bejegyzéshez tartozó kommentek lekérése azon bejegyzés azonosítója alapján"
  )
  @GetMapping("/comment")
  public CommentList getCommentsByOptionalEntryId(
    @RequestParam(name = "entryId", required = false) Integer entryId
  ) {
    return service.getCommentsByOptionalEntryId(entryId);
  }

  @Operation(
    summary = "Create a comment and save it in the database",
    description = "Egy új komment létrehozása az adatbázisban a megadott bejegyzéshez"
  )
  @PostMapping("/comment")
  public GetCommentWithID createComment(
    @RequestBody PostComment comment,
    @RequestHeader(name = "Authorization") String token
  ) {
    return service.createComment(
      comment,
      token.substring("Bearer".length()).trim()
    );
  }

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
