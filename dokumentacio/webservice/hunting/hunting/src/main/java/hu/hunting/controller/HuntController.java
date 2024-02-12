package hu.hunting.controller;

import hu.hunting.dto.hunt.GetHunt;
import hu.hunting.dto.hunt.ListItemHunt;
import hu.hunting.dto.hunt.SaveHunt;
import hu.hunting.dto.hunt.UpdateHunt;
import hu.hunting.service.HuntService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Tag(name="Hunt API", description = "Vadászatok kezelése")
public class HuntController {

    @Autowired
    private HuntService service;

    @PostMapping("/hunt/list")
    @Operation(summary="Vadászatok listázása", description = "Vadászatok listázása szűrés nélkül")
    public List<ListItemHunt> listHunts(){
        return service.listHunts();
    }

    @PostMapping("/hunt")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Vadászat rögzítése")
    public GetHunt createHunt(@RequestBody SaveHunt saveHunt){
        return service.createHunt(saveHunt);
    }


    @GetMapping("/hunt/{id}")
    @Operation(summary="Vadászat lekérdezése", description = "Vadászat lekérdezése egyedi azonosító alapján")
    public GetHunt getHunt(@PathVariable Integer id){
        return service.getHunt(id);
    }

    @PutMapping("/hunt/{id}")
    @Operation(summary = "Vadászat módosítása", description = "Vadászat minden adatának módosítása")
    public GetHunt saveHunt(@PathVariable Integer id, @RequestBody SaveHunt saveHunt){
        return service.saveHunt(id, saveHunt);
    }

    @PatchMapping("/hunt/{id}")
    @Operation(summary = "Vadászat helyszín módosítása")
    public GetHunt updateHunt(@PathVariable Integer id, @RequestBody UpdateHunt updateHunt){
        return service.updateHunt(id, updateHunt);
    }

}
