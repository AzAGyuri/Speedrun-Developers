package hu.hunting.converter;

import hu.hunting.dto.quarry.AnimalTypeEnumDto;
import hu.hunting.dto.quarry.CreateQuarry;
import hu.hunting.dto.quarry.GetQuarry;
import hu.hunting.dto.quarry.ListItemQuarry;
import hu.hunting.model.AnimalType;
import hu.hunting.model.Quarry;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class QuarryConverter {

    public static ListItemQuarry convertQuarryToListItemQuarry(Quarry quarry){
        ListItemQuarry listItemQuarry = new ListItemQuarry();
        listItemQuarry.setId(quarry.getId());
        listItemQuarry.setAnimalRace(quarry.getAnimalRace());
        listItemQuarry.setType(AnimalTypeEnumDto.valueOf(quarry.getType().toString()));
        return listItemQuarry;
    }

    public static GetQuarry convertQuarryToGetQuarry(Quarry quarry){
        GetQuarry getQuarry = new GetQuarry();
        getQuarry.setId(quarry.getId());
        getQuarry.setAnimalRace(quarry.getAnimalRace());
        getQuarry.setType(AnimalTypeEnumDto.valueOf(quarry.getType().toString()));
        getQuarry.setLastSeenLocation(getLocation());
        return getQuarry;
    }

    public static Quarry convertCreateQuarryToQuarry(CreateQuarry createQuarry){
        Quarry quarry = new Quarry();
        quarry.setAnimalRace(createQuarry.getAnimalRace());
        quarry.setType(AnimalType.valueOf(createQuarry.getType().toString()));
        return quarry;
    }


    private static String getLocation(){
        List<String> locations = new ArrayList<>();
        locations.add("Sóstó");
        locations.add("Dominik háza");
        locations.add("Gyuri háza");
        locations.add("Kék");
        locations.add("Nagyhalász");
        locations.add("Kambodzsa");
        locations.add("Las Vegas");
        locations.add("Tisza");
        int index =  new Random().nextInt(0, locations.size());
        return locations.get(index);
    }


}
