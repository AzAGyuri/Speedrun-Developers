import React, { useEffect } from 'react';
import './App.css';
import { ResAppBar } from './ResAppBar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SpeedrunLogo from './resources/logo-no-background.png';


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
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage'; 
import { Tooltip } from '@mui/material';

function App() {
  const [isLoggedIn, setLoggedIn] = useLocalStorage('loginAuth', false);


  
  return (
    <>
     <Router>
  <ResAppBar />
  <Routes>
    <Route path="/curriculums" element={isLoggedIn ? <Curriculums /> : <Navigate to="/signIn" />} />
    <Route path="/tests" element={isLoggedIn ? <Tests /> : <Navigate to="/signIn" />} />
    <Route path="/mygroups" element={isLoggedIn ? <MyGroups /> : <Navigate to="/signIn" />} />
    <Route path="/myProfile" element={isLoggedIn ? <MyProfile /> : <Navigate to="/signIn" />} />
    <Route path="/settings" element={isLoggedIn ? <Settings /> : <Navigate to="/signIn" />} />
    <Route path="/signIn" element={<SignIn setLoggedIn={setLoggedIn} />} />
    <Route path="/signUp" element={<SignUp />} />
    <Route path="/kezdo" element={isLoggedIn ? <Kezdo /> : <Navigate to="/signIn" />} />
    <Route path="/" element={isLoggedIn ? <><Kezdo /></> : <Navigate to="/signIn" />} />
    <Route path="/aboutUs" element={isLoggedIn ? <AboutUs /> : <Navigate to="/signIn" />} />
    <Route path="/learnMore" element={isLoggedIn ? <LearnMore /> : <Navigate to="/signIn" />} />
    <Route path="/szakmai-angol" element={isLoggedIn ? <SzakAngol /> : <Navigate to="/signIn" />} />
    <Route path="/matek" element={isLoggedIn ? <Matek /> : <Navigate to="/signIn" />} />
    <Route path="/magyar" element={isLoggedIn ? <Magyar /> : <Navigate to="/signIn" />} />
    <Route path="/tortenelem" element={isLoggedIn ? <Tortenelem /> : <Navigate to="/signIn" />} />
    <Route path="/informatika" element={isLoggedIn ? <Informatika /> : <Navigate to="/signIn" />} />
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
      <Tooltip title="Főoldal">
      <Link color="inherit" to="/kezdo">
        Sulipedia <img style={{ width: 20 }} src={SpeedrunLogo} alt="Logo" />
      </Link>{' '}
      </Tooltip>
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default App;
