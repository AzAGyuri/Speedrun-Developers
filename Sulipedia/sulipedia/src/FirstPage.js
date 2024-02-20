// src/Kezdo.js
import React, { useState } from 'react';
import { Container, Typography, Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const RootContainer = styled(Container)({
  flexGrow: 1,
  padding: '16px',
  textAlign: 'center',
});

const HeaderTypography = styled(Typography)({
  marginBottom: '16px',
});

const SubheaderTypography = styled(Typography)({
  marginBottom: '32px',
});

const DrawerButton = styled(IconButton)({
  position: 'fixed',
  top: 'calc(10% + 16px)',  // 20% lejjebb
  left: '12px',
  backgroundColor: '#333',  // Darker background color
  color: 'white',           // White text color
  fontSize: '1.2rem',       // Slightly larger font size
  '&:hover': {
    backgroundColor: '#555',  // Darker background color on hover
  },
});

export function Kezdo() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <RootContainer>
      <DrawerButton onClick={toggleDrawer}>
        <MenuIcon />
      </DrawerButton>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List>
          <ListItem button component={Link} to="/menu1" onClick={() => setDrawerOpen(false)}>
            <ListItemText primary="Menü 1" />
          </ListItem>
          <ListItem button component={Link} to="/menu2" onClick={() => setDrawerOpen(false)}>
            <ListItemText primary="menü 2" />
          </ListItem>
        </List>
      </Drawer>

      <HeaderTypography ariant="h2">
        Üdvözöljük a Sulipedia oldalon!
      </HeaderTypography>
      <SubheaderTypography variant="h4">
        Az oldalt és a hozzá tartozó funkcionalitásokat a{' '}
        <Link style={{ textDecoration: 'none', color: 'blue' }} to="/aboutUs" underline="none" rel="noreferrer" color="inherit">
          Speedrun Developers
        </Link>{' '}
        csapata készítette!
      </SubheaderTypography>
      <Typography variant="body1">
        Ön ezen oldal jelenlegi alfa verzióját látja. A jövőben - mint minden más oldalra is - erre is további
        fejlesztések és új funkciók várnak majd.
      </Typography>
    </RootContainer>
  );
}
