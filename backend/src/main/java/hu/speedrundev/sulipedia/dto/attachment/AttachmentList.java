package hu.speedrundev.sulipedia.dto.attachment;

import hu.speedrundev.sulipedia.model.Attachment;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class AttachmentList {

  public AttachmentList(List<Attachment> attachments) {
    this.attachments =
      attachments.stream().map(AttachmentListItem::new).toList();
  }

  private List<AttachmentListItem> attachments;
}
