package hu.speedrundev.sulipedia.dto.question;

public class BaseQuestion {

  public BaseQuestion() {}

  public BaseQuestion(String text) {
    this.text = text;
  }

  private String text;

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }
}
