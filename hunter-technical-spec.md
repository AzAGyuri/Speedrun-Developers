# Vadászok kezelése - Technikai specifikáció

## Használati esetek realizációja


## Új vadász rögzítése

Használati eset azonosító: UC_HR_Create

A frontend
* az Új vadász rögzítése felületen
* a Mentés gomb megnyomásával

meghívja

* a POST /hunter azonosítójú,"Új vadász rögzítése (REST)" elnevezésű végpontot

az alábbi mapping megvalósításával:



| Végpont input paraméter    | Forrás          |
|----------------------------|-----------------|
| firstName                  | Utónév mező     |
| lastName                   | Vezetéknév mező |

A response visszaadja a rögzített vadász adatait. Mapping:

| Végpont output paraméter | Felhasználás a megtekintés felületen                                        |
|--------------------------|-----------------------------------------------------------------------------|
| id                       | Nem jelenik meg. A frontend használja a szerkesztés és a törlés funkciókhoz |
| name                     | Név címke                                                                   |



### Vadász adatainak megjelenítése

Használati eset azonosító: UC_HR_Read

A frontend
* a Vadászatok listázása felületen
* a Részletek gomb megnyomásával

meghívja

* a GET /hunter /{id} azonosítójú,"Vadász lekérdezése (REST)" elnevezésű végpontot

az alábbi mapping megvalósításával:



| Végpont input paraméter | Forrás                                           |
|-------------------------|--------------------------------------------------|
| id (pathUrl)            | A frontenden rendelkezésére álló vadászazonosító |

A response visszaadja a vadász adatait. Mapping:

| Végpont output paraméter | Felhasználás a megtekintés felületen                                        |
|--------------------------|-----------------------------------------------------------------------------|
| id                       | Nem jelenik meg. A frontend használja a szerkesztés és a törlés funkciókhoz |
| name                     | Név címke                                                                   |



### Vadász adatainak módosítása

Használati eset azonosító: UC_HR_Update

A frontend
* az Vadász szerkesztése felületen
* a Mentés gomb megnyomásával

meghívja

* a PUT /hunter/{id} azonosítójú,"Vadász adatainak módosítása (REST)" elnevezésű végpontot

az alábbi mapping megvalósításával:



| Végpont input paraméter | Forrás                                           |
|-------------------------|--------------------------------------------------|
| id (pathUrl             | A frontenden rendelkezésére álló vadászazonosító |
| firstName               | Utónév mező                                      |
| lastName                | Vezetéknév mező                                  |

A response visszaadja a rögzített vadász adatait. Mapping:

| Végpont output paraméter | Felhasználás a megtekintés felületen                                        |
|--------------------------|-----------------------------------------------------------------------------|
| id                       | Nem jelenik meg. A frontend használja a szerkesztés és a törlés funkciókhoz |
| name                     | Név címke                                                                   |

### Vadász törlése

Használati eset azonosító: UC_HR_Delete

A frontend
* a Vadász megtekintése felületen
* a Törlés gomb megnyomásával

meghívja

* a DELETE /hunter/{id} azonosítójú,"Vadász törlése (REST)" elnevezésű végpontot

az alábbi mapping megvalósításával:



| Végpont input paraméter | Forrás                                           |
|-------------------------|--------------------------------------------------|
| id (pathUrl)            | A frontenden rendelkezésére álló vadászazonosító |

A response visszaadja a vadász adatait. Mapping:

| Végpont output paraméter | Felhasználás a listázó felületen                                            |
|--------------------------|-----------------------------------------------------------------------------|
| boolean                  | Nem jelenik meg. |

### Vadász listázása

Használati eset azonosító: UC_HR_List

A frontend
* a Vadászok menügomb megnyomásával

meghívja

* a POSt /hunter/list azonosítójú,"Vadászok listázása (REST)" elnevezésű végpontot

az alábbi mapping megvalósításával:



| Végpont input paraméter | Forrás |
|------------------------|--------|
| -                      | -      |

A response visszaadja a vadász adatait. Mapping:

| Végpont output paraméter | Felhasználás a listázó felületen                                       |
|--------------------------|------------------------------------------------------------------------|
| id[]                     | Nem jelenik meg. <br/> A frontend használja a Megjelenítés funkciókhoz |
| name[]                   | Név oszlop                                                             |

## Érintett komponens

backend: hu.hunting
frontend: hu.hunting