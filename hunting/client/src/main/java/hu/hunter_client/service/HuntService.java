package hu.hunter_client.service;

import hu.hunter_client.dto.hunt.CreateHunt;
import hu.hunter_client.dto.hunt.ListHunt;
import hu.hunter_client.dto.hunt.OneHunt;
import hu.hunter_client.dto.hunter.OneHunter;
import hu.hunter_client.dto.hunter.SaveHunter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Service
public class HuntService {

    private final String HUNT_LIST = "/hunt/list";

    private final String HUNT = "/hunt";

    @Autowired
    private RestTemplate restTemplate;


    public List<ListHunt> showHunts() {
        ResponseEntity<ListHunt[]> hunts =
                restTemplate.postForEntity(BaseUrl.BASE_URL + HUNT_LIST,
                        null, ListHunt[].class);
        return Arrays.asList(hunts.getBody());
    }

    public OneHunt getHunt(Integer id) {
        OneHunt oneHunt = restTemplate.getForObject(BaseUrl.BASE_URL + HUNT + BaseUrl.ID, OneHunt.class, id);
        return oneHunt;
    }

    public void deleteHunt(Integer deletehuntid) {
        restTemplate.delete(BaseUrl.BASE_URL + HUNT + BaseUrl.ID, deletehuntid);
    }

    public OneHunt createNewHunt(String location, String startdate, String enddate) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        CreateHunt createHunt = null;
        try {
            createHunt = new CreateHunt(location, format.parse(startdate), format.parse(enddate));
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        HttpEntity<CreateHunt> request = new HttpEntity<>(createHunt);
        ResponseEntity<OneHunt> response= restTemplate.postForEntity(BaseUrl.BASE_URL + HUNT,
                request, OneHunt.class);
        return response.getBody();
    }
}
