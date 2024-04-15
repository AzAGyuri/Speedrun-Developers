# Entry entitás

Az bejegyzések tárolásásra szolgáló objektum, mely kapcsolatban áll a [Felhasználók](entity-user.md), [Csatolmányok](entity-attachment.md), [Kérdések](entity-question.md) és [Kommentek](entity-comment.md) táblákkal, és adattagja a [Tantárgyak](../enums/enum-subjects.md) táblában található valamely érték.  Lényegében kapcsolótáblaként funkcionál a Felhasználó és Tantárgy táblák között.

| Mező neve |        Leírás        | Típusa                                | Hossza | Kötelező | Megkötések                          |
| :-------- | :------------------: | :------------------------------------ | :----- | :------- | :---------------------------------- |
| id        |   Egyedi azonosító   | Integer                               |        | I        | Elsődleges kulcs                    |
| title     |    Bejegyzés címe    | String                                | 255    | I        |                                     |
| content   |  Bejegyzés tartalma  | String                                | 4000   | I        |                                     |
| keep      | Bejegyzés megtartása | Boolean                               |        | I        |                                     |
| test      | Teszt-e a bejegyzés  | Boolean                               |        | I        |                                     |
| deleted   |    Törölve lett-e    | Boolean                               |        | N        |                                     |
| deletedOn |    Törlés dátuma     | LocalDateTime                         |        | N        |                                     |
| createdOn |  Létrehozás dátuma   | LocalDateTime                         |        | I        |                                     |
| subject   | Bejegyzés tantárgya  | [Subjects](../enums/enum-subjects.md) |        | I        | Az enum értékeit veheti fel.        |
| author    |   Bejegyzés írója    | [User](entity-user.md)                |        | N        | A User.id-hoz tartozó idegen kulcs. |
