package hu.speedrundev.sulipedia.dto.attachment;

import hu.speedrundev.sulipedia.model.Attachment;
import hu.speedrundev.sulipedia.util.MiscUtils;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class GetAttachment extends BaseAttachment {

  public GetAttachment(String fileLink, String name, String type) {
    super(fileLink, name, type);
  }

  public GetAttachment(Attachment attachment) {
    this(
      MiscUtils.attachment(attachment.getId().toString()),
      attachment.getFilename(),
      attachment.getFiletype()
    );
  }
}
