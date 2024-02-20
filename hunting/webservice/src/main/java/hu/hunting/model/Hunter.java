package hu.hunting.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Hunter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;


    @OneToMany(mappedBy = "hunter")
    private List<Participate> participateList;
    @OneToMany(mappedBy = "hunter")
    private List<Shoot> shoots;

    public Hunter() {
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Hunter(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    public List<Participate> getParticipateList() {
        return participateList;
    }

    public void setParticipateList(List<Participate> participateList) {
        this.participateList = participateList;
    }
}
