import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Tooltip,
  Box,
  Modal,
} from "@mui/material";
import { styled } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Loading } from "../../components/Loading/Loading";
import { Entry } from "../../components/Entry/Entry";

const StyledContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px",
  marginTop: "20px",
  backgroundColor: "#4caf50",
  color: "#333",
  borderRadius: "10px",
  boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
  marginBottom: "20px",
  border: "2.5px solid #2f3826",
});

const Title = styled(Typography)({
  marginBottom: (theme) => theme.spacing(2),
  fontSize: "2rem",
  marginTop: (theme) => theme.spacing(1),
  fontWeight: "bold",
});

const StyledListItem = styled(ListItem)({
  padding: "10px",
  marginBottom: "8px",
  backgroundColor: "#2f3826",
  borderRadius: "5px",
  color: "white",
  border: "2px solid #4caf50",
  fontFamily: "Arial, sans-serif",
  fontSize: "1.2rem",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#e0e0e0",
  },
});

const StyledAllAuthorsListItem = styled(ListItem)({
  padding: "10px",
  marginBottom: "8px",
  backgroundColor: "#4caf50",
  borderRadius: "5px",
  color: "white",
  border: "2px solid #e6760e",
  fontFamily: "Arial, sans-serif",
  fontSize: "1.4rem",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#e0e0e0",
  },
});

const StyledDrawerButton = styled(IconButton)({
  position: "fixed",
  top: "70px",
  left: "25px",
  borderRadius: "50%",
  backgroundColor: "#2f3826",
  color: "white",
  fontSize: "1.2rem",
  zIndex: 1000,
  "&:hover": {
    backgroundColor: "#6c7530",
  },
});

const StyledDrawer = styled(Drawer)({
  "& .MuiPaper-root": {
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    color: "white",
    width: "280px",
  },
});

const StyledList = styled(List)({
  width: "100%",
});

const CommentSection = styled("div")({
  margin: "0 auto",
  marginTop: (theme) => theme.spacing(3),
  marginBottom: (theme) => theme.spacing(3),
  maxWidth: "1000px",
  backgroundColor: "#f0f0f0",
  padding: (theme) => theme.spacing(3),
  borderRadius: "10px",
  boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
});

const CommentHeader = styled("div")({
  margin: "5px 15px 10px",
  fontSize: "1.8rem",
  fontWeight: "bold",
  color: "#333",
});

const CommentInput = styled("textarea")({
  margin: "0 5px",
  padding: "10px",
  fontSize: "1.2rem",
  minHeight: "80px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  resize: "vertical",
});

const CommentButton = styled(Button)({
  margin: "15px",
  alignSelf: "flex-start",
  backgroundColor: "#2f3826",
  color: "white",
  "&:hover": {
    backgroundColor: "#6c7530",
  },
});

const Comment = styled("div")({
  margin: "15px",
  padding: "5px",
  paddingBottom: "15px",
  backgroundColor: "#fff",
  borderRadius: "5px",
  boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.1)",
});

const CommentContent = styled("p")({
  fontSize: "1.4rem",
  textAlign: "justify",
  marginLeft: "5px",
});

const CommentAuthor = styled("span")({
  fontSize: "1rem",
  color: "#777",
  marginLeft: "5px",
  fontWeight: "bold",
});

const CommentDate = styled("span")({
  fontSize: "1rem",
  color: "#777",
  marginLeft: "6px",
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

export function EntryList({
  children,
  jwt,
  setIsLoading,
  isLoading,
  subject,
  currentUserId,
}) {
  let title = "";
  switch (subject) {
    case "TECHNICAL_ENGLISH":
      title = "Szakmai Angol bejegyzések";
      break;
    case "MATHS":
      title = "Matematika bejegyzések";
      break;
    case "HUNGARIAN":
      title = "Magyar bejegyzések";
      break;
    case "HISTORY":
      title = "Történelem bejegyzések";
      break;
    case "ICT":
      title = "Informatika bejegyzések";
      break;
    default:
      title = "Bejegyzések";
  }
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const dummyDataForEntries = useMemo(
    () => [
      {
        id: 1,
        title: "A prímszámok világa",
        content: "A prímszámok fontos szerepet játszanak a matematikában",
        createdOn: "2023.01.15",
        author: {
          id: 1,
          username: "Emberke 1",
          lastLogin: null,
          lastLogoff: null,
          nickname: null,
          randomAvatarBgColor: "#FA6257",
        },
        subject: "MATHS",
      },
      {
        id: 2,
        title: "Az algebra alapjai",
        content: "Az alapvető algebrai műveletek és fogalmak",
        createdOn: "2023.02.03",
        author: {
          id: 2,
          username: "Emberke 2",
          lastLogin: null,
          lastLogoff: null,
          nickname: null,
          randomAvatarBgColor: "#FA6257",
        },
        subject: "MATHS",
      },
      {
        id: 3,
        title: "A geometria varázslata",
        content: "A geometriai alakzatok és tulajdonságaik megértése",
        createdOn: "2023.03.15",
        author: {
          id: 2,
          username: "Emberke 2",
          lastLogin: null,
          lastLogoff: null,
          nickname: null,
          randomAvatarBgColor: "#FA6257",
        },
        subject: "MATHS",
      },
      {
        id: 4,
        title: "A differenciálszámítás alapjai",
        content: "Az alapfogalmak és az elsődleges szabályok",
        createdOn: "2023.04.04",
        author: {
          id: 1,
          username: "Emberke 1",
          lastLogin: null,
          lastLogoff: null,
          nickname: null,
          randomAvatarBgColor: "#FA6257",
        },
        subject: "MATHS",
      },
      {
        id: 5,
        title: "A valószínűségszámítás alapjai",
        content: "A valószínűségszámítás fontossága és alkalmazása",
        createdOn: "2023.05.20",
        author: {
          id: 3,
          username: "Emberke 3",
          lastLogin: null,
          lastLogoff: null,
          nickname: null,
          randomAvatarBgColor: "#FA6257",
        },
        subject: "MATHS",
      },
      {
        id: 6,
        title: "Petőfi Sándor élete és művei",
        content: "A magyar irodalom kiemelkedő alakja és költői öröksége",
        createdOn: "2023.01.15",
        author: {
          id: 1,
          username: "Emberke 1",
          lastLogin: null,
          lastLogoff: null,
          nickname: null,
          randomAvatarBgColor: "#FA6257",
        },
        category: "HUNGARIAN",
      },
      {
        id: 7,
        title: "A Jókai-regények világa",
        content: "Jókai Mór regényeinek jelentősége és hatása",
        createdOn: "2023.02.03",
        author: {
          id: 2,
          username: "Emberke 2",
          lastLogin: null,
          lastLogoff: null,
          nickname: null,
          randomAvatarBgColor: "#FA6257",
        },
        category: "HUNGARIAN",
      },
      {
        id: 8,
        title: "Az Áprily-regények és novellák",
        content: "Áprily Lajos műveinek sokszínűsége és irodalmi értéke",
        createdOn: "2023.03.15",
        author: {
          id: 2,
          username: "Emberke 2",
          lastLogin: null,
          lastLogoff: null,
          nickname: null,
          randomAvatarBgColor: "#FA6257",
        },
        category: "HUNGARIAN",
      },
      {
        id: 9,
        title: "A magyar költészet aranykora",
        content: "A romantika és a szimbolizmus jelentős költői és alkotásai",
        createdOn: "2023.04.04",
        author: {
          id: 1,
          username: "Emberke 1",
          lastLogin: null,
          lastLogoff: null,
          nickname: null,
          randomAvatarBgColor: "#FA6257",
        },
        category: "HUNGARIAN",
      },
      {
        id: 10,
        title: "A XX. századi magyar drámaírás",
        content:
          "Az újító drámaírók és a kortárs magyar dráma jellegzetességei",
        createdOn: "2023.05.20",
        author: {
          id: 1,
          username: "Emberke 1",
          lastLogin: null,
          lastLogoff: null,
          nickname: null,
          randomAvatarBgColor: "#FA6257",
        },
        category: "HUNGARIAN",
      },
      {
        id: 11,
        title: "Algoritmusok és Adatszerkezetek",
        content:
          "Az algoritmusok és adatszerkezetek kulcsfontosságú fogalmak az informatikában. Az algoritmusok hatékony megvalósítása és az optimális adatszerkezetek kiválasztása lehetővé teszi az informatikai problémák hatékony megoldását.",
        createdOn: "2024-04-01",
        author: {
          id: 1,
          username: "Emberke 1",
          lastLogin: null,
          lastLogoff: null,
          nickname: null,
          randomAvatarBgColor: "#FA6257",
        },
        category: "ICT",
      },
      {
        id: 12,
        title: "Felhőalapú Számítástechnika",
        content:
          "A felhőalapú számítástechnika forradalmasította az informatikát. Az egyre növekvő számú vállalat és felhasználó számára biztosítja az adatok tárolását, szolgáltatásokat és alkalmazásokat a világhálón keresztül.",
        createdOn: "2024-04-01",
        author: {
          id: 1,
          username: "Emberke 1",
          lastLogin: null,
          lastLogoff: null,
          nickname: null,
          randomAvatarBgColor: "#FA6257",
        },
        category: "ICT",
      },
      {
        id: 13,
        title: "Kiberbiztonság és Hálózatbiztonság",
        content:
          "A kiberbiztonság és hálózatbiztonság napjainkban kulcsfontosságú területe az informatikának. Az internetes fenyegetések és a számítógépes bűnözés elleni védelem elengedhetetlen a biztonságos online környezet megteremtéséhez.",
        createdOn: "2024-04-01",
        author: {
          id: 1,
          username: "Emberke 1",
          lastLogin: null,
          lastLogoff: null,
          nickname: null,
          randomAvatarBgColor: "#FA6257",
        },
        category: "ICT",
      },
      {
        id: 14,
        title: "Adattudomány és Nagy Adat",
        content:
          "Az adattudomány és a nagy adat elemzésének képességei forradalmasítják az üzleti és tudományos területeket egyaránt. Az adatokból való értelmezés lehetővé teszi a trendek felismerését és a jövőbeli döntések meghozatalát.",
        createdOn: "2024-04-01",
        author: {
          id: 1,
          username: "Emberke 1",
          lastLogin: null,
          lastLogoff: null,
          nickname: null,
          randomAvatarBgColor: "#FA6257",
        },
        category: "ICT",
      },
      {
        id: 15,
        title: "Mesterséges Intelligencia és Gépi Tanulás",
        content:
          "A mesterséges intelligencia és a gépi tanulás területei forradalmasítják az informatikát. Az olyan alkalmazások, mint az autonóm járművek és a nyelvi felismerés, az MI és a gépi tanulás legújabb fejlesztéseinek eredményei.",
        createdOn: "2024-04-01",
        author: {
          id: 1,
          username: "Emberke 1",
          lastLogin: null,
          lastLogoff: null,
          nickname: null,
          randomAvatarBgColor: "#FA6257",
        },
        category: "ICT",
      },
      {
        id: 16,
        title: "Exploring Quantum Mechanics",
        content:
          "Understanding the fundamental principles of quantum mechanics",
        createdOn: "2023.01.15",
        author: {
          id: 1,
          username: "Emberke 1",
          lastLogin: null,
          lastLogoff: null,
          nickname: null,
          randomAvatarBgColor: "#FA6257",
        },
        category: "TECHNICAL_ENGLISH",
      },
      {
        id: 17,
        title: "Introduction to Data TECHNICAL_ENGLISH",
        content: "Basic concepts and techniques in data TECHNICAL_ENGLISH",
        createdOn: "2023.02.03",
        author: {
          id: 1,
          username: "Emberke 1",
          lastLogin: null,
          lastLogoff: null,
          nickname: null,
          randomAvatarBgColor: "#FA6257",
        },
        category: "TECHNICAL_ENGLISH",
      },
      {
        id: 18,
        title: "Advancements in Artificial Intelligence",
        content:
          "Recent developments and applications of artificial intelligence",
        createdOn: "2023.03.15",
        author: {
          id: 1,
          username: "Emberke 1",
          lastLogin: null,
          lastLogoff: null,
          nickname: null,
          randomAvatarBgColor: "#FA6257",
        },
        category: "TECHNICAL_ENGLISH",
      },
      {
        id: 19,
        title: "Fundamentals of Cryptography",
        content:
          "Understanding encryption techniques and cryptographic protocols",
        createdOn: "2023.04.04",
        author: {
          id: 1,
          username: "Emberke 1",
          lastLogin: null,
          lastLogoff: null,
          nickname: null,
          randomAvatarBgColor: "#FA6257",
        },
        category: "TECHNICAL_ENGLISH",
      },
      {
        id: 20,
        title: "Theoretical Foundations of Computer Networks",
        content: "Key concepts and models in computer networking",
        createdOn: "2023.05.20",
        author: {
          id: 1,
          username: "Emberke 1",
          lastLogin: null,
          lastLogoff: null,
          nickname: null,
          randomAvatarBgColor: "#FA6257",
        },
        category: "TECHNICAL_ENGLISH",
      },
      {
        id: 21,
        title: "Az Árpád-ház kora",
        content: "A magyar történelem kezdete",
        createdOn: "2023.01.15",
        author: {
          id: 1,
          username: "Emberke 1",
          lastLogin: null,
          lastLogoff: null,
          nickname: null,
          randomAvatarBgColor: "#FA6257",
        },
        category: "HISTORY",
      },
      {
        id: 22,
        title: "A Mohácsi csata",
        content: "Magyarország elvesztette függetlenségét",
        createdOn: "2023.02.03",
        author: {
          id: 1,
          username: "Emberke 1",
          lastLogin: null,
          lastLogoff: null,
          nickname: null,
          randomAvatarBgColor: "#FA6257",
        },
        category: "HISTORY",
      },
      {
        id: 23,
        title: "A Rákóczi-szabadságharc",
        content: "Az összmagyar felkelés a Habsburgok ellen",
        createdOn: "2023.03.15",
        author: {
          id: 1,
          username: "Emberke 1",
          lastLogin: null,
          lastLogoff: null,
          nickname: null,
          randomAvatarBgColor: "#FA6257",
        },
        category: "HISTORY",
      },
      {
        id: 24,
        title: "Az 1848-49-es forradalom és szabadságharc",
        content: "Az osztrák uralom elleni küzdelem",
        createdOn: "2023.04.04",
        author: {
          id: 1,
          username: "Emberke 1",
          lastLogin: null,
          lastLogoff: null,
          nickname: null,
          randomAvatarBgColor: "#FA6257",
        },
        category: "HISTORY",
      },
      {
        id: 25,
        title: "Az első világháború utáni Magyarország",
        content: "A trianoni békeszerződés következményei",
        createdOn: "2023.05.20",
        author: {
          id: 1,
          username: "Emberke 1",
          lastLogin: null,
          lastLogoff: null,
          nickname: null,
          randomAvatarBgColor: "#FA6257",
        },
        category: "HISTORY",
      },
    ],
    []
  );
  const [entries, setEntries] = useState(
    dummyDataForEntries.filter((dummyEntry) => dummyEntry.subject === subject)
  );
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setIsLoading(true);
    setOpen(true);
    setNewComment("");
  };

  const handleClose = () => setOpen(false);
  const [selectedEntry, setSelectedEntry] = React.useState(null);
  const handleEntryClick = (entry) => {
    setSelectedEntry(entry);
    handleOpen();
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    axios
      .post(
        "/api/v1/comment",
        {
          content: newComment,
          entryId: selectedEntry.id,
        },
        { headers: { Authorization: jwt } }
      )
      .then(function (response) {
        setComments(comments.concat(response.data));
      })
      .catch(function (error) {
        console.error("Error submitting comment:", error);
        alert("Hiba történt komment elküldésekor");
      });
    setNewComment("");
  };

  useEffect(() => {
    if (open && selectedEntry) {
      axios
        .get(`/api/v1/comment/${selectedEntry.id}`, {
          headers: { Authorization: jwt },
        })
        .then((response) => {
          const receivedComments = response.data.comments;
          setComments(receivedComments);
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
          alert("Kommentek lekérdezése sikertelen");
        });
    }
  }, [selectedEntry, open, jwt]);

  const handleCommentDelete = (index) => {
    if (window.confirm("Biztosan törlöd ezt a kommentet?")) {
      setIsLoading(true);
      axios
        .delete(`/api/v1/comment/${index}`, {
          headers: { Authorization: jwt },
        })
        .then((response) => {
          console.log("Sikeres törlés", response.data);
          setComments(comments.filter((comment) => comment.id !== index));
          alert("Komment sikeresen törölve");
        })
        .catch((error) => {
          console.error("Error deleting resource:", error);
          alert("Sikertelen törlés! Más felhasználó kommentjét nem törölheted");
        });
    } else {
      alert("A komment nem lett törlve");
    }
  };

  const roles = [].concat(JSON.parse(localStorage.getItem("roles")));

  const handleAdminDeleteEntry = (event) => {
    if (roles.includes("ROLE_ADMIN")) {
      if (window.confirm("Biztosan szeretnéd törölni a bejegyzést?")) {
        setIsLoading(true);
        const id = event.currentTarget.id;
        axios
          .delete(`/api/v1/admin/entry/${id}`, {
            headers: { Authorization: jwt },
          })
          .then((response) => {
            console.log("Sikeres törlés", response.data);
            setEntries(entries.filter((entry) => entry.id !== id));
          })
          .catch((error) => {
            console.error("Hiba történt admin általi bejegyzés során", error);
            const errorCode = error.response.data.status;
            switch (errorCode) {
              case 403:
                alert("Szia fanom, mi jót csinálsz?");
                break;
              case 404:
                alert("Bejegyzés nem található");
                break;
              default:
                alert(
                  "Váratlan hiba történt. Kérjük próbálja meg újra később."
                );
                break;
            }
          });
      } else alert("A bejegyzés nem került törlésre!");
    } else alert("szia fanom, mi jót cinálsz?");
  };

  const handleAdminCommentDelete = (commentId) => {
    if (roles.includes("ROLE_ADMIN")) {
      if (window.confirm("Biztosan szeretnéd törölni a kommentet?")) {
        setIsLoading(true);
        axios
          .delete(`/api/v1/admin/comment/${commentId}`)
          .then((response) => {
            console.log("Komment sikeresen törölve");
            setComments(comments.filter((comment) => comment.id !== commentId));
          })
          .catch((error) => {
            console.error("Hiba történt komment törlése során", error.response);
            switch (error.response.data.status) {
              case 403:
                alert("Szia fanom, mi jót csinálsz?");
                break;
              case 404:
                alert("A megadott komment nem található.");
                break;
              default:
                alert(
                  "Váratlan hiba történt. Kérjük próbálja meg újra később."
                );
                break;
            }
          });
      } else alert("A komment nem került törlésre!");
    } else alert("Szia fanom, mi jót csinálsz?");
  };

  const handleAllAuthorsSelect = () => {
    setSelectedAuthor(null);
    setDrawerOpen(false);
  };

  const handleAuthorSelect = (author) => {
    setSelectedAuthor(author);
    setDrawerOpen(false);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    axios
      .get(`/api/v1/entry?subject=${subject}`, {
        headers: { Authorization: jwt },
      })
      .then((response) => {
        const receivedEntries = response.data.entries;
        if (receivedEntries.length === 0) {
          setEntries(
            dummyDataForEntries.filter(
              (dummyEntry) => dummyEntry.subject === subject
            )
          );
        } else {
          setEntries(receivedEntries);
        }
      })
      .catch((error) => {
        setEntries(
          dummyDataForEntries.filter(
            (dummyEntry) => dummyEntry.subject === subject
          )
        );
        console.error("Error fetching data:", error);
        alert("Kommentek lekérdezése sikertelen");
      });
  }, [setIsLoading, dummyDataForEntries, jwt, subject]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 650);
  }, [setIsLoading, isLoading]);

  const handleDeleteClick = (event) => {
    if (window.confirm("Biztosan törölni szeretnéd a bejegyzést?")) {
      const entryId = event.currentTarget.id;
      axios
        .delete(`/api/v1/entry/${entryId}`, { headers: { Authorization: jwt } })
        .then((response) => {
          setEntries(entries.filter((entry) => entry.id !== response.data.id));
          alert("Bejegyzés sikeresen törölve!");
        })
        .catch((error) => {
          console.error("Hiba történt törlés során", error);
          alert("Hiba történt törlés során");
        });
    } else {
      alert("A bejegyzés nem lett törölve.");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <>
      {children}
      <Tooltip title="Szűrés készítő szerint">
        <StyledDrawerButton onClick={toggleDrawer}>
          <MenuIcon />
        </StyledDrawerButton>
      </Tooltip>
      <StyledDrawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <div
          style={{
            padding: "16px",
            backgroundColor: "#333",
            borderBottom: "1px solid #555",
          }}
        >
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Közzétevő keresése..."
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              border: "2px solid #4caf50",
              width: "calc(100% - 32px)",
              color: "#333",
              backgroundColor: "#fff",
              fontSize: "1.2rem",
              outline: "none",
            }}
          />
        </div>
        <StyledList>
          <StyledAllAuthorsListItem onClick={() => handleAllAuthorsSelect()}>
            <ListItemText primary="Minden közzétevő" />
          </StyledAllAuthorsListItem>
          {entries
            .reduce((authors, entry) => {
              if (!authors.includes(entry.author.username)) {
                authors.push(entry.author.username);
              }
              return authors;
            }, [])
            .filter((author) =>
              author.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((author, index) => (
              <StyledListItem
                key={index}
                onClick={() => handleAuthorSelect(author)}
              >
                <ListItemText primary={author} />
              </StyledListItem>
            ))}
        </StyledList>
      </StyledDrawer>

      <StyledContainer style={{ backgroundColor: "#ccc" }}>
        <Title variant="h3">{title}</Title>
        {selectedAuthor === null
          ? entries.map((entry, index) => (
              <Entry
                key={index}
                id={entry.id}
                title={entry.title}
                content={entry.content}
                createdOn={entry.createdOn}
                authorId={entry.author.id}
                currentUserId={currentUserId}
                authorName={entry.author.username}
                authorBgColor={entry.author.randomAvatarBgColor}
                authorLogIn={entry.author.lastLogin}
                authorLogOff={entry.author.lastLogoff}
                handleEntryClick={handleEntryClick}
                handleDeleteClick={handleDeleteClick}
                handleAdminDeleteEntry={
                  roles.includes("ROLE_ADMIN")
                    ? handleAdminDeleteEntry
                    : alert("szia fanom, mi jót csinálsz?")
                }
                roles={roles}
                tooltipTitle={
                  "Kattints a bejegyzés szövegére, hogy kommentet írj!"
                }
              />
            ))
          : entries
              .filter((entry) => entry.author.username === selectedAuthor)
              .map((entry, index) => (
                <Entry
                  key={index}
                  id={entry.id}
                  title={entry.title}
                  content={entry.content}
                  createdOn={entry.createdOn}
                  authorId={entry.author.id}
                  currentUserId={currentUserId}
                  authorName={entry.author.username}
                  authorBgColor={entry.author.randomAvatarBgColor}
                  authorLogIn={entry.author.lastLogin}
                  authorLogOff={entry.author.lastLogoff}
                  handleEntryClick={handleEntryClick}
                  handleDeleteClick={handleDeleteClick}
                  handleAdminDeleteEntry={
                    roles.includes("ROLE_ADMIN")
                      ? handleAdminDeleteEntry
                      : alert("szia fanom, mi jót csinálsz?")
                  }
                  roles={roles}
                  tooltipTitle={
                    "Kattints a bejegyzés szövegére, hogy kommentet írj!"
                  }
                />
              ))}
      </StyledContainer>
      {selectedEntry && (
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                ...style,
                backgroundColor: "#4b8efa",
              }}
            >
              <Button
                edge="end"
                color="error"
                variant="contained"
                onClick={handleClose}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  marginTop: "5px",
                  marginRight: "5px",
                }}
              >
                X
              </Button>

              <Entry
                id={selectedEntry.id}
                title={selectedEntry.title}
                content={selectedEntry.content}
                createdOn={selectedEntry.createdOn}
                authorName={selectedEntry.authorName}
                authorBgColor={selectedEntry.authorBgColor}
                authorLogIn={selectedEntry.authorLogIn}
                authorLogOff={selectedEntry.authorLogOff}
              />

              <CommentSection>
                <CommentHeader>Vélemények és hozzászólások</CommentHeader>
                <CommentInput
                  placeholder="Mit gondolsz a tananyagról?..."
                  value={newComment}
                  onChange={handleCommentChange}
                />
                <CommentButton
                  variant="contained"
                  onClick={handleCommentSubmit}
                  style={{ marginLeft: "3px", marginBottom: "3px" }}
                >
                  Hozzászólás küldése
                </CommentButton>
                {comments.map((comment, index) => (
                  <Comment key={index}>
                    <CommentContent>{comment.content}</CommentContent>
                    <div>
                      <CommentAuthor
                        aria-owns={open ? "mouse-over-popover" : undefined}
                        aria-haspopup="true"
                      >
                        {comment.author.username}
                      </CommentAuthor>
                      <CommentDate>{comment.createdOn}</CommentDate>
                      {comment.author.id === Number(currentUserId) ? (
                        <Tooltip title="Komment törlése">
                          <IconButton
                            edge="end"
                            color="inherit"
                            onClick={() => handleCommentDelete(comment.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      ) : roles.includes("ROLE_ADMIN") ? (
                        <Tooltip title="Komment admin általi törlése">
                          <IconButton
                            edge="end"
                            color="error"
                            onClick={() => handleAdminCommentDelete(comment.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <></>
                      )}
                    </div>
                  </Comment>
                ))}
              </CommentSection>
            </Box>
          </Modal>
        </div>
      )}
    </>
  );
}
