package hu.speedrundev.sulipedia.dto.attachment;

import hu.speedrundev.sulipedia.model.Attachment;
import hu.speedrundev.sulipedia.util.CreateURI;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GetAttachmentWithID extends GetAttachment {

  public GetAttachmentWithID(
    String fileLink,
    String name,
    String type,
    Integer id
  ) {
    super(fileLink, name, type);
    this.id = id;
  }

  public GetAttachmentWithID(Attachment attachment) {
    this(
      CreateURI.attachment(attachment.getId().toString()),
      attachment.getFilename(),
      attachment.getFiletype(),
      attachment.getId()
    );
  }

  private Integer id;
}
