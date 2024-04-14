package hu.speedrundev.sulipedia.dto.availability;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class PostAvailability extends BaseAvailability {

  public PostAvailability(String link, AvailTypeDto type) {
    super(link, type);
  }
}
