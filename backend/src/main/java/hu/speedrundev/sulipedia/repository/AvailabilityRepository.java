package hu.speedrundev.sulipedia.repository;

import hu.speedrundev.sulipedia.model.Availability;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AvailabilityRepository
  extends JpaRepository<Availability, Integer> {
  @Query(
    nativeQuery = true,
    value = "SELECT * FROM availability a " +
    "INNER JOIN registered_users u " +
    "ON a.linked_user_id = u.id " +
    "WHERE a.linked_user_id = :user_id " +
    "AND u.deleted = 0"
  )
  List<Availability> findAllByUserId(@Param("user_id") Integer id);
}
