## Elérhetőség kezelő API

### Vezérlő

#### `GET(/availability)`

Az adatbázisban tárolt összes elérhetőség lekérdezése.

- **Kérés:**
  - Metódus: `GET`
  - Végpont: `/availability`
- **Válasz:**
  - Állapot: `200 OK`
  - Test: `AvailabilityList` - Az összes elérhetőség listája.

#### `POST(/availability)`

Egy új elérhetőség létrehozása és mentése az adatbázisban egy felhasználó számára.

- **Kérés:**
  - Metódus: `POST`
  - Végpont: `/availability`
  - Bemenet
    - Test: `availability` - `PostAvailability` kérelem test:
      ```json
      {
        "link": "string",
        "type": "AvailTypeDto ENUM"
      }
      ```
    - Fejléc: `jwt` - A felhasználó JSON Web Token-je.
- **Válasz:**
  - Állapot: `201 Created`
  - Test: `GetAvailabilityWithID` - Az újonnan létrehozott elérhetőség azonosítójával.
- **Kivételek:**
  - `INTERNAL_SERVER_ERROR`: Váratlan null érték vagy belső szerverhiba.
  - `NOT_FOUND`: A felhasználó nem található az adatbázisban a JWT alapján.

#### `PUT(/availability/{id})`

Az adatbázisban tárolt elérhetőség frissítése új adatokkal.

- **Kérés:**
  - Metódus: `PUT`
  - Végpont: `/availability/{id}`
  - Bemenet:
    - Test: `update` - `UpdateAvailability` kérelem test:
      ```json
      {
        "link": "string",
        "type": "AvailTypeDto ENUM"
      }
      ```
    - Útvonal: `id` - A változtatásra kerülő elérhetőség azonosítója.
    - Fejléc: `jwt` - A felhasználó JSON Web Token-je.
- **Válasz:**
  - Állapot: `200 OK`
  - Test: `GetAvailability` - A frissített elérhetőség adatai.
- **Kivételek:**
  - `INTERNAL_SERVER_ERROR`: Váratlan null érték vagy belső szerverhiba.
  - `NOT_FOUND`:
    - `USER_NOT_FOUND`: A felhasználó nem található az adatbázisban a JWT alapján.
    - `AVAILABILITY_NOT_FOUND`: Az azonosító nem felel meg egyetlen elérhetőségnek sem az adatbázisban.
  - `GONE`: A felhasználó, akihez tartozik az elérhetőség törölve lett.
  - `FORBIDDEN`: Nem a kérelem küldő felhasználóhoz tartozik a megadott elérhetőség.
  - `BAD_REQUEST`:
    - `ALL_UPDATE_DATA_MATCH_EXISTING_ENTITY_DATA`: Az összes frissítő információ megegyezik a már meglévő információ.
    - `UPDATED_ENTITY_DATA_STILL_MATCHES_OLD_DATA`: Frissítés után is megegyezett az összes információ.

#### `DELETE(/availability/{id})`

Az adatbázisban tárolt elérhetőség törlése; ez a folyamat nem visszafordítható!

- **Kérés**:
  - Metódus: `DELETE`
  - Végpont: `/availability/{id}`
  - Bemenet:
    - Útvonal: `id` - A törlésre kerülő elérhetőség azonosítója.
- **Válasz:**
  - Állapot: `200 OK`
  - Test: `GetAvailabilityWithID` - A törölt elérhetőség adatai.
- **Kivételek:**
  - `INTERNAL_SERVER_ERROR`: Váratlan null érték vagy belső szerverhiba.
  - `NOT_FOUND`:
    - `USER_NOT_FOUND`: A felhasználó nem található az adatbázisban a JWT alapján.
    - `AVAILABILITY_NOT_FOUND`: Az azonosító nem felel meg egyetlen elérhetőségnek sem az adatbázisban.
  - `FORBIDDEN`: Nem a kérelem küldő felhasználóhoz tartozik a megadott elérhetőség.

### Szolgáltatás

Az `AvailabilityService` felelős az elérhetőségekkel kapcsolatos üzleti logika kezeléséért.

#### Metódusok

- `listAllAvailabilities()`: Az összes elérhetőségek lekérése.
- `createAvailability(availability: PostAvailability, token: String)`: Új elérhetőség létrehozása.
- `updateAvailability(update: UpdateAvailability, id: Integer, token: String)`: Elérhetőség módosítása.
- `deleteAvailability(id: Integer, token: String)`: Elérhetőség törlése.

### Adatbázis

Az `AvailabilityRepository` metódusokat biztosít az elérhetőségek adatbázisból történő eléréséhez.
