package hu.speedrundev.sulipedia.dto.comment;

import hu.speedrundev.sulipedia.dto.entry.GetEntryWithID;
import hu.speedrundev.sulipedia.dto.user.GetUserWithID;
import hu.speedrundev.sulipedia.model.Comment;
import java.time.LocalDateTime;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class CommentListItem extends GetCommentWithID {

  public CommentListItem(
    String content,
    LocalDateTime createdOn,
    GetUserWithID author,
    GetEntryWithID entry,
    Integer id
  ) {
    super(content, createdOn, author, entry, id);
  }

  public CommentListItem(Comment comment) {
    this(
      comment.getContent(),
      comment.getCreatedOn(),
      new GetUserWithID(comment.getAuthor()),
      new GetEntryWithID(comment.getEntry()),
      comment.getId()
    );
  }
}
