package hu.speedrundev.sulipedia.util;

import static org.springframework.http.HttpStatus.*;

import org.springframework.web.server.ResponseStatusException;

public class ExceptionUtils {

  public static ResponseStatusException nullPointer() {
    return new ResponseStatusException(
      INTERNAL_SERVER_ERROR,
      "UNEXPECTED_NULL_POINTER_EXCEPTION"
    );
  }

  public static ResponseStatusException fileIO() {
    return new ResponseStatusException(
      INTERNAL_SERVER_ERROR,
      "FILE_COULD_NOT_BE_SAVED"
    );
  }

  public static ResponseStatusException modelNotFound(String reason) {
    return new ResponseStatusException(NOT_FOUND, reason);
  }

  public static ResponseStatusException badRequest(String reason) {
    return new ResponseStatusException(BAD_REQUEST, reason);
  }
  
  public static ResponseStatusException noYouDont(String reason) {
    return new ResponseStatusException(FORBIDDEN, reason);
  }

  public static ResponseStatusException notUnique(String reason) {
    return new ResponseStatusException(CONFLICT, reason);
  }

  public static ResponseStatusException itsGoneBud(String reason) {
    return new ResponseStatusException(GONE, reason);
  }

  public static ResponseStatusException unauthorized(String reason) {
    return new ResponseStatusException(UNAUTHORIZED, reason);
  }
}
