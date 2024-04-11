package hu.speedrundev.sulipedia.dto.answer;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class PostAnswer extends BaseAnswer {

  public PostAnswer(Boolean correct, String text) {
    super(correct, text);
  }
}
