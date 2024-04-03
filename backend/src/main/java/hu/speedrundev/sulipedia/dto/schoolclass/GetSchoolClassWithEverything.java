package hu.speedrundev.sulipedia.dto.schoolclass;

import hu.speedrundev.sulipedia.dto.entry.EntryList;
import hu.speedrundev.sulipedia.dto.user.UserList;
import hu.speedrundev.sulipedia.model.SchoolClass;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GetSchoolClassWithEverything extends GetSchoolClassWithID {

  public GetSchoolClassWithEverything(
    Integer startingYear,
    Integer classYear,
    Character classLabel,
    SpecializationDto specialization,
    Integer id,
    EntryList entries,
    UserList users
  ) {
    super(startingYear, classYear, classLabel, specialization, id);
    this.entries = entries;
    this.users = users;
  }

  public GetSchoolClassWithEverything(SchoolClass schoolClass) {
    this(
      schoolClass.getStartingYear(),
      schoolClass.getClassYear(),
      schoolClass.getClassLabel(),
      SpecializationDto.valueOf(schoolClass.getSpecialization().toString()),
      schoolClass.getId(),
      new EntryList(schoolClass.getEntries()),
      new UserList(schoolClass.getUsers())
    );
  }

  private EntryList entries;

  private UserList users;
}
