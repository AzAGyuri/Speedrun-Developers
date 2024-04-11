package hu.speedrundev.sulipedia.dto.entry;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
@NoArgsConstructor
public class UpdateEntry extends BaseEntry {

  public UpdateEntry(
    String title,
    String content,
    Boolean keep,
    Boolean test,
    Boolean updateQuestions,
    List<Integer> questionIds
  ) {
    super(title, content, keep, test);
    this.updateQuestions = updateQuestions;
    this.questionIds = questionIds;
  }

  private Boolean updateQuestions;

  private List<Integer> questionIds;

  public boolean areQuestionIdsSupplied() {
    if (questionIds == null) return false;
    return questionIds.isEmpty();
  }

  @JsonIgnore
  public boolean isAllNull() {
    return (
      getKeep() == null &&
      getContent() == null &&
      getTitle() == null &&
      getTest() == null &&
      questionIds == null
    );
  }
}
