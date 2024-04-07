# Kezdo komponens dokumentáció

---

## Funkcionalitások

1. **Üdvözlő modális ablak:**
   - Az oldal betöltésekor egy modális ablak jelenik meg, amely üdvözli a felhasználót és információkat nyújt az oldalról.
   - A felhasználó lehetőséget kap arra, hogy bezárja az ablakot, ami az ablak többi megjelenését letiltja.
   
2. **Tantárgyak megjelenítése:**
   - Az oldalon található tantárgyak kártya alakú elemeken keresztül jelennek meg.
   - Minden tantárgyhoz tartozik egy ikon, cím és kattintható hivatkozás a részletek megtekintéséhez.
   
3. **Új hírek hozzáadása és megjelenítése:**
   - A felhasználó képes új híreket hozzáadni egy modális ablakon keresztül.
   - Az új hírek megjelennek az oldalon, és a felhasználó bármikor hozzáadhat új híreket.
   
4. **Tantárgyak és hírek elrendezése:**
   - A tantárgyak és hírek az oldalon rendezetten jelennek meg, ami lehetővé teszi a könnyű navigációt és a tartalmak áttekintését.

---

## API

- Nincs kívülről hozzáférhető API-ja. A komponens saját állapotot és hatásokat kezel, és nem exportál semmilyen funkciót vagy adatot más komponensek számára.

---

## Felhasznált elemek

- **Modal (Modális ablak):** A Material-UI `Modal` komponensét használjuk az üdvözlő modális ablak megjelenítésére, valamint az új hírek hozzáadásának és megjelenítésének modális ablakjához.
- **Typography (Szövegtípus):** A Material-UI `Typography` komponensét használjuk a szövegek megjelenítésére az üdvözlő ablakban.
- **TextField (Szövegmező):** A Material-UI `TextField` komponensét használjuk az új hírek címének és tartalmának bevitelekor.
- **Button (Gomb):** A Material-UI `Button` komponensét használjuk az új hírek hozzáadásának gombjához, valamint a modális ablak bezárásához.
- **Link (Hivatkozás):** A `react-router-dom` `Link` komponensét használjuk a tantárgyak és az oldalak közötti navigációhoz.