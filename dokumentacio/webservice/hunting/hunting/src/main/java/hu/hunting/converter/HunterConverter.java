package hu.hunting.converter;

import hu.hunting.dto.hunter.CreateHunter;
import hu.hunting.dto.hunter.GetHunter;
import hu.hunting.dto.hunter.ListItemHunter;
import hu.hunting.model.Hunter;

public class HunterConverter {

    public static ListItemHunter convertHunterToListItemHunter(Hunter hunter){
        ListItemHunter listItemHunter = new ListItemHunter();
        listItemHunter.setId(hunter.getId());
        listItemHunter.setName(hunter.getName());
        return listItemHunter;
    }

    public static GetHunter convertHunterToGetHunter(Hunter hunter){
        GetHunter getHunter = new GetHunter();
        getHunter.setId(hunter.getId());
        getHunter.setName(hunter.getName());
        return getHunter;
    }

    public static Hunter convertCreateHunterToHunter(CreateHunter createHunter){
        Hunter hunter = new Hunter();
        if(createHunter.getFirstName()==null)
            hunter.setName(createHunter.getLastName());
        else
            hunter.setName(createHunter.getFirstName() + " " + createHunter.getLastName());
        return hunter;
    }
}
