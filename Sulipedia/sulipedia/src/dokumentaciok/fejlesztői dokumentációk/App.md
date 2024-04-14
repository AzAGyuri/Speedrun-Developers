# App Komponens

Az `App` komponens az alkalmazás fő komponense, amely az alkalmazás útvonalainak kezelését, valamint az alapvető megjelenítést és navigációt végzi. A komponens felelős az alkalmazás megfelelő oldalainak betöltéséért és a felhasználói munkafolyamat kezeléséért.

## Áttekintés

Az `App` komponens az alábbi funkciókat és feladatokat végzi el:

- Az alkalmazás főkomponense, amely a React Router segítségével kezeli az alkalmazás útvonalait.
- Az alkalmazásban való navigáció kezelése és a megfelelő oldalak betöltése az útvonalak alapján.
- A felhasználó bejelentkezésének ellenőrzése és az erre vonatkozó műveletek végrehajtása.

## Funkciók és működés

1. **Útvonalak kezelése:** Az `App` komponens a React Router segítségével definiálja az alkalmazás útvonalait és az ezekhez tartozó komponenseket.
2. **Felhasználó bejelentkezésének ellenőrzése:** A komponens ellenőrzi, hogy a felhasználó be van-e jelentkezve. Ha nem, átirányítja a felhasználót a bejelentkező oldalra.
3. **Oldalak betöltése:** Az útvonalak alapján a megfelelő komponensek betöltése és megjelenítése az alkalmazásban.

## Felhasznált Komponensek és Stílusok

- **React Router Komponensek:** `BrowserRouter`, `Routes`, `Route`, `Navigate`.
- **Material-UI Komponensek:** `Typography`, `Link`, `Tooltip`.
- **Alkalmazás specifikus komponensek:** [`ResAppBar`](ResAppBar.md), [`LandingPage`](LandingPage.md), [`AboutUs`](AboutUs.md), [`Settings`](Settings.md), [`MyProfile`](MyProfile.md), [`SignIn`](SignIn.md), [`SignUp`](SignUp.md), [`Tests`](Tests.md), [`LearnMore`](LearnMore.md), [`Curriculums`](Curriculums.md), [`MyGroups`](MyGroups.md), [`SzakAngol`], [`Matek`], [`Magyar`], [`Tortenelem`], [`Informatika`].
- **Stílusok:** Az elemek stílusát az `styles` objektum segítségével állítják be, amely inline stílusokat tartalmaz a komponens megjelenítéséhez.

## Felhasználói Bejelentkezés

A felhasználó bejelentkezését a komponens az alábbi módon ellenőrzi:

- A felhasználó bejelentkezett állapotát egy állapotban (`isLoggedIn`) tárolja.
- Az útvonalak definiálásakor a komponens ellenőrzi, hogy a felhasználó be van-e jelentkezve. Ha nincs, átirányítja a felhasználót a bejelentkező oldalra.

## Megjegyzések

- Az útvonalak és azokhoz tartozó komponensek a `Routes` komponens alatt vannak definiálva.
- Az alkalmazás fő navigációs sávját a `ResAppBar` komponens kezeli, amely minden oldalon megjelenik.