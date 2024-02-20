package hu.hunter_client.dto.hunt;

public class ListHunt {
    private Integer id;
    private String location;

    public ListHunt(Integer id, String location) {
        this.id = id;
        this.location = location;
    }

    public ListHunt() {
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
}
