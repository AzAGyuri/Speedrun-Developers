# ResAppBar Komponens Dokumentáció

---

A `ResAppBar` komponens egy reszponzív alkalmazássávot biztosít az alkalmazásban, amelynek célja a felhasználói navigáció és az alkalmazáson belüli műveletek megkönnyítése.

## Áttekintés

A `ResAppBar` komponens az alábbi funkciókat és feladatokat végzi el:

- Felhasználói navigációhoz szükséges menüpontok megjelenítése.
- Felhasználói beállításokhoz és profilhoz kapcsolódó lehetőségek megjelenítése.
- Kilépési lehetőség biztosítása a felhasználó számára.

## Általános felépítés

- **Komponens típusa:** Funkcionális komponens.
- **Technológiák:** React, Material-UI, React Router DOM.
- **Stílusozás:** A komponens stílusát a Material-UI és saját CSS osztályok segítségével állítják be.
- **Felhasználói interakciók:** A komponens lehetővé teszi a felhasználók számára a menüpontok közötti navigációt és egyéb műveletek elvégzését.

## Funkciók és működés

1. **Menüpontok megjelenítése:** A komponens megjeleníti a [főoldal](LandingPage.md), [tananyagok](Curriculums.md), [tesztek](Tests.md) és [csoportjaim](MyGroups.md) menüpontokat, valamint a reszponzív módban egy hambúrgerszerű ikont is, amelyre kattintva megjelenik a menü a kisebb képernyőméretek esetén.

2. **Felhasználói beállítások és profil:** A komponens lehetőséget biztosít a [felhasználói beállításokhoz](Settings.md) és a [felhasználó profiljához](MyProfile.md) való navigációra. Ezeket a lehetőségeket a felhasználói menüben található ikonok biztosítják.

3. **Kilépési lehetőség:** A komponens lehetőséget biztosít a felhasználó [kijelentkezésére](SignIn.md) az alkalmazásból. Ez a lehetőség szintén a felhasználói menüben található.

## Felhasznált Komponensek és Modulok

- **Material-UI Komponensek:** `AppBar`, `Box`, `Toolbar`, `IconButton`, `Typography`, `Menu`, `Drawer`, `Container`, `Avatar`, `Button`, `Tooltip`, `MenuItem`.
- **React Router DOM:** `Link` komponens a navigációhoz.
- **useMediaQuery:** A reszponzív működésért felelős hook.

## Megjegyzések

- A reszponzív mód lehetővé teszi a menüpontok megjelenítését kisebb képernyőméretek esetén is, így biztosítva a felhasználóbarát felhasználói élményt.