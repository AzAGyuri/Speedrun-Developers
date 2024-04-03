package hu.speedrundev.sulipedia.dto.question;

import hu.speedrundev.sulipedia.dto.answer.AnswerList;
import hu.speedrundev.sulipedia.model.Question;

public class QuestionListItem extends GetQuestionWithID {

  public QuestionListItem() {}

  public QuestionListItem(
    String text,
    AnswerList answers,
    Integer linkedEntryID,
    Integer id
  ) {
    super(text, answers, linkedEntryID, id);
  }

  public QuestionListItem(Question question) {
    this(
      question.getContent(),
      new AnswerList(question.getAnswers()),
      question.getLinkedEntry().getId(),
      question.getId()
    );
  }
}
