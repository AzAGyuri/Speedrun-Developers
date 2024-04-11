package hu.speedrundev.sulipedia.dto.answer;

import hu.speedrundev.sulipedia.model.Answer;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class AnswerListItem extends GetAnswerWithID {

  public AnswerListItem(
    Boolean correct,
    String text,
    Integer linkedQuestionID,
    Integer id
  ) {
    super(correct, text, linkedQuestionID, id);
  }

  public AnswerListItem(Answer answer) {
    this(
      answer.getCorrect(),
      answer.getContent(),
      answer.getLinkedQuestion().getId(),
      answer.getId()
    );
  }
}
