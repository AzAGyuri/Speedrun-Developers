package hu.hunting.service;

import hu.hunting.converter.QuarryConverter;
import hu.hunting.dto.quarry.CreateQuarry;
import hu.hunting.dto.quarry.FilterQuarry;
import hu.hunting.dto.quarry.GetQuarry;
import hu.hunting.dto.quarry.ListItemQuarry;
import hu.hunting.exception.QuarryNotFoundException;
import hu.hunting.model.Quarry;
import hu.hunting.repository.QuarryRepository;
import org.apache.commons.collections4.Get;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class QuarryService {

    @Autowired
    private QuarryRepository repository;


    public List<ListItemQuarry> listQuarries(FilterQuarry filterQuarry) {
        List<Quarry> quarries = repository.findAllByAnimalRace(filterQuarry.getAnimalRace());
        List<ListItemQuarry> listItemQuarries = new ArrayList<>();
        for (Quarry quarry : quarries) {
            listItemQuarries.add(QuarryConverter.convertQuarryToListItemQuarry(quarry));
        }
        return listItemQuarries;
    }

    public GetQuarry readQuarry(Integer id) {
        if(!repository.existsById(id))
            throw new QuarryNotFoundException();
        Quarry quarry = repository.getReferenceById(id);
        GetQuarry getQuarry = QuarryConverter.convertQuarryToGetQuarry(quarry);
        return getQuarry;
    }

    public GetQuarry createQuarry(CreateQuarry createQuarry) {
        Quarry quarry = QuarryConverter.convertCreateQuarryToQuarry(createQuarry);
        Quarry savedQuarry = repository.save(quarry);
        GetQuarry getQuarry = QuarryConverter.convertQuarryToGetQuarry(savedQuarry);
        return getQuarry;
    }
}
