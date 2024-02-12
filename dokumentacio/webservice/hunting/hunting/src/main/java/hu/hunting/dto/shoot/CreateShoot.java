package hu.hunting.dto.shoot;

import jakarta.persistence.criteria.CriteriaBuilder;

public class CreateShoot {
    private Integer hunterId;
    private Integer quarryId;

    public Integer getHunterId() {
        return hunterId;
    }

    public void setHunterId(Integer hunterId) {
        this.hunterId = hunterId;
    }

    public Integer getQuarryId() {
        return quarryId;
    }

    public void setQuarryId(Integer quarryId) {
        this.quarryId = quarryId;
    }
}
