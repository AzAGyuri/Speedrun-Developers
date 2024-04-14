Rendben, íme az Elérhetőségek API dokumentációja:

#### `GET(/availability)`

Az adatbázisban tárolt összes elérhetőség lekérdezése.

- **Metódus:** `GET`
- **Végpont:** `/availability`
- **Válasz:**
  - **Állapot:** `200 OK`
  - **Elérhetőség:** `AvailabilityList` - Az összes elérhetőség listája.
- **Kivételek:**
  - `INTERNAL_SERVER_ERROR`: Váratlan null érték vagy belső szerverhiba.

#### `POST(/availability)`

Egy új elérhetőség létrehozása és mentése az adatbázisban egy felhasználó számára.

- **Metódus:** `POST`
- **Végpont:** `/availability`
- **Kérelem:**
  ```json
  {
    "link": "string",
    "type": "ENUM"
  }
  ```
- **Válasz:**
  - **Állapot:** `201 Created`
  - **Elérhetőség:** `GetAvailabilityWithID` - Az újonnan létrehozott elérhetőség azonosítójával.
- **Kivételek:**
  - `INTERNAL_SERVER_ERROR`: Váratlan null érték vagy belső szerverhiba.
  - `NOT_FOUND`: A felhasználó nem található.

#### `PUT(/availability/{id})`

Az adatbázisban tárolt elérhetőség frissítése új adatokkal.

- **Metódus:** `PUT`
- **Végpont:** `/availability/{id}`
- **Kérelem:**
  ```json
  {
    "link": "string",
    "type": "ENUM"
  }
  ```
- **Válasz:**
  - **Elérhetőség:** `GetAvailability` - A frissített elérhetőség adatai.
- **Kivételek:**
  - `INTERNAL_SERVER_ERROR`: Váratlan null érték vagy belső szerverhiba.
  - `NOT_FOUND`: Az azonosító nem felel meg egyetlen elérhetőségnek sem az adatbázisban.

#### `DELETE(/availability/{id})`

Az adatbázisban tárolt elérhetőség törlése; ez a folyamat nem visszafordítható!

- **Metódus:** `DELETE`
- **Végpont:** `/availability/{id}`
- **Válasz:**
  - **Elérhetőség:** `GetAvailabilityWithID` - A törölt elérhetőség adatai.
- **Kivételek:**
  - `INTERNAL_SERVER_ERROR`: Váratlan null érték vagy belső szerverhiba.
  - `NOT_FOUND`: Az azonosító nem felel meg egyetlen elérhetőségnek sem az adatbázisban.
