package hu.hunting.dto.shoot;

public class WinnersFromDb {
    private int count;
    private int hunterId;

    public WinnersFromDb(int count, int hunterId) {
        this.count = count;
        this.hunterId = hunterId;
    }

    public WinnersFromDb() {
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public int getHunterId() {
        return hunterId;
    }

    public void setHunterId(int hunterId) {
        this.hunterId = hunterId;
    }

    @Override
    public String toString() {
        return "WinnersFromDb{" +
                "count=" + count +
                ", hunterId=" + hunterId +
                '}';
    }
}
