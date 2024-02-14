# Vadász lekérdezése

| #                 | alapadatok                 |
|-------------------|----------------------------|
| Elnevezés         | Vadász lekérdezése         |
| Adatküldés formája | REST                       |
| Http method       | GET                        |
| url               | localhost:8080/hunter/{id} |
| útvonal változó   | id = Vadászazonosító       |

## A végpont célja

Kiválasztott vadász adatainak lekérdezése

## A végpont működése

### kapott adatok
| request paraméterek | leírás                    |
|---------------------|---------------------------|
| id                  | Vadász egyedi azonosítója |
### Validáció

* a kapott id alapján kell, hogy legyen rögzítve Vadász a rendszerben
  Validációs hiba esetén a folyamat leáll, a response hibaüzenetet küld

  | faultType        | leírás                        |
    |------------------|-------------------------------|
  | HUNTER_NOT_FOUND | A keresett vadász nem létezik |

### Működés

1. A request: id alapján lekérdezésere kerül a vadász az adatbázisból.
2. A response összeállítása

| response paraméterek | érték                                    |
   |----------------------|------------------------------------------|
| id                   | hunter.id                                |
| name                 | hunter.lastName + " " + hunter.firstName |

3. A response elküldése