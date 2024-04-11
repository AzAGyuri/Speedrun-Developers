package hu.speedrundev.sulipedia.dto.entry;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NulledEntry {

  private GetEntry oldData;

  private GetEntry nulledData;
}
