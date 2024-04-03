# SignIn Komponens

A `SignIn` komponens felelős a felhasználók bejelentkezéséért az alkalmazásba. A felhasználók itt adják meg az e-mail címüket és jelszavukat a belépéshez.

## Áttekintés

A `SignIn` komponens az alábbi funkciókat és feladatokat végzi el:

- Felhasználói bejelentkezési űrlap megjelenítése.
- Bejelentkezési adatok beküldése a szervernek azonosítás céljából.
- Felhasználói navigáció a regisztrációs oldalra (`SignUp`), ha még nincs fiókja.

## Általános felépítés

- **Komponens típusa:** Funkcionális komponens.
- **Technológiák:** React, Material-UI, axios, React Router DOM.
- **Stílusozás:** A komponens stílusát a Material-UI és saját CSS osztályok segítségével állítják be.
- **Követelmények:** A felhasználónak meg kell adnia az e-mail címét és a jelszavát a bejelentkezéshez.

## Funkciók és működés

1. **Bejelentkezési űrlap megjelenítése:** A felhasználónak lehetősége van megadni a bejelentkezési adatokat, mint például az e-mail címet és jelszót.

2. **Bejelentkezés:** Az űrlap beküldésekor a komponens elküldi a felhasználó által megadott adatokat a szervernek. Ha a bejelentkezés sikeres, a felhasználót átirányítják a kezdőoldalra (`/kezdo`).

3. **Hibaüzenetek:** Ha a felhasználó által megadott adatok nem felelnek meg a szerver által elvárt formátumnak vagy ha a bejelentkezés sikertelen, akkor hibaüzenet jelenik meg az űrlap alatt.

## Felhasznált Komponensek és Modulok

- **Material-UI Komponensek:** `Grid`, `Paper`, `Box`, `Avatar`, `Button`, `Typography`, `TextField`, `FormControlLabel`, `Checkbox`, `Link`.
- **React Router DOM:** `Link` komponens a navigációhoz.
- **axios:** A szerverrel történő kommunikációhoz használt HTTP kliens.

## Követelmények

A bejelentkezéshez a felhasználónak meg kell adnia az alábbi információkat:

- E-mail cím: Azonosító a felhasználó fiókjához.
- Jelszó: Biztonsági kulcs a felhasználó azonosításához.

## Megjegyzések

- A "Jegyezz meg" opció lehetőséget ad a felhasználóknak a belépési adatok megjegyzésére a későbbi használat céljából.
- A hibaüzenetek segítenek a felhasználóknak azonosítani és javítani a hibás adatokat a bejelentkezési űrlapon.
