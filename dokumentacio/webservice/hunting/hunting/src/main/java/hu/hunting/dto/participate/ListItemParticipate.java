package hu.hunting.dto.participate;

public class ListItemParticipate {
    private Integer id;
    private Integer huntId;
    private String location;
    private Integer hunterId;
    private String hunterName;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getHuntId() {
        return huntId;
    }

    public void setHuntId(Integer huntId) {
        this.huntId = huntId;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getHunterId() {
        return hunterId;
    }

    public void setHunterId(Integer hunterId) {
        this.hunterId = hunterId;
    }

    public String getHunterName() {
        return hunterName;
    }

    public void setHunterName(String hunterName) {
        this.hunterName = hunterName;
    }
}
