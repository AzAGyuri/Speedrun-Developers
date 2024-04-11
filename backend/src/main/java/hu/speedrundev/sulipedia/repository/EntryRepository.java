package hu.speedrundev.sulipedia.repository;

import hu.speedrundev.sulipedia.model.Entry;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EntryRepository extends JpaRepository<Entry, Integer> {
  @Query(
    nativeQuery = true,
    value = "SELECT * FROM entries e " +
    "WHERE e.subject_name LIKE ?1 " +
    "AND e.deleted IS NULL " +
    "AND e.test = 0"
  )
  List<Entry> findAllEntriesBySubject(String subject);

  @Query(
    nativeQuery = true,
    value = "SELECT * FROM entries e " +
    "WHERE e.subject_name LIKE ?1 " +
    "AND e.deleted IS NULL " +
    "AND e.test = 1"
  )
  List<Entry> findAllTestsBySubject(String subject);

  @Query(
    nativeQuery = true,
    value = "SELECT * FROM entries e " +
    "WHERE e.kept = 1 " +
    "AND e.deleted IS NULL"
  )
  List<Entry> findAllKept();

  @Query(
    nativeQuery = true,
    value = "SELECT * FROM entries e " +
    "WHERE e.kept = 0 " +
    "AND e.deleted IS NULL"
  )
  List<Entry> findAllNotKept();
}
