import './ResAppBar.css';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SuliLogo from './resources/logo.png';
import App from './App';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Outlet, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Curriculums } from './Curriculums';
import { Tests } from './Tests';
import { MyGroups } from './MyGroups';
import { Link } from "react-router-dom";
import { Kezdo } from './Kezdo';

const settings = ['Profilom', 'Beállítások', 'Be/Kijelentkezés'];


export function ResAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [showComponent, setShowComponent] = useState(false);

  <Router>
  <ResAppBar />
  <Routes>
    <Route path="/Curriculums" element={<Curriculums />} />
    <Route path="/Tests" element={<Tests />} />
    <Route path="/MyGroups" element={<MyGroups />} />
  </Routes>
</Router>


  const handleClick = () => {
    setShowComponent(!showComponent);
  };


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (


    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div>
            <Link to="/App" to="/kezdo" rel="noreferrer">
              <img
                alt='Sulipedia logója'
                id='suliLogo'
                sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
                src={SuliLogo}
              />
            </Link>
          </div>

          {showComponent && <Curriculums />}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Sulipedia
          </Typography>

        

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Sulipedia
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button className='menuk' sx={{ my: 2, color: 'white', display: 'block' }}>
                <Link  style={{ textDecoration: 'none',color:"white" }} to="/Curriculums" underline="none" rel="noreferrer"  color="inherit">
                  Tananyagok
                </Link>
              </Button>
              <Button className='menuk' sx={{ my: 2, color: 'white', display: 'block' }}>
              <Link  style={{ textDecoration: 'none',color:"white" }} to="/Tests" underline="none" rel="noreferrer"  color="inherit">
                Tesztek
                </Link>
              </Button>
              <Button className='menuk' sx={{ my: 2, color: 'white', display: 'block' }}>
              <Link  style={{ textDecoration: 'none', color:"white" }} to="/MyGroups" underline="none" rel="noreferrer"  color="inherit">
                Csoportjaim
                </Link>
              </Button>




          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}