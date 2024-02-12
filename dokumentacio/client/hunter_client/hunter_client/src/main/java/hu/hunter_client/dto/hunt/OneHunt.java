package hu.hunter_client.dto.hunt;

import hu.hunter_client.dto.hunter.ListHunter;

import java.util.List;

public class OneHunt {

    private Integer id;
    private String location;
    private String startDate;
    private Integer countDays;
    private List<ListHunter> hunters;

    public OneHunt(Integer id, String location, String startDate, Integer countDays, List<ListHunter> hunters) {
        this.id = id;
        this.location = location;
        this.startDate = startDate;
        this.countDays = countDays;
        this.hunters = hunters;
    }

    public OneHunt() {
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

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public Integer getCountDays() {
        return countDays;
    }

    public void setCountDays(Integer countDays) {
        this.countDays = countDays;
    }

    public List<ListHunter> getHunters() {
        return hunters;
    }

    public void setHunters(List<ListHunter> hunters) {
        this.hunters = hunters;
    }
}
