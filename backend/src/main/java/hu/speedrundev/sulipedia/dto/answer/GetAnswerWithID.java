package hu.speedrundev.sulipedia.dto.answer;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GetAnswerWithID extends GetAnswer {

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
}
