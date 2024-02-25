# Hunt entitás

Vadászatok tárolására szolgáló objektum

| Mező neve |           Leírás           | Típusa  | Hossza | Kötelező | Megkötések       |
|:----------|:--------------------------:|:--------|:-------|:---------|:-----------------|
| id        |      Egyedi azonosító      | Integer |        | I        | Elsődleges kulcs |
| location  |          Helyszín          | String  | 30     | I        |                  |
| startDate | Vadászat kezdetének dátuma | Date    | -      | I        |                  |
| endDate   |  Vadászat végének dátuma   | DAte    | -      | I        |                  |