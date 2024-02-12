package hu.hunting.model;

import jakarta.persistence.*;

@Entity
public class Participate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name="hunt_id")
    private Hunt hunt;
    @ManyToOne
    @JoinColumn(name="hunter_id")
    private Hunter hunter;

    public Participate(Integer id, Hunt hunt, Hunter hunter) {
        this.id = id;
        this.hunt = hunt;
        this.hunter = hunter;
    }

    public Participate() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Hunt getHunt() {
        return hunt;
    }

    public void setHunt(Hunt hunt) {
        this.hunt = hunt;
    }

    public Hunter getHunter() {
        return hunter;
    }

    public void setHunter(Hunter hunter) {
        this.hunter = hunter;
    }
}
