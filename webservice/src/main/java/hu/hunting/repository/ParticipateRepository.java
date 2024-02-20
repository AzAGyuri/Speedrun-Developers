package hu.hunting.repository;

import hu.hunting.model.Participate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ParticipateRepository extends JpaRepository<Participate, Integer> {

    @Query(nativeQuery = true,
           value = "SELECT COUNT(p.id) FROM participate p " +
                   "WHERE p.hunt_id = ?1 AND p.hunter_id = ?2")
    int countOfParticipatesByHuntAndHunter(Integer huntId, Integer hunterId);
}

