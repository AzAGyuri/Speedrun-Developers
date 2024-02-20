package hu.hunter_client.service;

import hu.hunter_client.dto.hunter.ListHunter;
import hu.hunter_client.dto.hunter.OneHunter;
import hu.hunter_client.dto.hunter.SaveHunter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
public class HunterService {

    @Autowired
    private RestTemplate restTemplate;

    private final String HUNTERS = "/hunter/list";
    private final String HUNTER = "/hunter";



    public List<ListHunter> showHunters() {
        ResponseEntity<ListHunter[]> hunters = restTemplate.postForEntity(BaseUrl.BASE_URL + HUNTERS, null, ListHunter[].class);
        return Arrays.asList(hunters.getBody());
    }

    public OneHunter showSelectedHunter(Integer id) {
        OneHunter oneHunter =
                restTemplate.getForObject(BaseUrl.BASE_URL + HUNTER + BaseUrl.ID, OneHunter.class, id);
        return oneHunter;
    }

    public OneHunter createNewHunter(String firstname, String lastname) {
        SaveHunter saveHunter = new SaveHunter(firstname, lastname);
        HttpEntity<SaveHunter> request = new HttpEntity<>(saveHunter);
        ResponseEntity<OneHunter> response= restTemplate.postForEntity(BaseUrl.BASE_URL + HUNTER,
                request, OneHunter.class);
        return response.getBody();
    }

    public OneHunter updateHunter(String firstname, String lastname, Integer editinghunterid) {
        SaveHunter saveHunter = new SaveHunter(firstname, lastname);
        HttpEntity<SaveHunter> request = new HttpEntity<>(saveHunter);
        ResponseEntity<OneHunter> response =
                restTemplate.exchange(BaseUrl.BASE_URL + HUNTER + BaseUrl.ID,
                        HttpMethod.PUT,
                        request,
                        OneHunter.class,
                        editinghunterid);
        return response.getBody();
    }
}
