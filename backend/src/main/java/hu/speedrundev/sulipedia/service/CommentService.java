package hu.speedrundev.sulipedia.service;

import static hu.speedrundev.sulipedia.util.ExceptionUtils.badRequest;
import static hu.speedrundev.sulipedia.util.ExceptionUtils.modelNotFound;
import static hu.speedrundev.sulipedia.util.ExceptionUtils.nullPointer;

import hu.speedrundev.sulipedia.dto.comment.CommentList;
import hu.speedrundev.sulipedia.dto.comment.GetCommentWithID;
import hu.speedrundev.sulipedia.dto.comment.PostComment;
import hu.speedrundev.sulipedia.model.Comment;
import hu.speedrundev.sulipedia.repository.CommentRepository;
import hu.speedrundev.sulipedia.repository.EntryRepository;
import hu.speedrundev.sulipedia.repository.UserRepository;
import hu.speedrundev.sulipedia.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {

  @Autowired
  private CommentRepository commentRepository;

  @Autowired
  private EntryRepository entryRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private JwtUtil jwtUtil;

  public CommentList getCommentsByOptionalEntryId(Integer entryId) {
    if (entryRepository.getReferenceById(entryId).getTest()) throw badRequest(
      "COMMENTS_REQUESTED_FOR_ENTRY_IS_TEST"
    );

    if (entryId == null) return new CommentList(
      commentRepository
        .findAll()
        .stream()
        .filter(comment -> comment.getAuthor().getDeleted() == null)
        .toList()
    );
    
    return new CommentList(
      commentRepository
        .findAllByEntryId(entryId)
        .stream()
        .filter(comment -> comment.getAuthor().getDeleted() == null)
        .toList()
    );
  }

  public GetCommentWithID createComment(PostComment comment, String token) {
    if (comment == null || token == null) throw nullPointer();

    Integer entryId = comment.getEntryId();
    String username = jwtUtil.getSubject(token);

    if (entryId == null || username == null) throw nullPointer();

    if (!entryRepository.existsById(entryId)) throw modelNotFound(
      "ENTRY_TO_WRITE_COMMENT_FOR_NOT_FOUND"
    );

    if (!userRepository.existsUserByUsername(username)) throw modelNotFound(
      "AUTHOR_USERNAME_NOT_FOUND"
    );

    return new GetCommentWithID(
      commentRepository.save(
        new Comment(
          comment.getContent(),
          entryRepository.getReferenceById(entryId),
          userRepository.getByUsername(username)
        )
      )
    );
  }

  public boolean deleteComment(Integer id) {
    if (id == null) throw nullPointer();
    if (!commentRepository.existsById(id)) throw modelNotFound(
      "COMMENT_NOT_FOUND"
    );

    commentRepository.deleteById(id);

    return true;
  }
}
