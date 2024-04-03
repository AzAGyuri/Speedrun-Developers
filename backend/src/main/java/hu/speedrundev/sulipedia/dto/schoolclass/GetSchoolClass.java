package hu.speedrundev.sulipedia.dto.schoolclass;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GetSchoolClass extends BaseSchoolClass {

  public GetSchoolClass(
    Integer startingYear,
    Integer classYear,
    Character classLabel,
    SpecializationDto specialization
  ) {
    super(classYear, classLabel);
    this.startingYear = startingYear;
    this.specialization = specialization;
  }

  private Integer startingYear;

  private SpecializationDto specialization;
}
