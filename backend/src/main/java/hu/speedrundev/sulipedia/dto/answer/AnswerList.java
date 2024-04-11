package hu.speedrundev.sulipedia.dto.answer;

import hu.speedrundev.sulipedia.model.Answer;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class AnswerList {

  public AnswerList(List<Answer> answers) {
    this.answers = answers.stream().map(AnswerListItem::new).toList();
  }

  private List<AnswerListItem> answers;

  public void appendAnswer(Answer answer) {
    this.answers.add(new AnswerListItem(answer));
  }
}
