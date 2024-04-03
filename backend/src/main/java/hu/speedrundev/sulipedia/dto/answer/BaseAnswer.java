package hu.speedrundev.sulipedia.dto.answer;

public class BaseAnswer {

  public BaseAnswer() {}

  public BaseAnswer(Boolean correct, String text) {
    this.correct = correct;
    this.text = text;
  }

  private Boolean correct;

  private String text;

  public Boolean getCorrect() {
    return correct;
  }

  public void setCorrect(Boolean correct) {
    this.correct = correct;
  }

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }
}
