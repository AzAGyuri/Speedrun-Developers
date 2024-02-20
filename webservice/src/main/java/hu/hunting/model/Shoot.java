package hu.hunting.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Shoot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name="hunter_id")
    private Hunter hunter;

    @ManyToOne
    @JoinColumn(name = "quarry_id")
    private Quarry quarry;

    @Column(name = "date_time")
    private Date dateTime;


    public Shoot(Integer id, Hunter hunter, Quarry quarry, Date dateTime) {
        this.id = id;
        this.hunter = hunter;
        this.quarry = quarry;
        this.dateTime = dateTime;
    }


    public Shoot() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Hunter getHunter() {
        return hunter;
    }

    public void setHunter(Hunter hunter) {
        this.hunter = hunter;
    }

    public Quarry getQuarry() {
        return quarry;
    }

    public void setQuarry(Quarry quarry) {
        this.quarry = quarry;
    }

    public Date getDateTime() {
        return dateTime;
    }

    public void setDateTime(Date dateTime) {
        this.dateTime = dateTime;
    }


}
