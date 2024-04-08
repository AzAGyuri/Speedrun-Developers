package hu.speedrundev.sulipedia.repository;

import hu.speedrundev.sulipedia.model.Entry;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EntryRepository extends JpaRepository<Entry, Integer> {
  @Query(
    nativeQuery = true,
    value = "SELECT * FROM entries e WHERE e.subject LIKE ?1 AND (e.deleted = NULL OR e.deleted = 0)"
  )
  List<Entry> findAllBySubject(String subject);

  @Query(nativeQuery = true, value = "SELECT * FROM entries e WHERE e.keep = 1 AND (e.deleted = NULL OR e.deleted = 0)")
  List<Entry> findAllKept();

  @Query(nativeQuery = true, value = "SELECT * FROM entries e WHERE e.keep = 0")
  List<Entry> findAllNotKept();
}
