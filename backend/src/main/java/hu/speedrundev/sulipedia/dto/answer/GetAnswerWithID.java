package hu.speedrundev.sulipedia.dto.answer;

public class GetAnswerWithID extends GetAnswer {

  public GetAnswerWithID() {}

  public GetAnswerWithID(
    Boolean correct,
    String text,
    Integer linkedQuestionID,
    Integer id
  ) {
    super(correct, text, linkedQuestionID);
    this.id = id;
  }

  private Integer id;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }
}
