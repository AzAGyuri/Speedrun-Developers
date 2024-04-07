import React from "react";
import { Container, Typography, Link, Box } from "@mui/material";
import { styled } from "@mui/system";

const RootContainer = styled(Container)({
  flexGrow: 1,
  padding: "16px",
  textAlign: "center",
});

const SectionContainer = styled(Box)({
  marginBottom: "32px",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#333",
  color: "#fff",
});

const StyledLink = styled(Link)({
  fontWeight: "bold",
  textDecoration: "none",
  color: "#1976d2",
  "&:hover": {
    textDecoration: "underline",
  },
});

const Title = styled(Typography)({
  color: "#fff",
  marginBottom: "16px",
});

const Content = styled(Typography)({
  color: "#fff",
});

export function LearnMore({ children }) {
  return (
    <RootContainer>
      {children}
      <SectionContainer>
        <Box
          borderBottom="2px solid #fff"
          marginBottom="20px"
          paddingBottom="20px"
        >
          <Title variant="h2" gutterBottom>
            Mi ihlette ezen webes alkalmazás ötletét?
          </Title>
        </Box>
        <Box
          borderBottom="1px solid #fff"
          marginBottom="20px"
          paddingBottom="20px"
        >
          <Content variant="body1">
            Oktatásunk során felmerült a megfelelő szakmai angol oktatás hiánya.
            Tankönyvünk nincs, valamint idejétmúlt feladatsorok voltak
            jellemzőek. Erre a legfőbb indok az a hivatalos tankönyvek
            létrehozásának terjedelmes folyamata, mely az olyan szakmában, mint
            az informatika, sajnos nem kivitelezhető.
          </Content>
        </Box>
      </SectionContainer>

      <SectionContainer>
        <Box
          borderBottom="2px solid #fff"
          marginBottom="20px"
          paddingBottom="20px"
        >
          <Title variant="h2" gutterBottom>
            Mit tervezünk tenni?
          </Title>
        </Box>
        <Box
          borderBottom="1px solid #fff"
          marginBottom="20px"
          paddingBottom="20px"
        >
          <Content variant="body1">
            Az ötletünk ezáltal az, hogy egy olyan oktatáshoz felhasználható
            platformot hozzunk létre, ahol információkat lehet megosztani, és
            oktatni az informatikában angol nyelven. Legyen az egy kérdés egy
            felhasználótól, vagy legyen az eleve tananyag, akár feladatokkal, a
            cél, a hatékonyabb, naprakész oktatási anyag fenntartása, és
            elérhetősége mind tanárok és diákok számára.
          </Content>
        </Box>
      </SectionContainer>

      <SectionContainer>
        <Box
          borderBottom="2px solid #fff"
          marginBottom="20px"
          paddingBottom="20px"
        >
          <Title variant="h2" gutterBottom>
            A jövőről:
          </Title>
        </Box>
        <Box
          borderBottom="1px solid #fff"
          marginBottom="20px"
          paddingBottom="20px"
        >
          <Content variant="body1">
            Oldalunk sikeressége esetén a jövő diákjainak segítése céljából
            tovább tervezzük fejleszteni az oldalt. A jövőben a tananyagok
            sokkal célszerűebbek lehetnek és mennyiségben is javulni fognak.
            Mivel számunkra minden tantárgy fontos, emiatt a többi tantárgyra is
            lesznek elérhetői anyagaink. Magyar irodalom -és nyelvtan,
            matematika, történelem, kémia, fizika, biológia, különböző
            informatika tantárgyak, de bármely más szakami tantárgyakban is
            hasznos és korszerű tananyagokra lelhetnek a diákok.
          </Content>
        </Box>
      </SectionContainer>

      <SectionContainer>
        <Title variant="h2" gutterBottom>
          Szeretnének kérdést feltenni?
        </Title>
        <Content variant="body1">
          Maguknak, az elnököknek lehetőségük lesz több kérdést feltenni az
          oldalunkkal kapcsolatban mind tőlünk személyesen, mind a fő frontend
          fejlesztő,{" "}
          <StyledLink href="mailto:19c_polyakg@nyirszikszi.hu">
            Polyák György
          </StyledLink>{" "}
          személyes e-mail címén is! Ha a backend részről szeretne érdeklődni,
          keresse{" "}
          <StyledLink href="mailto:19d_seresm@nyirszikszi.hu">
            Seres Marcellt
          </StyledLink>
          , a fő backend fejlesztőnket!
        </Content>
      </SectionContainer>
    </RootContainer>
  );
}
