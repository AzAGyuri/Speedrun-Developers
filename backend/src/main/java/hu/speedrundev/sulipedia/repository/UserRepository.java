package hu.speedrundev.sulipedia.repository;

import hu.speedrundev.sulipedia.model.User;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Integer> {
  @Query(
    nativeQuery = true,
    value = "SELECT * FROM registered_users u WHERE u.created_on > ?1 AND u.deleted IS NULL"
  )
  List<User> getUsersCreatedSinceDate(LocalDate date);

  @Query(
    nativeQuery = true,
    value = "SELECT * FROM registered_users u WHERE u.teacher = 1 AND u.deleted IS NULL"
  )
  List<User> getTeachers();

  @Query(
    nativeQuery = true,
    value = "SELECT * FROM registered_users u " +
    "INNER JOIN user_roles ur " +
    "on u.id = ur.user_id " +
    "WHERE " +
    "(DATE_FORMAT(FROM_DAYS(" +
    "DATEDIFF(NOW(), u.birth_date)" +
    "), '%Y') + 0) < 18 " +
    "AND u.deleted IS NULL " +
    "AND lower(ur.role_id) NOT LIKE %teacher%"
  )
  List<User> getUnderageStudents();

  @Query(
    nativeQuery = true,
    value = "SELECT * FROM registered_users u WHERE u.username = ?1"
  )
  User getByUsername(String username);

  @Query(
    nativeQuery = true,
    value = "SELECT * FROM registered_users u WHERE u.deleted IS NULL"
  )
  List<User> findAllNotDeleted();

  Optional<User> findByEmail(String email);

  Optional<User> findByUsername(String username);

  Boolean existsUserByEmail(String email);

  Boolean existsUserByUsername(String username);
}
