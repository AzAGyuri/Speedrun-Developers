package hu.hunter_client.dto.hunter;

public class OneHunter {
    private Integer id;
    private String name;

    public OneHunter(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    public OneHunter() {
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
