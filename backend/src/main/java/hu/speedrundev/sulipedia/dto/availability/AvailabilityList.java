package hu.speedrundev.sulipedia.dto.availability;

import hu.speedrundev.sulipedia.model.Availability;
import java.util.List;

public class AvailabilityList {

  public AvailabilityList() {}

  public AvailabilityList(List<Availability> availabilities) {
    this.availabilities =
      availabilities
        .stream()
        .map(AvailabilityListItem::new)
        .toList();
  }

  List<AvailabilityListItem> availabilities;

  public List<AvailabilityListItem> getAvailabilities() {
    return availabilities;
  }

  public void setAvailabilities(List<AvailabilityListItem> availabilities) {
    this.availabilities = availabilities;
  }
}
