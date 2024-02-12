package hu.hunting.dto.quarry;

public class CreateQuarry {
    private String animalRace;
    private AnimalTypeEnumDto type;

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
}
