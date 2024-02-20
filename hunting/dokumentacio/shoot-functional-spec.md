# Kilövés kezelése - Funkcionális specifikáció

## Általános leírás

Alapfunkciók: Kilövés rögzítése a rendszerbe. Kilövés adatainak kezelése.
Kiegészítő funkciók:

* Győztes vadászok lekérdezése zsákmány szerzések száma alapján

## Használati esetek

1. Új zsákmány hozzáadása
2. Zsákmány adatainak megjelenítése (Pl madár, emlős)
3. Zsákmány szűrése
4. Zsákmányok listázása
5. Zsákmányok lekérdezése

### Használati eset diagram

![Használati eset diagram](kiloves-kezeles.png)

### Használati esetek rövid leírása

| #                          | Új kilövés hozzáadása                                                                                                                                |
|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| Azonosító                  | UC_S_Create                                                                                                                                          |
| Leírás                     | Kilövés adatainak megadásával új kilövés rögzítése a rendszerben                                                                                     |
| Kiváltó esemény            | A felhasználó új kilövést kíván rögzíteni                                                                                                            |
| Elsődleges lefutás         | A verseny felelős az új kilövés rögzítése felületen áll   <br/> Megadja az adatokat és megnyomja a mentés gombot <br/> A rendszer rögzíti a kilövést |
| Alternatívák és kivételek  | E1: A megadott vadász nem létezik<br/>E2: A megadott zsákmány nem létezik<br/>A1: A vadász valamiért nem kerül                                       |
| Utófeltétel                | A kilövés sikeresen rögzítésre került a rendszerben<br/>E1/E2: A rögzítés nem került végrehajtásra                                                   |
| Eredmény                   | A felhasználó kap megerősítést a kilövés létrehozására                                                                                               |
| Használati eset realizáció | Technikai model        <br/>                                                                                                                         |

| #                          | Kilövések szűrése                                                                                                                      |
|----------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| Azonosító                  | UC_S_Filter                                                                                                                            |
| Leírás                     | Kilövések adatainak megjelenítése szűréssel                                                                                            |
| Kiváltó esemény            | A felhasználó meg kívánja nézni az összes kilövéseket vadász, zsákmány, vagy mindkettő azonosítója alapján                             |
| Elsődleges lefutás         | A felhasználó elnavigál a listázó felületre <br/> A backend elküld egy listányi kilövéseket <br/> A frontend megjeleníti a kilövéseket |
| Alternatívák és kivételek  | A1: Semmilyen feltétel alapján az összes kilövés megjelenítésre kerül                                                                  |
| Utófeltétel                | A rendszer lekérdezte a kilövés adatait a megadott szűrő alapján<br/>A1: Minden kilövés megjelenítésre kerül                           |
| Eredmény                   | A felhasználó látja a kilövés adatait                                                                                                  |
| Használati eset realizáció | Technikai model       <br/>                                                                                                            |

| #                          | Győztesek lekérdezése                                                                                                      |
|----------------------------|----------------------------------------------------------------------------------------------------------------------------|
| Azonosító                  | UC_Q_Get                                                                                                                   |
| Leírás                     | A győztes vadászok adatainak lekérdezése                                                                                   |
| Kiváltó esemény            | A felhasználó meg kívánja nézni az első három győztes adatait                                                              |
| Elsődleges lefutás         | A felhasználó a elnavigál a győztesek felületre <br/> A weboldal a backend válaszára megjeleníti az első három helyezettet |
| Alternatívák és kivételek  | -                                                                                                                          |
| Utófeltétel                | A rendszer megjeleníti a győztesek adatait                                                                                 |
| Eredmény                   | A felhasználó látja a győzteseket                                                                                          |
| Használati eset realizáció | Technikai model        <br/>                                                                                               |


