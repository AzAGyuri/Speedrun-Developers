package hu.speedrundev.sulipedia.dto.comment;

import hu.speedrundev.sulipedia.dto.entry.GetEntryWithID;
import hu.speedrundev.sulipedia.dto.user.GetUserWithID;
import java.util.Date;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GetComment extends BaseComment {

  public GetComment(
    String content,
    Date createdOn,
    GetUserWithID author,
    GetEntryWithID entry
  ) {
    super(content);
    this.createdOn = createdOn;
    this.author = author;
    this.entry = entry;
  }

  private Date createdOn;

  private GetUserWithID author;

  private GetEntryWithID entry;
}
