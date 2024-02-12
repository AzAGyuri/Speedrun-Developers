package hu.hunting.controller;

import hu.hunting.dto.hunter.CreateHunter;
import hu.hunting.dto.hunter.GetHunter;
import hu.hunting.dto.hunter.ListItemHunter;
import hu.hunting.service.HunterService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.apache.commons.collections4.Get;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Tag(name="Hunter API", description = "Vadászok kezelése")
public class HunterController {

    @Autowired
    private HunterService service;

    @GetMapping("/hunter/{id}")
    @Operation(summary = "Vadász lekérdezése", description = "Vadász lekérdezése azonosító alapján")
    public GetHunter getHunter(@PathVariable Integer id){
        return service.getHunter(id);
    }

    @PostMapping("/hunter/list")
    @Operation(summary = "Vadászok listázása", description = "Minden vadász kilistázása")
    public List<ListItemHunter> listHunters(){
        return service.listHunters();
    }

    @PostMapping(path="/hunter")
    @Operation(summary = "Vadász létrehozása", description = "Új vadász rögzítése")
    public GetHunter createHunter(@Valid @RequestBody CreateHunter createHunter){
        return service.createHunter(createHunter);
    }

    @PutMapping(path="/hunter/{id}")
    @Operation(summary = "Vadász adatainak módosítása")
    public GetHunter updateHunter(@Valid @RequestBody CreateHunter createHunter, @PathVariable Integer id){
        return service.updateHunter(createHunter, id);
    }

    @DeleteMapping(path="/hunter/{id}")
    @Operation(summary = "Vadász törlése", description = "Vadász törlése azonosító alapján")
    public boolean removeHunter(@PathVariable Integer id){
        return service.removeHunter(id);
    }


}
