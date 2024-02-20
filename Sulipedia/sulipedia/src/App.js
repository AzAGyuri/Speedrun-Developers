// App.js
import React from 'react';
import './App.css';
import { ResAppBar } from './ResAppBar';
import SignIn from './SignIn';
import { Tests } from './Tests';
import { LearnMore } from './LearnMore';
import { Curriculums } from './Curriculums';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import SignUp from './SignUp';
import { MyGroups } from './MyGroups';
import { MyProfile } from './MyProfile';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Settings } from './Settings';
import { Kezdo } from './FirstPage';
import { AboutUs } from './AboutUs';
import SpeedrunLogo from './resources/logo-no-background.png';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const themeLight = createTheme({
  palette: {
    mode: 'light',
  },
});

const themeDark = createTheme({
  palette: {
    mode: 'dark',
  },
});

// Add more themes as needed

function App() {
  return (
    <>
      <Router>
          <ResAppBar />
          <Routes>
            <Route path="/curriculums" element={<Curriculums />} />
            <Route path="/tests" element={<Tests />} />
            <Route path="/mygroups" element={<MyGroups />} />
            <Route path="/myProfile" element={<MyProfile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/kezdo" element={<Kezdo />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/learnMore" element={<LearnMore />} />
          </Routes>
          <Copyright />
      </Router>
    </>
  );
}


function Copyright(props) {
  return (
    <Typography className="fontSize" style={{ fontSize: 20 }} variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="/kezdo">
        Sulipedia <img style={{ width: 20 }} src={SpeedrunLogo} alt="Logo" />
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default App;
