package hu.hunting.converter;

import hu.hunting.dto.hunt.GetHuntWithParticipate;
import hu.hunting.dto.participate.CreateParticipate;
import hu.hunting.dto.participate.ListItemParticipate;
import hu.hunting.model.Hunt;
import hu.hunting.model.Hunter;
import hu.hunting.model.Participate;

import java.util.List;

public class ParticipateConverter {


    public static Participate convertCreateParticipateToParticipate(Hunt hunt, Hunter hunter) {
        Participate participate = new Participate();
        participate.setHunt(hunt);
        participate.setHunter(hunter);
        return participate;
    }

    public static GetHuntWithParticipate convertParticipateToGetHuntWithParticipate(List<String> hunterNames, Hunt hunt) {
        GetHuntWithParticipate getHuntWithParticipate = new GetHuntWithParticipate();
        getHuntWithParticipate.setLocation(hunt.getLocation());
        getHuntWithParticipate.setStartDate(hunt.getStartDate());
        getHuntWithParticipate.setEndDate(hunt.getEndDate());
        getHuntWithParticipate.setNameOfHunters(hunterNames);
        return getHuntWithParticipate;
    }

    public static ListItemParticipate convertParticipateToListItemParticipate(Participate participate) {
        ListItemParticipate listItemParticipate = new ListItemParticipate();
        listItemParticipate.setId(participate.getId());
        listItemParticipate.setHuntId(participate.getHunt().getId());
        listItemParticipate.setLocation(participate.getHunt().getLocation());
        listItemParticipate.setHunterId(participate.getHunter().getId());
        listItemParticipate.setHunterName(participate.getHunter().getName());
        return listItemParticipate;
    }
}
