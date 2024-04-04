package hu.speedrundev.sulipedia.dto.entry;

import hu.speedrundev.sulipedia.model.Entry;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class EntryList {

  public EntryList(List<Entry> entries) {
    this.entries = entries.stream().map(EntryListItem::new).toList();
  }

  List<EntryListItem> entries;
}
