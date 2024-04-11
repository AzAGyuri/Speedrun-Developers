package hu.speedrundev.sulipedia.dto.availability;

import hu.speedrundev.sulipedia.model.Availability;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class AvailabilityList {

  public AvailabilityList(List<Availability> availabilities) {
    this.availabilities =
      availabilities
        .stream()
        .map(AvailabilityListItem::new)
        .toList();
  }

  List<AvailabilityListItem> availabilities;
}
