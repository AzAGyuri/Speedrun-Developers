### Comment API Controller

Ez az osztály szolgál a Komment API végpontjainak kezelésére.

#### Végpontok:

1. **GET(/comment)**

    - **Összefoglalás:** Az opcionális bejegyzés- és szerzőazonosító alapján visszaadja a kommentek listáját.
    
    - **Paraméterek:**
        - `entryId`: Az opcionális bejegyzés azonosítója.
        - `authorId`: Az opcionális szerző azonosítója.
    
    - **Visszatérési érték:** Egy `CommentList` objektum, amely tartalmazza a kommentek listáját az adott paraméterek alapján.
    
2. **POST(/comment)**

    - **Összefoglalás:** Létrehoz egy kommentet egy adott bejegyzéshez.
    
    - **Kérés törzse:** Egy `PostComment` objektum, ami a létrehozandó kommentet reprezentálja.
    - **Fejléc:** Az `Authorization` fejléc tartalmazza a felhasználó hitelesítési tokenjét.
    
    - **Visszatérési érték:** Egy `GetCommentWithID` objektum, amely tartalmazza az újonnan létrehozott kommentet és annak azonosítóját.
    
3. **DELETE(/comment/{id})**

    - **Összefoglalás:** Törli a megadott azonosítójú kommentet.
    
    - **Paraméterek:**
        - `id`: Azonosítója annak a kommentnek, amit törölni kell.
    
    - **Visszatérési érték:** `boolean` érték, amely jelzi a törlés sikerességét.

#### Megjegyzések:

- **@RestController:** Jelzi, hogy ez az osztály egy REST kontroller.
- **@Tag:** Metaadatokat biztosít az API-ról, mint például annak a neve és leírása.
- **@Autowired:** Automatikusan összekapcsolja a `CommentService` függőséget a kontrollerrel.
- **@GetMapping, @PostMapping, @DeleteMapping:** Az HTTP kéréseket a megfelelő kezelőmetódushoz rendeli az HTTP módtípus alapján.
- **@RequestParam:** Összekapcsolja a metódus paraméterét az URL-ben található query paraméterekkel.
- **@RequestBody:** Összekapcsolja a metódus paraméterét az HTTP kérés törzsével.
- **@RequestHeader:** Összekapcsolja a metódus paraméterét egy HTTP fejléccel.
- **@PathVariable:** Összekapcsolja a metódus paraméterét egy URI sablonváltozóval.