package hu.speedrundev.sulipedia.dto.entry;

import hu.speedrundev.sulipedia.dto.question.PostQuestion;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostEntry extends BaseEntry {

  public PostEntry(
    String title,
    String content,
    Boolean keep,
    Boolean test,
    String authorName,
    String schoolClass,
    List<PostQuestion> questions,
    SubjectDto subject
  ) {
    super(title, content, keep, test);
    this.authorName = authorName;
    this.schoolClass = schoolClass;
    this.questions = questions;
    this.subject = subject;
  }

  private String authorName;

  private String schoolClass;

  private List<PostQuestion> questions;

  private SubjectDto subject;
}
