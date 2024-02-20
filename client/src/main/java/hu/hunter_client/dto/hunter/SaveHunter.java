package hu.hunter_client.dto.hunter;

public class SaveHunter {

    private String firstName;
    private String lastName;

    public SaveHunter(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public SaveHunter() {
    }


    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
