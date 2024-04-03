package hu.speedrundev.sulipedia.repository;

import hu.speedrundev.sulipedia.model.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository extends JpaRepository<Answer, Integer> {}
