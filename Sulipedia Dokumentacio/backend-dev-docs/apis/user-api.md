### Felhasználó API Vezérlő

#### `GET(/user/{id})`

Lekéri egy felhasználó adatait az adatbázisból az azonosító alapján.

- **Kérés:**
  - Metódus: `GET`
  - Végpont: `/user/{id}`
  - Bemenet: `id` - A felhasználó azonosítója (útvonalban)
- **Válasz:**
  - Állapot: `200 OK`
  - Test: `GetUserWithAvailabilities` - A lekért felhasználó adataival és rendelkezésre állásokkal.
- **Kivételek:**
  - `INTERNAL_SERVER_ERROR`: Váratlan null érték vagy belső szerverhiba.
  - `NOT_FOUND`: A felhasználó azonosítója nem található az adatbázisban.

---

#### `PUT(/user)`

Frissíti a felhasználó adatait az adatbázisban.

- **Kérés:**
  - Metódus: `PUT`
  - Végpont: `/user`
  - Bemenet: `UpdateUser` - A frissített felhasználói adatok (testbe)
  - Fejléc: `Authorization` - A felhasználó JSON Web Token-je
- **Válasz:**
  - Állapot: `200 OK`
  - Test: `GetUser` - A frissített felhasználó adataival.
- **Kivételek:**
  - `INTERNAL_SERVER_ERROR`: Váratlan null érték vagy belső szerverhiba.
  - `BAD_REQUEST`: Hibás kérés.
    - `INPUTS_ALL_NULL`: Minden frissített adat null értékű.
    - `NEW_DATA_IDENTICAL_TO_OLD`: A frissített adatok megegyeznek az eredetiekkel.
    - `UPDATED_ENTITY_DATA_MATCHED_OLD`: A frissített adatok megegyeznek az eredetiekkel, még a jelszó is.
  - `USER_NOT_FOUND`: A felhasználó nem található a token alapján.
  - `USER_EMAIL_ALREADY_TAKEN`: Az új e-mail cím már foglalt.
