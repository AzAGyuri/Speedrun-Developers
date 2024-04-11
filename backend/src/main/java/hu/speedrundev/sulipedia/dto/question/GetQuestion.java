package hu.speedrundev.sulipedia.dto.question;

import hu.speedrundev.sulipedia.dto.answer.AnswerList;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GetQuestion extends BaseQuestion {

  public GetQuestion(String text, AnswerList answers, Integer linkedEntryID) {
    super(text);
    this.answers = answers;
    this.linkedEntryID = linkedEntryID;
  }

  private AnswerList answers;

  private Integer linkedEntryID;
}
