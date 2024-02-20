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
import { Kezdo } from './FirstPage';

const settings = ['Profilom', 'Beállítások', 'Be/Kijelentkezés'];


export function ResAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [showComponent, setShowComponent] = useState(false);


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
            <Link to="/kezdo" rel="noreferrer">
              <img
                alt='Sulipedia logója'
                id='suliLogo'
                sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
                src={SuliLogo}
              />
            </Link>
          </div>
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
            
             <Link to="/kezdo" rel="noreferrer" style={{ textDecoration: 'none', color:"white" }} underline="none"> 
              Sulipedia
              </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Link  style={{ textDecoration: 'none',color:"white" }} to="/Curriculums" underline="none" rel="noreferrer"  color="inherit">
              <Button className='menuk' sx={{ my: 2, color: 'white', display: 'block' }}>
             
                  Tananyagok
               
              </Button>
              </Link>
              <Link  style={{ textDecoration: 'none',color:"white" }} to="/Tests" underline="none" rel="noreferrer"  color="inherit">
              <Button className='menuk' sx={{ my: 2, color: 'white', display: 'block' }}>
                
                  Tesztek
                  
              </Button>
              </Link>
              <Link  style={{ textDecoration: 'none', color:"white" }} to="/MyGroups" underline="none" rel="noreferrer"  color="inherit">
              <Button className='menuk' sx={{ my: 2, color: 'white', display: 'block' }}>
              
                Csoportjaim
                
              </Button>
              </Link>




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
 <Link  style={{ textDecoration: 'none',color:"black" }} to="/MyProfile" underline="none" rel="noreferrer"  color="inherit">
  <MenuItem onClick={handleCloseUserMenu}>
    <Typography textAlign="center"> 
    
                  Profilom
                </Typography>
  </MenuItem>
  </Link>

  <Link  style={{ textDecoration: 'none',color:"black" }} to="/Settings" underline="none" rel="noreferrer"  color="inherit">
  <MenuItem onClick={handleCloseUserMenu}>
    <Typography textAlign="center">
                  Beállítások
                </Typography>
  </MenuItem>
  </Link>


  <Link  style={{ textDecoration: 'none',color:"black" }} to="/SignIn" underline="none" rel="noreferrer"  color="inherit">
  <MenuItem onClick={handleCloseUserMenu}>
    <Typography textAlign="center">
                  Be/Kijelentkezés
                </Typography>
                
  </MenuItem>
  </Link>

  <Link  style={{ textDecoration: 'none',color:"black" }} to="/AboutUs" underline="none" rel="noreferrer"  color="inherit">
  <MenuItem onClick={handleCloseUserMenu}>
    <Typography textAlign="center">
                  Rólunk, a készítőkről
                </Typography>
  </MenuItem>
  </Link>
</Menu>

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}