package hu.hunter_client.controller;

import hu.hunter_client.dto.quarry.ListQuarry;
import hu.hunter_client.dto.quarry.ListQuarryToShow;
import hu.hunter_client.service.QuarryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class QuarryController {

    @Autowired
    private QuarryService service;

    @GetMapping("/quarries")
    public String getListQuarries(Model model){
        return listQuarries("", model);
    }
    @PostMapping("/quarries")
    public String listQuarries(@RequestParam String race, Model model){
        List<ListQuarryToShow> quarryList = service.listQuarries(race);
        model.addAttribute("quarryListToShow", quarryList);
        return "quarries";
    }


}
