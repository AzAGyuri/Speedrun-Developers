package hu.speedrundev.sulipedia.repository;

import hu.speedrundev.sulipedia.model.Entry;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EntryRepository extends JpaRepository<Entry, Integer> {
  @Query(
    nativeQuery = true,
    value = "SELECT * FROM entry e WHERE e.category LIKE ?1"
  )
  List<Entry> findAllByCategory(String category);

  @Query(nativeQuery = true, value = "SELECT * FROM entry e WHERE e.keep = 1")
  List<Entry> findAllKept();

  @Query(nativeQuery = true, value = "SELECT * FROM entry e WHERE e.keep = 0")
  List<Entry> findAllNotKept();
}
