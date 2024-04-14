package hu.speedrundev.sulipedia.dto.comment;

import hu.speedrundev.sulipedia.dto.entry.GetEntryWithID;
import hu.speedrundev.sulipedia.dto.user.GetUserWithID;
import hu.speedrundev.sulipedia.model.Comment;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GetCommentWithID extends GetComment {

  public GetCommentWithID(
    String content,
    LocalDateTime createdOn,
    GetUserWithID author,
    GetEntryWithID entry,
    Integer id
  ) {
    super(content, createdOn, author, entry);
    this.id = id;
  }

  public GetCommentWithID(Comment comment) {
    this(
      comment.getContent(),
      comment.getCreatedOn(),
      new GetUserWithID(comment.getAuthor()),
      new GetEntryWithID(comment.getEntry()),
      comment.getId()
    );
  }

  private Integer id;
}
