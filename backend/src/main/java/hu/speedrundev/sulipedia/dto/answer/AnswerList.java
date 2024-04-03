package hu.speedrundev.sulipedia.dto.answer;

import hu.speedrundev.sulipedia.model.Answer;
import java.util.List;

public class AnswerList {

  public AnswerList() {}

  public AnswerList(List<Answer> answers) {
    this.answers = answers.stream().map(AnswerListItem::new).toList();
  }

  private List<AnswerListItem> answers;

  public List<AnswerListItem> getAnswers() {
    return answers;
  }

  public void setAnswers(List<AnswerListItem> answers) {
    this.answers = answers;
  }

  public void appendAnswer(Answer answer) {
    this.answers.add(new AnswerListItem(answer));
  }
}
