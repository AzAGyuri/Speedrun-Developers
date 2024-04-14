# Availability entitás

Az elérhetőségek tárolására szolgáló objektum, mely kapcsolatban áll a [Felhasználók](entity-user.md) táblával, és adattagja az [Elérhetőség Típusok](../enums/enum-avail-type.md) táblában található valamely érték. Lényegében kapcsolótáblaként funkcionál a kettő között.

| Mező neve        |          Leírás          | Típusa                                | Hossza | Kötelező | Megkötések                          |
| :--------------- | :----------------------: | :------------------------------------ | :----- | :------- | :---------------------------------- |
| id               |     Egyedi azonosító     | Integer                               |        | I        | Elsődleges kulcs                    |
| link             |    Elérhetőség linkje    | String                                | 60     | I        |                                     |
| availabilityType |    Elérhetőség típusa    | [AvailType](../enums/enum-avail-type) | 50     | I        | Az enum értékeit veheti fel.        |
| linkedUser       | Hozzátartozó felhasználó | [User](entity-user.md)                |        | I        | A User.id-hoz tartozó idegen kulcs. |
