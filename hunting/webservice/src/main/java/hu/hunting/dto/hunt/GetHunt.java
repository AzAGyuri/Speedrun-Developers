package hu.hunting.dto.hunt;

import hu.hunting.dto.hunter.ListItemHunter;

import java.util.List;

public class GetHunt {
    private Integer id;
    private String location;
    private String startDate;
    private int countDays;
    private List<ListItemHunter> hunters;

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

    public int getCountDays() {
        return countDays;
    }

    public void setCountDays(int countDays) {
        this.countDays = countDays;
    }

    public List<ListItemHunter> getHunters() {
        return hunters;
    }

    public void setHunters(List<ListItemHunter> hunters) {
        this.hunters = hunters;
    }
}
