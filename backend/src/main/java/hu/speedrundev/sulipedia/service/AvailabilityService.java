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
import hu.speedrundev.sulipedia.repository.AvailabilityRepository;
import hu.speedrundev.sulipedia.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AvailabilityService {

  @Autowired
  private AvailabilityRepository availabilityRepository;

  @Autowired
  private UserRepository userRepository;

  public AvailabilityList listAllAvailabilities() {
    return new AvailabilityList(availabilityRepository.findAll());
  }

  public AvailabilityList getUserAvailabilities(Integer userId) {
    if (userId == null) throw nullPointer();

    if (!userRepository.existsById(userId)) throw modelNotFound(
      "LINKED_USER_NOT_FOUND"
    );

    return new AvailabilityList(availabilityRepository.findAllByUserId(userId));
  }

  public GetAvailabilityWithID createAvailability(
    PostAvailability availability
  ) {
    if (availability == null) throw nullPointer();

    Integer linkedUserId = availability.getLinkedUserId();

    if (linkedUserId == null) throw nullPointer();

    if (!userRepository.existsById(linkedUserId)) throw modelNotFound(
      "LINKED_USER_NOT_FOUND"
    );

    return new GetAvailabilityWithID(
      availabilityRepository.save(
        new Availability(
          availability,
          userRepository.getReferenceById(linkedUserId)
        )
      )
    );
  }

  public GetAvailability updateAvailability(
    @Valid UpdateAvailability update,
    Integer id
  ) {
    if (update == null || id == null) throw nullPointer();

    if (!availabilityRepository.existsById(id)) throw modelNotFound(
      "AVAILABILITY_NOT_FOUND"
    );

    if (update.isAllNull()) throw badRequest("ALL_UPDATE_DATA_IS_NULL");

    Availability oldData =
      (availabilityRepository.getReferenceById(id));
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
      update.getType().toString() != updatedAvailability.getAvailabilityType().toString()
    ) {
      updatedAvailability.setAvailabilityType(
        AvailType.valueOf(update.getType().toString())
      );
    }

    if (oldData.equals(updatedAvailability)) throw badRequest("UPDATED_ENTITY_DATA_STILL_MATCHES_OLD_DATA");

    return new GetAvailability(
      availabilityRepository.save(updatedAvailability)
    );
  }

  public DeletedAvailability deleteAvailability(Integer id) {
    if (id == null) throw nullPointer();

    if (
      !availabilityRepository.existsById(id)
    ) throw modelNotFound("AVAILABILITY_NOT_FOUND");

    Availability deleted = availabilityRepository.getReferenceById(id);
    availabilityRepository.deleteById(id);

    return new DeletedAvailability(deleted);
  }
}
