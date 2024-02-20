package hu.hunter_client.dto.shoot;

public class NewShoot {

    private Integer hunterId;
    private Integer quarryId;

    public NewShoot(Integer hunterId, Integer quarryId) {
        this.hunterId = hunterId;
        this.quarryId = quarryId;
    }

    public NewShoot() {
    }

    public Integer getHunterId() {
        return hunterId;
    }

    public void setHunterId(Integer hunterId) {
        this.hunterId = hunterId;
    }

    public Integer getQuarryId() {
        return quarryId;
    }

    public void setQuarryId(Integer quarryId) {
        this.quarryId = quarryId;
    }
}
