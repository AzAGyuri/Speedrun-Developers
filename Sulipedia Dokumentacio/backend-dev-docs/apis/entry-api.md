## Bejegyzés kezelő API

### Vezérlő

#### `GET(/entry)`

Listázza az összes nem teszt bejegyzést opcionális tantárgy szűréssel.

- **Kérés:**
  - Metódus: `GET`
  - Végpont: `/entry`
  - Bemenet:
    - Paraméter: `subject` (opcionális) - A tantárgy neve, amely alapján szűrni szeretnénk a bejegyzéseket.
- **Válasz:**
  - Állapot: `200 OK`
  - Test: `EntryList` - Az összes nem teszt bejegyzést vagy a megadott tantárgyra szűrt bejegyzéseket tartalmazó lista.

#### `GET(/entry/test)`

Listázza az összes teszt bejegyzést opcionális tantárgy szűréssel.

- **Kérés:**
  - Metódus: `GET`
  - Végpont: `/entry/test`
  - Bemenet:
    - Paraméter: `subject` (opcionális) - A tantárgy neve, amely alapján szűrni szeretnénk a teszt bejegyzéseket.
- **Válasz:**
  - Állapot: `200 OK`
  - Test: `EntryList` - Az összes teszt bejegyzést vagy a megadott tantárgyra szűrt bejegyzéseket tartalmazó lista.

#### `POST(/entry)`

Létrehoz egy új bejegyzést és menti az adatbázisba.

- **Kérés:**

  - Metódus: `POST`
  - Végpont: `/entry`
  - Bemenet:

    - Test: `entry` - `PostEntry` kérelem test:

      ```json
      {
        "test": "string",
        "content": "string",
        "keep": "boolean",
        "test": "boolean",
        "questions": /*ha teszt a bejegyzés*/ [
          {
            "text": "string",
            "answers": [
              {
                "text": "string",
                "correct": "boolean"
              }
            ]
          }
        ] /* különben üres tömb, vagy null */,
        "subject": "SubjectDto enum"
      }
      ```

    - Paraméter (opcionális): `files` - A bejegyzéshez tartozó fetöltésre kerülő fájlok listája.
    - Fejléc: `jwt` - A felhasználó JSON Web Token-je.

- **Válasz:**
  - Állapot: `201 Created`
  - Test: `GetEntryWithID` - Az újonnan létrehozott bejegyzést tartalmazó adatok, beleértve a csatolt fájlok letöltési linkeit, az írót a JWT-ből, és az új bejegyzés ID-ját.
- **Kivételek:**
  - `INTERNAL_SERVER_ERROR`: Váratlan null pointer kivétel esetén.
  - `BAD_REQUEST`: Hibás bemeneti paraméterek esetén.
  - `NOT_FOUND`: Az író felhasználó nem található.
  - `FORBIDDEN`: Hiányzó kérdések esetén.

### Szolgáltatás

Az `EntryService` osztály végzi a bejegyzésekkel kapcsolatos üzleti logikát és adatelérést.

#### Metódusok

- `getEntriesByOptionalSubject(subject: SubjectDto): EntryList`: Az összes bejegyzés lekérése opcionális tantárgy szűréssel.
- `getTestsByOptionalSubject(subject: SubjectDto): EntryList`: Az összes teszt bejegyzés lekérése opcionális tantárgy szűréssel.
- `createEntry(entry: PostEntry, files: MultipartFile[], jwt: String): GetEntryWithID`: Új bejegyzés létrehozása és mentése az adatbázisba.

### Adatbázis

Az `EntryRepository` metódusokat biztosít a bejegyzések adatbázisból történő eléréséhez.

#### Egyedi Lekérdezések

- `findAllEntriesBySubject(subject: String)`: bejegyzések lekérése tantárgy alapján.
- `findAllTestsBySubject(subject: String)`: teszt bejegyzések lekérése tantárgy alapján.
- `findAllKept()`: megtartott bejegyzések lekérése.
- `findAllNotKept()`: nem megtartott bejegyzések lekérése.