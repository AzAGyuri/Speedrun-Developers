package hu.speedrundev.sulipedia.dto.availability;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
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
