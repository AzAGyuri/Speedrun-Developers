package hu.speedrundev.sulipedia.dto.question;

import hu.speedrundev.sulipedia.dto.answer.AnswerList;
import hu.speedrundev.sulipedia.model.Question;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GetQuestionWithID extends GetQuestion {

  public GetQuestionWithID(
    String text,
    AnswerList answers,
    Integer linkedEntryID,
    Integer id
  ) {
    super(text, answers, linkedEntryID);
    this.id = id;
  }

  public GetQuestionWithID(Question question) {
    this(
      question.getContent(),
      new AnswerList(question.getAnswers()),
      question.getLinkedEntry().getId(),
      question.getId()
    );
  }

  private Integer id;
}
