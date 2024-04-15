## Felhasználó kezelő API

### Vezérlő

#### `GET(/user/{id})`

Lekéri egy felhasználó adatait az adatbázisból az azonosító alapján.

- **Kérés:**
  - Metódus: `GET`
  - Végpont: `/user/{id}`
  - Bemenet:
    - Útvonal: `id` - A felhasználó azonosítója.
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
  - Bemenet:
    - Test: `UpdateUser` - A frissített felhasználói adatok.
      ```json
      {
        "nickname": "string",
        "email": "string",
        "passwordRaw": "string",
        "phoneNumber": "string"
      }
      ```
    - Fejléc: `Authorization` - A felhasználó JSON Web Token-je.
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

### Szolgáltatás

A `UserService` osztály végzi a felhasználókkal kapcsolatos üzleti logikát és adatelérést.

#### Metódusok

- `getUser(id: Integer)`: Felhasználó összes adatainak lekérdezése, azonosítója alapján.
- `updateUser(changes: UpdateUser, token: String)`: Felhasználó adatainak frissítése JWT alapján.

### Adatbázis

A `UserRepository` metódusokat biztosít a felhasználói adatok eléréséhez az adatbázisból, többek között egyedi lekérdezéseket is tartalmaz a felhasználók különböző szempontok szerinti lekérdezéséhez.

#### Egyedi Lekérdezések

- `getUsersCreatedSinceDate(date: LocalDateTime)`: Felhasználók lekérése egy adott dátum óta.
- `getTeachers()`: Az összes tanár felhasználó lekérése.
- `getUnderageStudents()`: Kiskorú diák felhasználók lekérése.
- `getByUsername(username: String)`: Felhasználó lekérése felhasználónév alapján.
- `findAllNotDeleted()`: Az összes nem törölt felhasználó lekérése.
