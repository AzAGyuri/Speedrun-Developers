package hu.speedrundev.sulipedia.dto.schoolclass;

import hu.speedrundev.sulipedia.model.SchoolClass;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SchoolClassList {

  public SchoolClassList(List<SchoolClass> schoolClasses) {
    this.schoolClasses = schoolClasses.stream().map(SchoolClassListItem::new).toList();
  }

  private List<SchoolClassListItem> schoolClasses;
}
