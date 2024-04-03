package hu.speedrundev.sulipedia.dto.question;

import hu.speedrundev.sulipedia.model.Question;
import java.util.List;

public class QuestionList {

  public QuestionList() {}

  public QuestionList(List<Question> questions) {
    this.questions =
      questions
        .stream()
        .map(QuestionListItem::new)
        .toList();
  }

  private List<QuestionListItem> questions;

  public List<QuestionListItem> getQuestions() {
    return questions;
  }

  public void setQuestions(List<QuestionListItem> questions) {
    this.questions = questions;
  }
}
