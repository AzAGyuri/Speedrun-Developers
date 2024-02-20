package hu.hunting.repository;

import hu.hunting.dto.quarry.ListItemQuarry;
import hu.hunting.model.Quarry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface QuarryRepository extends JpaRepository<Quarry, Integer> {


    @Query(nativeQuery = true,
            value = "SELECT * FROM quarry q WHERE q.animal_race LIKE %?1%")
    List<Quarry> findAllByAnimalRace(String animalRace);
}
