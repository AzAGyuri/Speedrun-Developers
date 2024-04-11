package hu.speedrundev.sulipedia.dto.availability;

import hu.speedrundev.sulipedia.model.Availability;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GetAvailabilityWithID extends GetAvailability {

  public GetAvailabilityWithID(String link, AvailTypeDto type, Integer id) {
    super(link, type);
    this.id = id;
  }

  public GetAvailabilityWithID(Availability availability) {
    this(availability.getLink(), AvailTypeDto.valueOf(availability.getAvailabilityType().toString()), availability.getId());
  }

  private Integer id;
}
