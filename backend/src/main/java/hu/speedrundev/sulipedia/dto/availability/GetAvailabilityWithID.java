package hu.speedrundev.sulipedia.dto.availability;

import hu.speedrundev.sulipedia.model.Availability;

public class GetAvailabilityWithID extends GetAvailability {

  public GetAvailabilityWithID(String link, AvailTypeDto type, Integer id) {
    super(link, type);
    this.id = id;
  }

  public GetAvailabilityWithID() {}

  public GetAvailabilityWithID(Availability availability) {
    this(availability.getLink(), AvailTypeDto.valueOf(availability.getAvailabilityType().toString()), availability.getId());
  }

  private Integer id;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }
}
