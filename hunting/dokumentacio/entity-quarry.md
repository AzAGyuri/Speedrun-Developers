# Quarry entitás

Zsákmányállatok tárolására szolgáló objektum

| Mező neve  |      Leírás      | Típusa                            | Hossza | Kötelező | Megkötések                  |
|:-----------|:----------------:|:----------------------------------|:-------|:---------|:----------------------------|
| id         | Egyedi azonosító | Integer                           |        | I        | Elsődleges kulcs            |
| animalRace |     Állatfaj     | String                            | 30     | I        |                             |
| type       |     Osztály      | [AnimalType](enum-animal-type.md) | 30     | I        | Az enum értékeit veheti fel |