## Csoport kezelő API

### Vezérlő

#### `GET(/group)`

Az adatbázisban tárolt összes csoport kilistázása a felhasználó JWT-je alapján.

- **Kérés:**
  - Metódus: `GET`
  - Végpont: `/group`
  - Bemenet:
    - Fejléc: `Authorization` - A felhasználó JSON Web Token-je.
- **Válasz:**
  - Állapot: `200 OK`
  - Test: `GroupList` - Az összes csoport, amelyben a felhasználó részt vesz.
- **Kivételek:**
  - `USER_NOT_FOUND`: A felhasználó nem található.

---

#### `GET(/group/{id})`

Az adatbázisban tárolt egy csoport lekérdezése minden adatával.

- **Kérés:**
  - Metódus: `GET`
  - Végpont: `/group/{id}`
  - Bemenet:
    - Fejléc: `Authorization` - A felhasználó JSON Web Token-je.
    - Útvonal: `id` - A csoport azonosítója.
- **Válasz:**
  - Állapot: `200 OK`
  - Test: `GetGroupWithUsers` - A csoport és a hozzá tartozó felhasználók.
- **Kivételek:**
  - `USER_NOT_FOUND`: A felhasználó nem található.
  - `GROUP_NOT_FOUND`: A csoport nem található.
  - `USER_REQUESTING_INFO_IS_NOT_PART_OF_GROUP`: A felhasználó nem tagja a csoportnak.

---

#### `POST(/group)`

Az adatbázisban létrehozni és eltárolni egy új csoportot.

- **Kérés:**
  - Metódus: `POST`
  - Végpont: `/group`
  - Bemenet:
    - Test: `PostGroup` - Az új csoport adatai.
      ```json
      {
        "groupName": "string",
        "specializations": ["IT", "ECONOMY", "MANAGEMENT"],
        "descriptionContent": "string"
      }
      ```
    - Fejléc: `Authorization` - A felhasználó JSON Web Token-je.
- **Válasz:**
  - Állapot: `201 Created`
  - Test: `GetGroupWithUsers` - Az új csoport és a hozzá tartozó felhasználók.
- **Kivételek:**
  - `USER_NOT_FOUND`: A felhasználó nem található.
  - `NO_SPECIALIZATIONS_SUPPLIED`: Nincsenek megadva a szakosodások.

---

#### `PUT(/group/{id})`

Az adatbázisban eltárolt csoportba beszúrni egy új felhasználót név szerint.

- **Kérés:**
  - Metódus: `PUT`
  - Végpont: `/group/{id}`
  - Bemenet:
    - Test: `List<String>` - A hozzáadandó felhasználónevek listája.
    - Fejléc: `Authorization` - A felhasználó JSON Web Token-je.
    - Útvonal: `id` - A csoport azonosítója.
- **Válasz:**
  - **Csoport:** `GroupUserPutterResponse` - A beszúrt felhasználók és a nem talált felhasználók.
- **Kivételek:**
  - `GROUP_NOT_FOUND`: A csoport nem található.
  - `USERNAME_LIST_IS_EMPTY`: A felhasználónévlista üres.
  - `USERNAME_NOT_FOUND`: A felhasználó nem található.
  - `USER_REQUESTING_ADD_IS_NOT_GROUP_CREATOR`: A kérő felhasználó nem a csoport létrehozója.

---

#### `DELETE(/group/{groupId}/{userId})`

Az adatbázisban eltárolt csoportból egy felhasználót törlése saját ID-jaik alapján.

- **Kérés:**
  - Metódus: `DELETE`
  - Végpont: `/group/{groupId}/{userId}`
    - Fejléc: `Authorization` - A felhasználó JSON Web Token-je.
    - Útvonal:
      - `groupId` - A csoport azonosítója
      - `userId` - A felhasználó azonosítója.
- **Válasz:**
  - Test: `GetGroupWithUsers` - A frissített csoport és a törlésre került felhasználók.
- **Kivételek:**
  - `GROUP_NOT_FOUND`: A csoport nem található.
  - `USER_NOT_FOUND`: A felhasználó nem található.
  - `USER_NOT_IN_GROUP`: A felhasználó nem tagja a csoportnak.
  - `USER_REQUESTING_REMOVAL_IS_NOT_GROUP_CREATOR`: A kérő felhasználó nem a csoport létrehozója.
  - `USER_REQUESTING_DELETION_IS_GROUP_CREATOR`: A kérő felhasználó a csoport létrehozója.

---

#### `DELETE(/group/{id})`

Az adatbázisban eltárolt csoport kitörlése ID alapján.

- **Kérés:**
  - Metódus: `DELETE`
  - Végpont: `/group/{id}`
    - Fejléc: `Authorization` - A felhasználó JSON Web Token-je.
    - Útvonal: `id` - A csoport azonosítója.
- **Válasz:**
  - Test: `GetGroupWithID` - A törölt csoport adatai.
- **Kivételek:**
  - `GROUP_NOT_FOUND`: A csoport nem található.
  - `USER_NOT_FOUND`: A felhasználó nem található.
  - `USER_REQUESTING_GROUP_DELETE_IS_NOT_CREATOR`: A kérő felhasználó nem a csoport létrehozója.
  - `GROUP_REQUESTED_FOR_DELETION_IS_NOT_EMPTY`: A csoport nem üres.

### Szolgáltatás

A `GroupService` osztály végzi a csoportokkal kapcsolatos üzleti logikát és adatelérést.

#### Metódusok

- `listGroupsByUserJWT(token: String)`: A csoportok kilistázása kérést indító felhasználó JWT-je alapján.
- `getGroup(id: Integer, token: String)`: Egy csoport adatainak lekérése azonosító alapján, és kérő JWT-je alapján ellenőrizve, hogy van-e joga lekérni az adatokat.
- `createGroup(group: PostGroup, token: String)`: Új csoport létrehozása; létrehozója a kérést indítványozó felhasználó lesz, melyet JWT-ből nyerünk ki.
- `putUserIntoGroup(id: Integer, token: String, usernames: List<String>)`: Azonosító alapján csoporthoz tagok hozzáadása felhasználó nevek listájából. Ha egy adott felhasználó nem ismert az adatbázisban, azon felhasználónevek visszaküldésre kerülnek a válasz testben. JWT-vel validáljuk, hogy a kérőnek van-e joga ehhez a művelethez.
- `deleteUserFromGroup(groupId: Integer, userId: Integer, token: String)`: Azonosító alapján csoportból csoporttag kirúgása annak felhasználói azonosítója alapján. JWT-vel validáljuk, hogy a kérőnek van-e joga ehhez a művelethez.
- `deleteGroup(id: Integer, token: String)`: Csoport törlése azonosító alapján. JWT-vel validáljuk, hogy a kérőnek van-e joga ehhez a művelethez.

### Adatbázis

A `GroupRepository` metódusokat biztosít a csoportok adatbázisból történő eléréséhez.

#### Egyedi lekérdezések

- `findAllByUserId(userId: Integer)`: Felhasználó azonosítója alapján az összes csoport lekérdezése.