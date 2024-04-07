package hu.speedrundev.sulipedia.repository;

import hu.speedrundev.sulipedia.model.SchoolClass;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SchoolClassRepository
  extends JpaRepository<SchoolClass, Integer> {
  @Query(
    nativeQuery = true,
    value = "SELECT CASE" +
    "WHEN count(*) = 1 THEN true" +
    "ELSE false" +
    "END FROM school_class sc" +
    "WHERE sc.starting_year = :startingYear"
  )
  Boolean existsByStartingYear(
    @Param(value = "startingYear") Integer startingYear
  );

  @Query(
    nativeQuery = true,
    value = "SELECT CASE" +
    "WHEN count(*) = 1 THEN true" +
    "ELSE false" +
    "END FROM school_class sc" +
    "WHERE lower(CONCAT(sc.class_year, sc.class_label)) LIKE lower(:schoolClass)"
  )
  Boolean existsByClassName(@Param(value = "schoolClass") String schoolClass);

  @Query(
    nativeQuery = true,
    value = "SELECT * FROM school_class sc " +
    "WHERE lower(CONCAT(sc.starting_year, sc.class_label)) LIKE lower(:schoolClass)"
  )
  SchoolClass getClassByClassName(
    @Param(value = "schoolClass") String schoolClass
  );

  @Query(
    nativeQuery = true,
    value = "SELECT * FROM school_class sc " +
    "inner join registered_users u " +
    "on u.class_id = sc.id " +
    "WHERE u.id = :userId"
  )
  List<SchoolClass> findAllByUserId(@Param(value = "userId") Integer userId);
}
