package hu.hunter_client.dto.quarry;

public class ListQuarry {
    private Integer id;
    private String animalRace;
    private AnimalType type;

    public ListQuarry(Integer id, String animalRace, AnimalType type) {
        this.id = id;
        this.animalRace = animalRace;
        this.type = type;
    }

    public ListQuarry() {
    }

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

    public AnimalType getType() {
        return type;
    }

    public void setType(AnimalType type) {
        this.type = type;
    }
}
