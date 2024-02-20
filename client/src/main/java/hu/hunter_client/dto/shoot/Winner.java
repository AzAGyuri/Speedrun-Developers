package hu.hunter_client.dto.shoot;

public class Winner {
    private Integer countQuarries;
    private String hunterName;
    private Integer hunterId;

    public Winner(Integer countQuarries, String hunterName, Integer hunterId) {
        this.countQuarries = countQuarries;
        this.hunterName = hunterName;
        this.hunterId = hunterId;
    }

    public Winner() {
    }

    public Integer getCountQuarries() {
        return countQuarries;
    }

    public void setCountQuarries(Integer countQuarries) {
        this.countQuarries = countQuarries;
    }

    public String getHunterName() {
        return hunterName;
    }

    public void setHunterName(String hunterName) {
        this.hunterName = hunterName;
    }

    public Integer getHunterId() {
        return hunterId;
    }

    public void setHunterId(Integer hunterId) {
        this.hunterId = hunterId;
    }
}
