package hu.hunting.controller;

import hu.hunting.dto.hunt.GetHuntWithParticipate;
import hu.hunting.dto.participate.CreateParticipate;
import hu.hunting.dto.participate.ListItemParticipate;
import hu.hunting.service.ParticipateService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jdk.jfr.Description;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Tag(name = "Participate API", description = "Vadászatra jelentkezések kezelése")
public class ParticipateController {

    @Autowired
    private ParticipateService service;

    @PostMapping("/participate/list")
    @Operation(summary = "Jelentkezések listázása", description = "Jelentkezések listázása szűrés nélkül")
    public List<ListItemParticipate> listParticipates(){
        return service.listParticipates();
    }

    @PostMapping("/participate")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Új jelentkezés rögzítése")
    public GetHuntWithParticipate createParticipate(@RequestBody CreateParticipate createParticipate){
        return service.createParticipate(createParticipate);
    }
}
