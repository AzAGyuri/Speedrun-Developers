# Új vadászat rögzítése


| #                 | alapadatok          |
|-------------------|---------------------|
| Elnevezés         | Új vadászat rögzítése |
| Adatküldés formája | REST                |
| Http method       | POST                |
| url               | localhost:8080/hunt |
| útvonal változó   | -                   |

## A végpont célja

Új vadászat rögzítése a rendszerbe.

## A végpont működése

### Kapott adatok

| request paraméterek | leírás                 |
|---------------------|------------------------|
| location            | Vadászat helyszíne     |
| startDate           | Vadászat kezdési ideje |
| endDate             | Vadászat végének ideje |

### Validáció

* A request: lcoation nem lehet üres.

Ha a validáció sikertelen, a folyamat leáll, a response hibaüzenetet küld.

| faultType                        | leírás                  |
|----------------------------------|-------------------------|
| HUNT_LOCATION_MUST_NOT_BE_EMPTY" | Vadászat helye hiányzik |

## Müködése

1. A kapott adatok alapján rögzítése kerül egy új [Hunt](entity-hunt.md) entitás
2. | mező     | érték             |
      |----------|-------------------|
   | location | request: location |
3. Összeállításra kerül a response

   | response paraméterek | érték       |
      |----------------------|-------------|
   | id                   | hunt.id     |
   | location             | hunt.location |
4. A response elküldése