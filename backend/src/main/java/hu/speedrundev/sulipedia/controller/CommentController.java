package hu.speedrundev.sulipedia.controller;

import hu.speedrundev.sulipedia.dto.comment.CommentList;
import hu.speedrundev.sulipedia.dto.comment.GetCommentWithID;
import hu.speedrundev.sulipedia.dto.comment.PostComment;
import hu.speedrundev.sulipedia.service.CommentService;
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

  @GetMapping("/comment")
  public CommentList getCommentsByOptionalEntryAndAuthorId(
    @RequestParam(name = "entryId", required = false) Integer entryId,
    @RequestParam(name = "authorId", required = false) Integer authorId
  ) {
    return service.getCommentsByOptionalEntryAndAuthorId(entryId, authorId);
  }

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

  @DeleteMapping("/comment/{id}")
  public boolean deleteComment(@PathVariable Integer id) {
    return service.deleteComment(id);
  }
}
