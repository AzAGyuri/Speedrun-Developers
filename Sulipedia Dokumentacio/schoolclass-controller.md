### School Class API Controller

Ez az osztály szolgál az Iskolai Osztály API végpontjainak kezelésére.

#### Végpontok:

1. **GET(/class)**

    - **Összefoglalás:** Az opcionális felhasználó alapján visszaadja az összes iskolai osztályt.
    
    - **Paraméterek:**
        - `userId`: Az opcionális felhasználó azonosítója.
    
    - **Visszatérési érték:** Egy `SchoolClassList` objektum, amely tartalmazza az összes iskolai osztályt a megadott felhasználó alapján.
    
2. **GET(/class/{id})**

    - **Összefoglalás:** Az adatbázisban tárolt egy iskolai osztály lekérdezése az azonosítója alapján.
    
    - **Paraméterek:**
        - `id`: Az iskolai osztály azonosítója.
    
    - **Visszatérési érték:** Egy `GetSchoolClassWithEverything` objektum, amely tartalmazza az adott azonosítójú iskolai osztályt, valamint minden adatát.
    
3. **POST(/class)**

    - **Összefoglalás:** Létrehoz egy új iskolai osztályt az adatbázisban.
    
    - **Kérés törzse:** Egy `PostSchoolClass` objektum, ami az új iskolai osztályt reprezentálja.
    
    - **Visszatérési érték:** Egy `GetSchoolClassWithID` objektum, amely tartalmazza az újonnan létrehozott iskolai osztályt és annak azonosítóját.

#### Megjegyzések:

- **@RestController:** Jelzi, hogy ez az osztály egy REST kontroller.
- **@Tag:** Metaadatokat biztosít az API-ról, mint például annak a neve és leírása.
- **@Autowired:** Automatikusan összekapcsolja az `SchoolClassService` függőséget a kontrollerrel.
- **@Operation:** Metaadatokat biztosítanak a végpontokról, mint például az összefoglalás és a leírás.
- **@GetMapping, @PostMapping:** Az HTTP kéréseket a megfelelő kezelőmetódushoz rendeli az HTTP módtípus alapján.
- **@RequestParam:** Összekapcsolja a metódus paraméterét az URL-ben található query paraméterekkel.
- **@RequestBody:** Összekapcsolja a metódus paraméterét az HTTP kérés törzsével.
- **@PathVariable:** Összekapcsolja a metódus paraméterét egy URI sablonváltozóval.