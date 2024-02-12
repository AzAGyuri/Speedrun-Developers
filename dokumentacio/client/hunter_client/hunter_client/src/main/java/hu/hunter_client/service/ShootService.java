package hu.hunter_client.service;

import hu.hunter_client.dto.quarry.ListQuarry;
import hu.hunter_client.dto.shoot.NewShoot;
import hu.hunter_client.dto.shoot.ShootFilter;
import hu.hunter_client.dto.shoot.Winner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.embedded.netty.NettyWebServer;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
public class ShootService {

    private final String SHOOT = "/shoot";
    private final String WINNERS = "/winners";
    private final String LIST = "/list";




    @Autowired
    private RestTemplate restTemplate;


    public List<Winner> showWinners() {
       Winner[] winners = restTemplate.getForObject(BaseUrl.BASE_URL + SHOOT + WINNERS, Winner[].class);
       return Arrays.asList(winners);
    }


    public Boolean newShoot(Integer hunterId, Integer quarryId) {
        NewShoot newShoot = new NewShoot(hunterId, quarryId);
        if(restTemplate.postForObject(BaseUrl.BASE_URL + SHOOT, newShoot, Boolean.class)){
            return true;
        }
        return false;
    }
}
