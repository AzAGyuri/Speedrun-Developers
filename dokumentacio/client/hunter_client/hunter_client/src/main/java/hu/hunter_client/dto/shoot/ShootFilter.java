package hu.hunter_client.dto.shoot;

public class ShootFilter {
    private String animalRace;

    public ShootFilter(String animalRace) {
        this.animalRace = animalRace;
    }

    public ShootFilter() {
    }

    public String getAnimalRace() {
        return animalRace;
    }

    public void setAnimalRace(String animalRace) {
        this.animalRace = animalRace;
    }
}
