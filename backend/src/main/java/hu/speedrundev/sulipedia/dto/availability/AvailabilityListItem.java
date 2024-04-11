package hu.speedrundev.sulipedia.dto.availability;

import hu.speedrundev.sulipedia.model.Availability;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AvailabilityListItem extends GetAvailabilityWithID {

  private Integer linkedUserId;

  public AvailabilityListItem(Availability availability) {
    this(
      availability.getLink(),
      AvailTypeDto.valueOf(availability.getAvailabilityType().toString()),
      availability.getId(),
      availability.getLinkedUser().getId()
    );
  }

  public AvailabilityListItem(
    String link,
    AvailTypeDto type,
    Integer id,
    Integer linkedUserId
  ) {
    super(link, type, id);
    this.linkedUserId = linkedUserId;
  }
}
