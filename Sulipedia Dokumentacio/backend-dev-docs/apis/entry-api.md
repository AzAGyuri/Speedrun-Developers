### Entry API Controller

A `EntryController` osztály a bejegyzéseket kezeli a Sulipédia projektben. Az alábbiakban felsoroljuk az osztály által biztosított végpontokat és műveleteket.

#### GET `/entry`

Listázza az összes nem teszt bejegyzést opcionális tantárgy szűréssel.

##### Leírás

Az adatbázisban tárolt összes nem teszt bejegyzés lekérdezése, opcionálisan tantárgy alapján szűrve.

##### Paraméterek

- `subject` (opcionális): A tantárgy neve, amely alapján szűrni szeretnénk a bejegyzéseket.

##### Válasz

- `EntryList`: Az összes nem teszt bejegyzést vagy a megadott tantárgyra szűrt bejegyzéseket tartalmazó lista.

#### GET `/entry/test`

Listázza az összes teszt bejegyzést opcionális tantárgy szűréssel.

##### Leírás

Az adatbázisban tárolt összes teszt bejegyzés lekérdezése, opcionálisan tantárgy alapján szűrve.

##### Paraméterek

- `subject` (opcionális): A tantárgy neve, amely alapján szűrni szeretnénk a teszt bejegyzéseket.

##### Válasz

- `EntryList`: Az összes teszt bejegyzést vagy a megadott tantárgyra szűrt bejegyzéseket tartalmazó lista.

#### POST `/entry`

Létrehoz egy új bejegyzést és menti az adatbázisba.

##### Leírás

Egy új bejegyzés létrehozása és mentése az adatbázisba.

##### Paraméterek

- `entry` (RequestBody): Az új bejegyzést leíró `PostEntry` DTO.
- `files` (RequestParam, opcionális): A bejegyzéshez csatolandó fájlok tömbje.
- `jwt` (RequestHeader): A felhasználó JSON Web Tokenje.

##### Válasz

- `GetEntryWithID`: Az újonnan létrehozott bejegyzést tartalmazó adatok, beleértve a csatolt fájlok letöltési linkeit, az írót a JWT-ből, és az új bejegyzés ID-ját.

##### Kivételek

- `INTERNAL_SERVER_ERROR`: Váratlan null pointer kivétel esetén.
- `BAD_REQUEST`: Hibás bemeneti paraméterek esetén.
- `NOT_FOUND`: Az író felhasználó nem található.
- `FORBIDDEN`: Hiányzó kérdések esetén.

### Entry Service

Az `EntryService` osztály végzi a bejegyzésekkel kapcsolatos üzleti logikát és adatelérést.

#### Metódusok

- `getEntriesByOptionalSubject(subject: SubjectDto): EntryList`: Az összes bejegyzés lekérése opcionális tantárgy szűréssel.
- `getTestsByOptionalSubject(subject: SubjectDto): EntryList`: Az összes teszt bejegyzés lekérése opcionális tantárgy szűréssel.
- `createEntry(entry: PostEntry, files: MultipartFile[], jwt: String): GetEntryWithID`: Új bejegyzés létrehozása és mentése az adatbázisba.