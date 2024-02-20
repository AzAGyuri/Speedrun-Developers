package hu.hunting.service;

import hu.hunting.converter.ParticipateConverter;
import hu.hunting.dto.hunt.GetHuntWithParticipate;
import hu.hunting.dto.participate.CreateParticipate;
import hu.hunting.dto.participate.ListItemParticipate;
import hu.hunting.exception.HuntNotFoundException;
import hu.hunting.exception.HunterAlreadySignedUpForHunt;
import hu.hunting.exception.HunterNotFoundException;
import hu.hunting.model.Hunt;
import hu.hunting.model.Hunter;
import hu.hunting.model.Participate;
import hu.hunting.repository.HuntRepository;
import hu.hunting.repository.HunterRepository;
import hu.hunting.repository.ParticipateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ParticipateService {

    @Autowired
    private ParticipateRepository repository;
    @Autowired
    private HuntRepository huntRepository;
    @Autowired
    private HunterRepository hunterRepository;

    public GetHuntWithParticipate createParticipate(CreateParticipate createParticipate) {
        Integer huntId = createParticipate.getHuntId();
        Integer hunterId = createParticipate.getHunterId();
        if(!huntRepository.existsById(huntId))
            throw new HuntNotFoundException();
        if(!hunterRepository.existsById(hunterId))
            throw new HunterNotFoundException();
        if(repository.countOfParticipatesByHuntAndHunter(huntId, hunterId)>0)
            throw new HunterAlreadySignedUpForHunt();
        Hunt hunt = huntRepository.getReferenceById(createParticipate.getHuntId());
        Hunter hunter = hunterRepository.getReferenceById(createParticipate.getHunterId());
        Participate savingParticipate = ParticipateConverter.convertCreateParticipateToParticipate(hunt, hunter);
        Participate savedParticipate = repository.save(savingParticipate);
        List<String> hunterNames = hunterRepository.findAllHunterNameByHunt(createParticipate.getHuntId());
        GetHuntWithParticipate getHuntWithParticipate =
                ParticipateConverter.convertParticipateToGetHuntWithParticipate(hunterNames, hunt);
        return getHuntWithParticipate;
    }

    public List<ListItemParticipate> listParticipates() {
        List<Participate> participates = repository.findAll(Sort.by(Sort.Direction.DESC, "id"));
        List<ListItemParticipate> listItemParticipates= new ArrayList<>();
        for (Participate participate : participates) {
            listItemParticipates.add(ParticipateConverter.convertParticipateToListItemParticipate(participate));
        }
        return listItemParticipates;
    }
}

