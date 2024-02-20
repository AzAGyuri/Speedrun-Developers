// src/Kezdo.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, Drawer, List, ListItem, ListItemText, IconButton, Button } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const RootContainer = styled(Container)({
  flexGrow: 1,
  padding: '16px',
  textAlign: 'center',
  transition: 'background-image 1s ease-in-out',  
  backgroundSize: 'cover',  
  backgroundPosition: 'center', 
  backgroundColor: 'lightblue', 
  '& > *': {
    textShadow: '2px 2px 2px green',
  },
});

const HeaderTypography = styled(Typography)({
  marginBottom: '16px',
});

const SubheaderTypography = styled(Typography)({
  marginBottom: '32px',
});

const DrawerButton = styled(IconButton)({
  position: 'fixed',
  top: 'calc(10% + 16px)',
  left: '25px',
  backgroundColor: '#333',
  color: 'white',
  fontSize: '1.2rem',
  '&:hover': {
    backgroundColor: '#555',
  },
});
const OpalishDrawer = styled(Drawer)({
  '& .MuiPaper-root': {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    color: 'white', 
  },
});

const BottomButtonsContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '32px',
});

export function Kezdo() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    const fetchRandomImage = async () => {
      try {
        const response = await fetch('https://source.unsplash.com/random?wallpapers', { cache: 'no-store' });
        const imageUrl = response.url;
        setBackgroundImage(`url(${imageUrl})`);
      } catch (error) {
        console.error('Error fetching a random image:', error);
      }
    };

    fetchRandomImage();
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <RootContainer style={{ backgroundImage }}>
      <DrawerButton onClick={toggleDrawer}>
        <MenuIcon />
      </DrawerButton>

      <OpalishDrawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List>
          <ListItem button component={Link} to="/menu1" onClick={() => setDrawerOpen(false)}>
            <ListItemText primary="Menü 1" />
          </ListItem>
          <ListItem button component={Link} to="/menu2" onClick={() => setDrawerOpen(false)}>
            <ListItemText primary="Menü 2" />
          </ListItem>
          <ListItem button component={Link} to="/menu3" onClick={() => setDrawerOpen(false)}>
            <ListItemText primary="Menü 3" />
          </ListItem>
          <ListItem button component={Link} to="/menu4" onClick={() => setDrawerOpen(false)}>
            <ListItemText primary="Menü 4" />
          </ListItem>
        </List>
      </OpalishDrawer>

      <HeaderTypography variant="h2">
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

      <BottomButtonsContainer>
        <Button variant="contained" color="secondary" component={Link} to="/LearnMore">
          Tudj meg többet
        </Button>
      </BottomButtonsContainer>
    </RootContainer>
  );
}
