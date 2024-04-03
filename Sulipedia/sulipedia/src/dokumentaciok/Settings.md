# Settings Komponens

Az `Settings` komponens felelős a felhasználói beállítások megjelenítéséért és szerkesztéséért az alkalmazásban. A komponens lehetővé teszi a felhasználó számára, hogy megváltoztassa az e-mail címét, telefonszámát, becenévét és jelszavát. Emellett megjeleníti az aktuális profil képét, és lehetőséget biztosít a jelszó megváltoztatására.

## Áttekintés

Az `Settings` komponens az alábbi funkciókat és feladatokat végzi el:

- A felhasználói adatok megjelenítése és szerkesztése, mint például az e-mail cím, telefonszám, becenév és jelszó.
- A jelszó validációja és hibaüzenet megjelenítése, ha a jelszó nem felel meg a követelményeknek.

## Általános felépítés

- **Komponens típusa:** Funkcionális komponens.
- **Technológiák:** React, Material-UI.
- **Stílusozás:** A komponens stílusát inline stílusokkal állítják be a `styles` objektum segítségével.

## Funkciók és működés

1. **Felhasználói adatok megjelenítése és szerkesztése:** A komponens megjeleníti és lehetővé teszi a felhasználói adatok szerkesztését, mint például az e-mail cím, telefonszám, becenév és jelszó.
2. **Jelszó validáció:** A jelszó mezőben megváltoztatott jelszó validációja a következő feltételek alapján: legalább 8 karakter hosszú, tartalmaznia kell kis- és nagybetűt, számot, valamint speciális karaktert (@$!%*?&). Ha a jelszó nem felel meg ezeknek a követelményeknek, megjelenik egy hibaüzenet.
3. **Változások mentése:** A felhasználó által végrehajtott változások mentése az alkalmazásban.

## Felhasznált Komponensek és Stílusok

- **Material-UI Komponensek:** `Container`, `Typography`, `Paper`, `TextField`, `Button`, `Grid`, `Avatar`, `Link`.
- **Stílusok:** Az elemek stílusát az `styles` objektum segítségével állítják be, amely inline stílusokat tartalmaz a komponens megjelenítéséhez.

## Felhasználói Adatok

A felhasználói adatokat a komponens helyben tárolja az alábbi állapotokban:

- **email:** A felhasználó e-mail címe.
- **phoneNumber:** A felhasználó telefonszáma.
- **nickname:** A felhasználó beceneve.
- **formData:** Egy állapot, amely tartalmazza a jelszó mező adatait, beleértve a jelszó értékét.
- **passwordError:** Egy állapot, amely jelzi, hogy a jelszó mezőben lévő jelszó megfelel-e a validációs követelményeknek.

## Megjegyzések

- A felhasználói adatokat a komponens állapotában tárolják, és azokat helyben szerkeszthetővé teszik.
- A jelszó validációja a felhasználói felületen történik, és a hibaüzenet a jelszó mező mellett jelenik meg.
- A változtatások mentése gombra kattintva a felhasználó által végrehajtott változtatásokat elmentik az alkalmazásban.
