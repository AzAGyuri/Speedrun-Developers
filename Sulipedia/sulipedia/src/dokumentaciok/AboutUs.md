# AboutUs Komponens

Az `AboutUs` komponens felelős a csapat tagjainak bemutatásáért az alkalmazásban. A csapat tagjai egy táblázatban vannak felsorolva, amely tartalmazza a nevüket, leírásukat, egy kedvelt idézetüket és egy képet róluk.

## Áttekintés

Az `AboutUs` komponens az alábbi funkciókat és feladatokat végzi el:

- A csapat tagjainak adatainak megjelenítése táblázat formájában.
- Minden csapattagnak egy nevet, leírást, kedvelt idézetet és egy képet jelenít meg.

## Általános felépítés

- **Komponens típusa:** Funkcionális komponens.
- **Technológiák:** React, Material-UI, Mui-Image.
- **Stílusozás:** A komponens stílusát a Material-UI és saját CSS osztályok segítségével állítják be.
- **Adatok:** A csapat tagjainak adatai előre definiáltak a komponensben lévő `rows` változóban.

## Funkciók és működés

1. **Tagok adatainak megjelenítése:** A komponens egy táblázatban megjeleníti a csapat tagjainak adatait, beleértve a nevet, leírást, kedvelt idézetet és egy képet.

## Felhasznált Komponensek és Modulok

- **Material-UI Komponensek:** `Table`, `TableHead`, `TableBody`, `TableCell`, `TableRow`, `TableContainer`, `Paper`.
- **Mui-Image:** A képek megjelenítéséhez használt komponens.

## Tagok Adatai

A csapat tagjainak adatait előre definiálják a komponensben a `rows` változóban, amely minden tag számára egy objektumot tartalmaz a következő adatokkal:

- **Név:** A csapat tagjának neve.
- **Leírás:** Rövid leírás a csapat tagjáról vagy szerepéről.
- **Kedvelt Idézet:** Egy olyan idézet, amelyet a csapat tagja szeret vagy amely jellemző rá.
- **Kép:** Egy kép a csapat tagjáról, amelyet megjelenítenek a táblázatban.

## Megjegyzések

- A képek az `import` segítségével kerülnek be a komponensbe, és a `Mui-Image` komponens segítségével jelennek meg a táblázatban.
- A táblázat stílusát és megjelenését a Material-UI komponensek segítségével állítják be, beleértve a cellák, sorok és fejlécek stílusát is.
