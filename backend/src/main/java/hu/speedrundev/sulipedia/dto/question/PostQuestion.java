package hu.speedrundev.sulipedia.dto.question;

import hu.speedrundev.sulipedia.dto.answer.PostAnswer;
import java.util.List;

public class PostQuestion extends BaseQuestion {

  public PostQuestion() {}

  public PostQuestion(String text, List<PostAnswer> answers) {
    super(text);
    this.answers = answers;
  }

  private List<PostAnswer> answers;

  public List<PostAnswer> getAnswers() {
    return answers;
  }

  public void setAnswers(List<PostAnswer> answers) {
    this.answers = answers;
  }
}
