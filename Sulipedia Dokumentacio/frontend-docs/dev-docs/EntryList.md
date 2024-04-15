## EntryList Komponens

Az `EntryList` komponens egy listát jelenít meg bejegyzésekről egy adott témában. A bejegyzésekhez hozzászólásokat lehet írni.

### Props

- `children`: Opcionális, a komponens gyerekei.
- `jwt`: A JSON Web Token, amely az autentikációt biztosítja.
- `setIsLoading`: Egy állapot beállító függvény, ami jelzi, hogy az adatok betöltődtek-e.
- `isLoading`: Egy állapot, ami jelzi, hogy éppen történik-e adatbetöltés.
- `subject`: A bejegyzések témáját meghatározó string.

### Funkciók

- `handleEntryClick(entry)`: Egy bejegyzésre kattintás eseménykezelője, megjeleníti a bejegyzéshez tartozó hozzászólásokat.

- `handleCommentSubmit()`: Új hozzászólás beküldése a kiválasztott bejegyzéshez.

- `handleCommentDelete(index)`: Egy hozzászólás törlése az azonosítója alapján.

### Fontos információk

- Az adatok aszinkron módon kerülnek lekérdezésre és megjelenítésre. Amíg az adatok betöltődnek, egy töltőképernyő jelenik meg.

- A hozzászólások csak bejelentkezett felhasználók által küldhetők el. A JSON Web Token (`jwt`) beállítása szükséges az autentikációhoz.

- A komponens a MUI (Material-UI) komponenseit használja a stílusozáshoz és az UI elemek megjelenítéséhez.