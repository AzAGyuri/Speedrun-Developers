package hu.hunting.converter;

import hu.hunting.dto.shoot.ListItemShoot;
import hu.hunting.model.Hunter;
import hu.hunting.model.Quarry;
import hu.hunting.model.Shoot;

import java.util.Date;

public class ShootConverter {

    public static Shoot convertCreateShootToShoot(Hunter hunter, Quarry quarry){
        Shoot shoot = new Shoot();
        shoot.setHunter(hunter);
        shoot.setQuarry(quarry);
        shoot.setDateTime(new Date());
        return shoot;
    }

    public static ListItemShoot convertShootToListItemShoot(Shoot shoot){
        ListItemShoot listItemShoot = new ListItemShoot();
        listItemShoot.setId(shoot.getId());
        listItemShoot.setHunterName(shoot.getHunter().getName());
        listItemShoot.setQuarryRace(shoot.getQuarry().getAnimalRace());
        return listItemShoot;
    }

//    public static WinnersTrio convertShootToWinnerTrio(Shoot shoot) {
//        WinnersTrio winnersTrio = new WinnersTrio();
//        winnersTrio.setHunterId(shoot.getHunter().getId());
//        winnersTrio.setHunterName(shoot.getHunter().getName());
//        winnersTrio.setCountQuarries(shoot.getCount());
//        return winnersTrio;
//    }
}
