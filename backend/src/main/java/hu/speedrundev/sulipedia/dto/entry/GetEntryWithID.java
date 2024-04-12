package hu.speedrundev.sulipedia.dto.entry;

import hu.speedrundev.sulipedia.dto.attachment.AttachmentList;
import hu.speedrundev.sulipedia.dto.question.QuestionList;
import hu.speedrundev.sulipedia.model.Entry;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GetEntryWithID extends GetEntry {

  public GetEntryWithID(
    String title,
    String content,
    SubjectDto category,
    Boolean keep,
    Boolean test,
    Boolean deleted,
    LocalDateTime deletedOn,
    LocalDateTime createdOn,
    String author,
    AttachmentList attachments,
    QuestionList questions,
    Integer id
  ) {
    super(
      title,
      content,
      category,
      keep,
      test,
      deleted,
      deletedOn,
      createdOn,
      author,
      attachments,
      questions
    );
    this.id = id;
  }

  public GetEntryWithID(Entry entry) {
    this(
      entry.getTitle(),
      entry.getContent(),
      SubjectDto.valueOf(entry.getSubject().toString()),
      entry.getKeep(),
      entry.getTest(),
      entry.getDeleted(),
      entry.getDeletedOn(),
      entry.getCreatedOn(),
      (entry.getAuthor().getUsername()),
      entry.getAttachments() == null
        ? new AttachmentList()
        : new AttachmentList(entry.getAttachments()),
      entry.getQuestions() == null
        ? new QuestionList()
        : new QuestionList(entry.getQuestions()),
      entry.getId()
    );
  }

  private Integer id;
}
