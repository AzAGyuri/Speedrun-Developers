# Curriculums Komponens

Az `Curriculums` komponens az iskolai tantárgyakat jeleníti meg kártya alakú elemekben, amelyek részletes leírást és egyéb információkat tartalmaznak. A kártyák a tantárgyak ikonjával, címével, leírásával és egy gombbal rendelkeznek, amely a tantárgy részleteinek megtekintésére szolgál.

## Áttekintés

Az `Curriculums` komponens az alábbi funkciókat és feladatokat végzi el:

- Az iskolai tantárgyakat mutatja be kártya alakú elemekben.
- Minden kártyának van egy ikonja, címe, leírása és egy gombja a részletek megtekintésére.
- A kártyák megjelenítése egy táblázatos elrendezésben, amely responszív módon skálázódik a különböző képernyőméretekhez.

## Funkciók és Működés

1. **Tantárgyak megjelenítése:** Az `Curriculums` komponens megjeleníti az iskolai tantárgyakat kártya alakú elemekben.
2. **Részletek megtekintése:** Minden kártya rendelkezik egy gombbal, amely a tantárgy részletes leírásának megtekintésére szolgál.
3. **Interaktív megjelenítés:** A kártyák interaktív módon skálázódnak és stílusosan megjelennek, amikor a felhasználó a kurzort rájuk mozgatja.

## Felhasznált Komponensek és Stílusok

- **Material-UI Komponensek:** `Container`, `Typography`, `Card`, `CardContent`, `Grid`, `Button`, `Paper`.
- **Material-UI Stílusok:** A kártyákhoz tartozó stílusokat az `styled` komponens segítségével állítják be.
- **Egyéb Komponensek:** `Link` (a react-router-dom-ból importálva).
- **Ikonek:** A tantárgyakhoz tartozó ikonok külön fájlokból importálódnak és az egyedi stílusokon keresztül jelennek meg.

## Felhasznált Források

Az ikonok és képek külső forrásból származnak, és az importált fájlok útvonalán keresztül kerülnek megjelenítésre.

## Megjegyzések

- Az `Curriculums` komponens általános felépítése egységes és könnyen bővíthető, így könnyen hozzá lehet adni további tantárgyakat a rendszerhez.
- Az egyes kártyák interaktív módon viselkednek, amikor a felhasználó rájuk kattint vagy rájuk viszi a kurzort.
