package hu.hunter_client.dto.quarry;

public class FilterQuarry {
    private String animalRace;

    public FilterQuarry(String animalRace) {
        this.animalRace = animalRace;
    }

    public FilterQuarry() {
    }

    public String getAnimalRace() {
        return animalRace;
    }

    public void setAnimalRace(String animalRace) {
        this.animalRace = animalRace;
    }
}
