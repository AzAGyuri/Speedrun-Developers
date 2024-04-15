# User entitás

A felhasználók eltárolására szolgáló objektum, mely kapcsolatban áll a [Bejegyzések](entity-entry.md) és [Kommentek](entity-comment.md) táblákkal, valamint kapcsolótáblán keresztül a [Jogosultságokkal](../enums/enum-roles.md), [Elérhetőségekkel](entity-availability.md) és [Csoportokkal](entity-group.md).

| Mező neve           |                                Leírás                                | Típusa        | Hossza | Kötelező | Egyedi érték | Megkötések       |
| :------------------ | :------------------------------------------------------------------: | :------------ | :----- | :------: | :----------: | :--------------- |
| id                  |                           Egyedi azonosító                           | Integer       |        |    I     |              | Elsődleges kulcs |
| createdOn           |                          Léterhozási dátum                           | LocalDateTime |        |    I     |              |
| username            |                           Felhasználó név                            | String        | 100    |    I     |      I       |
| userPassword        |                   Jelszó (BCrypt-tel titkosított)                    | String        | 80     |    I     |              |
| email               |                                Email                                 | String        | 70     |    I     |      I       |
| randomAvatarBgColor | Random generált, css hexadecimális formában eltárolt, avatár színkód | String        | 7      |    I     |              |
| nickname            |                               Becenév                                | String        | 80     |    N     |              |
| phoneNumber         |                             Telefon szám                             | String        | 14     |    N     |              |
| birthDate           |                           Születési dátum                            | LocalDateTime |        |    N     |              |
| deleted             |                     Törölve lett-e a felhasználó                     | Boolean       |        |    N     |              |
| deletedOn           |                            Törlés dátuma                             | LocalDateTime |        |    N     |              |
| lastLogin           |                          Legutóbbi belépés                           | LocalDateTime |        |    N     |              |
| lastLogoff          |                          Legutóbbi kilépés                           | LocalDateTime |        |    N     |              |
| profilePicture      |                              Profil kép                              | Integer       |        |    N     |              |

[Csoporttal kapcsolatos több a többhöz kapcsolatok](../db/many-to-many-relations.md#csoportosított-felhasználók-grouped_user)

[Jogosultsággal kapcsolatos több a többhöz kapcsolatok](../db/many-to-many-relations.md#felhasználó-jogosultságok-user_roles)
