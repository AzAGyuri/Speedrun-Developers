package hu.speedrundev.sulipedia.dto.entry;

import hu.speedrundev.sulipedia.dto.attachment.AttachmentList;
import hu.speedrundev.sulipedia.dto.question.QuestionList;
import hu.speedrundev.sulipedia.dto.user.GetUserWithID;
import hu.speedrundev.sulipedia.model.Entry;
import java.time.LocalDateTime;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class EntryListItem extends GetEntryWithID {

  public EntryListItem(
    String title,
    String content,
    SubjectDto category,
    Boolean keep,
    Boolean test,
    Boolean deleted,
    LocalDateTime deletedOn,
    LocalDateTime createdOn,
    GetUserWithID author,
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
      questions,
      id
    );
  }

  public EntryListItem(Entry entry) {
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
      new QuestionList(entry.getQuestions()),
      entry.getId()
    );
  }
}
