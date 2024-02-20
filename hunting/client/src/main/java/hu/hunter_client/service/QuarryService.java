package hu.hunter_client.service;

import hu.hunter_client.dto.quarry.FilterQuarry;
import hu.hunter_client.dto.quarry.ListQuarry;
import hu.hunter_client.dto.quarry.ListQuarryToShow;
import hu.hunter_client.dto.shoot.ShootFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class QuarryService {

    private static final String QUARRIES = "/quarry/list";
    @Autowired
    private RestTemplate restTemplate;


    public List<ListQuarryToShow> listQuarries(String race) {
        FilterQuarry filter = new FilterQuarry(race);
        ResponseEntity<ListQuarry[]> listQuarry = restTemplate.postForEntity(
                BaseUrl.BASE_URL + QUARRIES,
                filter,
                ListQuarry[].class);
        List<ListQuarry> quarries = Arrays.asList(listQuarry.getBody());
        List<ListQuarryToShow> quarriesToShow = new ArrayList<>();
        for (ListQuarry quarry : quarries) {
            quarriesToShow.add(new ListQuarryToShow(quarry.getAnimalRace(),
                    quarry.getType()));
        }
        return quarriesToShow;
    }

    public List<ListQuarry> showQuarries(ShootFilter request) {
        ResponseEntity<ListQuarry[]> quarries = restTemplate.postForEntity(
                BaseUrl.BASE_URL + QUARRIES,
                request,
                ListQuarry[].class);
        return Arrays.asList(quarries.getBody());
    }
}
