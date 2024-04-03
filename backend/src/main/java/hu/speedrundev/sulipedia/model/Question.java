package hu.speedrundev.sulipedia.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.util.List;

import hu.speedrundev.sulipedia.dto.question.PostQuestion;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Question {

  public Question(PostQuestion question, Entry linkedEntry) {
    this.content = question.getText();
    this.answers = question.getAnswers().stream().map(answer -> new Answer(answer, this)).toList();
    this.linkedEntry = linkedEntry;
  }

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private String content;

  @OneToMany(mappedBy = "linkedQuestion", cascade = CascadeType.ALL)
  private List<Answer> answers;

  @ManyToOne
  @JoinColumn(name = "entry_id")
  private Entry linkedEntry;
}
