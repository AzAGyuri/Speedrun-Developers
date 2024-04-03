package hu.speedrundev.sulipedia.dto.schoolclass;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostSchoolClass extends BaseSchoolClass {

  public PostSchoolClass(
    Integer classYear,
    Character classLabel,
    SpecializationDto specialization
  ) {
    super(classYear, classLabel);
    this.specialization = specialization;
  }

  private SpecializationDto specialization;
}
