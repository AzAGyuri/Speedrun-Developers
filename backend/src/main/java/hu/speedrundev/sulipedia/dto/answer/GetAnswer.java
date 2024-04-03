package hu.speedrundev.sulipedia.dto.answer;

public class GetAnswer extends BaseAnswer {

  public GetAnswer(Boolean correct, String text, Integer linkedQuestionID) {
    super(correct, text);
    this.linkedQuestionID = linkedQuestionID;
  }

  public GetAnswer() {}

  private Integer linkedQuestionID;

  public Integer getLinkedQuestionID() {
    return linkedQuestionID;
  }

  public void setLinkedQuestionID(Integer linkedQuestionID) {
    this.linkedQuestionID = linkedQuestionID;
  }
}
