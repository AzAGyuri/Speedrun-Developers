package hu.speedrundev.sulipedia.dto.entry;

import hu.speedrundev.sulipedia.model.Entry;

import java.util.ArrayList;
import java.util.List;

public class EntryList {

  public EntryList(ArrayList<EntryListItem> entries) {
    this.entries = entries;
  }

  public EntryList() {}

  public EntryList(List<Entry> entries) {
    this.entries = (ArrayList<EntryListItem>) entries.stream().map(EntryListItem::new).toList();
  }

  ArrayList<EntryListItem> entries;

  public ArrayList<EntryListItem> getEntries() {
    return entries;
  }

  public void setEntries(ArrayList<EntryListItem> entries) {
    this.entries = entries;
  }
}
