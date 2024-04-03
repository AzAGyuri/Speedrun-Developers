package hu.speedrundev.sulipedia.util;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

public class CreateURI {

  public static String attachment(String id) {
    if (id == null) throw ExceptionUtils.nullPointer();

    return ServletUriComponentsBuilder
      .fromCurrentContextPath()
      .path("/attachment/file/")
      .path(id)
      .toUriString();
  }
}
