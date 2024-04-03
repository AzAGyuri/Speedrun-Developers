# MyProfile Komponens

Az `MyProfile` komponens felelős a felhasználói profil megjelenítéséért az alkalmazásban. A felhasználói adatokat egy papír stílusú felületen jeleníti meg, beleértve az e-mail címet, vezeték- és keresztnevet, telefonszámot, regisztráció dátumát és az azonosítót. A komponens lehetőséget ad a felhasználónak, hogy támogassa a fejlesztőket adományokkal.

## Áttekintés

Az `MyProfile` komponens az alábbi funkciókat és feladatokat végzi el:

- A felhasználói adatok megjelenítése egy papír stílusú felületen.
- Lehetőség biztosítása a felhasználónak, hogy adományokkal támogassa a fejlesztőket.

## Általános felépítés

- **Komponens típusa:** Funkcionális komponens.
- **Technológiák:** React, Material-UI.
- **Stílusozás:** A komponens stílusát inline stílusokkal állítják be a `styles` objektum segítségével.

## Funkciók és működés

1. **Felhasználói adatok megjelenítése:** A komponens megjeleníti a felhasználói adatokat egy papír stílusú felületen, beleértve az e-mail címet, vezeték- és keresztnevet, telefonszámot, regisztráció dátumát és az azonosítót.
2. **Adományozás lehetősége:** A komponens lehetőséget biztosít a felhasználónak, hogy adományokkal támogassa a fejlesztőket. Ezt egy `Donate` gomb segítségével teheti meg, amely egy külső linkre irányítja át a felhasználót.

## Felhasznált Komponensek és Stílusok

- **Material-UI Komponensek:** `Container`, `Typography`, `Avatar`, `Paper`, `Button`.
- **Stílusok:** Az elemek stílusát az `styles` objektum segítségével állítják be, amely inline stílusokat tartalmaz a komponens megjelenítéséhez.

## Felhasználói Adatok

A felhasználói adatokat a komponens helyben tárolja a `userData` állapotban, amely az alábbi adatokat tartalmazza:

- **Email:** A felhasználó e-mail címe.
- **Vezetéknév:** A felhasználó vezetékneve.
- **Keresztnév:** A felhasználó keresztneve.
- **Telefonszám:** A felhasználó telefonszáma.
- **Regisztráció dátuma:** A felhasználó regisztrációjának dátuma.
- **Azonosító:** A felhasználó azonosítója.
- **Profilkép:** A felhasználó profilképe (nem jelenik meg a dokumentációban, de a komponensben használható).

## Megjegyzések

- A felhasználói adatokat a komponens állapotában tárolják, de példa API hívások vagy más adatlekérések segítségével frissíthetőek.
- A komponens stílusát inline stílusok segítségével állítják be az `styles` objektumon keresztül, ami a komponens tetején található.
