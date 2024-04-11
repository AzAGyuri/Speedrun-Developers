package hu.speedrundev.sulipedia.dto.availability;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import hu.speedrundev.sulipedia.model.Availability;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class UpdateAvailability extends BaseAvailability {

  public UpdateAvailability(String link, AvailTypeDto type) {
    super(link, type);
  }

  @JsonIgnore
  public boolean isAllNull() {
    return this.getLink() == null && this.getType() == null;
  }

  @JsonIgnore
  public boolean doesAllMatch(Availability updatedAvailability) {
    return (
      this.getLink() == updatedAvailability.getLink() &&
      this.getType()
        .toString()
        .equalsIgnoreCase(updatedAvailability.getAvailabilityType().toString())
    );
  }
}
