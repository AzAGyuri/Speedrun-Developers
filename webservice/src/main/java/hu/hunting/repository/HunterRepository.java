package hu.hunting.repository;

import hu.hunting.model.Hunter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Stack;

public interface HunterRepository extends JpaRepository<Hunter, Integer> {

    @Query(nativeQuery = true,
            value = "SELECT hr.name FROM hunter hr\n" +
            "INNER JOIN participate p ON hr.id = p.hunter_id\n" +
            "INNER JOIN hunt h ON p.hunt_id = h.id\n" +
            "WHERE h.id = ?1")
    List<String> findAllHunterNameByHunt(Integer huntId);

    @Query(nativeQuery = true,
            value = "SELECT hr.id, hr.name FROM hunter hr\n" +
                    "INNER JOIN participate p ON hr.id = p.hunter_id\n" +
                    "INNER JOIN hunt h ON p.hunt_id = h.id\n" +
                    "WHERE h.id = ?1")
    List<Hunter> findAllByHunt(Integer id);
}
