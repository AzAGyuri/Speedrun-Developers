package hu.hunting.dto.quarry;

public class GetQuarry {
    private Integer id;
    private String animalRace;
    private AnimalTypeEnumDto type;
    private String lastSeenLocation;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAnimalRace() {
        return animalRace;
    }

    public void setAnimalRace(String animalRace) {
        this.animalRace = animalRace;
    }

    public AnimalTypeEnumDto getType() {
        return type;
    }

    public void setType(AnimalTypeEnumDto type) {
        this.type = type;
    }

    public String getLastSeenLocation() {
        return lastSeenLocation;
    }

    public void setLastSeenLocation(String lastSeenLocation) {
        this.lastSeenLocation = lastSeenLocation;
    }
}
