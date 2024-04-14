### Biztonsági API Vezérlő

#### `POST(/login)`

Felhasználó hitelesítése az adatbázisból.

- **Kérés:**
  - Metódus: `POST`
  - Végpont: `/login`
  - Test:
    - `UserLogin`: Tartalmazza a felhasználónév vagy e-mail címet és a nyers jelszót.
- **Válasz:**
  - Állapot: `200 OK`
  - Test:
    - `GetUserWithID`: A bejelentkezett felhasználó adatai.
  - Fejlécek:
    - `JWT`: Generált JWT a felhasználó számára.
- **Kivételek:**
  - `INTERNAL_SERVER_ERROR`: Váratlan null érték vagy belső szerverhiba.
  - `NOT_FOUND`: Felhasználónév vagy e-mail cím nem található.
  - `UNAUTHORIZED`: A megadott jelszó nem egyezik meg a megadott felhasználónévvel vagy e-mail címmel.

#### `POST(/register)`

Új felhasználó regisztrálása az adatbázisban.

- **Kérés:**
  - Metódus: `POST`
  - Végpont: `/register`
  - Test:
    - `UserRegistration`: Tartalmazza a felhasználó felhasználónevét, nyers jelszavát, e-mail címét, és az opcionális telefonszámot és becenévet.
- **Válasz:**
  - Állapot: `201 Created`
  - Test:
    - `GetUserWithID`: Az újonnan regisztrált felhasználó adatai.
  - Fejlécek:
    - `JWT`: Generált JWT a felhasználó számára.
- **Kivételek:**
  - `INTERNAL_SERVER_ERROR`: Váratlan null érték vagy belső szerverhiba.
  - `CONFLICT`: Az e-mail cím már foglalt.
  - `BAD_REQUEST`: Néhány kötelező bemeneti adat null értékű vagy üres, vagy a bemeneti jelszó érvénytelen.

#### `GET(/logout)`

Kijelentkezés egy már bejelentkezett felhasználóból.

- **Kérés:**
  - Metódus: `GET`
  - Végpont: `/logout`
  - Fejlécek:
    - `Authorization`: A felhasználó JSON Web Token-je.
- **Válasz:**
  - Állapot: `200 OK`
  - Test: `true` (sikeres kijelentkezést jelöl).
- **Kivételek:**
  - `INTERNAL_SERVER_ERROR`: Váratlan null érték vagy belső szerverhiba.
  - `NOT_FOUND`: Felhasználó nem található.

#### `GET(/validatetoken)`

A kérés fejlécében található JWT lejáratának tesztelése.

- **Kérés:**
  - Metódus: `GET`
  - Végpont: `/validatetoken`
  - Fejlécek:
    - `Authorization`: A felhasználó JSON Web Token-je.
- **Válasz:**
  - Állapot: `200 OK`
  - Test: `true` (sikeres ellenőrzést jelöl).

#### Segédmetódusok

- `convertRolesToStringArr`: A felhasználó szerepeinek átalakítása string tömbbé.
- `getJwtHeader`: JWT fejléc generálása a válaszhoz.

### Biztonsági Szolgáltatás

A `SecurityService` az üzleti logikát kezeli a felhasználók hitelesítése, regisztrálása és JWT validálása tekintetében.

#### Metódusok

- `login`: Felhasználó hitelesítése megadott hitelesítő adatok alapján.
- `register`: Új felhasználó regisztrálása.
- `logout`: Kijelentkezés egy bejelentkezett felhasználóból.
- `isJWTValid`: JWT lejárati idejének ellenőrzése.

### Felhasználó Repository

A `UserRepository` metódusokat biztosít a felhasználói adatok eléréséhez az adatbázisból, többek között egyedi lekérdezéseket is tartalmaz a felhasználók különböző szempontok szerinti lekérdezéséhez.

#### Egyedi Lekérdezések

- `getUsersCreatedSinceDate`: Felhasználók lekérése egy adott dátum óta.
- `getTeachers`: Az összes tanár felhasználó lekérése.
- `getUnderageStudents`: Kiskorú diák felhasználók lekérése.
- `getByUsername`: Felhasználó lekérése felhasználónév alapján.
- `findAllNotDeleted`: Az összes nem törölt felhasználó lekérése.