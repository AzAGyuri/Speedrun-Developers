# Több a többhöz kapcsolatok az adatbázisban

## Csoportosított felhasználók (grouped_user)

| Mező neve | Leírás                    | Megkötések                                                         |
| :-------- | :------------------------ | :----------------------------------------------------------------- |
| userId    | A felhasználó azonosítója | A [User](../entities/entity-user.md).id-hoz kötött idegen kulcs.   |
| groupId   | A csoport azonosítója     | A [Group](../entities/entity-group.md).id-hoz kötött idegen kulcs. |

## Csoport szakma (group_specialization)

| Mező neve      | Leírás                | Megkötések                                                            |
| :------------- | :-------------------- | :-------------------------------------------------------------------- |
| specialization | A szakma típusa       | A [Szakma](../enums/enum-specialization.md) enum értékeit veheti fel. |
| groupId        | A csoport azonosítója | A [Group](../entities/entity-group.md).id-hoz kötött idegen kulcs.    |

## Felhasználó jogosultságok (user_roles)

| Mező neve | Leírás                    | Megkötések                                                        |
| :-------- | :------------------------ | :---------------------------------------------------------------- |
| role_id   | A jogosultság típusa      | A [Jogosultság](../enums/enum-roles.md) enum értékeit veheti fel. |
| userId    | A felhasználó azonosítója | A [User](../entities/entity-user.md).id-hoz kötött idegen kulcs.  |
