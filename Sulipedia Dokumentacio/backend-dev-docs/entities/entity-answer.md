# Answer entitás

A válaszok tárolására szolgáló objektum, mely összeköttetésben van a [Kérdések](entity-question.md) táblával.

| Mező neve      |       Leírás        | Típusa                         | Hossza | Kötelező | Megkötések                              |
| :------------- | :-----------------: | :----------------------------- | :----- | :------- | :-------------------------------------- |
| id             |  Egyedi azonosító   | Integer                        |        | I        | Elsődleges kulcs                        |
| correct        |  Helyes-e a válasz  | Boolean                        |        | I        |                                         |
| content        |   Válasz tartalma   | String                         | 100    | I        |                                         |
| linkedQuestion | Hozzátartozó kérdés | [Question](entity-question.md) |        | I        | A Question.id-hoz tartozó idegen kulcs. |
