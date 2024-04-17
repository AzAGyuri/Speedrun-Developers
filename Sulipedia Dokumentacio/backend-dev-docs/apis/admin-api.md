## Admin API

### Vezérlő

#### `DELETE(/admin/entry/{id})`

Adminisztrátor általi logikai törlése egy bejegyzésnek.

- **Kérés:**
  - Metódus: `DELETE`
  - Végpont: `/admin/entry/{id}`
  - Bemenet:
    - Útvonal: `id` - A törlendő bejegyzés azonosítója.
- **Válasz:**
  - Állapot: `200 OK`
  - Test: `GetEntryWithID` - A logikailag törölt bejegyzés adatai.
- **Kivételek:**
  - `INTERNAL_SERVER_ERROR`: Váratlan null érték vagy belső szerverhiba.
  - `NOT_FOUND`: A bejegyzés nem található az adatbázisban az ID alapján.

#### `DELETE(/admin/comment/{id})`

Adminisztrátor általi törlése egy kommentnek.

- **Kérés:**
  - Metódus: `DELETE`
  - Végpont: `/admin/comment/{id}`
  - Bemenet
    - Útvonal: `id` - A törlendő komment azonosítója.
- **Válasz:**
  - Állapot: `201 Created`
  - Test: `true` - Sikeres törlés esetén.
- **Kivételek:**
  - `INTERNAL_SERVER_ERROR`: Váratlan null érték vagy belső szerverhiba.
  - `NOT_FOUND`: A komment nem található az adatbázisban az ID alapján.

### Szolgáltatás

Az `AdminService` felelős a végpontokra érkező kérésekhez kötődő üzleti logikák végrehajtásáért

#### Metódusok

- `adminDeleteEntry(id: Integer)`: Egy bejegyzés logikai törlése azonosítója alapján.
- `adminDeleteComment(id: Integer)`: Egy komment törlése azonosítója alapján.

