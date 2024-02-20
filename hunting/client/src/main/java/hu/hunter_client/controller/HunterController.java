package hu.hunter_client.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import hu.hunter_client.dto.error.WebServerError;
import hu.hunter_client.dto.hunter.ListHunter;
import hu.hunter_client.dto.hunter.OneHunter;
import hu.hunter_client.dto.hunter.SaveHunter;
import hu.hunter_client.service.HunterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;
import java.util.Objects;

@Controller
public class HunterController {

    @Autowired
    private HunterService service;


    @GetMapping("/")
    public String home(){
        return "index";
    }

    @PostMapping("/hunters")
    public String showHunters(Model model){
        List<ListHunter> listHunters = service.showHunters();
        model.addAttribute("hunterListToShow", listHunters);
        return "hunters";
    }

    @GetMapping("/hunters")
    public String showHuntersGet(Model model){
        return showHunters(model);
    }

    @GetMapping("/hunter/{id}")
    public String showSelectedHunter(@PathVariable Integer id, Model model){
        OneHunter hunter = service.showSelectedHunter(id);
        model.addAttribute("hunterToShow", hunter);
        return "hunter";
    }

    @PostMapping("/new-hunter")
    public String createNewHunter(@RequestParam String firstname,
                                  @RequestParam String lastname,
                                  Model model){
        try{
            OneHunter hunter = service.createNewHunter(firstname, lastname);
            model.addAttribute("hunterToShow", hunter);
        }
        catch(HttpClientErrorException ex){
            String errorJson = ex.getMessage().substring(7, ex.getMessage().length()-1);
            ObjectMapper mapper = new ObjectMapper();
            try {
                WebServerError webServerError = mapper.readValue(errorJson, WebServerError.class);
                model.addAttribute("webServiceError", webServerError);
                return "error";
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }

        }
        return "hunter";
    }

    @PostMapping("/edithunter")
    public String showEditPage(@RequestParam Integer edithunterid, Model model){
        OneHunter hunter = service.showSelectedHunter(edithunterid);
        String firstName = hunter.getName().split(" ")[0];
        String lastName = hunter.getName().split(" ")[1];
        SaveHunter saveHunter = new SaveHunter(firstName, lastName);
        model.addAttribute("edithunterid", edithunterid);
        model.addAttribute("hunterToEdit", saveHunter);
        return "hunter_edit";
    }

    @PutMapping("/update-hunter")
    public String updateHunter(@RequestParam String firstname,
                               @RequestParam String lastname,
                               @RequestParam Integer editinghunterid,
                               Model model){
        OneHunter hunter = service.updateHunter(firstname, lastname, editinghunterid);
        model.addAttribute("hunterToShow", hunter);
        return "hunter";
    }


}
