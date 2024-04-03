package hu.speedrundev.sulipedia.dto.comment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostComment extends BaseComment {

  public PostComment(String content, Integer entryId) {
    super(content);
    this.entryId = entryId;
  }

  private Integer entryId;
}
