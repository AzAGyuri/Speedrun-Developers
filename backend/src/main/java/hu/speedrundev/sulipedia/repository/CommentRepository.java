package hu.speedrundev.sulipedia.repository;

import hu.speedrundev.sulipedia.model.Comment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
  @Query(
    nativeQuery = true,
    value = "SELECT * FROM comment c WHERE c.entry_id = :entryId"
  )
  List<Comment> findAllByEntryId(@Param("entryId") Integer entryId);
}
