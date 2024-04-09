### Security API Controller

Ez az osztály felelős a Biztonsági API végpontjainak kezelésére.

#### Végpontok:

1. **POST(/login)**

    - **Összefoglalás:** Regisztrált felhasználó bejelentkeztetése a backend-be.
    
    - **Kérés törzse:** Egy `UserLogin` objektum, ami a felhasználó bejelentkezési adatait tartalmazza.
    
    - **Visszatérési érték:** Egy `GetUserWithID` objektum, amely tartalmazza a bejelentkezett felhasználó adatait, valamint egy JWT tokent a fejlécben.

2. **POST(/register)**

    - **Összefoglalás:** Új felhasználó regisztrálása a backend-be.
    
    - **Kérés törzse:** Egy `UserRegistration` objektum, ami az új felhasználó regisztrációs adatait tartalmazza.
    
    - **Visszatérési érték:** Egy `GetUserWithID` objektum, amely tartalmazza az újonnan regisztrált felhasználó adatait, valamint egy JWT tokent a fejlécben.

3. **GET(/logout)**

    - **Összefoglalás:** Kijelentkeztet egy már bejelentkezett felhasználót.
    
    - **Fejléc:** Az Authorization fejlécben a JWT token, amelyből kijelentkeztetés történik.

4. **GET(/validatetoken)**

    - **Összefoglalás:** Ellenőrzi, hogy a mentett JWT érvényes-e.
    
    - **Fejléc:** Az Authorization fejlécben a JWT token, amelyet ellenőrizni kell.

#### Metódusok:

- **convertRolesToStringArr:** Konvertálja a felhasználó szerepköreit string tömbbé.
- **getJwtHeader:** Beállítja a JWT tokent a válasz fejlécében.

#### Megjegyzések:

- **@RestController:** Jelzi, hogy ez az osztály egy REST kontroller.
- **@Tag:** Metaadatokat biztosít az API-ról, mint például annak a neve és leírása.
- **@Autowired:** Automatikusan összekapcsolja a `SecurityService` és `JwtUtil` függőségeket a kontrollerrel.
- **@Operation:** Metaadatokat biztosítanak a végpontokról, mint például az összefoglalás és a leírás.
- **@PostMapping, @GetMapping:** Az HTTP kéréseket a megfelelő kezelőmetódushoz rendeli az HTTP módtípus alapján.
- **@RequestBody:** Összekapcsolja a metódus paraméterét az HTTP kérés törzsével.
- **@RequestHeader:** Összekapcsolja a metódus paraméterét a HTTP kérés fejlécével.
- **ResponseEntity:** Visszatérési értékében tartalmazza a választestet, valamint a HTTP státuszkódot és fejlécét.