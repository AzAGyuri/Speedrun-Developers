package hu.speedrundev.sulipedia.dto.answer;

import hu.speedrundev.sulipedia.model.Answer;

public class AnswerListItem extends GetAnswerWithID {

  public AnswerListItem() {}

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
