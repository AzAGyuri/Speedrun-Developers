package hu.speedrundev.sulipedia.model;

import hu.speedrundev.sulipedia.dto.entry.PostEntry;
import hu.speedrundev.sulipedia.dto.entry.UpdateEntry;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "entries")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Entry {

  public Entry(
    PostEntry entry,
    User author,
    SchoolClass linkedClass
  ) {
    this.author = author;
    this.content = entry.getContent();
    this.deleted = false;
    this.deletedOn = null;
    this.keep = entry.getKeep();
    this.linkedClass = linkedClass;
    this.subject = Subjects.valueOf(entry.getSubject().toString());
    this.test = entry.getTest();
    this.title = entry.getTitle();
  }

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private String title;

  private String content;

  @Column(name = "kept", nullable = false)
  private Boolean keep;

  private Boolean test;

  private Boolean deleted;

  private Date deletedOn;

  @Enumerated(EnumType.STRING)
  @Column(name = "subject_name", nullable = false)
  private Subjects subject;

  @ManyToOne
  @JoinColumn(name = "author_id")
  private User author;

  @ManyToOne
  @JoinColumn(name = "class_id")
  private SchoolClass linkedClass;

  @OneToMany(mappedBy = "linkedEntry")
  private List<Attachment> attachments;

  @OneToMany(mappedBy = "linkedEntry")
  private List<Question> questions;

  @OneToMany(mappedBy = "entry")
  private List<Comment> comments;

  public void nulledDelete() {
    attachments = null;
    author = null;
    subject = null;
    content = null;
    deleted = true;
    deletedOn = Date.from(Instant.now());
    keep = null;
    questions = null;
    test = null;
    title = null;
  }

  public boolean isAllUnchanged(
    UpdateEntry changes,
    List<Question> changedQuestions
  ) {
    return (
      changes.getKeep() == this.keep &&
      changes.getContent().equals(this.content) &&
      changes.getTitle().equals(this.title) &&
      changes.getTest() == this.test &&
      compareQuestionLists(new ArrayList<>(this.questions), changedQuestions)
    );
  }

  public boolean isAllUnchanged(Entry updatingEntry) {
    return (
      updatingEntry.keep == this.keep &&
      updatingEntry.content.equals(this.content) &&
      updatingEntry.title.equals(this.title) &&
      updatingEntry.test == this.test &&
      compareQuestionLists(new ArrayList<>(this.questions), updatingEntry.questions)
    );
  }

  private boolean compareQuestionLists(
    ArrayList<Question> thisQuestionsInner,
    List<Question> changedQuestions
  ) {
    for (Question question : changedQuestions) {
      if (!thisQuestionsInner.remove(question)) {
        return false;
      }
    }
    return thisQuestionsInner.isEmpty();
  }
}
