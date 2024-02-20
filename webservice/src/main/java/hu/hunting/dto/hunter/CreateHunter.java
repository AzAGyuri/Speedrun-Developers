package hu.hunting.dto.hunter;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class CreateHunter {

    private String firstName;
    @NotNull
    @Size(min=1)
    private String lastName;

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
