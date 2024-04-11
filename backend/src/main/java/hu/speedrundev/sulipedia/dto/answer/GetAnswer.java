package hu.speedrundev.sulipedia.dto.answer;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GetAnswer extends BaseAnswer {

  public GetAnswer(Boolean correct, String text, Integer linkedQuestionID) {
    super(correct, text);
    this.linkedQuestionID = linkedQuestionID;
  }

  private Integer linkedQuestionID;
}
