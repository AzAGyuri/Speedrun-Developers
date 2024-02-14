# Vadászok listázása

| #                 | alapadatok                 |
|-------------------|----------------------------|
| Elnevezés         | Vadász lekérdezése         |
| Adatküldés formája | REST                       |
| Http method       | POST                       |
| url               | localhost:8080/hunter/list |
| útvonal változó   | -                          |

## A végpont célja

Minden vadász listázása

## A végpont működése

### kapott adatok
Kapott adatok nincsenek
### Validáció


### Működés

1. Minden [Hunter](entity-hunter.md) entitás lekérdezése egy listába
2. 

| szűrő paraméter | Érintett JPA entitás mező | Illesztési szabály                                 |
   |-----------------|---------------------------|----------------------------------------------------|
| firstName       | Hunter.firstName          | tartalmazza(részleges egyezés)                     |
| minAge          | Hunter.age                | >=                                                 |
| zipCode         | Hunter.Address.zipCode    | teljes egyezés                                     |
| huntStartDate   | Hunter.Hunt.date          | huntStartDate<date<huntEndDate                     |
| huntEndDate     | Hunter.Hunt.date          | [huntStartDate; huntStartDate] (zárt intervallum)  |
| huntEndDate     | Hunter.Hunt.date          | ]huntStartDate; huntStartDate[ (nyílt intervallum) |

3. A response elküldése