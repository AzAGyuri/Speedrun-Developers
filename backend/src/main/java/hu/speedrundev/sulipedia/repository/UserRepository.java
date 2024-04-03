package hu.speedrundev.sulipedia.repository;

import hu.speedrundev.sulipedia.model.User;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Integer> {
  @Query(
    nativeQuery = true,
    value = "SELECT * FROM registered_users u WHERE u.created_on > ?1 AND u.deleted = 0"
  )
  List<User> getUsersCreatedSinceDate(Date date);

  @Query(
    nativeQuery = true,
    value = "SELECT * FROM registered_users u WHERE u.teacher = 1 AND u.deleted = 0"
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
    "AND u.deleted = 0" +
    "AND lower(ur.role_id) NOT LIKE %teacher%"
  )
  List<User> getUnderageStudents();

  Boolean existsUserByUsername(String username);

  @Query(
    nativeQuery = true,
    value = "SELECT * FROM registered_users u WHERE u.username = ?1"
  )
  User getByUsername(String username);

  @Query(
    nativeQuery = true,
    value = "SELECT * FROM registered_users u WHERE u.username LIKE ?1"
  )
  List<User> findAllNotDeleted();
}
