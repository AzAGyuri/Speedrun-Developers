import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Button,
  Typography,
  Modal,
  TextField,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/system";
import PublicIcon from "@mui/icons-material/Public";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import { Loading } from "../../components/Loading/Loading";

import mathematics from "../../resources/mat.png";
import grammer from "../../resources/grammer.png";
import history from "../../resources/history.png";
import it from "../../resources/it.png";
import iteng from "../../resources/iteng.png";
import axios from "axios";

const HeaderTypography = styled(Typography)({
  marginBottom: "16px",
});

const SubheaderTypography = styled(Typography)({
  marginBottom: "32px",
});

const BottomButtonsContainer = styled(Container)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "32px",
  width: "100%",
});

const SignInButton = styled(Button)({
  backgroundColor: "green",
  color: "white",
  "&:hover": {
    backgroundColor: "darkgreen",
  },
});

const CloseButton = styled(Button)({
  position: "absolute",
  top: 0,
  right: 0,
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "#f7f7f7",
  border: "4px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "15px",
  borderStyle: "double",
  borderColor: "#db140d",
};
const styleSmall = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "#f7f7f7",
  border: "4px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "15px",
  borderStyle: "double",
  borderColor: "#db140d",
};

export function LandingPage({ children, setIsLoading, isLoading }) {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(
    sessionStorage.getItem("modalOpen") === "false" ? false : true
  );
  const [newsModalOpen, setNewsModalOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const isSmallScreen = useMediaQuery("(max-width:950px)");
  let [subject, setSubject] = useState("");
  let [entries, setEntries] = useState({
    entries: [],
  });
  const jwt = localStorage.getItem("jwt");

  function modalStayClosed() {
    sessionStorage.setItem("modalOpen", "false");
    handleClose();
  }

  const handleClose = () => {
    setOpen(false);
  };
  const handleClosePost = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;
    setPosts([{ title: newPostTitle, content: newPostContent, date: formattedDate }, ...posts]);
  };
  

  const handleNewsModalOpen = () => {
    setNewsModalOpen(true);
  };

  const handleNewsModalClose = () => {
    setNewsModalOpen(false);
    setNewPostTitle("");
    setNewPostContent("");
  };

  const handleCategorySelect = (event) => {
    setSubject(event.target.id);
  };

  useEffect(() => {
    axios
      .get(`/entry?subject=${subject}`, { headers: { Authorization: jwt } })
      .then((response) => {
        setEntries(response.data);
      })
      .catch((error) => {
        console.error("Hiba történt az adatok lekérdezése során", error);
        alert("Hiba történt az adatok lekérdezése során", error);
      });
    setTimeout(()=>{
      setIsLoading(false);
    },300);
  }, [jwt, subject, setIsLoading, isLoading]);

  if (isLoading) return <Loading />;

  return (
    <>
      {children}
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={isSmallScreen ? styleSmall : style} >
            <CloseButton onClick={handleClose} color="primary">
              X
            </CloseButton>
            <HeaderTypography variant="h3">
              Üdvözöljük a Sulipedia oldalon!
            </HeaderTypography>
            <SubheaderTypography variant="body1">
              Az oldalt és a hozzá tartozó funkcionalitásokat a{" "}
              <Link
                style={{ textDecoration: "none", color: "blue" }}
                to="/aboutUs"
                underline="none"
                rel="noreferrer"
                color="inherit"
              >
                Speedrun Developers
              </Link>{" "}
              csapata készítette!
            </SubheaderTypography>
            <Typography variant="body1">
              Ön ezen oldal jelenlegi alfa verzióját látja. A jövőben - mint
              minden más oldalra is - erre is további fejlesztések és új
              funkciók várnak majd.
              <br />
              Amennyiben szeretné támogatni az oldal fejlődését azt az alábbi
              paypal <a href="https://www.paypal.me/Krisz37">linken</a>{" "}
              megteheti!
            </Typography>

            <BottomButtonsContainer>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/LearnMore"
              >
                Tudj meg többet
              </Button>

              <Button
                variant="contained"
                color="error"
                onClick={modalStayClosed}
              >
                Ne jelenjen meg újra!
              </Button>

              <SignInButton component={Link} to="/AboutUs">
                Rólunk
              </SignInButton>
            </BottomButtonsContainer>
          </Box>
        </Modal>
      </div>

      {isSmallScreen ? (
        <>
        <div id="kisHozza">
            <Button
              onClick={handleNewsModalOpen}
              variant="contained"
              color="primary"
            >
              Új hír hozzáadása
            </Button>
          </div>
          <div className="flex-container">
            <div className="flex-item">
              <div className="flex-container">
                <div className="flex-item">
                  {posts.map((post, index) => (
                    <div className="contente-flex" key={index}>
                      <div className="flexcontente-item">
                        <div className="contente-box">
                          <div className="contente-title">{post.title}</div>
                          <div>Tudtad-e?</div>
                          <div className="contente">{post.content}</div>
                          <div className="post-date">{post.date}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="contente-flex">
                <div className="flexcontente-item">
                  <div className="contente-box">
                    <div className="contente-title">
                      Algoritmusok és Adatszerkezetek
                    </div>
                    <div>Tudtad-e?</div>
                    <div className="contente">
                      Az algoritmusok és adatszerkezetek kulcsfontosságú
                      fogalmak az informatikában. Az algoritmusok hatékony
                      megvalósítása és az optimális adatszerkezetek kiválasztása
                      lehetővé teszi az informatikai problémák hatékony
                      megoldását.
                    </div>
                  </div>
                </div>
              </div>

              <div className="contente-flex">
                <div className="flexcontente-item">
                  <div className="contente-box">
                    <div className="contente-title">
                      Felhőalapú Számítástechnika
                    </div>
                    <div>Tudtad-e?</div>
                    <div className="contente">
                      A felhőalapú számítástechnika forradalmasította az
                      informatikát. Az egyre növekvő számú vállalat és
                      felhasználó számára biztosítja az adatok tárolását,
                      szolgáltatásokat és alkalmazásokat a világhálón keresztül.
                    </div>
                  </div>
                </div>
              </div>

              <div className="contente-flex">
                <div className="flexcontente-item">
                  <div className="contente-box">
                    <div className="contente-title">
                      Kiberbiztonság és Hálózatbiztonság
                    </div>
                    <div>Tudtad-e?</div>
                    <div className="contente">
                      A kiberbiztonság és hálózatbiztonság napjainkban
                      kulcsfontosságú területe az informatikának. Az internetes
                      fenyegetések és a számítógépes bűnözés elleni védelem
                      elengedhetetlen a biztonságos online környezet
                      megteremtéséhez.
                    </div>
                  </div>
                </div>
              </div>

              <div className="contente-flex">
                <div className="flexcontente-item">
                  <div className="contente-box">
                    <div className="contente-title">
                      Adattudomány és Nagy Adat
                    </div>
                    <div>Tudtad-e?</div>
                    <div className="contente">
                      Az adattudomány és a nagy adat elemzésének képességei
                      forradalmasítják az üzleti és tudományos területeket
                      egyaránt. Az adatokból való értelmezés lehetővé teszi a
                      trendek felismerését és a jövőbeli döntések meghozatalát.
                    </div>
                  </div>
                </div>
              </div>

              <div className="contente-flex">
                <div className="flexcontente-item">
                  <div className="contente-box">
                    <div className="contente-title">
                      Mesterséges Intelligencia és Gépi Tanulás
                    </div>
                    <div>Tudtad-e?</div>
                    <div className="contente">
                      A mesterséges intelligencia és a gépi tanulás területei
                      forradalmasítják az informatikát. Az olyan alkalmazások,
                      mint az autonóm járművek és a nyelvi felismerés, az MI és
                      a gépi tanulás legújabb fejlesztéseinek eredményei.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-container">
          <div className="flex-item">
            <div className="drawer">
              <Container
                style={{ textDecoration: "none", color: "white", padding: 0 }}
                onClick={handleCategorySelect}
                underline="none"
                rel="noreferrer"
                color="inherit"
              >
                <div className="subject-container">
                  <span id="">Vegyes</span>
                  <PublicIcon
                    className="subjectIMG"
                    style={{ color: "black" }}
                  />
                </div>
              </Container>
              <Container
                style={{ textDecoration: "none", color: "white", padding: 0 }}
                onClick={handleCategorySelect}
                underline="none"
                rel="noreferrer"
                color="inherit"
              >
                <div className="subject-container">
                  <span id="MATHS">Matematika</span>
                  <img
                    src={mathematics}
                    alt="Matematika"
                    className="subjectIMG"
                  />
                </div>
              </Container>
              <Container
                style={{ textDecoration: "none", color: "white", padding: 0 }}
                onClick={handleCategorySelect}
                underline="none"
                rel="noreferrer"
                color="inherit"
              >
                <div className="subject-container">
                  <span id="HUNGARIAN">Magyar Nyelv</span>
                  <img
                    src={grammer}
                    alt="Magyar Nyelv"
                    className="subjectIMG"
                  />
                </div>
              </Container>
              <Container
                style={{ textDecoration: "none", color: "white", padding: 0 }}
                onClick={handleCategorySelect}
                underline="none"
                rel="noreferrer"
                color="inherit"
              >
                <div className="subject-container">
                  <span id="HISTORY">Történelem</span>
                  <img src={history} alt="Történelem" className="subjectIMG" />
                </div>
              </Container>
              <Container
                style={{ textDecoration: "none", color: "white", padding: 0 }}
                onClick={handleCategorySelect}
                underline="none"
                rel="noreferrer"
                color="inherit"
              >
                <div className="subject-container">
                  <span id="TECHNICAL_ENGLISH">Szakmai angol</span>
                  <img src={iteng} alt="Szakmai angol" className="subjectIMG" />
                </div>
              </Container>
              <Container
                style={{ textDecoration: "none", color: "white", padding: 0 }}
                onClick={handleCategorySelect}
                underline="none"
                rel="noreferrer"
                color="inherit"
              >
                <div className="subject-container">
                  <span id="ICT">Informatika</span>
                  <img src={it} alt="Informatika" className="subjectIMG" />
                </div>
              </Container>
              <div className="blackLine"></div>
            </div>
          </div>
          <div className="flex-item">

            <div className="flex-container" style={{ my: 2 }}>
              <div className="flex-item">
                {posts.map((post, index) => (
                  <div className="contente-flex" key={index}>
                    <div className="flexcontente-item">
                      <div className="contente-box">
                        <div className="contente-title">{post.title}</div>
                        <div>Tudtad-e?</div>
                        <div className="contente">{post.content}</div>
                        <div className="post-date">{post.date}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="contente-flex">
              <div className="flexcontente-item">
                <div className="contente-box">
                  <div className="contente-title">
                    Algoritmusok és Adatszerkezetek
                  </div>
                  <div>Tudtad-e?</div>
                  <div className="contente">
                    Az algoritmusok és adatszerkezetek kulcsfontosságú fogalmak
                    az informatikában. Az algoritmusok hatékony megvalósítása és
                    az optimális adatszerkezetek kiválasztása lehetővé teszi az
                    informatikai problémák hatékony megoldását.
                  </div>
                </div>
              </div>
            </div>

            <div className="contente-flex">
              <div className="flexcontente-item">
                <div className="contente-box">
                  <div className="contente-title">
                    Felhőalapú Számítástechnika
                  </div>
                  <div>Tudtad-e?</div>
                  <div className="contente">
                    A felhőalapú számítástechnika forradalmasította az
                    informatikát. Az egyre növekvő számú vállalat és felhasználó
                    számára biztosítja az adatok tárolását, szolgáltatásokat és
                    alkalmazásokat a világhálón keresztül.
                  </div>
                </div>
              </div>
            </div>

            <div className="contente-flex">
              <div className="flexcontente-item">
                <div className="contente-box">
                  <div className="contente-title">
                    Kiberbiztonság és Hálózatbiztonság
                  </div>
                  <div>Tudtad-e?</div>
                  <div className="contente">
                    A kiberbiztonság és hálózatbiztonság napjainkban
                    kulcsfontosságú területe az informatikának. Az internetes
                    fenyegetések és a számítógépes bűnözés elleni védelem
                    elengedhetetlen a biztonságos online környezet
                    megteremtéséhez.
                  </div>
                </div>
              </div>
            </div>

            <div className="contente-flex">
              <div className="flexcontente-item">
                <div className="contente-box">
                  <div className="contente-title">
                    Adattudomány és Nagy Adat
                  </div>
                  <div>Tudtad-e?</div>
                  <div className="contente">
                    Az adattudomány és a nagy adat elemzésének képességei
                    forradalmasítják az üzleti és tudományos területeket
                    egyaránt. Az adatokból való értelmezés lehetővé teszi a
                    trendek felismerését és a jövőbeli döntések meghozatalát.
                  </div>
                </div>
              </div>
            </div>

            <div className="contente-flex">
              <div className="flexcontente-item">
                <div className="contente-box">
                  <div className="contente-title">
                    Mesterséges Intelligencia és Gépi Tanulás
                  </div>
                  <div>Tudtad-e?</div>
                  <div className="contente">
                    A mesterséges intelligencia és a gépi tanulás területei
                    forradalmasítják az informatikát. Az olyan alkalmazások,
                    mint az autonóm járművek és a nyelvi felismerés, az MI és a
                    gépi tanulás legújabb fejlesztéseinek eredményei.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-item">
            <Button
              onClick={handleNewsModalOpen}
              variant="contained"
              color="primary"
              id="addNewsButton"
            >
              Új hír hozzáadása
            </Button>
          </div>
        </div>
      )}

      <Modal
        open={newsModalOpen}
        onClose={handleNewsModalClose}
        aria-labelledby="news-modal-title"
        aria-describedby="news-modal-description"
      >
        <Box sx={isSmallScreen ? styleSmall : style}>
          <CloseButton onClick={handleNewsModalClose} color="primary">
            X
          </CloseButton>
          <Typography variant="h6" component="div" id="news-modal-title">
            Új hír hozzáadása
          </Typography>
          <TextField
            label="Cím"
            fullWidth
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
          />
          <TextField
            label="Tartalom"
            multiline
            rows={4}
            fullWidth
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          />
          <Button
            variant="contained"
            color="secondary"
            style={{ marginTop: "16px" }}
            onClick={() => {
              handleClosePost();
              handleNewsModalClose();
            }}
          >
            Hozzáadás
          </Button>
        </Box>
      </Modal>
    </>
  );
}
