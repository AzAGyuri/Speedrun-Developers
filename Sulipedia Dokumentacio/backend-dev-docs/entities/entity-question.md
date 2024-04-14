# Question entitás

A kérdések tárolásásra szolgáló objektum, mely kapcsolatban áll a [Bejegyzések](entity-entry.md) és [Válaszok](entity-answer.md) táblákkal.

| Mező neve   |         Leírás         | Típusa  | Hossza | Kötelező | Megkötések                            |
| :---------- | :--------------------: | :------ | :----- | :------- | :------------------------------------ |
| id          |    Egyedi azonosító    | Integer |        | I        | Elsődleges kulcs                      |
| question    |   A kérdés tartalma    | String  | 100    | I        |                                       |
| linkedEntry | Hozzátartozó bejegyzés | Integer |        | I        | Az Entry.id-hoz tartozó idegen kulcs. |
