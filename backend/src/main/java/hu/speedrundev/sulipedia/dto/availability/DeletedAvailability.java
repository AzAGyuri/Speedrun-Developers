package hu.speedrundev.sulipedia.dto.availability;

import hu.speedrundev.sulipedia.model.Availability;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class DeletedAvailability extends BaseAvailability {

  public DeletedAvailability(String link, AvailTypeDto type) {
    super(link, type);
  }

  public DeletedAvailability(Availability deleted) {
    this(deleted.getLink(), AvailTypeDto.valueOf(deleted.getAvailabilityType().toString()));
  }
}
