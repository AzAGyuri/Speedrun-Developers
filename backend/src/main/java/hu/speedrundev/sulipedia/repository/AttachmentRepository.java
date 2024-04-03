package hu.speedrundev.sulipedia.repository;

import hu.speedrundev.sulipedia.model.Attachment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AttachmentRepository
  extends JpaRepository<Attachment, Integer> {
  @Query(
    nativeQuery = true,
    value = "SELECT * FROM attachment a" +
    "INNER JOIN entry e" +
    "on e.id = a.linked_entry_id" +
    "WHERE e.id = :entryId"
  )
  List<Attachment> findAllByEntryId(@Param(value = "entryId") Integer entryId);
}
