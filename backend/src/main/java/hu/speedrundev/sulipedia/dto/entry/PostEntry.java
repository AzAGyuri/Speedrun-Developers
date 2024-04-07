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
    String schoolClass,
    List<PostQuestion> questions,
    SubjectDto subject
  ) {
    super(title, content, keep, test);
    this.schoolClass = schoolClass;
    this.questions = questions;
    this.subject = subject;
  }

  private String schoolClass;

  private List<PostQuestion> questions;

  private SubjectDto subject;

  public boolean isAnyNull() {
    return (
      getTitle() == null ||
      getContent() == null ||
      getKeep() == null ||
      getTest() == null ||
      schoolClass == null ||
      subject == null
    );
  }
}
