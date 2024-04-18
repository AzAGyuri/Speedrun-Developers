# Fejlesztői dokumentáció

## Entitások

- Tananyagok oldal:

![Bejegyzések megjelnítése](backend-dev-docs/images/bejegyzesek_megjelenitese.png)

- Kiválasztott bejegyzés:

![Egy bejegyzés megjelenítése kommentekkel](backend-dev-docs/images/bejegyzes_kommentekkel_megjelenitese.png)

- Főoldal:

![Bejegyzések megjelenítése, főoldal](backend-dev-docs/images/bejegyzesek_megjelenitese_fooldal.png)

- Tesztek oldal:

![Tesztek megjelnítése](backend-dev-docs/images/tesztek_megjelenitese.png)

- Csoportjaim oldal:

![Csoportjaim megjelnítése](backend-dev-docs/images/csoportjaim_megjelenitese.png)

- Kiválasztott csoport tagjai:

![Csoporttagok megjelnítése](backend-dev-docs/images/csoporttagok_megjelenitese.png)

- Profilom oldal:

![Profilom megjelnítése](backend-dev-docs/images/profilom_megjelenitese.png)

- Beállítások oldal:

![Beállítások megjelnítése](backend-dev-docs/images/beallitasok_megjelenitese.png)

- Bejelentkező oldal:

![Bejelentkező felület](backend-dev-docs/images/bejelentkezes.png)

- Regisztrációs oldal:

![Regisztrációs felület](backend-dev-docs/images/regisztracio.png)

---

- [Answer](backend-dev-docs/entities/entity-answer.md)
- [Attachment](backend-dev-docs/entities/entity-attachment.md)
- [Availability](backend-dev-docs/entities/entity-availability.md)
- [Comment](backend-dev-docs/entities/entity-comment.md)
- [Entry](backend-dev-docs/entities/entity-entry.md)
- [Group](backend-dev-docs/entities/entity-group.md)
- [Question](backend-dev-docs/entities/entity-question.md)
- [User](backend-dev-docs/entities/entity-user.md)

## API Dokumentáció

[Admin API](backend-dev-docs/apis/admin-api.md)

[Elérhetőség kezelő API](backend-dev-docs/apis/availability-api.md)

[Komment kezelő API](backend-dev-docs/apis/comment-api.md)

[Bejegyzés kezelő API](backend-dev-docs/apis/entry-api.md)

[Csoport kezelő API](backend-dev-docs/apis/group-api.md)

[Biztonság kezelő API](backend-dev-docs/apis/security-api.md)

[Felhasználó kezelő API](backend-dev-docs/apis/user-api.md)

## Adatbázis terv

![](backend-dev-docs/images/adatbazis_terv_kep.png)

A backend fejlesztői dokumentációs mappában, a db mappában megtalálható a draw.io-val készített [adatbazis_terv.drawio](backend-dev-docs/db/adatbazis_terv.drawio) forrás fájl a fenti képhez.

## Swagger-ui használata

FONTOS! Amennyiben localhost-on futó backend API fut fejlesztői környezetben, fontos a swagger-ui-ban a servers-nél kiválasztani a megfelelő szerver opciót. Más különben a swagger-ui a PROD szerverre fog dolgozni.