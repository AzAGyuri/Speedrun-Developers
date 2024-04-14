### Komment API Vezérlő

#### `GET(/comment/{entryId})`

Egy adott bejegyzéshez tartozó kommentek lekérése az azonosító alapján.

- **Kérés:**
  - Metódus: `GET`
  - Végpont: `/comment/{entryId}`
  - Bemenet: `entryId` - A bejegyzés azonosítója, amelyhez a kommenteket le szeretnénk kérni.
- **Válasz:**
  - Állapot: `200 OK`
  - Test: `CommentList` - A kért bejegyzéshez tartozó kommentek listája.
- **Kivételek:**
  - `INTERNAL_SERVER_ERROR`: Váratlan null érték vagy belső szerverhiba.
  - `NOT_FOUND`: A megadott azonosító nem felel meg egyetlen bejegyzésnek sem az adatbázisban.
  - `BAD_REQUEST`: A kért bejegyzés egy tesztbejegyzés, amelyhez nem lehet kommentet kérni.

#### `POST(/comment)`

Új komment létrehozása egy adott bejegyzéshez.

- **Kérés:**
  - Metódus: `POST`
  - Végpont: `/comment`
  - Bemenet:
    - `comment` - `PostComment` objektum, amely tartalmazza a komment tartalmát és a hozzá tartozó bejegyzés azonosítóját.
    - `jwt` - A felhasználó JSON Web Token-je.
- **Válasz:**
  - Állapot: `200 OK`
  - Test: `GetCommentWithID` - Az újonnan létrehozott komment adatai.
- **Kivételek:**
  - `INTERNAL_SERVER_ERROR`: Váratlan null érték vagy belső szerverhiba.
  - `NOT_FOUND`: A megadott azonosító nem felel meg egyetlen bejegyzésnek sem az adatbázisban.
  - `NOT_FOUND`: A felhasználói adatok nem találhatók a JWT-ben.
  
#### `DELETE(/comment/{id})`

Komment törlése az azonosítója alapján.

- **Kérés:**
  - Metódus: `DELETE`
  - Végpont: `/comment/{id}`
  - Bemenet:
    - `id` - A törlendő komment azonosítója.
    - `jwt` - A felhasználó JSON Web Token-je.
- **Válasz:**
  - Állapot: `200 OK`
  - Test: `true` - Sikeres törlés esetén.
- **Kivételek:**
  - `INTERNAL_SERVER_ERROR`: Váratlan null érték vagy belső szerverhiba.
  - `NOT_FOUND`: A megadott azonosítóval nem található komment az adatbázisban.
  - `NOT_FOUND`: A felhasználói adatok nem találhatók a JWT-ben.
  - `FORBIDDEN`: A törlési kérelem benyújtója nem a komment szerzője.

### Komment Szolgáltatás

A `CommentService` felelős a kommentekkel kapcsolatos üzleti logika kezeléséért.

#### Metódusok

- `getCommentsByEntryId`: Kommentek lekérése egy adott bejegyzéshez.
- `createComment`: Új komment létrehozása.
- `deleteComment`: Komment törlése.

### Komment Repository

A `CommentRepository` metódusokat biztosít a kommentek adatbázisból történő eléréséhez.

#### Egyedi Lekérdezések

- `findAllByEntryId`: Kommentek lekérése egy adott bejegyzéshez.