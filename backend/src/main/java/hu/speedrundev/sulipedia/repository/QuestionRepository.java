package hu.speedrundev.sulipedia.repository;

import hu.speedrundev.sulipedia.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Integer> {}
