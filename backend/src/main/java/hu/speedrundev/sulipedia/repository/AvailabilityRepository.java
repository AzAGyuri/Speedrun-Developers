package hu.speedrundev.sulipedia.repository;

import hu.speedrundev.sulipedia.model.Availability;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AvailabilityRepository
  extends JpaRepository<Availability, Integer> {}
