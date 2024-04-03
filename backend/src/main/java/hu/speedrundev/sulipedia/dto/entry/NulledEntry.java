package hu.speedrundev.sulipedia.dto.entry;

public class NulledEntry {

  public NulledEntry(GetEntry oldData, GetEntry nulledData) {
    this.oldData = oldData;
    this.nulledData = nulledData;
  }

  public NulledEntry() {}

  private GetEntry oldData;

  private GetEntry nulledData;

  public GetEntry getOldData() {
    return oldData;
  }

  public void setOldData(GetEntry oldData) {
    this.oldData = oldData;
  }

  public GetEntry getNulledData() {
    return nulledData;
  }

  public void setNulledData(GetEntry nulledData) {
    this.nulledData = nulledData;
  }
}
