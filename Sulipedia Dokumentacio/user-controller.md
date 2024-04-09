### User API Controller

Ez az osztály felelős a Felhasználó API végpontjainak kezelésére.

#### Végpontok:

1. **GET(/user)**

    - **Összefoglalás:** Az összes felhasználó lekérése az adatbázisból.
    
    - **Visszatérési érték:** Egy `UserList` objektum, ami tartalmazza az összes felhasználó adatait.

2. **GET(/user/teacher)**

    - **Összefoglalás:** Az összes tanár felhasználó lekérése az adatbázisból.
    
    - **Visszatérési érték:** Egy `UserList` objektum, ami tartalmazza az összes tanár felhasználó adatait.

3. **GET(/user/underage)**

    - **Összefoglalás:** Az összes 18 éven aluli diák felhasználó lekérése az adatbázisból.
    
    - **Visszatérési érték:** Egy `UserList` objektum, ami tartalmazza az összes 18 éven aluli diák felhasználó adatait.

4. **GET(/user/since)**

    - **Összefoglalás:** Az adott dátum óta létrehozott összes felhasználó lekérése az adatbázisból.
    
    - **Visszatérési érték:** Egy `UserList` objektum, ami tartalmazza az adott dátum óta létrehozott felhasználók adatait.

5. **GET(/user/{id})**

    - **Összefoglalás:** Egy felhasználó lekérése az azonosítója alapján.
    
    - **Visszatérési érték:** Egy `GetUserWithEntries` objektum, ami tartalmazza a felhasználó adatait és bejegyzéseit.

6. **POST(/user)**

    - **Összefoglalás:** Új felhasználó létrehozása az adatbázisban.
    
    - **Kérés törzse:** Egy `PostUser` objektum, ami tartalmazza az új felhasználó adatait.
    
    - **Visszatérési érték:** Egy `GetUserWithID` objektum, ami tartalmazza az újonnan létrehozott felhasználó adatait és az azonosítóját.

7. **PUT(/user/{id})**

    - **Összefoglalás:** Egy felhasználó adatainak frissítése az adatbázisban.
    
    - **Kérés törzse:** Egy `UpdateUser` objektum, ami tartalmazza a frissítendő adatokat.
    
    - **Visszatérési érték:** Egy `GetUser` objektum, ami tartalmazza a frissített felhasználó adatait.

8. **PATCH(/user/{id})**

    - **Összefoglalás:** Egy felhasználó jogosultságainak frissítése az adatbázisban.
    
    - **Kérés törzse:** Egy `Set<RoleDto>` objektum, ami tartalmazza a frissítendő jogosultságokat.
    
    - **Visszatérési érték:** Egy `GetUser` objektum, ami tartalmazza a frissített felhasználó adatait.

9. **DELETE(/user/{id})**

    - **Összefoglalás:** Egy felhasználó logikai törlése az adatbázisból.
    
    - **Visszatérési érték:** Egy `GetUser` objektum, ami tartalmazza a logikailag törölt felhasználó adatait.

10. **DELETE(/user/nulled/{id})**

    - **Összefoglalás:** Egy felhasználó adatainak nullázása és logikai törlése az adatbázisból.
    
    - **Visszatérési érték:** Egy `NulledUser` objektum, ami tartalmazza a nullázott felhasználó adatait és a logikai törlés visszaigazolását.

#### Metódusok:

- **convertRolesToStringArr:** Konvertálja a felhasználó szerepköreit string tömbbé.

#### Megjegyzések:

- **@RestController:** Jelzi, hogy ez az osztály egy REST kontroller.
- **@Tag:** Metaadatokat biztosítanak az API-ról, mint például annak a neve és leírása.
- **@Autowired:** Automatikusan összekapcsolja a `UserService` függőséget a kontrollerrel.
- **@Operation:** Metaadatokat biztosítanak a végpontokról, mint például az összefoglalás és a leírás.
- **@PostMapping, @GetMapping, @PutMapping, @PatchMapping, @DeleteMapping:** Az HTTP kéréseket a megfelelő kezelőmetódushoz rendeli az HTTP módtípus alapján.
- **@RequestBody:** Összekapcsolja a metódus paraméterét az HTTP kérés törzsével.
- **@PathVariable:** Az útvonalban szereplő változókat azonosítja és beállítja a metódus paraméterének értékét.
- **@Valid:** Ellenőrzi a bejövő kérés testét a megfelelő validációs szabályoknak megfelelően.
- **@ResponseStatus:** Beállítja a válasz státuszkódját az adott metódus eredményére.