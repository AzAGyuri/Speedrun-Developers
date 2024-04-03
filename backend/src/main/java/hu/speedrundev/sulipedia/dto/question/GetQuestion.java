package hu.speedrundev.sulipedia.dto.question;

import hu.speedrundev.sulipedia.dto.answer.AnswerList;

public class GetQuestion extends BaseQuestion {

  public GetQuestion(String text, AnswerList answers, Integer linkedEntryID) {
    super(text);
    this.answers = answers;
    this.linkedEntryID = linkedEntryID;
  }

  public GetQuestion() {}

  private AnswerList answers;

  private Integer linkedEntryID;

  public AnswerList getAnswers() {
    return answers;
  }

  public void setAnswers(AnswerList answers) {
    this.answers = answers;
  }

  public Integer getLinkedEntryID() {
    return linkedEntryID;
  }

  public void setLinkedEntryID(Integer linkedEntryID) {
    this.linkedEntryID = linkedEntryID;
  }
}
