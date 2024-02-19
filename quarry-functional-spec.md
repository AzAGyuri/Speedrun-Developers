# Zsákmányok kezelése - Funkcionális specifikáció

## Általános leírás

Alapfunkciók: Zsákmányok kilistázása állatfaj szerint. Zsákmányok rögzítése.
Kiegészítő funkciók:

* Zsákmány kilövés rögzítése vadászhoz

## Használati esetek

1. Új zsákmány rögzítése
2. Zsákmány adatainak megjelenítése
3. Zsákmányok listázása
4. Zsákmány szerzése hozzárendelése a vadászhoz

### Használati eset diagram

![Használati eset diagram](zsakmany_kezeles.png)

### Használati esetek rövid leírása

| #                          | Új zsákmány rögzítése                                                                                                                                               |
|----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Azonosító                  | UC_HR_Create                                                                                                                                                        |
| Leírás                     | Új zsákmány rögzítése a rendszerben                                                                                                                                 |
| Kiváltó esemény            | A vadász vadat lőtt le, és azt rögzíteni kíván                                                                                                                      |
| Elsődleges lefutás         | A verseny felelős az új zsákmány rögzítése felületén áll <br/> Megadja az adatokat és megnyomja a létrehozás gombot <br/> A rendszerben rögzítésre kerül a zsákmány |
| Alternatívák és kivételek  | -                                                                                                                                                                   |
| Utófeltétel                | A zsákmány sikeresen rögzítésre kerül a rendszerben                                                                                                                 |
| Eredmény                   | A felhasználó az új zsákmányt letudja kérni                                                                                                                         |
| Használati eset realizáció | Technikai model                                                                                                                                                     |

| #                          | Zsákmányok listázása állatfaj szerint                                                                                                                                                                                                                                   |
|----------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Azonosító                  | UC_HR_List                                                                                                                                                                                                                                                              |
| Leírás                     | Állatfaj alapján a zsákmányok listázása                                                                                                                                                                                                                                 |
| Kiváltó esemény            | A felhasználó megkívánja tekinteni rendszerben rögzített zsákmányok összességét bizonyos állatfaj szerint                                                                                                                                                               |
| Elsődleges lefutás         | A felhasználó a webes felületen megadja az állatfajt, melyet keresni akar, és megnyomja a keresés gombot <br/> A rendszer válaszul visszaküldi a feltételnek megfelelő zsákmányokat  <br/> A frontend listázza a felhasználónak a válaszul kapott listányi zsákmányokat |
| Alternatívák és kivételek  | -                                                                                                                                                                                                                                                                       |
| Utófeltétel                | A zsákmányok lekérdezésre kerülnek az adatbázisból                                                                                                                                                                                                                      |
| Eredmény                   | A felhasználó számára megjelenítésre kerül a frontenden                                                                                                                                                                                                                 |
| Használati eset realizáció | Technikai model                                                                                                                                                                                                                                                         |

| #                          | Zsákmány lekérdezése                                                                                                                                                                             |
|----------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Azonosító                  | UC_HR_Read                                                                                                                                                                                       |
| Leírás                     | Rendszerben rögzített zsákmány lekérdezése                                                                                                                                                       |
| Kiváltó esemény            | A felhasználó megkívánja tekinteni egy adott zsákmány szerzés részletes adatait                                                                                                                  |
| Elsődleges lefutás         | A frontenden a felhasználó kiválaszt egy zsákmány szerzést a listázó oldalon <br/> A rendszer kikeresi számos azonosító alapján a zsákmányt <br/> A frontenden megjelenítésre kerülnek az adatok |
| Alternatívák és kivételek  | E1: A keresett zsákmány nem létezik                                                                                                                                                              |
| Utófeltétel                | A zsákmány adatok megjelenítésre kerülnek<br/>E1: A frontend hibát jelez a felhasználó számára, a lekérdezés nem történik meg                                                                    |
| Eredmény                   | A felhasználó a zsákmány adatait letudja kérni                                                                                                                                                   |
| Használati eset realizáció | Technikai model                                                                                                                                                                                  |
