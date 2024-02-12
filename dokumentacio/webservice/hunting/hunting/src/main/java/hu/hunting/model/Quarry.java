package hu.hunting.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Quarry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "animal_race")
    private String animalRace;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_id")
    private AnimalType type;

    @OneToMany(mappedBy = "quarry")
    private List<Shoot> shoots;

    public Quarry(Integer id, String animalRace, AnimalType type) {
        this.id = id;
        this.animalRace = animalRace;
        this.type = type;
    }

    public Quarry() {
    }

    public List<Shoot> getShoots() {
        return shoots;
    }

    public void setShoots(List<Shoot> shoots) {
        this.shoots = shoots;
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

    @Override
    public String toString() {
        return "Quarry{" +
                "id=" + id +
                ", animalRace='" + animalRace + '\'' +
                ", type=" + type +
                ", shoots=" + shoots +
                '}';
    }
}
