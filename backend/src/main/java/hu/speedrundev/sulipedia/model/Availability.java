package hu.speedrundev.sulipedia.model;

import hu.speedrundev.sulipedia.dto.availability.PostAvailability;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "availabilities")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Availability {

  @Override
  public boolean equals(Object obj) {
    Availability newAvail = (Availability) obj;

    boolean allMatch =
      this.link == newAvail.link &&
      this.availabilityType == newAvail.availabilityType;

    return allMatch && super.equals(obj);
  }

  public Availability(PostAvailability availability, User linkedUser) {
    this.link = availability.getLink();
    this.availabilityType = AvailType.valueOf(availability.getType().toString());
    this.linkedUser = linkedUser;
  }

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private String link;

  @Enumerated(EnumType.STRING)
  private AvailType availabilityType;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User linkedUser;
}
