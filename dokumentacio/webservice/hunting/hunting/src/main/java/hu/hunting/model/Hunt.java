package hu.hunting.model;

import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
public class Hunt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String location;
    private Date startDate;
    private Date endDate;
    @OneToMany(mappedBy = "hunt")
    private List<Participate> participateList;

    public Hunt(Integer id, String location, Date startDate, Date endDate) {
        this.id = id;
        this.location = location;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Hunt() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public List<Participate> getParticipateList() {
        return participateList;
    }

    public void setParticipateList(List<Participate> participateList) {
        this.participateList = participateList;
    }
}
