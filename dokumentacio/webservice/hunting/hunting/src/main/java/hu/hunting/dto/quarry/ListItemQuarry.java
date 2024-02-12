package hu.hunting.dto.quarry;

import hu.hunting.model.AnimalType;

public class ListItemQuarry {

    private Integer id;

    private String animalRace;

    private AnimalTypeEnumDto type;

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
}
