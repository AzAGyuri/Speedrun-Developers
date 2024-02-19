# Vadászokatok kezelése - Technikai specifikáció

## Használati esetek realizációja


## Új vadászat rögzítése

Használati eset azonosító: UC_H_Create

A frontend
* az Új vadászat rögzítése felületen
* a Mentés gomb megnyomásával

meghívja

* a POST /hunt azonosítójú,"[Új vadászat rögzítése (REST)](rest-hunt-create.md)" elnevezésű végpontot

az alábbi mapping megvalósításával:



| Végpont input paraméter | Forrás                          |
|-------------------------|---------------------------------|
| location                | Helyszín mező                   |
| startDate               | Vadászat kezdetének dátuma mező |
| endDate                 | Vadászat végének dátuma mező    |

A response visszaadja a rögzített vadászat adatait. Mapping:

| Végpont output paraméter | Felhasználás a megtekintés felületen                                        |
|--------------------------|-----------------------------------------------------------------------------|
| id                       | Nem jelenik meg. A frontend használja a szerkesztés és a törlés funkciókhoz |
| location                 | Helyszín címke                                                              |
| startDate                | Kezdés dátuma címke                                                         |
| endDate                  | Befejezés dátuma címke                                                      |



### Vadászat adatainak megjelenítése

Használati eset azonosító: UC_H_Read

A frontend
* a Vadászatok listázása felületen
* a Részletek gomb megnyomásával

meghívja

* a GET /hunt /{id} azonosítójú,"Vadászat lekérdezése (REST)" elnevezésű végpontot

az alábbi mapping megvalósításával:



| Végpont input paraméter | Forrás                                             |
|-------------------------|----------------------------------------------------|
| id (pathUrl)            | A frontenden rendelkezésére álló vadászatazonosító |

A response visszaadja a vadászat adatait. Mapping:

| Végpont output paraméter | Felhasználás a megtekintés felületen                                        |
|--------------------------|-----------------------------------------------------------------------------|
| id                       | Nem jelenik meg. A frontend használja a szerkesztés és a törlés funkciókhoz |
| location                 | Helyszín címke                                                              |
| startDate                | Kezdés időpontja címke                                                      |
| endDate                  | Befejezés időpontja címke                                                   |



### Vadászat adatainak módosítása

Használati eset azonosító: UC_H_Update

A frontend
* az Vadászat szerkesztése felületen
* a Mentés gomb megnyomásával

meghívja

* a PUT /hunt/{id} azonosítójú,"Vadászat adatainak módosítása (REST)" elnevezésű végpontot

az alábbi mapping megvalósításával:



| Végpont input paraméter | Forrás                                             |
|-------------------------|----------------------------------------------------|
| id (pathUrl)            | A frontenden rendelkezésére álló vadászatazonosító |
| location                | Helyszín mező                                      |

A response visszaadja a rögzített vadászat adatait. Mapping:

| Végpont output paraméter | Felhasználás a megtekintés felületen                                        |
|--------------------------|-----------------------------------------------------------------------------|
| id                       | Nem jelenik meg. A frontend használja a szerkesztés és a törlés funkciókhoz |
| location                 | Helyszín címke                                                              |

### Vadászat törlése

Használati eset azonosító: UC_H_Delete

A frontend
* a Vadászat megtekintése felületen
* a Törlés gomb megnyomásával

meghívja

* a DELETE /hunt/{id} azonosítójú,"Vadászat törlése (REST)" elnevezésű végpontot

az alábbi mapping megvalósításával:



| Végpont input paraméter | Forrás                                             |
|-------------------------|----------------------------------------------------|
| id (pathUrl)            | A frontenden rendelkezésére álló vadászatazonosító |

A response visszaadja a vadászat adatait. Mapping:

| Végpont output paraméter | Felhasználás a listázó felületen                                            |
|--------------------------|-----------------------------------------------------------------------------|
| boolean                  | Nem jelenik meg. |

### Vadászat listázása

Használati eset azonosító: UC_H_List

A frontend
* a Vadászatok menügomb megnyomásával

meghívja

* a POST /hunt/list azonosítójú,"Vadászatok listázása (REST)" elnevezésű végpontot

az alábbi mapping megvalósításával:



| Végpont input paraméter | Forrás |
|------------------------|--------|
| -                      | -      |

A response visszaadja a vadászat adatait. Mapping:

| Végpont output paraméter | Felhasználás a listázó felületen                                       |
|--------------------------|------------------------------------------------------------------------|
| id[]                     | Nem jelenik meg. <br/> A frontend használja a Megjelenítés funkciókhoz |
| location[]               | Helyszín oszlop                                                        |
| startDate[]              | Kezdés dátuma oszlop                                                   |
| endDate[]                | Befejezés dátuma oszlop                                                |

## Érintett komponens

backend: hu.hunt
frontend: hu.hunt