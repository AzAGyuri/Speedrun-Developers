### Entry API Controller

Ez az osztály szolgál a Bejegyzés API végpontjainak kezelésére.

#### Végpontok:

1. **GET(/entry)**

    - **Összefoglalás:** Az opcionális kategória alapján visszaadja az összes nem teszt bejegyzést.
    
    - **Paraméterek:**
        - `subject`: Az opcionális kategória objektuma.
    
    - **Visszatérési érték:** Egy `EntryList` objektum, amely tartalmazza az összes nem teszt bejegyzést az adott kategória alapján.
    
2. **GET(/entry/test)**

    - **Összefoglalás:** Az opcionális kategória alapján visszaadja az összes teszt bejegyzést.
    
    - **Paraméterek:**
        - `subject`: Az opcionális kategória objektuma.
    
    - **Visszatérési érték:** Egy `EntryList` objektum, amely tartalmazza az összes teszt bejegyzést az adott kategória alapján.
    
3. **GET(/entry/{id})**

    - **Összefoglalás:** Az adatbázisban tárolt egy bejegyzés lekérdezése az azonosítója alapján.
    
    - **Paraméterek:**
        - `id`: A bejegyzés azonosítója.
    
    - **Visszatérési érték:** Egy `GetEntry` objektum, amely tartalmazza az adott azonosítójú bejegyzést.
    
4. **POST(/entry)**

    - **Összefoglalás:** Létrehoz egy új bejegyzést az adatbázisban.
    
    - **Kérés törzse:** Egy `PostEntry` objektum, ami a létrehozandó bejegyzést reprezentálja.
    - **Fejléc:** Az `Authorization` fejléc tartalmazza a felhasználó hitelesítési tokenjét.
    
    - **Visszatérési érték:** Egy `GetEntryWithID` objektum, amely tartalmazza az újonnan létrehozott bejegyzést és annak azonosítóját.
    
5. **PUT(/entry/{id})**

    - **Összefoglalás:** Frissíti az adatbázisban tárolt egy bejegyzés adatait az azonosítója alapján.
    
    - **Paraméterek:**
        - `id`: A bejegyzés azonosítója.
    - **Kérés törzse:** Egy `UpdateEntry` objektum, ami a frissítendő adatokat reprezentálja.
    
    - **Visszatérési érték:** Egy `GetEntry` objektum, amely tartalmazza a frissített bejegyzést.
    
6. **DELETE(/entry/{id})**

    - **Összefoglalás:** Logikai törlést végez az adatbázisban tárolt egy bejegyzésre az azonosítója alapján.
    
    - **Paraméterek:**
        - `id`: A bejegyzés azonosítója.
    
    - **Visszatérési érték:** Egy `GetEntry` objektum, amely tartalmazza a logikailag törölt bejegyzést.

#### Megjegyzések:

- **@RestController:** Jelzi, hogy ez az osztály egy REST kontroller.
- **@Tag:** Metaadatokat biztosít az API-ról, mint például annak a neve és leírása.
- **@Autowired:** Automatikusan összekapcsolja az `EntryService` függőséget a kontrollerrel.
- **@Operation:** Metaadatokat biztosítanak a végpontokról, mint például az összefoglalás és a leírás.
- **@GetMapping, @PostMapping, @PutMapping, @DeleteMapping:** Az HTTP kéréseket a megfelelő kezelőmetódushoz rendeli az HTTP módtípus alapján.
- **@RequestParam:** Összekapcsolja a metódus paraméterét az URL-ben található query paraméterekkel.
- **@RequestBody:** Összekapcsolja a metódus paraméterét az HTTP kérés törzsével.
- **@RequestHeader:** Összekapcsolja a metódus paraméterét egy HTTP fejléccel.
- **@PathVariable:** Összekapcsolja a metódus paraméterét egy URI sablonváltozóval.
- **@Valid:** Az adatok validálásához szükséges annotáció.