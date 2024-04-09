### Availability API Controller


Ez az osztály szolgál az Elérhetőség API végpontjainak kezelésére.

#### Végpontok:

1. **GET(/availability)**

    - **Összefoglalás:** Az összes elérhetőség lekérése az adatbázisból.
    
    - **Leírás:** Az adatbázisban tárolt összes elérhetőség lekérése.
    
    - **Visszatérési érték:** Egy `AvailabilityList` objektum, amely tartalmazza az összes elérhetőséget az összes felhasználó számára.
    
2. **GET(/availability/{id})**

    - **Összefoglalás:** Egy felhasználó összes elérhetőségének lekérése az adatbázisból.
    
    - **Leírás:** Egy adott felhasználó összes elérhetőségének lekérése az adatbázisból.
    
    - **Paraméterek:**
        - `userId`: Azonosítója annak a felhasználónak, akinek az elérhetőségeit le kell kérni.
    
    - **Visszatérési érték:** Egy `AvailabilityList` objektum, amely tartalmazza a megadott felhasználó összes elérhetőségét.
    
3. **POST(/availability)**

    - **Összefoglalás:** Egy elérhetőség létrehozása egy felhasználónak.
    
    - **Leírás:** Egy elérhetőség létrehozása és mentése egy felhasználó számára az adatbázisban.
    
    - **Kérés törzse:** Egy `PostAvailability` objektum, ami az létrehozandó elérhetőséget reprezentálja.
    
    - **Visszatérési érték:** Egy `GetAvailabilityWithID` objektum, amely tartalmazza az újonnan létrehozott elérhetőséget és annak azonosítóját.
    
4. **PUT(/availability/{id})**

    - **Összefoglalás:** Egy elérhetőség frissítése az adatbázisban.
    
    - **Leírás:** Egy meglévő elérhetőség frissítése az adatbázisban új adatokkal.
    
    - **Paraméterek:**
        - `id`: Azonosítója annak az elérhetőségnek, amit frissíteni kell.
    
    - **Kérés törzse:** Egy `UpdateAvailability` objektum, ami a frissített elérhetőség adatait reprezentálja.
    
    - **Visszatérési érték:** Egy `GetAvailability` objektum, amely tartalmazza a frissített elérhetőség adatait.
    
5. **DELETE(/availability/{id})**

    - **Összefoglalás:** Egy elérhetőség törlése az adatbázisból.
    
    - **Leírás:** Egy elérhetőség törlése az adatbázisból. Ez a művelet visszafordíthatatlan.
    
    - **Paraméterek:**
        - `id`: Azonosítója annak az elérhetőségnek, amit törölni kell.
    
    - **Visszatérési érték:** Egy `DeletedAvailability` objektum, amely jelzi a törlés folyamatának sikerességét.

#### Megjegyzések:

- **@RestController:** Jelzi, hogy ez az osztály egy REST kontroller.
- **@Tag:** Metaadatokat biztosít az API-ról, mint például annak a neve és leírása.
- **@Autowired:** Automatikusan összekapcsolja az `AvailabilityService` függőséget a kontrollerrel.
- **@Operation:** Leírja az egyes végpontok működését, beleértve a rövid összefoglalást és leírást.
- **@GetMapping, @PostMapping, @PutMapping, @DeleteMapping:** Az HTTP kéréseket a megfelelő kezelőmetódushoz rendeli az HTTP módtípus alapján.
- **@PathVariable:** Összekapcsolja a metódus paraméterét egy URI sablonváltozóval.
- **@RequestBody:** Összekapcsolja a metódus paraméterét az HTTP kérés törzsével.
- **@Valid:** Jelzi, hogy a kérés törzsét validáció alá kell vonni a validációs megszorításoknak megfelelően.
- **@ResponseStatus:** Meghatározza az HTTP státuszkódot egy adott kérés leképzéséhez.