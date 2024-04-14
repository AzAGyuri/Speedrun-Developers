package hu.speedrundev.sulipedia.dto.entry;

import hu.speedrundev.sulipedia.dto.attachment.AttachmentList;
import hu.speedrundev.sulipedia.dto.question.QuestionList;
import hu.speedrundev.sulipedia.dto.user.GetUserWithID;
import hu.speedrundev.sulipedia.model.Entry;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GetEntry extends BaseEntry {

  public GetEntry(
    String title,
    String content,
    SubjectDto subject,
    Boolean keep,
    Boolean test,
    Boolean deleted,
    LocalDateTime deletedOn,
    LocalDateTime createdOn,
    GetUserWithID author,
    AttachmentList attachments,
    QuestionList questions
  ) {
    super(title, content, keep, test);
    this.deleted = deleted;
    this.deletedOn = deletedOn;
    this.createdOn = createdOn;
    this.author = author;
    this.attachments = attachments;
    this.questions = questions;
    this.subject = subject;
  }

  public GetEntry(Entry entry) {
    this(
      entry.getTitle(),
      entry.getContent(),
      SubjectDto.valueOf(entry.getSubject().toString()),
      entry.getKeep(),
      entry.getTest(),
      entry.getDeleted(),
      entry.getDeletedOn(),
      entry.getCreatedOn(),
      new GetUserWithID(entry.getAuthor()),
      new AttachmentList(entry.getAttachments()),
      new QuestionList(entry.getQuestions())
    );
  }

  private Boolean deleted;

  private LocalDateTime deletedOn, createdOn;

  private GetUserWithID author;

  private AttachmentList attachments;

  private QuestionList questions;

  private SubjectDto subject;
}
