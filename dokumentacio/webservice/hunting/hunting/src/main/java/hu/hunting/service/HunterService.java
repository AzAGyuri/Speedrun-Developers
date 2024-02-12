package hu.hunting.service;

import hu.hunting.converter.HunterConverter;
import hu.hunting.dto.hunter.CreateHunter;
import hu.hunting.dto.hunter.GetHunter;
import hu.hunting.dto.hunter.ListItemHunter;
import hu.hunting.exception.FirstNameExpectedException;
import hu.hunting.exception.HunterNotFoundException;
import hu.hunting.exception.HunterRemoveNotPossibleException;
import hu.hunting.model.Hunter;
import hu.hunting.repository.HunterRepository;
import hu.hunting.repository.ShootRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class HunterService {

    @Autowired
    private HunterRepository repository;
    @Autowired
    private ShootRepository shootRepository;


    public List<ListItemHunter> listHunters() {
        List<ListItemHunter> listItemHunterList = new ArrayList<>();
        List<Hunter> hunters = repository.findAll();
        for (Hunter hunter : hunters) {
            listItemHunterList.add(HunterConverter.convertHunterToListItemHunter(hunter));
        }
        return listItemHunterList;
    }

    public GetHunter getHunter(Integer id) {
        if(!repository.existsById(id))
            throw new HunterNotFoundException();
        Hunter hunter = repository.getReferenceById(id);
        GetHunter getHunter = HunterConverter.convertHunterToGetHunter(hunter);
        return getHunter;
    }

    public GetHunter createHunter(CreateHunter createHunter) {
        GetHunter getHunter = new GetHunter();
        if(createHunter.getFirstName().length()==0)
            throw new FirstNameExpectedException();
        Hunter savingHunter = HunterConverter.convertCreateHunterToHunter(createHunter);
        Hunter savedHunter = repository.save(savingHunter);
        getHunter = HunterConverter.convertHunterToGetHunter(savedHunter);
        return getHunter;
    }

    public boolean removeHunter(Integer id) {
        if(!repository.existsById(id))
            throw new HunterNotFoundException();
        if(shootRepository.countShootsByHunterId(id)>0)
            throw new HunterRemoveNotPossibleException();
        repository.deleteById(id);
        return true;
    }

    public GetHunter updateHunter(CreateHunter createHunter, Integer id) {
        if(!repository.existsById(id))
            throw new HunterNotFoundException();
        Hunter savingHunter = repository.getReferenceById(id);
        savingHunter.setName(createHunter.getFirstName()+" "+createHunter.getLastName());
        Hunter savedHunter = repository.save(savingHunter);
        GetHunter getHunter = HunterConverter.convertHunterToGetHunter(savedHunter);
        return getHunter;
    }
}
