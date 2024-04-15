## Biztonsági kezelő API

### Vezérlő

#### `POST(/login)`

Felhasználó hitelesítése az adatbázisból.

- **Kérés:**
  - Metódus: `POST`
  - Végpont: `/login`
  - Test:
    - `UserLogin`: Tartalmazza a felhasználónév vagy e-mail címet és a nyers jelszót.
      ```json
      {
        "usernameOrEmail": "string",
        "passwordRaw": "string"
      }
      ```
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
  - Bemenet
    - Test:
      - `UserRegistration`: Tartalmazza a felhasználó felhasználónevét, nyers jelszavát, e-mail címét, és az opcionális telefonszámot és becenévet.
      ```json
      {
        "username": "string",
        "email": "string",
        "nickname": "string",
        "phoneNumber": "string",
        "passwordRaw": "string"
      }
      ```
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
  - Bemenet:
    - Fejléc: `Authorization` - A felhasználó JSON Web Token-je.
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
  - Bemenet:
    - Fejléc: `Authorization` - A felhasználó JSON Web Token-je.
- **Válasz:**
  - Állapot: `200 OK`
  - Test: `true` (sikeres ellenőrzést jelöl).

#### Segédmetódusok

- `convertRolesToStringArr(roles: Set<RoleDto>)`: A felhasználó szerepeinek átalakítása string tömbbé.
- `getJwtHeader(username: String, authorities: String[])`: JWT fejléc generálása a válaszhoz.

### Szolgáltatás

A `SecurityService` az üzleti logikát kezeli a felhasználók hitelesítése, regisztrálása és JWT validálása tekintetében.

#### Metódusok

- `login(user: UserLogin)`: Felhasználó hitelesítése megadott hitelesítő adatok alapján.
- `register(registrationInfo: UserRegistration)`: Új felhasználó regisztrálása.
- `logout(token: String)`: Kijelentkezés egy bejelentkezett felhasználóból.
- `isJWTValid(token: String)`: JWT lejárati idejének ellenőrzése.
