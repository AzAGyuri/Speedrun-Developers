import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';
import Link from '@mui/material/Link';

const RootContainer = styled(Container)({
  flexGrow: 1,
  padding: '16px',
  textAlign: 'center',
});

const SectionContainer = styled(Container)({
  marginBottom: '32px',
});

export function LearnMore() {
  return (
    <RootContainer>
      <SectionContainer>
        <Typography variant="h2" gutterBottom>
          Mi adta az ötletet a webalkalmazásunk elkészítéséhez?
        </Typography>
        <Typography variant="body1">
        Oktatásunk során felmerült a megfelelő szakmai angol oktatás hiánya. 
        Tankönyvünk nincs, valamint idejétmúlt feladatsorok voltak jellemzőek. 
        Erre a legfőbb indok az a hivatalos tankönyvek létrehozásának terjedelmes folyamata, mely az olyan szakmában, mint az informatika, sajnos nem kivitelezhető.
        </Typography>
      </SectionContainer>

      <SectionContainer>
        <Typography variant="h2" gutterBottom>
          Mit tervezünk tenni?
        </Typography>
        <Typography variant="body1">
        Az ötletünk ezáltal az, hogy egy olyan oktatáshoz felhasználható platformot hozzunk létre, ahol információkat lehet megosztani, és oktatni az informatikában angol nyelven.
        Legyen az egy kérdés egy felhasználótól, vagy legyen az eleve tananyag, akár feladatokkal, a cél, a hatékonyabb, naprakész oktatási anyag fenntartása, és elérhetősége mind tanárok és diákok számára.
        </Typography>
      </SectionContainer>

      <SectionContainer>
        <Typography variant="h2" gutterBottom>
          A jövőről:
        </Typography>
        <Typography variant="body1">
          Oldalunk sikeressége esetén a jövő diákjainak segítése céljából tovább tervezzük fejleszteni az oldalt.
          A jövőben a tananyagok sokkal célszerűebbek lehetnek és mennyiségben is javulni fognak.
          Mivel számunkra minden tantárgy fontos, emiatt a többi tantárgyra is lesznek elérhetői anyagaink.
          Magyar irodalom -és nyelvtan, matematika, történelem, kémia, fizika, biológia, különböző informatika tantárgyak, de bármely más szakami tantárgyakban is 
          hasznos és korszerű tananyagokra lelhetnek a diákok.
        </Typography>
      </SectionContainer>

      <SectionContainer>
        <Typography variant="h2" gutterBottom>
          Szeretnének kérdést feltenni?
        </Typography>
        <Typography variant="body1">
         Maguknak, az elnököknek lehetőségük lesz több kérdést feltenni az oldalunkkal kapcsolatban mind tőlünk személyesen, mind a fő frontend fejlesztő,
         <Link href="mailto:19c_polyakg@nyirszikszi.hu"> Polyák György</Link> személyes e-mail címén is! Ha a backend részről szeretne érdeklődni, keresse <Link href="mailto:19d_seresm@nyirszikszi.hu"> Seres Marcellt</Link>, a fő backend fejlesztőnket!
        </Typography>
      </SectionContainer>

    </RootContainer>
  );
}