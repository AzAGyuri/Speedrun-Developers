package hu.speedrundev.sulipedia.service;

import static hu.speedrundev.sulipedia.util.ExceptionUtils.*;

import hu.speedrundev.sulipedia.dto.answer.AnswerList;
import hu.speedrundev.sulipedia.dto.attachment.AttachmentList;
import hu.speedrundev.sulipedia.dto.attachment.GetAttachment;
import hu.speedrundev.sulipedia.dto.entry.EntryList;
import hu.speedrundev.sulipedia.dto.entry.GetEntry;
import hu.speedrundev.sulipedia.dto.entry.GetEntryWithID;
import hu.speedrundev.sulipedia.dto.entry.NulledEntry;
import hu.speedrundev.sulipedia.dto.entry.PostEntry;
import hu.speedrundev.sulipedia.dto.entry.SubjectDto;
import hu.speedrundev.sulipedia.dto.entry.UpdateEntry;
import hu.speedrundev.sulipedia.dto.question.QuestionList;
import hu.speedrundev.sulipedia.model.Attachment;
import hu.speedrundev.sulipedia.model.Entry;
import hu.speedrundev.sulipedia.model.Question;
import hu.speedrundev.sulipedia.model.User;
import hu.speedrundev.sulipedia.repository.AnswerRepository;
import hu.speedrundev.sulipedia.repository.AttachmentRepository;
import hu.speedrundev.sulipedia.repository.EntryRepository;
import hu.speedrundev.sulipedia.repository.QuestionRepository;
import hu.speedrundev.sulipedia.repository.SchoolClassRepository;
import hu.speedrundev.sulipedia.repository.UserRepository;
import hu.speedrundev.sulipedia.util.JwtUtil;
import io.jsonwebtoken.lang.Arrays;
import java.io.IOException;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class EntryService {

  @Autowired
  private EntryRepository entryRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private AttachmentRepository attachmentRepository;

  @Autowired
  private AnswerRepository answerRepository;

  @Autowired
  private QuestionRepository questionRepository;

  @Autowired
  private SchoolClassRepository schoolClassRepository;

  @Autowired
  private JwtUtil jwtUtil;

  public EntryList getEntriesByOptionalCategory(SubjectDto subject) {
    if (subject == null || subject.toString().isBlank()) {
      return new EntryList(entryRepository.findAll());
    }

    return new EntryList(entryRepository.findAllBySubject(subject.toString()));
  }

  public GetEntry getEntry(Integer id) {
    if (id == null) throw nullPointer();
    if (entryRepository.existsById(id)) throw modelNotFound("ENTRY_NOT_FOUND");

    return new GetEntry(entryRepository.getReferenceById(id));
  }

  public GetEntryWithID createEntry(
    PostEntry entry,
    MultipartFile[] files,
    String jwt
  ) {
    if (entry == null || jwt == null) throw nullPointer();

    if (entry.isAnyNull()) throw badRequest("INPUT_PARAMS_ARE_NULL");

    Optional<User> author = userRepository.findByUsername(
      jwtUtil.getSubject(jwt.substring("Bearer".length()).trim())
    );

    if (author.isEmpty()) throw modelNotFound("AUTHOR_NOT_FOUND");

    if (
      schoolClassRepository.existsByClassName(entry.getSchoolClass()) != 1
    ) throw modelNotFound("SCHOOL_CLASS_NOT_FOUND");

    if (entry.getTest() && entry.getQuestions().isEmpty()) throw badRequest(
      "NO_QUESTIONS_SUPPLIED_FOR_TEST_ENTRY"
    );

    Entry savedEntry = entryRepository.save(
      new Entry(
        entry,
        author.get(),
        schoolClassRepository.getClassByClassName(entry.getSchoolClass())
      )
    );

    System.out.println(savedEntry.getId());

    if (files != null) if (files.length != 0) {
      List<MultipartFile> fileList = Arrays.asList(files);

      savedEntry.setAttachments(
        fileList
          .stream()
          .map(file -> {
            try {
              return new Attachment(file, savedEntry);
            } catch (IOException e) {
              e.printStackTrace();
              throw fileIO();
            }
          })
          .map(attachmentRepository::save)
          .toList()
      );
    }

    if (entry.getTest()) {
      savedEntry.setQuestions(
        entry
          .getQuestions()
          .stream()
          .map(question -> new Question(question, savedEntry))
          .map(questionRepository::save)
          .toList()
      );
    }

    return new GetEntryWithID((savedEntry));
  }

  public GetEntry updateEntry(Integer id, UpdateEntry changes) {
    if (id == null || changes == null) throw nullPointer();
    if (changes.isAllNull()) throw badRequest("ENTRY_UPDATE_INPUTS_NULL");
    if (entryRepository.existsById(id)) throw modelNotFound("ENTRY_NOT_FOUND");

    if (changes.getTest() != null && changes.getUpdateQuestions() != null) {
      if (
        changes.getTest() &&
        changes.getUpdateQuestions() &&
        !changes.areQuestionIdsSupplied()
      ) throw badRequest("NO_NEW_QUESTIONS_WERE_SUPPLIED");
    }

    for (Integer qID : changes.getQuestionIds()) {
      if (questionRepository.existsById(qID)) throw modelNotFound(
        "QUESTION_ID_NOT_FOUND"
      );
    }

    Entry oldEntry = entryRepository.getReferenceById(id);

    List<Question> questions = changes
      .getQuestionIds()
      .stream()
      .map(questionRepository::getReferenceById)
      .toList();

    if (oldEntry.isAllUnchanged(changes, questions)) {
      throw badRequest("NEW_DATA_IDENTICAL_TO_OLD");
    }

    Entry updatingEntry = entryRepository.getReferenceById(id);

    if (changes.getKeep() != null) {
      updatingEntry.setKeep(changes.getKeep());
    }

    if (changes.getContent() != null) {
      updatingEntry.setContent(changes.getContent());
    }

    if (changes.getTitle() != null) {
      updatingEntry.setTitle(changes.getTitle());
    }

    boolean testPreviousState = updatingEntry.getTest();
    if (changes.getTest() != null) {
      updatingEntry.setTest(changes.getTest());
    }

    if (!testPreviousState) {
      updatingEntry.setQuestions(questions);
    } else {
      for (Integer qID : changes.getQuestionIds()) {
        questionRepository.deleteById(qID);
      }
      updatingEntry.getQuestions().clear();
    }

    if (oldEntry.isAllUnchanged(updatingEntry)) throw badRequest(
      "UPDATED_ENTITY_DATA_MATCHED_OLD"
    );

    return new GetEntry(entryRepository.save(updatingEntry));
  }

  public EntryList getEntriesThatAreKept() {
    return new EntryList(entryRepository.findAllKept());
  }

  public EntryList getEntriesNotKept() {
    return new EntryList(entryRepository.findAllNotKept());
  }

  public GetEntry logicalDeleteEntry(Integer id) {
    if (id == null) throw nullPointer();
    if (entryRepository.existsById(id)) throw modelNotFound("ENTRY_NOT_FOUND");

    Entry softDeletedEntry = entryRepository.getReferenceById(id);
    softDeletedEntry.setDeleted(true);
    softDeletedEntry.setDeletedOn(Date.from(Instant.now()));

    return new GetEntry(entryRepository.save(softDeletedEntry));
  }

  public NulledEntry nullDeleteEntry(Integer id) {
    if (id == null) throw nullPointer();
    if (entryRepository.existsById(id)) throw modelNotFound("ENTRY_NOT_FOUND");

    Entry nulledEntry = entryRepository.getReferenceById(id);
    Entry oldData = entryRepository.getReferenceById(id);

    nulledEntry.nulledDelete();

    return new NulledEntry(
      new GetEntry(oldData),
      new GetEntry(entryRepository.save(nulledEntry))
    );
  }

  public AnswerList listAllAnswers() {
    return new AnswerList(answerRepository.findAll());
  }

  public boolean deleteAnswer(Integer id) {
    if (id == null) throw nullPointer();
    if (!answerRepository.existsById(id)) throw modelNotFound(
      "ANSWER_NOT_FOUND"
    );

    answerRepository.deleteById(id);

    return true;
  }

  public QuestionList listAllQuestions() {
    return new QuestionList(questionRepository.findAll());
  }

  public boolean deleteQuestion(Integer id) {
    if (id == null) throw nullPointer();
    if (!questionRepository.existsById(id)) throw modelNotFound(
      "QUESTION_NOT_FOUND"
    );

    questionRepository.deleteById(id);

    return true;
  }

  public AttachmentList listAllAttachmentsByOptionalEntry(Integer entryId) {
    if (entryId != null) return new AttachmentList(
      attachmentRepository.findAllByEntryId(entryId)
    );
    return new AttachmentList(attachmentRepository.findAll());
  }

  public ResponseEntity<byte[]> getAttachmentFile(Integer id) {
    if (id == null) throw nullPointer();

    Attachment attachment = attachmentRepository.getReferenceById(id);

    return ResponseEntity
      .ok()
      .header(
        HttpHeaders.CONTENT_DISPOSITION,
        "attachment; filename=\"" + attachment.getId() + "\""
      )
      .body(attachment.getFileData());
  }

  public boolean deleteAttachment(Integer id) {
    if (id == null) throw nullPointer();
    if (!attachmentRepository.existsById(id)) throw modelNotFound(
      "ATTACHMENT_NOT_FOUND"
    );

    attachmentRepository.deleteById(id);

    return true;
  }

  public GetAttachment updateAttachment(Integer id, MultipartFile file) {
    if (id == null || file == null) throw nullPointer();

    if (!attachmentRepository.existsById(id)) throw modelNotFound(
      "ATTACHMENT_NOT_FOUND"
    );

    Attachment attachment = attachmentRepository.getReferenceById(id);

    if (attachment.isNotChanged(file)) throw badRequest(
      "NEW_ATTACHMENT_IDENTICAL_TO_OLD"
    );

    Attachment updated = attachment.update(file);

    if (updated == null) throw nullPointer();

    return new GetAttachment(attachmentRepository.save(updated));
  }
}
