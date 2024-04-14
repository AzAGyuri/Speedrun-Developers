# Comment entitás

A kommentek tárolására szolgáló objektum, mely kapcsolatban áll a [Felhasználók](entity-user.md) és [Bejegyzések](entity-entry.md) táblával. Lényegében kapcsolótáblaként funkcionál a kettő között.

| Mező neve |                Leírás                 | Típusa                   | Hossza | Kötelező | Megkötések                            |
| :-------- | :-----------------------------------: | :----------------------- | :----- | :------- | :------------------------------------ |
| id        |           Egyedi azonosító            | Integer                  |        | I        | Elsődleges kulcs                      |
| createdOn |           Létrehozás dátuma           | LocalDateTime            |        | I        |                                       |
| content   |           Komment tartalma            | String                   | 2000   | I        |                                       |
| author    |           Komment szerzője            | [User](entity-user.md)   |        | I        | A User.id-hoz tartozó idegen kulcs.   |
| content   | Bejegyzés, melyhez tartozik a komment | [Entry](entity-entry.md) | 2000   | I        | Az Entry.id-hoz tartozó idegen kulcs. |
