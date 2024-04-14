package hu.speedrundev.sulipedia.service;

import static hu.speedrundev.sulipedia.util.ExceptionUtils.*;

import hu.speedrundev.sulipedia.dto.availability.AvailabilityList;
import hu.speedrundev.sulipedia.dto.availability.DeletedAvailability;
import hu.speedrundev.sulipedia.dto.availability.GetAvailability;
import hu.speedrundev.sulipedia.dto.availability.GetAvailabilityWithID;
import hu.speedrundev.sulipedia.dto.availability.PostAvailability;
import hu.speedrundev.sulipedia.dto.availability.UpdateAvailability;
import hu.speedrundev.sulipedia.model.AvailType;
import hu.speedrundev.sulipedia.model.Availability;
import hu.speedrundev.sulipedia.model.User;
import hu.speedrundev.sulipedia.repository.AvailabilityRepository;
import hu.speedrundev.sulipedia.repository.UserRepository;
import hu.speedrundev.sulipedia.util.JwtUtil;
import jakarta.validation.Valid;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AvailabilityService {

  @Autowired
  private AvailabilityRepository availabilityRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private JwtUtil jwtUtil;

  public AvailabilityList listAllAvailabilities() {
    return new AvailabilityList(
      availabilityRepository
        .findAll()
        .stream()
        .filter(availability ->
          availability.getLinkedUser().getDeleted() != true
        )
        .toList()
    );
  }

  public GetAvailabilityWithID createAvailability(
    PostAvailability availability,
    String token
  ) {
    if (availability == null) throw nullPointer();

    Optional<User> postingUser = userRepository.findByUsername(
      jwtUtil.getSubject(token)
    );

    if (postingUser.isEmpty()) throw modelNotFound("LINKED_USER_NOT_FOUND");

    return new GetAvailabilityWithID(
      availabilityRepository.save(
        new Availability(availability, postingUser.get())
      )
    );
  }

  public GetAvailability updateAvailability(
    @Valid UpdateAvailability update,
    Integer id,
    String token
  ) {
    if (update == null || id == null) throw nullPointer();

    if (!availabilityRepository.existsById(id)) throw modelNotFound(
      "AVAILABILITY_NOT_FOUND"
    );

    Optional<User> updater = userRepository.findByUsername(
      jwtUtil.getSubject(token)
    );

    if (updater.isEmpty()) throw modelNotFound("USER_NOT_FOUND");

    if (
      availabilityRepository.getReferenceById(id).getLinkedUser().getDeleted()
    ) throw itsGoneBud("THE_LINKED_USER_OF_THE_AVAILABILITY_IS_DELETED");

    if (
      updater.get().getId() ==
      availabilityRepository.getReferenceById(id).getLinkedUser().getId()
    ) throw noYouDont("USER_REQUESTING_AVAILABILITY_UPDATE_IS_NOT_LINKED_USER");

    if (update.isAllNull()) throw badRequest("ALL_UPDATE_DATA_IS_NULL");

    Availability oldData = (availabilityRepository.getReferenceById(id));
    Availability updatedAvailability =
      (availabilityRepository.getReferenceById(id));

    if (update.doesAllMatch(updatedAvailability)) throw badRequest(
      "ALL_UPDATE_DATA_MATCH_EXISTING_ENTITY_DATA"
    );

    if (
      update.getLink() != null &&
      update.getLink() != updatedAvailability.getLink()
    ) {
      updatedAvailability.setLink(update.getLink());
    }

    if (
      update.getType() != null &&
      update.getType().toString() !=
      updatedAvailability.getAvailabilityType().toString()
    ) {
      updatedAvailability.setAvailabilityType(
        AvailType.valueOf(update.getType().toString())
      );
    }

    if (oldData.equals(updatedAvailability)) throw badRequest(
      "UPDATED_ENTITY_DATA_STILL_MATCHES_OLD_DATA"
    );

    return new GetAvailability(
      availabilityRepository.save(updatedAvailability)
    );
  }

  public DeletedAvailability deleteAvailability(Integer id, String token) {
    if (id == null) throw nullPointer();

    if (!availabilityRepository.existsById(id)) throw modelNotFound(
      "AVAILABILITY_NOT_FOUND"
    );

    Optional<User> deleter = userRepository.findByUsername(
      jwtUtil.getSubject(token)
    );

    if (deleter.isEmpty()) throw modelNotFound("USER_NOT_FOUND");

    Availability deleted = availabilityRepository.getReferenceById(id);

    if (
      deleter.get().getId() != deleted.getLinkedUser().getId()
    ) throw noYouDont(
      "USER_REQUESTING_AVAILABILITY_DELETION_IS_NOT_LINKED_USER"
    );

    availabilityRepository.deleteById(id);

    return new DeletedAvailability(deleted);
  }
}
