package hu.hunting.converter;

import hu.hunting.dto.hunt.GetHunt;
import hu.hunting.dto.hunt.ListItemHunt;
import hu.hunting.dto.hunt.SaveHunt;
import hu.hunting.dto.hunter.ListItemHunter;
import hu.hunting.model.Hunt;

import java.text.SimpleDateFormat;
import java.util.List;

public class HuntConverter {


    public static GetHunt convertHuntToGetHunt(Hunt hunt, List<ListItemHunter> hunters){
        GetHunt getHunt = new GetHunt();
        getHunt.setId(hunt.getId());
        getHunt.setLocation(hunt.getLocation());
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        getHunt.setStartDate(format.format(hunt.getStartDate()));
        long startDateMilliSecs= hunt.getStartDate().getTime();
        long endDateMilliSecs= hunt.getEndDate().getTime();
        long diffMilliSecs = endDateMilliSecs - startDateMilliSecs;
        long countDays = diffMilliSecs/(1000*60*60*24)+1;
        getHunt.setCountDays((int)(countDays));
        getHunt.setHunters(hunters);
        return getHunt;
    }

    public static Hunt convertSaveHuntToHunt(Integer id, SaveHunt saveHunt) {
        Hunt hunt = new Hunt();
        hunt.setId(id);
        hunt.setLocation(saveHunt.getLocation());
        hunt.setStartDate(saveHunt.getStartDate());
        hunt.setEndDate(saveHunt.getEndDate());
        return hunt;
    }
    public static Hunt convertSaveHuntToHunt(SaveHunt saveHunt) {
        Hunt hunt = new Hunt();
        hunt.setLocation(saveHunt.getLocation());
        hunt.setStartDate(saveHunt.getStartDate());
        hunt.setEndDate(saveHunt.getEndDate());
        return hunt;
    }

    public static ListItemHunt convertHuntToListItemHunt(Hunt hunt) {
        ListItemHunt listItemHunt = new ListItemHunt();
        listItemHunt.setId(hunt.getId());
        listItemHunt.setLocation(hunt.getLocation());
        return listItemHunt;
    }
}
