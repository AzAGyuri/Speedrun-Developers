package hu.speedrundev.sulipedia.dto.attachment;

import hu.speedrundev.sulipedia.model.Attachment;
import java.util.List;

public class AttachmentList {

  public AttachmentList() {}

  public AttachmentList(List<Attachment> attachments) {
    this.attachments =
      attachments.stream().map(AttachmentListItem::new).toList();
  }

  private List<AttachmentListItem> attachments;

  public List<AttachmentListItem> getAttachments() {
    return attachments;
  }

  public void setAttachments(List<AttachmentListItem> attachments) {
    this.attachments = attachments;
  }
}
