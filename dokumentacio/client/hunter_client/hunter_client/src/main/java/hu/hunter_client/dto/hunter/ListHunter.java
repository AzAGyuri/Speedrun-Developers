package hu.hunter_client.dto.hunter;

public class ListHunter {

    private Integer id;
    private String name;

    public ListHunter(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    public ListHunter() {
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
}
