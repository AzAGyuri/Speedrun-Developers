package hu.speedrundev.sulipedia.dto.schoolclass;

import hu.speedrundev.sulipedia.model.SchoolClass;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class SchoolClassListItem extends GetSchoolClassWithID {

  public SchoolClassListItem(
    Integer startingYear,
    Integer classYear,
    Character classLabel,
    SpecializationDto specialization,
    Integer id
  ) {
    super(startingYear, classYear, classLabel, specialization, id);
  }

  public SchoolClassListItem(SchoolClass schoolClass) {
    this(
      schoolClass.getStartingYear(),
      schoolClass.getClassYear(),
      schoolClass.getClassLabel(),
      SpecializationDto.valueOf(schoolClass.getSpecialization().toString()),
      schoolClass.getId()
    );
  }
}
