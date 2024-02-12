package hu.hunter_client.controller;

import hu.hunter_client.dto.hunter.ListHunter;
import hu.hunter_client.dto.hunter.OneHunter;
import hu.hunter_client.dto.quarry.ListQuarry;
import hu.hunter_client.dto.shoot.ShootFilter;
import hu.hunter_client.dto.shoot.Winner;
import hu.hunter_client.service.HunterService;
import hu.hunter_client.service.QuarryService;
import hu.hunter_client.service.ShootService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Controller
public class ShootController {

    @Autowired
    private ShootService service;
    @Autowired
    private HunterService hunterService;
    @Autowired
    private QuarryService quarryService;

    @GetMapping("/winners")
    public String showWinners(Model model){
        List<Winner> winners = new ArrayList<>();
        winners = service.showWinners();
        model.addAttribute("winner1", winners.get(0));
        model.addAttribute("winner2", winners.get(1));
        model.addAttribute("winner3", winners.get(2));
        return "winners";
    }

    @GetMapping("/shoot")
    public String showNewShootForms(Model model){
        ShootFilter shootFilter = new ShootFilter();
        shootFilter.setAnimalRace("");
        List<ListHunter> hunters = hunterService.showHunters();
        List<ListQuarry> quarries = quarryService.showQuarries(shootFilter);
        model.addAttribute("hunters", hunters);
        model.addAttribute("quarries", quarries);
        return "shoot";
    }


    @PostMapping("/shoot")
    public String newShoot(
            @RequestParam Integer hunterId,
            @RequestParam Integer quarryId,
            Model model){
        if(service.newShoot(hunterId, quarryId)){
            ShootFilter shootFilter = new ShootFilter();
            shootFilter.setAnimalRace("");
            List<ListHunter> hunters = hunterService.showHunters();
            List<ListQuarry> quarries = quarryService.showQuarries(shootFilter);
            model.addAttribute("hunters", hunters);
            model.addAttribute("quarries", quarries);
            return "shoot";
        }
        return "index";
    }


}
