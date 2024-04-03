package hu.speedrundev.sulipedia.dto.availability;

import hu.speedrundev.sulipedia.model.Availability;

public class GetAvailability extends BaseAvailability {

  public GetAvailability() {}

  public GetAvailability(String link, AvailTypeDto type) {
    super(link, type);
  }

  public GetAvailability(Availability availability) {
    this(
      availability.getLink(),
      AvailTypeDto.valueOf(availability.getAvailabilityType().toString())
    );
  }
}
