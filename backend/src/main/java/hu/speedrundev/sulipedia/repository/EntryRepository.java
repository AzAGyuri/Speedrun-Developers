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
    "AND e.test IS NULL"
  )
  List<Entry> findAllEntriesBySubject(String subject);

  @Query(
    nativeQuery = true,
    value = "SELECT * FROM entries e " +
    "WHERE e.subject_name LIKE ?1 " +
    "AND e.deleted IS NULL " +
    "AND e.test IS NOT NULL"
  )
  List<Entry> findAllTestsBySubject(String subject);

  @Query(
    nativeQuery = true,
    value = "SELECT * FROM entries e " +
    "WHERE e.keep = 1 " +
    "AND e.deleted IS NULL"
  )
  List<Entry> findAllKept();

  @Query(
    nativeQuery = true,
    value = "SELECT * FROM entries e " +
    "WHERE e.keep = 0 " +
    "AND e.deleted IS NULL"
  )
  List<Entry> findAllNotKept();
}
