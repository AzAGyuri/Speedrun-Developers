package hu.speedrundev.sulipedia.dto.attachment;

import hu.speedrundev.sulipedia.model.Attachment;
import hu.speedrundev.sulipedia.util.MiscUtils;
import hu.speedrundev.sulipedia.util.ExceptionUtils;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AttachmentListItem extends GetAttachmentWithID {

  public AttachmentListItem(
    String fileLink,
    String name,
    String type,
    Integer id,
    Integer entryId
  ) {
    super(fileLink, name, type, id);
    this.entryId = entryId;
  }

  public AttachmentListItem(Attachment attachment) {
    String id;

    if (
      (id = attachment.getId().toString()) == null
    ) throw ExceptionUtils.nullPointer();

    this.setFileLink(MiscUtils.attachment(id));
    this.setName(attachment.getFilename());
    this.setType(attachment.getFiletype());
    this.setId(attachment.getId());
    this.entryId = attachment.getLinkedEntry().getId();
  }

  private Integer entryId;
}
