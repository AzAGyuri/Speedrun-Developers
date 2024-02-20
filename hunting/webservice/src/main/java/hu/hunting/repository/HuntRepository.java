package hu.hunting.repository;

import hu.hunting.model.Hunt;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HuntRepository extends JpaRepository<Hunt, Integer> {
}
