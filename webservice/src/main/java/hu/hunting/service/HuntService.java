package hu.hunting.service;

import hu.hunting.converter.HuntConverter;
import hu.hunting.converter.HunterConverter;
import hu.hunting.dto.hunt.GetHunt;
import hu.hunting.dto.hunt.ListItemHunt;
import hu.hunting.dto.hunt.SaveHunt;
import hu.hunting.dto.hunt.UpdateHunt;
import hu.hunting.dto.hunter.ListItemHunter;
import hu.hunting.exception.HuntNotFoundException;
import hu.hunting.exception.TimeTravellingNotAcceptable;
import hu.hunting.model.Hunt;
import hu.hunting.model.Hunter;
import hu.hunting.repository.HuntRepository;
import hu.hunting.repository.HunterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class HuntService {

    @Autowired
    private HuntRepository repository;
    @Autowired
    private HunterRepository hunterRepository;


    public GetHunt getHunt(Integer id) {
        if(!repository.existsById(id))
            throw new HuntNotFoundException();
        Hunt hunt = repository.getReferenceById(id);
        List<ListItemHunter> listItemHunters = getListItemHunters(id);
        GetHunt getHunt = HuntConverter.convertHuntToGetHunt(hunt, listItemHunters);
        return getHunt;
    }

    private List<ListItemHunter> getListItemHunters(Integer id) {
        List<ListItemHunter> listItemHunters = new ArrayList<>();
        List<Hunter> hunters = hunterRepository.findAllByHunt(id);
        for (Hunter hunter : hunters) {
            listItemHunters.add(HunterConverter.convertHunterToListItemHunter(hunter));
        }
        return listItemHunters;
    }

    public GetHunt saveHunt(Integer id, SaveHunt saveHunt) {
        Date startDate = saveHunt.getStartDate();
        Date endDate = saveHunt.getEndDate();
        if(!repository.existsById(id))
            throw new HuntNotFoundException();
        if(endDate.before(startDate))
            throw new TimeTravellingNotAcceptable();
        Hunt savingHunt = HuntConverter.convertSaveHuntToHunt(id, saveHunt);
        Hunt savedHunt = repository.save(savingHunt);
        List<ListItemHunter> listItemHunters = getListItemHunters(id);
        GetHunt getHunt = HuntConverter.convertHuntToGetHunt(savedHunt, listItemHunters);
        return getHunt;
    }

    public GetHunt updateHunt(Integer id, UpdateHunt updateHunt) {
        if(!repository.existsById(id))
            throw new HuntNotFoundException();
        Hunt updatingHunt = repository.getReferenceById(id);
        updatingHunt.setLocation(updateHunt.getNewLocation());
        Hunt updatedHunt = repository.save(updatingHunt);
        List<ListItemHunter> listItemHunters = getListItemHunters(id);
        GetHunt getHunt = HuntConverter.convertHuntToGetHunt(updatedHunt, listItemHunters);
        return getHunt;
    }

    public List<ListItemHunt> listHunts() {
        List<ListItemHunt> listItemHunts = new ArrayList<>();
        List<Hunt> hunts = repository.findAll();
        for (Hunt hunt : hunts) {
            listItemHunts.add(HuntConverter.convertHuntToListItemHunt(hunt));
        }
        return listItemHunts;
    }

    public GetHunt createHunt(SaveHunt saveHunt) {
        Date startDate = saveHunt.getStartDate();
        Date endDate = saveHunt.getEndDate();
        if(endDate.before(startDate))
            throw new TimeTravellingNotAcceptable();
        Hunt savingHunt = HuntConverter.convertSaveHuntToHunt(saveHunt);
        Hunt savedHunt = repository.save(savingHunt);
        GetHunt getHunt = HuntConverter.convertHuntToGetHunt(savedHunt, null);
        return getHunt;
    }
}
