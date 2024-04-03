package hu.speedrundev.sulipedia.model;

import hu.speedrundev.sulipedia.dto.schoolclass.PostSchoolClass;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.Year;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "school_class")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SchoolClass {

  public SchoolClass(PostSchoolClass schoolClass) {
    this.classLabel = schoolClass.getClassLabel();
    this.startingYear = getYear();
    this.classYear = schoolClass.getClassYear();
    this.specialization =
      Specialization.valueOf(schoolClass.getSpecialization().toString());
  }

  private Integer getYear() {
    String[] yearDigits = String.valueOf(Year.now().getValue()).split("");
    Integer ret = 0;

    for (int i = 0; i <= 1; i++) {
      ret +=
        Integer.parseInt(yearDigits[i]) *
        (int) Math.pow(10, i + 1);
    }

    return ret;
  }

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private Integer startingYear;

  private Integer classYear;

  private Character classLabel;

  @Enumerated(EnumType.STRING)
  private Specialization specialization;

  @OneToMany(mappedBy = "linkedClass")
  private List<User> users;

  @OneToMany(mappedBy = "linkedClass")
  private List<Entry> entries;
}
