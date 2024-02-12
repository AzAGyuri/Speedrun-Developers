package hu.hunting.service;

import hu.hunting.converter.ShootConverter;
import hu.hunting.dto.shoot.*;
import hu.hunting.exception.HunterNotFoundException;
import hu.hunting.exception.QuarryNotFoundException;
import hu.hunting.model.Hunter;
import hu.hunting.model.Quarry;
import hu.hunting.model.Shoot;
import hu.hunting.repository.HunterRepository;
import hu.hunting.repository.QuarryRepository;
import hu.hunting.repository.ShootRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ShootService {

    @Autowired
    private ShootRepository repository;
    @Autowired
    private HunterRepository hunterRepository;
    @Autowired
    private QuarryRepository quarryRepository;

    public boolean createShoot(CreateShoot createShoot) {
        if(!hunterRepository.existsById(createShoot.getHunterId()))
            throw new HunterNotFoundException();
        if(!quarryRepository.existsById(createShoot.getQuarryId()))
            throw new QuarryNotFoundException();
        Hunter hunter = hunterRepository.getReferenceById(createShoot.getHunterId());
        Quarry quarry = quarryRepository.getReferenceById(createShoot.getQuarryId());
        Shoot shoot = ShootConverter.convertCreateShootToShoot(hunter, quarry);
        Shoot savedShoot = repository.save(shoot);
        if(savedShoot!=null)
            return true;
        return false;
    }

    public List<ListItemShoot> listShoots(FilterShoot filterShoot) {
        List<ListItemShoot> listItemShoots = new ArrayList<>();
        List<Shoot> shoots = new ArrayList<>();
//        Mindkét értékre szűrt
        if((filterShoot.getHunterId() != null) && (filterShoot.getQuarryId() != null))
            shoots = repository.findAllByHunterAndQuarry(filterShoot.getHunterId(), filterShoot.getQuarryId());
//        Csak zsákmányra szűrt
        else if((filterShoot.getHunterId() == null) && (filterShoot.getQuarryId() != null))
            shoots = repository.findAllByQuarry(filterShoot.getQuarryId());
//        Csak vadászra szűrt
        else if((filterShoot.getHunterId() != null) && (filterShoot.getQuarryId() == null))
            shoots = repository.findAllByHunter(filterShoot.getHunterId());
        else
//            Semmire nem szűrt
            shoots = repository.findAll();
        for (Shoot shoot : shoots) {
            listItemShoots.add(ShootConverter.convertShootToListItemShoot(shoot));
        }
        return listItemShoots;
    }

    public List<Winner> findWinners(){
        return repository.findWinners();
    }


}
