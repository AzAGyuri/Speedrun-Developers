package hu.speedrundev.sulipedia.dto.question;

import hu.speedrundev.sulipedia.dto.answer.PostAnswer;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class PostQuestion extends BaseQuestion {

  public PostQuestion(String text, List<PostAnswer> answers) {
    super(text);
    this.answers = answers;
  }

  private List<PostAnswer> answers;
}
