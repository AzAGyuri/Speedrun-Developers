package hu.hunter_client.dto.hunt;

import java.util.Date;

public class CreateHunt {

    private String location;
    private Date startDate;
    private Date endDate;

    public CreateHunt(String location, Date startDate, Date endDate) {
        this.location = location;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public CreateHunt() {
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
}
