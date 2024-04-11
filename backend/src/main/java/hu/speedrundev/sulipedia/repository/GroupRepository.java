package hu.speedrundev.sulipedia.repository;

import hu.speedrundev.sulipedia.model.Group;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface GroupRepository
  extends JpaRepository<Group, Integer> {
  @Query(
    nativeQuery = true,
    value = "SELECT * FROM group g " +
    "inner join registered_users u " +
    "on u.group_id = g.id " +
    "WHERE u.id = :userId"
  )
  List<Group> findAllByUserId(@Param(value = "userId") Integer userId);
}
