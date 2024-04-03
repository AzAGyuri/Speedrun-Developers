package hu.speedrundev.sulipedia.model;

import hu.speedrundev.sulipedia.dto.answer.PostAnswer;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Answer {

  public Answer(PostAnswer answer, Question linkedQuestion) {
    this.correct = answer.getCorrect();
    this.linkedQuestion = linkedQuestion;
    this.content = answer.getText();
  }

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private Boolean correct;

  private String content;

  @ManyToOne
  @JoinColumn(name = "question_id")
  private Question linkedQuestion;
}
