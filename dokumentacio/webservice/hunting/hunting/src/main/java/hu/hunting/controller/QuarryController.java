package hu.hunting.controller;

import hu.hunting.dto.quarry.CreateQuarry;
import hu.hunting.dto.quarry.FilterQuarry;
import hu.hunting.dto.quarry.GetQuarry;
import hu.hunting.dto.quarry.ListItemQuarry;
import hu.hunting.repository.QuarryRepository;
import hu.hunting.service.QuarryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Tag(name="Quarry API", description = "Zsákmányok kezelése")
public class QuarryController {

    @Autowired
    private QuarryService service;

    @PostMapping("/quarry/list")
    @Operation(summary = "Zsákmányok listázása",
            description = "Zsákmányok listázása állatfaj szerint (ha tartalmazza a beírt karakterláncot)")
    public List<ListItemQuarry> listQuarries(@RequestBody FilterQuarry filterQuarry){
        return service.listQuarries(filterQuarry);
    }

    @GetMapping("/quarry/{id}")
    @Operation(summary = "Zsákmány lekérdezése",
            description = "Zsákmány lekérdezése azonosító alapján")
    public GetQuarry readQuarry(@PathVariable Integer id){
        return service.readQuarry(id);
    }

    @PostMapping("/quarry")
    @Operation(summary = "Zsákmány rögzítése",
            description = "Zsákmány rögzítése a rendszerbe")
    public GetQuarry createQuarry(@RequestBody CreateQuarry createQuarry){
        return service.createQuarry(createQuarry);
    }

}
