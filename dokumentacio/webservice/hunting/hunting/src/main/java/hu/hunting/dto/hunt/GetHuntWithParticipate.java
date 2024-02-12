package hu.hunting.dto.hunt;

import java.util.Date;
import java.util.List;

public class GetHuntWithParticipate {

    private String location;
    private Date startDate;
    private Date endDate;
    private List<String> nameOfHunters;

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

    public List<String> getNameOfHunters() {
        return nameOfHunters;
    }

    public void setNameOfHunters(List<String> nameOfHunters) {
        this.nameOfHunters = nameOfHunters;
    }
}
