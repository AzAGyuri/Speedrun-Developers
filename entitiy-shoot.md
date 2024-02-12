# Quarry entitás

Az állatok kilövéseinek tárolásásra szolgáló objektum, mely kapcsolótáblául szolgál a vadászok és zsákmányok között

| Mező neve |      Leírás       | Típusa                     | Hossza | Kötelező | Megkötések                           |
|:----------|:-----------------:|:---------------------------|:-------|:---------|:-------------------------------------|
| id        | Egyedi azonosító  | Integer                    |        | I        | Elsődleges kulcs                     |
| hunter    |      Vadász       | [Hunter](entity-hunter.md) |        | I        | A Hunter.id-hez tartozó idegen kulcs |
| quarry    |   Zsákmányállat   | [Quarry](entity-quarry.md) |        | I        | A Quarry.id-hez tartozó idegen kulcs |