# Vadász módosítása

| #                 | alapadatok                 |
|-------------------|----------------------------|
| Elnevezés         | Vadász módosítása          |
| Adatküldés formája | REST                       |
| Http method       | PUT                        |
| url               | localhost:8080/hunter/{id} |
| útvonal változó   | id = Vadászazonosító       |

## A végpont célja

Kiválasztott vadász adatainak módosítása

## A végpont működése

### kapott adatok
| request paraméterek | leírás                    |
|---------------------|---------------------------|
| id                  | Vadász egyedi azonosítója |
| firstName           | Vadász keresztneve        |
| lastName            | Vadász vezetékneve        |

### Validáció

* a kapott id alapján kell, hogy legyen rögzítve Vadász a rendszerben
* a request: firstName nem lehet üres

Validációs hiba esetén a folyamat leáll, a response hibaüzenetet küld

| faultType                          | leírás                        |
|------------------------------------|-------------------------------|
| HUNTER_NOT_FOUND                   | A keresett vadász nem létezik |
| HUNTER_FIRSTNAME_MUST_NOT_BE_EMPTY | Vadász keresztneve hiányzik   |

### Működés

1. A request: id alapján lekérdezésere kerül a vadász az adatbázisból.
2. A [Hunter](entity-hunter.md) entitás módosításra kerül


| mező | érték                                        |
|------|----------------------------------------------|
| name | request: lastName + " " + request: firstName |

2. A response összeállítása

| response paraméterek | érték                                    |
|----------------------|------------------------------------------|
| id                   | hunter.id                                |
| name                 | hunter.lastName + " " + hunter.firstName |

3. A response elküldése