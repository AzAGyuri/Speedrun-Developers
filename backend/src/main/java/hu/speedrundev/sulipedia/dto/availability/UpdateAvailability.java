package hu.speedrundev.sulipedia.dto.availability;

import hu.speedrundev.sulipedia.model.Availability;

public class UpdateAvailability extends BaseAvailability {

  public UpdateAvailability() {}

  public UpdateAvailability(String link, AvailTypeDto type) {
    super(link, type);
  }

  public boolean isAllNull() {
    return this.getLink() == null && this.getType() == null;
  }

  public boolean doesAllMatch(Availability updatedAvailability) {
    return (
      this.getLink() == updatedAvailability.getLink() &&
      this.getType()
        .toString()
        .equalsIgnoreCase(updatedAvailability.getAvailabilityType().toString())
    );
  }
}
