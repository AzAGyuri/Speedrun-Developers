# Új vadász törlése


| #                 | alapadatok                 |
|-------------------|----------------------------|
| Elnevezés         | Új vadász törlése          |
| Adatküldés formája| REST                       |
| Http method       | DELETE                     |
| url               | localhost:8080/hunter/{id} |
| útvonal változó   | id = Vadászazonosító       |

## A végpont célja

Vadász törlése a rendszerből.

## A végpont működése

### Kapott adatok

| request paraméterek | leírás                    |
|---------------------|---------------------------|
| id                  | Vadász egyedi azonosítója |

### Validáció

* a kapott id alapján kell, hogy legyen rögzítve Vadász a rendszerben
  Validációs hiba esetén a folyamat leáll, a response hibaüzenetet küld

  | faultType        | leírás                        |
  |------------------|-------------------------------|
  | HUNTER_NOT_FOUND | A keresett vadász nem létezik |

## Müködése

1. A kapott adatok alapján rögzítése kerül egy új [Hunter](entity-hunter.md) entitás törlésre kerül az adatbázisból
2. Sikeres törlés esetén a response egy true érték