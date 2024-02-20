package hu.hunter_client.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import hu.hunter_client.dto.error.WebServerError;
import hu.hunter_client.dto.hunt.ListHunt;
import hu.hunter_client.dto.hunt.OneHunt;
import hu.hunter_client.dto.hunter.OneHunter;
import hu.hunter_client.service.HuntService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.Date;
import java.util.List;
import java.util.ListIterator;

@Controller
public class HuntController {

    @Autowired
    private HuntService service;

    @PostMapping("/hunts")
    public String showHunts(Model model){
        List<ListHunt> hunts = service.showHunts();
        model.addAttribute("listedHunts", hunts);
        return "hunts";
    }

    @GetMapping("/hunts")
    public String getShowHunts(Model model){
        return showHunts(model);
    }

    @GetMapping("/hunt/{id}")
    public String getHunt(@PathVariable Integer id, Model model){
        OneHunt hunt = service.getHunt(id);
        model.addAttribute("huntToShow", hunt);
        return "hunt";
    }

    @PostMapping("/new-hunt")
    public String createNewHunt(@RequestParam String location,
                                @RequestParam String startdate,
                                @RequestParam String enddate,
                                Model model){
        String template = "hunt";
        try {
            OneHunt hunt = service.createNewHunt(location, startdate, enddate);
            model.addAttribute("huntToShow", hunt);
        } catch(HttpClientErrorException ex){
            System.out.println("-------------------");
            String errorJson = ex.getMessage().substring(7, ex.getMessage().length()-1);
            ObjectMapper mapper = new ObjectMapper();
            try {
                WebServerError webServerError = mapper.readValue(errorJson, WebServerError.class);
                model.addAttribute("webServiceError", webServerError);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
            template = "error";

        }
        return template;
    }

    @DeleteMapping("/deletehunt")
    public String deleteHunt(@RequestParam Integer deletehuntid, Model model){
        service.deleteHunt(deletehuntid);
        List<ListHunt> hunts = service.showHunts();
        model.addAttribute("listedHunts", hunts);
        return "hunts";
    }

}
