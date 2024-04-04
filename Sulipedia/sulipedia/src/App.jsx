import "./App.css";
import { ResAppBar } from "./ResAppBar";
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
import { FirstPage } from "./FirstPage";
import { AboutUs } from "./pages/AboutUs/AboutUs";
import SignUp from "./pages/SignIn/SignUp";
import { MyGroups } from "./MyGroups";
import { MyProfile } from "./pages/MyProfile/MyProfile";
import SignIn from "./pages/SignIn/SignIn";
import { Tests } from "./Tests";
import { LearnMore } from "./LearnMore";
import { Curriculums } from "./Curriculums";
import { Tooltip } from "@mui/material";
import { IsLoggedIn } from "./components/IsLoggedIn/IsLoggedIn";

function App() {
  return (
    <>
      <Router>
        <ResAppBar />
        <Routes>
          <Route
            path="/curriculums"
            element={
              <Curriculums>
                <IsLoggedIn />
              </Curriculums>
            }
          />
          <Route
            path="/tests"
            element={
              <Tests>
                <IsLoggedIn />
              </Tests>
            }
          />
          <Route
            path="/mygroups"
            element={
              <MyGroups>
                <IsLoggedIn />
              </MyGroups>
            }
          />
          <Route
            path="/myProfile"
            element={
              <MyProfile>
                <IsLoggedIn />
              </MyProfile>
            }
          />
          <Route
            path="/settings"
            element={
              <Settings>
                <IsLoggedIn />
              </Settings>
            }
          />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route
            path="/kezdo"
            element={
              <FirstPage>
                <IsLoggedIn />
              </FirstPage>
            }
          />
          <Route
            path="/"
            element={
              <FirstPage>
                <IsLoggedIn />
              </FirstPage>
            }
          />
          <Route
            path="/aboutUs"
            element={
              <AboutUs>
                <IsLoggedIn />
              </AboutUs>
            }
          />
          <Route
            path="/learnMore"
            element={
              <LearnMore>
                <IsLoggedIn />
              </LearnMore>
            }
          />
          <Route
            path="/szakmai-angol"
            element={
              <SzakAngol>
                <IsLoggedIn />
              </SzakAngol>
            }
          />
          <Route
            path="/matek"
            element={
              <Matek>
                <IsLoggedIn />
              </Matek>
            }
          />
          <Route
            path="/magyar"
            element={
              <Magyar>
                <IsLoggedIn />
              </Magyar>
            }
          />
          <Route
            path="/tortenelem"
            element={
              <Tortenelem>
                <IsLoggedIn />
              </Tortenelem>
            }
          />
          <Route
            path="/informatika"
            element={
              <Informatika>
                <IsLoggedIn />
              </Informatika>
            }
          />
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
