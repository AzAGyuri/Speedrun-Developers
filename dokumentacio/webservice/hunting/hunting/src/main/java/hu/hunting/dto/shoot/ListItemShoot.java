package hu.hunting.dto.shoot;

public class ListItemShoot {

    private Integer id;
    private String HunterName;
    private String QuarryRace;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getHunterName() {
        return HunterName;
    }

    public void setHunterName(String hunterName) {
        HunterName = hunterName;
    }

    public String getQuarryRace() {
        return QuarryRace;
    }

    public void setQuarryRace(String quarryRace) {
        QuarryRace = quarryRace;
    }
}
