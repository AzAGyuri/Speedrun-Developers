// App.js
import React from 'react';
import './App.css';
import { ResAppBar } from './ResAppBar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SpeedrunLogo from './resources/logo-no-background.png';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { SzakAngol } from './pages/Subjects/SzakmaiAngol';
import { Matek } from './pages/Subjects/Matek';
import { Magyar } from './pages/Subjects/Magyar';
import { Tortenelem } from './pages/Subjects/Tortenelem';
import { Informatika } from './pages/Subjects/Informatika';
import { Settings } from './pages/Settings/Settings';
import { Kezdo } from './FirstPage';
import { AboutUs } from './pages/AboutUs/AboutUs';
import SignUp from './pages/SignIn/SignUp';
import { MyGroups } from './MyGroups';
import { MyProfile } from './pages/MyProfile/MyProfile';
import SignIn from './pages/SignIn/SignIn';
import { Tests } from './Tests';
import { LearnMore } from './LearnMore';
import { Curriculums } from './Curriculums';
import { Navigate } from 'react-router-dom';

function App() {

  const [isLoggedIn, setLoggedIn] = React.useState();

  return (
    <>
      <Router>
          <ResAppBar />
          <Routes>
            <Route path="/curriculums" element={<Curriculums />} />
            <Route path="/tests" element={<Tests />} />
            <Route path="/mygroups" element={isLoggedIn ? <MyGroups /> : <Navigate to='/SignIn'/>} />
            <Route path="/myProfile" element={<MyProfile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/kezdo" element={<Kezdo />} />
            <Route path="/" element={<SignIn />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/learnMore" element={<LearnMore />} />
            <Route path="/szakmai-angol" element={<SzakAngol/>} />
            <Route path="/matek" element={<Matek></Matek>} />
            <Route path="/magyar" element={<Magyar></Magyar>} />
            <Route path="/tortenelem" element={<Tortenelem></Tortenelem>} />
            <Route path="/informatika" element={<Informatika></Informatika>} />
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
