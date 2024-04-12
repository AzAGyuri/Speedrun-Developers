import React, { useState, useEffect, useMemo } from "react";
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
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

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

export function LandingPage({ children, setIsLoading, isLoading, jwt }) {
  const staticEntries = useMemo(
    () => [
      {
        id: 1,
        title: "Algoritmusok és Adatszerkezetek",
        content:
          "Az algoritmusok és adatszerkezetek kulcsfontosságú fogalmak az informatikában. Az algoritmusok hatékony megvalósítása és az optimális adatszerkezetek kiválasztása lehetővé teszi az informatikai problémák hatékony megoldását.",
        createdOn: "2024-04-01 12:00:00",
        subject: "ICT",
      },
      {
        id: 2,
        title: "Felhőalapú Számítástechnika",
        content:
          "A felhőalapú számítástechnika forradalmasította az informatikát. Az egyre növekvő számú vállalat és felhasználó számára biztosítja az adatok tárolását, szolgáltatásokat és alkalmazásokat a világhálón keresztül.",
        createdOn: "2024-04-01 12:00:00",
        subject: "ICT",
      },
      {
        id: 3,
        title: "Kiberbiztonság és Hálózatbiztonság",
        content:
          "A kiberbiztonság és hálózatbiztonság napjainkban kulcsfontosságú területe az informatikának. Az internetes fenyegetések és a számítógépes bűnözés elleni védelem elengedhetetlen a biztonságos online környezet megteremtéséhez.",
        createdOn: "2024-04-01 12:00:00",
        subject: "ICT",
      },
      {
        id: 4,
        title: "Adattudomány és Nagy Adat",
        content:
          "Az adattudomány és a nagy adat elemzésének képességei forradalmasítják az üzleti és tudományos területeket egyaránt. Az adatokból való értelmezés lehetővé teszi a trendek felismerését és a jövőbeli döntések meghozatalát.",
        createdOn: "2024-04-01 12:00:00",
        subject: "ICT",
      },
      {
        id: 5,
        title: "Mesterséges Intelligencia és Gépi Tanulás",
        content:
          "A mesterséges intelligencia és a gépi tanulás területei forradalmasítják az informatikát. Az olyan alkalmazások, mint az autonóm járművek és a nyelvi felismerés, az MI és a gépi tanulás legújabb fejlesztéseinek eredményei.",
        createdOn: "2024-04-01 12:00:00",
        subject: "ICT",
      },
    ],
    []
  );

  const [open, setOpen] = useState(
    sessionStorage.getItem("modalOpen") === "false" ? false : true
  );
  const [newEntryModalOpen, setNewEntryModalOpen] = useState(false);
  const [newEntryTitle, setNewEntryTitle] = useState("");
  const [newEntryContent, setNewEntryContent] = useState("");
  const [newSubject, setNewSubject] = useState("HISTORY");
  const [subject, setSubject] = useState("");
  const [entries, setEntries] = useState(staticEntries);
  const [filteredEntries, setFilteredEntries] = useState(entries);
  const isSmallScreen = useMediaQuery("(max-width:950px)");

  function modalStayClosed() {
    sessionStorage.setItem("modalOpen", "false");
    handleClose();
  }

  const handleClose = () => {
    setOpen(false);
  };

  /*const handleClosePost = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;
    setPosts([{ title: newPostTitle, content: newPostContent, date: formattedDate }, ...posts]);
  };*/

  const handleNewEntryModalOpen = () => {
    setNewEntryModalOpen(true);
  };

  const handleNewEntrySave = () => {
    const requestData = {
      title: newEntryTitle,
      content: newEntryContent,
      keep: false,
      test: false,
      subject: newSubject,
    };
    setIsLoading(true);

    axios
      .post(`/entry`, requestData, { headers: { Authorization: jwt } })
      .then((response) => {
        let newEntry = response.data;
        console.log("Entry sikeresen közzétéve:", newEntry);
        setEntries(entries.concat(newEntry));
      })
      .catch((error) => {
        console.error("Hiba történt a bejegyzés közzététele közben:", error);
      });

    setNewEntryModalOpen(false);
    setNewEntryTitle("");
    setNewEntryContent("");
    setNewSubject("HISTORY");
  };

  const handleNewEntryModalCancel = () => {
    setNewEntryModalOpen(false);
  };

  const handleSubjectSelect = (event) => {
    setSubject(event.target.id);
  };

  useEffect(() => {
    axios
      .get(`/entry`, { headers: { Authorization: jwt } })
      .then((response) => {
        setEntries(response.data.entries);
      })
      .catch((error) => {
        console.error("Hiba történt adatok lekérdezéskor", error);
        setEntries(staticEntries);
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, [setIsLoading, staticEntries]);

  useEffect(() => {
    setFilteredEntries(
      subject ? entries.filter((entry) => entry.subject === subject) : entries
    );
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, [entries, subject, setIsLoading]);

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
          <Box sx={isSmallScreen ? styleSmall : style}>
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
              onClick={handleNewEntryModalOpen}
              variant="contained"
              color="primary"
              style={{
                cursor: "cell",
              }}
            >
              Új Bejegyzés hozzáadása
            </Button>
          </div>
          <div className="flex-container">
            <div className="flex-item">
              {filteredEntries
                .slice(0)
                .reverse()
                .map((entry) => (
                  <div className="contente-flex" key={entry.id}>
                    <div className="flexcontente-item">
                      <div className="contente-box">
                        <div className="contente-title">{entry.title}</div>
                        <div className="contente">{entry.content}</div>
                        <div className="post-date">{entry.createdOn}</div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex-container">
          <div className="flex-item">
            <div className="drawer">
              <Container
                style={{ textDecoration: "none", color: "white", padding: 0 }}
                underline="none"
                rel="noreferrer"
                color="inherit"
              >
                <div className="subject-container">
                  <span onClick={handleSubjectSelect} id="">
                    Vegyes
                  </span>
                  <PublicIcon
                    className="subjectIMG"
                    style={{ color: "black" }}
                  />
                </div>
              </Container>
              <Container
                style={{ textDecoration: "none", color: "white", padding: 0 }}
                underline="none"
                rel="noreferrer"
                color="inherit"
              >
                <div className="subject-container">
                  <span onClick={handleSubjectSelect} id="MATHS">
                    Matematika
                  </span>
                  <img
                    src={mathematics}
                    alt="Matematika"
                    className="subjectIMG"
                  />
                </div>
              </Container>
              <Container
                style={{ textDecoration: "none", color: "white", padding: 0 }}
                underline="none"
                rel="noreferrer"
                color="inherit"
              >
                <div className="subject-container">
                  <span onClick={handleSubjectSelect} id="HUNGARIAN">
                    Magyar Nyelv
                  </span>
                  <img
                    src={grammer}
                    alt="Magyar Nyelv"
                    className="subjectIMG"
                  />
                </div>
              </Container>
              <Container
                style={{ textDecoration: "none", color: "white", padding: 0 }}
                underline="none"
                rel="noreferrer"
                color="inherit"
              >
                <div className="subject-container">
                  <span onClick={handleSubjectSelect} id="HISTORY">
                    Történelem
                  </span>
                  <img src={history} alt="Történelem" className="subjectIMG" />
                </div>
              </Container>
              <Container
                style={{ textDecoration: "none", color: "white", padding: 0 }}
                underline="none"
                rel="noreferrer"
                color="inherit"
              >
                <div className="subject-container">
                  <span onClick={handleSubjectSelect} id="TECHNICAL_ENGLISH">
                    Szakmai angol
                  </span>
                  <img src={iteng} alt="Szakmai angol" className="subjectIMG" />
                </div>
              </Container>
              <Container
                style={{ textDecoration: "none", color: "white", padding: 0 }}
                underline="none"
                rel="noreferrer"
                color="inherit"
              >
                <div className="subject-container">
                  <span onClick={handleSubjectSelect} id="ICT">
                    Informatika
                  </span>
                  <img src={it} alt="Informatika" className="subjectIMG" />
                </div>
              </Container>
              <div className="blackLine"></div>
            </div>
          </div>
          <div className="flex-item">
            {filteredEntries
              .slice(0)
              .reverse()
              .map((entry) => (
                <div className="contente-flex" key={entry.id}>
                  <div className="flexcontente-item">
                    <div className="contente-box">
                      <div className="contente-title">{entry.title}</div>
                      <div className="contente">{entry.content}</div>
                      <div className="post-date">{entry.createdOn}</div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div
            className="flex-item"
            style={{
              cursor: "cell",
            }}
          >
            <Button
              onClick={handleNewEntryModalOpen}
              variant="contained"
              color="primary"
              id="addNewsButton"
              style={{
                cursor: "cell",
              }}
            >
              Új Bejegyzés hozzáadása
            </Button>
          </div>
        </div>
      )}

      <Modal
        open={newEntryModalOpen}
        onClose={handleNewEntryModalCancel}
        aria-labelledby="news-modal-title"
        aria-describedby="news-modal-description"
      >
        <Box sx={isSmallScreen ? styleSmall : style}>
          <CloseButton onClick={handleNewEntryModalCancel} color="primary">
            X
          </CloseButton>
          <Typography variant="h6" component="div" id="news-modal-title">
            Új Bejegyzés hozzáadása
          </Typography>
          <TextField
            label="Cím"
            fullWidth
            value={newEntryTitle}
            onChange={(e) => setNewEntryTitle(e.target.value)}
            style={{ marginTop: "15px" }}
          />
          <TextField
            label="Tartalom"
            multiline
            rows={4}
            fullWidth
            value={newEntryContent}
            onChange={(e) => setNewEntryContent(e.target.value)}
            style={{ marginTop: "15px", marginBottom: "15px" }}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Tantárgy</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={newSubject}
              label="Tantárgy"
              onChange={(e) => setNewSubject(e.target.value)}
            >
              <MenuItem value={"HISTORY"}>Történelem</MenuItem>
              <MenuItem value={"HUNGARIAN"}>Magyar</MenuItem>
              <MenuItem value={"MATHS"}>Matematika</MenuItem>
              <MenuItem value={"ICT"}>Informatika</MenuItem>
              <MenuItem value={"TECHNICAL_ENGLISH"}>Szakmai Angol</MenuItem>
            </Select>
          </FormControl>
          <BottomButtonsContainer>
            <Button
              id="cellButton"
              variant="contained"
              color="success"
              style={{ marginTop: "16px", cursor: "cell" }}
              onClick={handleNewEntrySave}
            >
              Hozzáadás
            </Button>
            <Button
              id="cellButton"
              variant="contained"
              color="error"
              style={{ marginTop: "16px", cursor: "cell" }}
              onClick={handleNewEntryModalCancel}
            >
              Mégse
            </Button>
          </BottomButtonsContainer>
        </Box>
      </Modal>
    </>
  );
}
