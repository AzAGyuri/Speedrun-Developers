package hu.speedrundev.sulipedia.dto.user;

public class NulledUser {

  public NulledUser() {}

  public NulledUser(GetUser oldData, GetUser nulledData) {
    this.oldData = oldData;
    this.nulledData = nulledData;
  }

  private GetUser oldData;

  private GetUser nulledData;

  public GetUser getOldData() {
    return oldData;
  }

  public void setOldData(GetUser oldData) {
    this.oldData = oldData;
  }

  public GetUser getNulledData() {
    return nulledData;
  }

  public void setNulledData(GetUser nulledData) {
    this.nulledData = nulledData;
  }
}
