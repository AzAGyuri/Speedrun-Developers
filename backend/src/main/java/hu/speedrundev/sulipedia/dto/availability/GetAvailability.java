package hu.speedrundev.sulipedia.dto.availability;

import hu.speedrundev.sulipedia.model.Availability;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class GetAvailability extends BaseAvailability {

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
