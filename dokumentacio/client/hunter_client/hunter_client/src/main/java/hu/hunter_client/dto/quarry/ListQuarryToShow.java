package hu.hunter_client.dto.quarry;

public class ListQuarryToShow {

    private String race;
    private String type;

    public ListQuarryToShow(String race, AnimalType type) {
        this.race = race;
        switch (type){
            case BIRD -> this.type = "Madár";
            case MAMMAL -> this.type = "Emlős";
            case REPTILIAN -> this.type = "Hüllő";
        }
    }

    public String getRace() {
        return race;
    }

    public void setRace(String race) {
        this.race = race;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
