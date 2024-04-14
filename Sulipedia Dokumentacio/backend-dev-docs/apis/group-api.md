## Csoport kezelő API

### Vezérlő

#### `GET(/group)`

Az adatbázisban tárolt összes csoport kilistázása a felhasználó JWT-je alapján.

- **Metódus:** `GET`
- **Végpont:** `/group`
- **Kérelemfejléc:** `Authorization` - A felhasználó JSON Web Token-je.
- **Válasz:**
    - **Állapot:** `200 OK`
    - **Csoport:** `GroupList` - Az összes csoport, amelyben a felhasználó részt vesz.
- **Kivételek:**
    - `USER_NOT_FOUND`: A felhasználó nem található.

---

#### `GET(/group/{id})`

Az adatbázisban tárolt egy csoport lekérdezése minden adatával.

- **Metódus:** `GET`
- **Végpont:** `/group/{id}`
- **Kérelemfejléc:** `Authorization` - A felhasználó JSON Web Token-je.
- **Paraméter:** `id` - A csoport azonosítója.
- **Válasz:**
    - **Csoport:** `GetGroupWithUsers` - A csoport és a hozzá tartozó felhasználók.
- **Kivételek:**
    - `USER_NOT_FOUND`: A felhasználó nem található.
    - `GROUP_NOT_FOUND`: A csoport nem található.
    - `USER_REQUESTING_INFO_IS_NOT_PART_OF_GROUP`: A felhasználó nem tagja a csoportnak.

---

#### `POST(/group)`

Az adatbázisban létrehozni és eltárolni egy új csoportot.

- **Metódus:** `POST`
- **Végpont:** `/group`
- **Kérelem:** `PostGroup` - Az új csoport adatai.
- **Kérelemfejléc:** `Authorization` - A felhasználó JSON Web Token-je.
- **Válasz:**
    - **Csoport:** `GetGroupWithUsers` - Az új csoport és a hozzá tartozó felhasználók.
- **Kivételek:**
    - `USER_NOT_FOUND`: A felhasználó nem található.
    - `NO_SPECIALIZATIONS_SUPPLIED`: Nincsenek megadva a szakosodások.

---

#### `PUT(/group/{id})`

Az adatbázisban eltárolt csoportba beszúrni egy új felhasználót név szerint.

- **Metódus:** `PUT`
- **Végpont:** `/group/{id}`
- **KérelemCsoport:** `List<String>` - A felhasználónevek listája.
- **Kérelemfejléc:** `Authorization` - A felhasználó JSON Web Token-je.
- **Paraméter:** `id` - A csoport azonosítója.
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

- **Metódus:** `DELETE`
- **Végpont:** `/group/{groupId}/{userId}`
- **Kérelemfejléc:** `Authorization` - A felhasználó JSON Web Token-je.
- **Paraméterek:** `groupId` - A csoport azonosítója, `userId` - A felhasználó azonosítója.
- **Válasz:**
    - **Csoport:** `GetGroupWithUsers` - A frissített csoport és a törlésre került felhasználók.
- **Kivételek:**
    - `GROUP_NOT_FOUND`: A csoport nem található.
    - `USER_NOT_FOUND`: A felhasználó nem található.
    - `USER_NOT_IN_GROUP`: A felhasználó nem tagja a csoportnak.
    - `USER_REQUESTING_REMOVAL_IS_NOT_GROUP_CREATOR`: A kérő felhasználó nem a csoport létrehozója.
    - `USER_REQUESTING_DELETION_IS_GROUP_CREATOR`: A kérő felhasználó a csoport létrehozója.

---

#### `DELETE(/group/{id})`

Az adatbázisban eltárolt csoport kitörlése ID alapján.

- **Metódus:** `DELETE`
- **Végpont:** `/group/{id}`
- **Kérelemfejléc:** `Authorization` - A felhasználó JSON Web Token-je.
- **Paraméter:** `id` - A csoport azonosítója.
- **Válasz:**
    - **Csoport:** `GetGroupWithID` - A törölt csoport adatai.
- **Kivételek:**
    - `GROUP_NOT_FOUND`: A csoport nem található.
    - `USER_NOT_FOUND`: A felhasználó nem található.
    - `USER_REQUESTING_GROUP_DELETE_IS_NOT_CREATOR`: A kérő felhasználó nem a csoport létrehozója.
    - `GROUP_REQUESTED_FOR_DELETION_IS_NOT_EMPTY`: A csoport nem üres.