// src/FirstPage.js
import React from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from "react-router-dom";

const RootContainer = styled(Container)({
  flexGrow: 1,
  padding: '16px',
  textAlign: 'center',
});

const HeaderTypography = styled(Typography)({
  marginBottom: '16px',
});

const ButtonGrid = styled(Grid)({
  marginTop: '16px',
});

export function Kezdo() {
  return (
    <RootContainer>
      <HeaderTypography variant="h2">
        Üdvözöljük a Sulipedia oldalon!
      </HeaderTypography>
      <HeaderTypography variant="h4">
        Az oldalt és a hozzá tartozó funkcionalitásokat a
         <>
         <Link  style={{ textDecoration: 'none',color:"Blue" }} to="/MyProfile" underline="none" rel="noreferrer"  color="inherit"><div>Speedrun Developers</div></Link>
         </>
          csapata készítette!
      </HeaderTypography>
      <Typography variant="body1">
        Ön ezen oldal jelenlegi alfa verzióját látja. A jövőben - mint minden más oldalra is - erre is további fejlesztések és új funkciók várnak majd. 
      </Typography>
      <ButtonGrid container justifyContent="center" spacing={2}>
        <Grid item>
          <Button variant="contained" color="primary">
            Get Started
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="primary">
            Learn More
          </Button>
        </Grid>
      </ButtonGrid>
    </RootContainer>
  );
}
