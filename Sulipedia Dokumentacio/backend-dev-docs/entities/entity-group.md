# Group entitás

A csoportok tárolásásra szolgáló objektum, mely kapcsolatban áll a [Felhasználók](entity-user.md) tábával, valamint kapcsolótáblán keresztül a [Specializációkkal](../enums/enum-specialization.md), és szintén a [Felhasználókkal](entity-user.md).

| Mező neve           |                                Leírás                                | Típusa                 | Hossza | Kötelező | Megkötések                         |
| :------------------ | :------------------------------------------------------------------: | :--------------------- | :----- | :------- | :--------------------------------- |
| id                  |                           Egyedi azonosító                           | Integer                |        | I        | Elsődleges kulcs                   |
| groupName           |                             Csoport neve                             | String                 | 75     | I        |                                    |
| descriptionContent  |                           Csoport leírása                            | String                 | 100    | I        |                                    |
| randomAvatarBgColor | Random generált, css hexadecimális formában eltárolt, avatár színkód | String                 | 7      | I        |                                    |
| creator             |                        A csoport létrehozója                         | [User](entity-user.md) |        | I        | A User.id-hoz kötött idegen kulcs. |

[Felhasználóval kapcsolatos több a többhöz kapcsolatok](../db/many-to-many-relations.md#csoportosított-felhasználók-grouped_user)

[Szakmával kapcsolatos több a többhöz kapcsolatok](../db/many-to-many-relations.md#csoport-szakma-group_specialization)
