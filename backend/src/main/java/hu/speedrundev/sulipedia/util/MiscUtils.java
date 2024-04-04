package hu.speedrundev.sulipedia.util;

import java.util.Random;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

public class MiscUtils {

  public static String attachment(String id) {
    if (id == null) throw ExceptionUtils.nullPointer();

    return ServletUriComponentsBuilder
      .fromCurrentContextPath()
      .path("/attachment/file/")
      .path(id)
      .toUriString();
  }

  public static String generateThreeRandomColors() {
    return String.format(
      "#%s%s%s",
      convertNumberToHex(new Random().nextInt(0, 255)),
      convertNumberToHex(new Random().nextInt(0, 255)),
      convertNumberToHex(new Random().nextInt(0, 255))
    );
  }

  private static String convertNumberToHex(int num) {
    return String.format("%s%s", hexOf(num / 16), hexOf(num % 16));
  }

  private static String hexOf(int i) {
    switch (i) {
      case 10:
        return "A";
      case 11:
        return "B";
      case 12:
        return "C";
      case 13:
        return "D";
      case 14:
        return "E";
      case 15:
        return "F";
      default:
        return String.valueOf(i);
    }
  }
}
