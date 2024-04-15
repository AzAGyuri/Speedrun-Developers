## Komment kezelő API

### Vezérlő

#### `GET(/comment/{entryId})`

Egy adott bejegyzéshez tartozó kommentek lekérése az azonosító alapján.

- **Kérés:**
  - Metódus: `GET`
  - Végpont: `/comment/{entryId}`
  - Bemenet: 
    - Útvonal: `entryId` - A bejegyzés azonosítója, amelyhez a kommenteket le szeretnénk kérni.
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
    - Test: `comment` - `PostComment` kérelem test:
      ```json
      {
        "content": "string",
        "entryId": "integer"
      }
      ```
    - Fejléc: `jwt` - A felhasználó JSON Web Token-je.
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
    - Útvonal: `id` - A törlendő komment azonosítója.
    - Fejléc: `jwt` - A felhasználó JSON Web Token-je.
- **Válasz:**
  - Állapot: `200 OK`
  - Test: `true` - Sikeres törlés esetén.
- **Kivételek:**
  - `INTERNAL_SERVER_ERROR`: Váratlan null érték vagy belső szerverhiba.
  - `NOT_FOUND`: A megadott azonosítóval nem található komment az adatbázisban.
  - `NOT_FOUND`: A felhasználói adatok nem találhatók a JWT-ből.
  - `FORBIDDEN`: A törlési kérelem benyújtója nem a komment szerzője.

### Szolgáltatás

A `CommentService` felelős a kommentekkel kapcsolatos üzleti logika kezeléséért.

#### Metódusok

- `getCommentsByEntryId(entryId: Integer)`: Kommentek lekérése egy adott bejegyzéshez.
- `createComment(comment: PostComment, token: String)`: Új komment létrehozása.
- `deleteComment(id: Integer, token: String)`: Komment törlése.

### Adatbázis

A `CommentRepository` metódusokat biztosít a kommentek adatbázisból történő eléréséhez.

#### Egyedi Lekérdezések

- `findAllByEntryId(entryId: Integer)`: Kommentek lekérése egy adott bejegyzéshez.
