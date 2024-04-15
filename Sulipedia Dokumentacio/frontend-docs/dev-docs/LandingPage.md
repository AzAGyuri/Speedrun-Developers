### Fejlesztői dokumentáció: LandingPage komponens

A `LandingPage` komponens felelős a Sulipedia főoldalának megjelenítéséért és a bejegyzések kezeléséért.

#### Props

- `children`: A komponens gyermek elemei.
- `setIsLoading`: Egy függvény, amely beállítja az oldal betöltési állapotát.
- `isLoading`: Egy állapotváltozó, amely jelzi az oldal betöltési állapotát.
- `jwt`: Egy JSON Web Token, amely az autentikációt és az autorizációt kezeli.

#### Állapotváltozók

- `open`: Egy logikai érték, ami azt jelzi, hogy a bevezető modális ablak nyitva van vagy sem.
- `newEntryModalOpen`: Egy logikai érték, ami azt jelzi, hogy az új bejegyzés modális ablak nyitva van vagy sem.
- `newEntryTitle`: Az új bejegyzés címe.
- `newEntryContent`: Az új bejegyzés tartalma.
- `newSubject`: Az új bejegyzés tantárgya.
- `subject`: Az aktuálisan kiválasztott tantárgy.
- `entries`: Az összes bejegyzés tömbje.
- `filteredEntries`: Az aktuálisan kiválasztott tantárgyhoz tartozó bejegyzések tömbje.

#### Metódusok

- `handleClose`: A bevezető modális ablak bezárásáért felelős függvény.
- `modalStayClosed`: A bevezető modális ablak újbóli megjelenésének tiltásáért felelős függvény.
- `handleNewEntryModalOpen`: Az új bejegyzés modális ablak megnyitásáért felelős függvény.
- `handleNewEntrySave`: Az új bejegyzés mentéséért felelős függvény.
- `handleNewEntryModalCancel`: Az új bejegyzés létrehozásának megszakításáért felelős függvény.
- `handleSubjectSelect`: Az aktuális tantárgy kiválasztásáért felelős függvény.

#### Effektek

- `useEffect`: Az oldal betöltésének és az adatok frissítésének kezelésére használva.
- `useMemo`: Az előre definiált statikus bejegyzések kezelésére használva.

#### Visszatérési érték

A `LandingPage` komponens visszaadja a főoldal megjelenítéséhez szükséges elemeket, beleértve a bevezető modális ablakot, az új bejegyzés modális ablakot és a tantárgyakat megjelenítő és azokhoz tartozó bejegyzéseket megjelenítő részeket.

A komponens biztosítja a felhasználóknak az új bejegyzések létrehozását és a tantárgyak közötti szűrést.