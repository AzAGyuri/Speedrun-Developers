## `MyGroups` Komponens Fejlesztői Dokumentációja

### Bevezetés
A `MyGroups` komponens egy React komponens, amely egy felhasználóhoz tartozó csoportokat jeleníti meg, lehetőséget biztosít új csoportok létrehozására és meglévő csoportok törlésére, valamint tagok hozzáadására és eltávolítására.

### Komponens struktúrája
A `MyGroups` komponens a következő elemekből épül fel:
- **Container**: A `Container` komponens a Material-UI-ból származik, és a csoportok listáját tartalmazza.
- **Paper**: A `Paper` komponens a csoportok listáját tartalmazza, valamint lehetőséget biztosít új csoportok létrehozására.
- **Modal**: A `Modal` komponens segítségével jelenik meg az új csoport létrehozására szolgáló dialógusablak.
- **Loading**: Az oldal betöltése közben megjelenő animációt tartalmazó komponens, amely akkor jelenik meg, amikor az adatok betöltése folyamatban van.

### Főbb funkciók
1. **Csoportok megjelenítése**: A komponens a felhasználóhoz tartozó csoportokat listázza ki, azok nevével, leírásával és tagjaival.
2. **Új csoport létrehozása**: A felhasználó lehetőséget kap új csoport létrehozására a megfelelő gombra kattintva. Ekkor megjelenik egy dialógusablak, ahol megadhatja a csoport nevét, leírását és szakmáját.
3. **Csoport törlése**: A csoportokat a csoport nevére kattintva lehet törölni. Csak a csoport tulajdonosa (owner) törölheti a csoportot.
4. **Tagok hozzáadása és eltávolítása**: A csoport nevére kattintva megjelenik egy modális ablak, ahol láthatóak a csoport tagjai. Itt lehetőség van új tagok hozzáadására vagy meglévő tagok eltávolítására.

### Függvények és állapotok
- **useState**: A `useState` hook segítségével kezeljük az állapotokat, például a csoportok listáját (`groups`), az új csoport nevét (`groupName`), leírását (`groupDesc`), a specilizációkat (`specializations`), az új tag nevét (`newMemberName`) stb.
- **useEffect**: Az `useEffect` hook segítségével kezeljük az aszinkron műveleteket, például az adatok lekérdezését és frissítését.
- **Axios**: Az Axios segítségével kommunikálunk a szerverrel az adatok lekérdezése, mentése és törlése során.

### Telepítés és használat
1. Telepítés: A komponens működéséhez szükséges csomagok telepítése a következő paranccsal: `npm install @mui/material axios`.
2. Importálás: Importálás a következő módon történik: `import { MyGroups } from './MyGroups';`.

A dokumentáció az alkalmazás két új részletét mutatja be: a tagok megjelenítését és hozzáadását a csoportokhoz. Az alábbiakban bemutatom, hogyan lehet ezeket a részeket hozzáadni a MyGroups komponens dokumentációjához.

### Tagok megjelenítése

#### Feladat
A csoportokhoz tartozó tagok megjelenítése, beleértve a nevet, azonosítót, e-mail címet, regisztráció dátumát és a tagok eltávolítására szolgáló gombot.

#### Megvalósítás
1. A `Modal` komponensben található `showMembers` állapot figyeli, hogy meg kell-e jeleníteni a csoport tagjait.
2. A csoportokat tartalmazó listában minden csoport mellett található egy kattintható avatar. Ha erre kattintasz, megjelenik egy felugró ablak a csoport tagjaival.
3. A tagok adatait egy listában jelenítjük meg, amely tartalmazza a nevet és egy törlés gombot. A törlés gomb csak akkor jelenik meg, ha a felhasználó nem a csoport tulajdonosa.
4. A felugró ablak alján található gombokkal új tag hozzáadása vagy az ablak bezárása lehetséges.

### Új tag hozzáadása a csoportokhoz

#### Feladat
A felhasználók hozzáadása a csoportokhoz az e-mail címük megadásával.

#### Megvalósítás
1. Egy új tag hozzáadása lehetőséget nyújt a felhasználóknak a csoportokhoz való csatlakozásra. Az új tag e-mail címét megadva a hozzáadás gombra kattintva lehet hozzáadni.
2. A hozzáadás gombra kattintva a `addMemberToGroup` függvény fut le, ami elküldi az új tag adatait a szervernek.
3. Ha az új tag hozzáadása sikeres, a csoport tagjai közé kerül, és frissül a csoportok listája.

### Fontos megjegyzések
- A komponens a Material-UI és Axios csomagokat használja, ezért szükséges azok telepítése a projektbe.
- A csoportok adatait a szerverről kéri le, ezért biztosítani kell a megfelelő hozzáférést és API végpontokat a szerver oldalon.
- A csoportok törlése és tagok hozzáadása/eltávolítása csak a megfelelő jogosultságokkal rendelkező felhasználók számára elérhető.

### Javasolt fejlesztések
- A komponens felhasználói felületének további fejlesztése és testreszabása.
- Hibaüzenetek lokalizálása és kezelése.
- Biztonsági intézkedések bevezetése, például hitelesítés és jogosultságkezelés.
