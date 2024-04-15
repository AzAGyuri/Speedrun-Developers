## `Tests` Komponens Fejlesztői Dokumentációja

### Áttekintés

A `Tests` komponens egy olyan React komponens, amely lehetővé teszi felhasználók számára különböző tesztek kitöltését és eredményeik ellenőrzését. A komponens több funkciót is ellát, mint például:

- Tantárgyak kiválasztása
- Tesztek megjelenítése a kiválasztott tantárgyhoz
- Teszt kitöltése
- Eredmények ellenőrzése

### Használt Technológiák

- **React**: A komponens React keretrendszerrel van elkészítve, így könnyen integrálható más React alkalmazásokba.
- **Material-UI**: Az UI elemek és stílusok Material-UI segítségével vannak megvalósítva, ami modern és reszponzív felhasználói élményt biztosít.
- **axios**: Az axios kliens segítségével HTTP kérések történnek a szerverrel való kommunikációhoz.

### Komponens Struktúrája

- **Vezérlők és Állapotok**: A komponensben több állapotot használunk az aktuális állapotok és választások tárolására, mint például a kiválasztott tantárgy vagy teszt, valamint a megválaszolt kérdések.
- **Adatlekérdezés és Feldolgozás**: A komponens aszinkron módon lekéri a szükséges adatokat a szerverről, majd feldolgozza azokat a megjelenítéshez.
- **UI Elemek és Stílusok**: A Material-UI segítségével stílusokat és UI elemeket használunk a felhasználói felület kialakításához és interaktivitásához.

### Funkcionalitások

1. **Tantárgyak Kiválasztása**: A felhasználó kiválaszthatja a megjelenítendő tantárgyat.
2. **Tesztek Megjelenítése**: A kiválasztott tantárgyhoz tartozó tesztek megjelenítése.
3. **Teszt Kitöltése**: A felhasználó kitöltheti a kiválasztott tesztet.
4. **Eredmények Ellenőrzése**: A felhasználó ellenőrizheti a kitöltött teszt eredményeit.

### Használat

A `Tests` komponens használatához a következő lépéseket kell megtenni:

1. Importáld a komponenst az alkalmazásodba vagy projektbe.
2. Helyezd el a komponenst a megfelelő helyen az alkalmazásodban vagy projektben.
3. Adj meg minden szükséges paramétert a komponensnek, mint például a JWT tokent.
4. A komponens automatikusan lekéri és megjeleníti az elérhető teszteket a megadott JWT token segítségével.

### Fontos Megjegyzések

- A `Tests` komponens csak akkor működik helyesen, ha megfelelő JWT token van megadva neki a szerverrel való kommunikációhoz.
- Mindig ellenőrizd, hogy a megfelelő adatok érkeznek-e a komponensnek a szerverről, és kezeld a hibákat megfelelően.
- Gondoskodj róla, hogy a komponens megfelelően legyen stílusozva és alkalmazkodjon a felhasználói felület többféle méretéhez.