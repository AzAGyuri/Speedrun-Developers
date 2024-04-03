package hu.speedrundev.sulipedia.dto.availability;

import hu.speedrundev.sulipedia.model.Availability;

public class AvailabilityListItem extends GetAvailabilityWithID {

  private Integer linkedUserId;

  public Integer getLinkedUserId() {
    return linkedUserId;
  }

  public void setLinkedUserId(Integer linkedUserId) {
    this.linkedUserId = linkedUserId;
  }

  public AvailabilityListItem(Availability availability) {
    this(
      availability.getLink(),
      AvailTypeDto.valueOf(availability.getAvailabilityType().toString()),
      availability.getId(),
      availability.getLinkedUser().getId()
    );
  }

  public AvailabilityListItem() {}

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
