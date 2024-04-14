# User entitás

A felhasználók eltárolására szolgáló objektum, mely kapcsolatban áll a [Bejegyzések](entity-entry.md) és [Kommentek](entity-comment.md) táblákkal, valamint kapcsolótáblán keresztül a [Jogosultságokkal](../enums/enum-roles.md), [Elérhetőségekkel](entity-availability.md) és [Csoportokkal](entity-group.md).

| Mező neve           |                                Leírás                                | Típusa        | Hossza | Kötelező | Egyedi érték | Megkötések       |
| :------------------ | :------------------------------------------------------------------: | :------------ | :----- | :------: | :----------: | :--------------- |
| id                  |                           Egyedi azonosító                           | Integer       |        |    I     |              | Elsődleges kulcs |
| createdOn           |                          Léterhozási dátum                           | LocalDateTime |        |    I     |              |
| username            |                           Felhasználó név                            | String        | 100    |    I     |              |
| userPassword        |                   Jelszó (BCrypt-tel titkosított)                    | String        | 80     |    I     |              |
| email               |                                Email                                 | String        | 70     |    I     |      I       |
| randomAvatarBgColor | Random generált, css hexadecimális formában eltárolt, avatár színkód | String        | 7      |    I     |              |
| nickname            |                               Becenév                                | String        | 80     |          |              |
| phoneNumber         |                             Telefon szám                             | String        | 14     |          |              |
| birthDate           |                           Születési dátum                            | LocalDateTime |        |          |              |
| deleted             |                     Törölve lett-e a felhasználó                     | Boolean       |        |          |              |
| deletedOn           |                            Törlés dátuma                             | LocalDateTime |        |          |              |
| lastLogin           |                          Legutóbbi belépés                           | LocalDateTime |        |          |              |
| lastLogoff          |                          Legutóbbi kilépés                           | LocalDateTime |        |          |              |
| profilePicture      |                              Profil kép                              | Integer       |        |          |              |

[Csoporttal kapcsolatos több a többhöz kapcsolatok](../db/many-to-many-relations.md#csoportosított-felhasználók-grouped_user)

[Jogosultsággal kapcsolatos több a többhöz kapcsolatok](../db/many-to-many-relations.md#felhasználó-jogosultságok-user_roles)