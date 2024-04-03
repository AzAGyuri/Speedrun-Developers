package hu.speedrundev.sulipedia.dto.schoolclass;

import hu.speedrundev.sulipedia.model.SchoolClass;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GetSchoolClassWithID extends GetSchoolClass {

  public GetSchoolClassWithID(
    Integer startingYear,
    Integer classYear,
    Character classLabel,
    SpecializationDto specialization,
    Integer id
  ) {
    super(startingYear, classYear, classLabel, specialization);
    this.id = id;
  }

  public GetSchoolClassWithID(SchoolClass schoolClass) {
    this(
      schoolClass.getStartingYear(),
      schoolClass.getClassYear(),
      schoolClass.getClassLabel(),
      SpecializationDto.valueOf(schoolClass.getSpecialization().toString()),
      schoolClass.getId()
    );
  }

  private Integer id;
}
