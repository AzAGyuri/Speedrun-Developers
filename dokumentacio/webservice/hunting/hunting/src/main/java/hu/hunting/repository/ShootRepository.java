package hu.hunting.repository;

import hu.hunting.dto.shoot.Winner;
import hu.hunting.model.Shoot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ShootRepository extends JpaRepository<Shoot, Integer> {

    @Query(nativeQuery = true,
        value="SELECT COUNT(s.id) FROM shoot s WHERE s.hunter_id = ?1")
    int countShootsByHunterId(Integer id);

    @Query(nativeQuery = true,
            value="SELECT * FROM shoot s WHERE s.hunter_id = ?1")
    List<Shoot> findAllByHunter(Integer hunterId);

    @Query(nativeQuery = true,
            value="SELECT * FROM shoot s WHERE s.quarry_id = ?1")
    List<Shoot> findAllByQuarry(Integer quarryId);

    @Query(nativeQuery = true,
            value="SELECT * FROM shoot s WHERE s.hunter_id = ?1 AND s.quarry_id = ?2")
    List<Shoot> findAllByHunterAndQuarry(Integer hunterId, Integer quarryId);

    @Query(nativeQuery = true,
            value = "SELECT " +
                      "h.id AS hunterId, " +
                      "h.name AS hunterName, " +
                      "COUNT(s.id) AS countQuarries " +
                    "FROM shoot s " +
                    "INNER JOIN hunter h ON s.hunter_id = h.id " +
                    "GROUP BY h.id " +
                    "ORDER BY countQuarries DESC " +
                    "LIMIT 0, 3")
    List<Winner> findWinners();
}
