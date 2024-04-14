# Attachment entitás

A csatolmányok tárolására szolgáló objektum, mely kapcsolatban áll a [Bejegyzések](entity-entry.md) táblával.

| Mező neve   |         Leírás         | Típusa                   | Hossza | Kötelező | Megkötések                            |
| :---------- | :--------------------: | :----------------------- | :----- | :------- | :------------------------------------ |
| id          |    Egyedi azonosító    | Integer                  |        | I        | Elsődleges kulcs                      |
| filename    |        Fájlnév         | String                   | 100    | I        |                                       |
| filetype    |       Fájl típus       | String                   | 20     | I        |                                       |
| filedata    |       Fájl adat        | mediumblob               | 100    | I        |                                       |
| linkedEntry | Hozzátartozó bejegyzés | [Entry](entity-entry.md) |        | I        | Az Entry.id-hoz tartozó idegen kulcs. |
