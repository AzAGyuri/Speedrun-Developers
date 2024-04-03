package hu.speedrundev.sulipedia.dto.entry;

import hu.speedrundev.sulipedia.dto.attachment.AttachmentList;
import hu.speedrundev.sulipedia.dto.question.QuestionList;
import hu.speedrundev.sulipedia.dto.user.GetUser;
import hu.speedrundev.sulipedia.model.Entry;
import java.util.Date;

public class EntryListItem extends GetEntryWithID {

  public EntryListItem() {}

  public EntryListItem(
    String title,
    String content,
    SubjectDto category,
    Boolean keep,
    Boolean test,
    Boolean deleted,
    Date deletedOn,
    GetUser author,
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
      new GetUser(entry.getAuthor()),
      new AttachmentList(entry.getAttachments()),
      new QuestionList(entry.getQuestions()),
      entry.getId()
    );
  }
}
