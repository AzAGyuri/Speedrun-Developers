package hu.hunting.controller;

import hu.hunting.dto.shoot.CreateShoot;
import hu.hunting.dto.shoot.FilterShoot;
import hu.hunting.dto.shoot.ListItemShoot;
import hu.hunting.dto.shoot.Winner;
import hu.hunting.service.ShootService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Tag(name = "Shoot API", description = "Sikeres kilövések kezelése")
public class ShootController {

    @Autowired
    private ShootService service;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/shoot")
    @Operation(summary = "Kilövés rögzítése")
    public boolean createShoot(@RequestBody CreateShoot createShoot){
        return service.createShoot(createShoot);
    }

    @PostMapping("/shoot/list")
    @Operation(summary = "Kilölévések listázása", description = "Kilölévések listázása vadász és/vagy zsákmány alapján")
    public List<ListItemShoot> listShoots(@RequestBody FilterShoot filterShoot){
        return service.listShoots(filterShoot);
    }

    @GetMapping("/shoot/winners")
    @Operation(summary = "Győztes vadászok", description = "Az első három legtöb állatot elejtő vadász lekérdezése")
    public List<Winner> listWinners(){
        return service.findWinners();
    }




}
