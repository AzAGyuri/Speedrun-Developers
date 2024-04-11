package hu.speedrundev.sulipedia.dto.question;

import hu.speedrundev.sulipedia.model.Question;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class QuestionList {

  public QuestionList(List<Question> questions) {
    this.questions =
      questions
        .stream()
        .map(QuestionListItem::new)
        .toList();
  }

  private List<QuestionListItem> questions;
}
