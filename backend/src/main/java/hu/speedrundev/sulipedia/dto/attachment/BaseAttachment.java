package hu.speedrundev.sulipedia.dto.attachment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BaseAttachment {

  private String fileLink;

  private String name;

  private String type;
}
