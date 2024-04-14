# SignUp Komponens Dokumentáció

## Áttekintés

A SignUp komponens felelős egy új felhasználói fiók létrehozásáért az alkalmazásban. A felhasználók itt adják meg az alapvető regisztrációs információkat, mint például a név, e-mail cím és jelszó.

## Általános felépítés

- **Komponens típusa:** Funkcionális komponens.
- **Technológiák:** React, Material-UI, axios, React Router DOM.
- **Stílusozás:** A komponens stílusát a Material-UI és saját CSS osztályok segítségével állítják be.
- **Követelmények:** A felhasználónak meg kell adnia a vezetéknevet, keresztnévet, e-mail címet, jelszót és opcionálisan a telefonszámot.

## Funkciók és működés

1. **Regisztrációs űrlap megjelenítése:** A felhasználóknak lehetősége van megadni a regisztrációhoz szükséges adatokat, mint például a vezetéknevet, keresztnévet, e-mail címet, jelszót és telefonszámot (opcionális).

2. **Adatellenőrzés:** Az űrlap beküldése előtt a komponens ellenőrzi a felhasználó által megadott adatokat. Például ellenőrzi a vezeték- és keresztnév hosszát, az e-mail cím formátumát, a jelszó erősségét és a telefonszám formátumát.

3. **Jelszó megjelenítése:** A felhasználónak lehetősége van megjeleníteni vagy elrejteni a jelszót a jelszómező mellett található ikonra kattintva.

4. **Regisztráció beküldése:** Ha az adatok megfelelnek a validációs követelményeknek, a felhasználó regisztrációs adatait elküldik a szervernek. Ha a regisztráció sikeres, a felhasználót bejelentkeztetik és átirányítják a kezdőoldalra (`/kezdo`).

5. **Hibaüzenetek:** Ha a felhasználó által megadott adatok nem felelnek meg a validációs követelményeknek, a felhasználót figyelmeztető hibaüzenetek jelennek meg az érintett mezők mellett.

## Felhasznált Komponensek és Modulok

- **Material-UI Komponensek:** `Container`, `TextField`, `Avatar`, `Button`, `Checkbox`, `Link`, `Grid`, `Box`, `Tooltip`, `Typography`, `Visibility`, `VisibilityOff`.
- **React Router DOM:** `Link` komponens és `useNavigate` hook a navigációhoz.
- **axios:** A szerverrel történő kommunikációhoz használt HTTP kliens.

## Követelmények

A regisztrációhoz a felhasználóknak meg kell adniuk a következő információkat:

- Vezetéknév (legalább 3 karakter hosszú).
- Keresztnév (legalább 3 karakter hosszú).
- E-mail cím (érvényes formátumú).
- Jelszó (legalább 8 karakter hosszú, tartalmaznia kell kis- és nagybetűket, számokat és speciális karaktereket).
- Telefonszám (opcionális, ha megadott, akkor 11 számjegyből kell állnia).

## Megjegyzések

- A jelszó erősségének ellenőrzése nagyobb biztonságot nyújthat a felhasználók számára.
- Az opcionális telefonszám megadása további lehetőséget nyújt a felhasználók számára kapcsolattartásra.
