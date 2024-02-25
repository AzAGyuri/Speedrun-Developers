# Új vadász rögzítése


| #                 | alapadatok            |
|-------------------|-----------------------|
| Elnevezés         | Új vadász rögzítése   |
| Adatküldés formája | REST                  |
| Http method       | POST                  |
| url               | localhost:8080/hunter |
| útvonal változó   | -                     |

## A végpont célja

Új vadász rögzítése a rendszerbe.

## A végpont működése

### Kapott adatok

| request paraméterek | leírás             |
|---------------------|--------------------|
| firstName           | Vadász keresztneve |
| lastName            | Vadász vezetékneve |

### Validáció

* A request: firstName nem lehet üres.

Ha a validáció sikertelen, a folyamat leáll, a response hibaüzenetet küld.

| faultType                         | leírás                      |
|-----------------------------------|-----------------------------|
| HUNTER_FIRSTNAME_MUST_NOT_BE_EMTY" | Vadász keresztneve hiányzik |

## Müködése

1. A kapott adatok alapján rögzítése kerül egy új [Hunter](entity-hunter.md) entitás
2. | mező | érték                                        |
   |------|----------------------------------------------|
   | name | request: lastname + " " + request+ firstName |
3. Összeállításra kerül a response

   | response paraméterek | érték                                    |
   |----------------------|------------------------------------------|
   | id                   | hunter.id                                |
   | name                 | hunter.lastName + " " + hunter.firstName |
4. A response elküldése