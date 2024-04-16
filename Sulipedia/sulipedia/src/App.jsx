import "./App.css";
import { ResAppBar } from "./components/ResAppBar/ResAppBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { EntryList } from "./pages/EntryList/EntryList";
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
import { IsNotLoggedIn } from "./components/IsNotLoggedIn/IsNotLoggedIn";
import { useState } from "react";
import { Copyright } from "./components/Copyright/Copyright";
import axios from "axios";

function App() {
  axios.defaults.withCredentials = true;
  const [isLoading, setIsLoading] = useState(true);
  const jwt = localStorage.getItem("jwt");
  const currentUserId = localStorage.getItem("currentUserId");

  return (
    <>
      <Router>
        <ResAppBar setIsLoading={setIsLoading} jwt={jwt} />
        <Routes>
          <Route
            path="/curriculums"
            element={
              <Curriculums
                setIsLoading={setIsLoading}
                children={
                  <IsNotLoggedIn jwt={jwt} currentUserId={currentUserId} />
                }
              />
            }
          />
          <Route
            path="/tests"
            element={
              <Tests
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                jwt={jwt}
                children={
                  <IsNotLoggedIn jwt={jwt} currentUserId={currentUserId} />
                }
              />
            }
          />
          <Route
            path="/mygroups"
            element={
              <MyGroups
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                jwt={jwt}
                currentUserId={currentUserId}
                children={
                  <IsNotLoggedIn jwt={jwt} currentUserId={currentUserId} />
                }
              />
            }
          />
          <Route
            path="/myProfile"
            element={
              <MyProfile
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                jwt={jwt}
                currentUserId={currentUserId}
                children={
                  <IsNotLoggedIn jwt={jwt} currentUserId={currentUserId} />
                }
              />
            }
          />
          <Route
            path="/settings"
            element={
              <Settings
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                jwt={jwt}
                currentUserId={currentUserId}
                children={
                  <IsNotLoggedIn jwt={jwt} currentUserId={currentUserId} />
                }
              />
            }
          />
          <Route
            path="/signIn"
            element={<SignIn setIsLoading={setIsLoading} jwt={jwt} />}
          />
          <Route
            path="/signUp"
            element={<SignUp setIsLoading={setIsLoading} jwt={jwt} />}
          />
          <Route
            path="/kezdo"
            element={
              <LandingPage
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                jwt={jwt}
                children={
                  <IsNotLoggedIn jwt={jwt} currentUserId={currentUserId} />
                }
              />
            }
          />
          <Route
            path="/"
            element={
              <LandingPage
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                jwt={jwt}
                children={
                  <IsNotLoggedIn jwt={jwt} currentUserId={currentUserId} />
                }
              />
            }
          />
          <Route
            path="/aboutUs"
            element={
              <AboutUs
                setIsLoading={setIsLoading}
                children={
                  <IsNotLoggedIn jwt={jwt} currentUserId={currentUserId} />
                }
              />
            }
          />
          <Route
            path="/learnMore"
            element={
              <LearnMore
                setIsLoading={setIsLoading}
                children={
                  <IsNotLoggedIn jwt={jwt} currentUserId={currentUserId} />
                }
              />
            }
          />
          <Route
            path="/szakmai-angol"
            element={
              <EntryList
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                jwt={jwt}
                subject={"TECHNICAL_ENGLISH"}
                currentUserId={currentUserId}
                children={
                  <IsNotLoggedIn jwt={jwt} currentUserId={currentUserId} />
                }
              />
            }
          />
          <Route
            path="/matek"
            element={
              <EntryList
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                jwt={jwt}
                subject={"MATHS"}
                currentUserId={currentUserId}
                children={
                  <IsNotLoggedIn jwt={jwt} currentUserId={currentUserId} />
                }
              />
            }
          />
          <Route
            path="/magyar"
            element={
              <EntryList
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                jwt={jwt}
                subject={"HUNGARIAN"}
                currentUserId={currentUserId}
                children={
                  <IsNotLoggedIn jwt={jwt} currentUserId={currentUserId} />
                }
              />
            }
          />
          <Route
            path="/tortenelem"
            element={
              <EntryList
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                jwt={jwt}
                subject={"HISTORY"}
                currentUserId={currentUserId}
                children={
                  <IsNotLoggedIn jwt={jwt} currentUserId={currentUserId} />
                }
              />
            }
          />
          <Route
            path="/informatika"
            element={
              <EntryList
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                jwt={jwt}
                subject={"ICT"}
                currentUserId={currentUserId}
                children={
                  <IsNotLoggedIn jwt={jwt} currentUserId={currentUserId} />
                }
              />
            }
          />
        </Routes>
        <Copyright />
      </Router>
    </>
  );
}

export default App;
