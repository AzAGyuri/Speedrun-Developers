package hu.speedrundev.sulipedia.service;

import static hu.speedrundev.sulipedia.util.ExceptionUtils.modelNotFound;
import static hu.speedrundev.sulipedia.util.ExceptionUtils.nullPointer;

import hu.speedrundev.sulipedia.dto.entry.GetEntryWithID;
import hu.speedrundev.sulipedia.model.Entry;
import hu.speedrundev.sulipedia.repository.CommentRepository;
import hu.speedrundev.sulipedia.repository.EntryRepository;
import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

  @Autowired
  private EntryRepository entryRepository;

  @Autowired
  private CommentRepository commentRepository;

  public GetEntryWithID adminDeleteEntry(Integer id) {
    if (id == null) throw nullPointer();

    if (!entryRepository.existsById(id)) throw modelNotFound("ENTRY_NOT_FOUND");

    Entry softDeletedEntry = entryRepository.getReferenceById(id);
    softDeletedEntry.setDeleted(true);
    softDeletedEntry.setDeletedOn(LocalDateTime.now());

    return new GetEntryWithID(entryRepository.save(softDeletedEntry));
  }

  public boolean adminDeleteComment(Integer id) {
    if (id == null) throw nullPointer();
    if (!commentRepository.existsById(id)) throw modelNotFound(
      "COMMENT_NOT_FOUND"
    );

    commentRepository.deleteById(id);

    return true;
  }
}
