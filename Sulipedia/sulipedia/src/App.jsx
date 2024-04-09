import "./App.css";
import { ResAppBar } from "./components/ResAppBar/ResAppBar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SpeedrunLogo from "./resources/logo-no-background.png";

import { SzakAngol } from "./pages/Subjects/SzakmaiAngol";
import { Matek } from "./pages/Subjects/Matek";
import { Magyar } from "./pages/Subjects/Magyar";
import { Tortenelem } from "./pages/Subjects/Tortenelem";
import { Informatika } from "./pages/Subjects/Informatika";
import { Settings } from "./pages/Settings/Settings";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { AboutUs } from "./pages/AboutUs/AboutUs";
import SignUp from "./pages/SignUp/SignUp";
import { MyGroups } from "./pages/MyGroups/MyGroups";
import { MyProfile } from "./pages/MyProfile/MyProfile";
import SignIn from "./pages/SignIn/SignIn";
import { Tests } from "./pages/Tests/Tests";
import { LearnMore } from "./pages/LearnMore/LearnMore";
import { Curriculums } from "./pages/Curriculums/Curriculums";
import { Tooltip } from "@mui/material";
import { IsNotLoggedIn } from "./components/IsNotLoggedIn/IsNotLoggedIn";
import { useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Router>
        <ResAppBar setIsLoading={setIsLoading} />
          <Routes>
            <Route path="/curriculums" element={<Curriculums setIsLoading={setIsLoading}><IsNotLoggedIn /></Curriculums>} />
            <Route path="/tests" element={<Tests setIsLoading={setIsLoading}><IsNotLoggedIn /></Tests>} />
            <Route path="/mygroups" element={<MyGroups setIsLoading={setIsLoading}><IsNotLoggedIn /></MyGroups>} />
            <Route path="/myProfile" element={<MyProfile setIsLoading={setIsLoading} isLoading={isLoading}><IsNotLoggedIn /></MyProfile>} />
            <Route path="/settings" element={<Settings setIsLoading={setIsLoading} isLoading={isLoading}><IsNotLoggedIn /></Settings>} />
            <Route path="/signIn" element={<SignIn setIsLoading={setIsLoading} />} />
            <Route path="/signUp" element={<SignUp setIsLoading={setIsLoading} />} />
            <Route path="/kezdo" element={<LandingPage setIsLoading={setIsLoading} isLoading={isLoading}><IsNotLoggedIn /></LandingPage>} />
            <Route path="/" element={<LandingPage  setIsLoading={setIsLoading} isLoading={isLoading}><IsNotLoggedIn /></LandingPage>} />
            <Route path="/aboutUs" element={<AboutUs  setIsLoading={setIsLoading}><IsNotLoggedIn /></AboutUs>} />
            <Route path="/learnMore" element={<LearnMore  setIsLoading={setIsLoading}><IsNotLoggedIn /></LearnMore>} />
            <Route path="/szakmai-angol" element={<SzakAngol  setIsLoading={setIsLoading}><IsNotLoggedIn /></SzakAngol>} />
            <Route path="/matek" element={<Matek  setIsLoading={setIsLoading}><IsNotLoggedIn /></Matek>} />
            <Route path="/magyar" element={<Magyar  setIsLoading={setIsLoading}><IsNotLoggedIn /></Magyar>} />
            <Route path="/tortenelem" element={<Tortenelem  setIsLoading={setIsLoading}><IsNotLoggedIn /></Tortenelem>} />
            <Route path="/informatika" element={<Informatika  setIsLoading={setIsLoading}><IsNotLoggedIn /></Informatika>} />
          </Routes>
        <Copyright />
      </Router>
    </>
  );
}

function Copyright(props) {
  return (
    <Typography
      className="fontSize"
      style={{ fontSize: 20 }}
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Tooltip title="Főoldal">
        <Link color="inherit" to="/kezdo">
          Sulipedia <img style={{ width: 20 }} src={SpeedrunLogo} alt="Logo" />
        </Link>{" "}
      </Tooltip>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default App;
