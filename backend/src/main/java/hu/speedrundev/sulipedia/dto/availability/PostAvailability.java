package hu.speedrundev.sulipedia.dto.availability;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class PostAvailability extends BaseAvailability {

  public PostAvailability(
    String link,
    AvailTypeDto type,
    Integer linkedUserId
  ) {
    super(link, type);
    this.linkedUserId = linkedUserId;
  }

  private Integer linkedUserId;
}
