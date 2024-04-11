import React from "react";
import {
  Container,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Button,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from 'axios';


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

const LargeText = styled(Typography)({
  marginBottom: (theme) => theme.spacing(1),
  fontSize: "1.5rem",
  textAlign: "justify",
  lineHeight: "1.6",
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
  marginBottom: (theme) => theme.spacing(2),
  marginLeft: "5px",
  fontSize: "1.8rem",
  fontWeight: "bold",
  color: "#333",
});

const CommentInput = styled("textarea")({
  marginBottom: (theme) => theme.spacing(2),
  padding: (theme) => theme.spacing(1),
  fontSize: "1.2rem",
  minHeight: "80px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  resize: "vertical",
});

const CommentButton = styled(Button)({
  alignSelf: "flex-start",
  backgroundColor: "#2f3826",
  color: "white",
  "&:hover": {
    backgroundColor: "#6c7530",
  },
});

const Comment = styled("div")({
  marginTop: (theme) => theme.spacing(2),
  padding: (theme) => theme.spacing(2),
  marginTop: "20px",
  backgroundColor: "#fff",
  borderRadius: "5px",
  boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.1)",
});

const CommentContent = styled("p")({
  marginBottom: (theme) => theme.spacing(1),
  fontSize: "1.4rem",
  textAlign: "justify",
  marginLeft: "5px",
});

const CommentAuthor = styled("span")({
  fontSize: "1rem",
  color: "#777",
  marginRight: (theme) => theme.spacing(1),
  marginLeft: "5px",
  fontWeight: "bold",
});

const CommentDate = styled("span")({
  fontSize: "1rem",
  color: "#777",
  marginLeft: "6px",
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

const StyledListItem = styled(ListItem)({
  borderBottom: "1px solid #7ffc03",
});

const StyledListItemText = styled(ListItemText)({
  color: "white",
});

export function Matek({ children }) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [showSubMenu1, setShowSubMenu1] = React.useState(false);
  const [showSubMenu2, setShowSubMenu2] = React.useState(false);
  const [showSubMenu3, setShowSubMenu3] = React.useState(false);
  const [showSubMenu4, setShowSubMenu4] = React.useState(false);

  const [showSubSubMenu1, setShowSubSubMenu1] = React.useState(false);
  const [showSubSubMenu2, setShowSubSubMenu2] = React.useState(false);
  const [showSubSubMenu3, setShowSubSubMenu3] = React.useState(false);
  const [showSubSubMenu4, setShowSubSubMenu4] = React.useState(false);

  const [mainMenuText, setMainMenuText] = React.useState(
    "Különböző matematikai fogalmak felfedezése elengedhetetlen a tantárgy szilárd megértéséhez. Merüljünk el néhány alapvető matematikai témában."
  );

  const [subMenuText, setSubMenuText] = React.useState("");

  const [subSubMenuItemText, setSubSubMenuItemText] = React.useState("");

  const [comments, setComments] = React.useState([]);
  const [newComment, setNewComment] = React.useState("");

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };
  const fetchComments = () => {
    const backendUrl = '/comment';
    axios.get(backendUrl)
      .then(response => {
        const fetchedComments = response.data.comments;
        console.log('Komment', fetchedComments);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
        alert('Hiba a kommentek lekérdezésekor',error);
      });
  };

  const deleteComment = (commentId) => {
    const backendUrl = `/comment/${commentId}`;
  
    axios.delete(backendUrl)
      .then(response => {
        console.log('Komment törölve', response.data);
      })
      .catch(error => {
        console.error('Error deleting comment:', error);
        alert('Hiba a komment törlésekor',error);
      });
  };
  
  const handleCommentSubmit = () => {  
    const backendUrl = '/comment';
    const requestBody = {
      content: newComment,
      entryId: 0 
    };
    axios.post(backendUrl, requestBody, {headers:{Authorization:localStorage.getItem("jwt")}})
      .then(response => {
        const newComments = [
          ...comments,
          {
            content: newComment,
            author: "Felhasználó",
            date: new Date().toLocaleDateString(),
          },
        ];
        setComments(newComments);
        setNewComment("");
      })
      .catch(error => {
        console.error('Error submitting comment:', error);
        alert('Hiba a komment elküldésekor',error);
      });
  };
  

  const handleCommentDelete = (index) => {
    const updatedComments = [...comments];
    updatedComments.splice(index, 1);
    setComments(updatedComments);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuItemClick = (menuItem) => {
    setShowSubMenu1(false);
    setShowSubMenu2(false);
    setShowSubMenu3(false);
    setShowSubMenu4(false);
    setShowSubSubMenu1(false);
    setShowSubSubMenu2(false);
    setShowSubSubMenu3(false);
    setShowSubSubMenu4(false);

    switch (menuItem) {
      case 1:
        setShowSubMenu1(!showSubMenu1);
        setSubMenuText(
          "Az algebrai kifejezések és egyenletek területe foglalkozik a matematikai kifejezések manipulációjával és azok megoldásával. A polinomok, másodfokú és harmadfokú egyenletek elemzése itt történik."
        );
        setMainMenuText(
          "Az algebrai kifejezések és egyenletek segítenek megérteni az ismeretlenekkel való számolást és azok kapcsolatát."
        );
        break;
      case 2:
        setShowSubMenu2(!showSubMenu2);
        setSubMenuText(
          "A geometria a térbeli formák, alakzatok és azok tulajdonságainak tanulmányozásával foglalkozik. Ide tartoznak például a háromszögek és körök elemzése."
        );
        setMainMenuText(
          "A geometria segít a térbeli képességek fejlesztésében és a formák megértésében."
        );
        break;
      case 3:
        setShowSubMenu3(!showSubMenu3);
        setSubMenuText(
          "A kalkulus az analízis egy területe, amely a változások és folyamatok matematikai alapjait vizsgálja. Ide tartoznak a határértékek és deriváltak."
        );
        setMainMenuText(
          "A kalkulus nélkülözhetetlen az időbeli változások matematikai modellezéséhez."
        );
        break;
      case 4:
        setShowSubMenu4(!showSubMenu4);
        setSubMenuText(
          "A statisztika adataink elemzésével és értelmezésével foglalkozik. Az inferenciális statisztika például a mintázatokból származó következtetéseket vizsgálja."
        );
        setMainMenuText(
          "A statisztika segít eligazodni az adatok tengerében és értelmezni a körülöttünk lévő jelenségeket."
        );
        break;
      default:
        break;
    }
  };

  const handleSubMenuItemClick = (subMenuItem) => {
    switch (subMenuItem) {
      case 1:
        setShowSubSubMenu1(!showSubSubMenu1);
        setSubSubMenuItemText(
          "A Másodfokú Egyenletek és Harmadfokú Egyenletek megoldása és elemzése. Ezek a típusú egyenletek gyakran fordulnak elő a matematikai problémákban és fizikai jelenségek modellezésében."
        );
        setSubMenuText(
          "A polinomok és algebrai kifejezések mellett a másodfokú és harmadfokú egyenletek is fontosak a matematikában és más tudományágakban."
        );
        break;
      case 2:
        setShowSubSubMenu2(!showSubSubMenu2);
        setSubSubMenuItemText(
          "Az Exponenciális Függvények tanulmányozása és alkalmazása. Ezek a függvények gyakran előfordulnak természeti folyamatok, növekedési modellek és gazdasági jelenségek leírásában."
        );
        setSubMenuText(
          "Az exponenciális függvények az exponenciális növekedés és csökkenés matematikai modelljei. Gyakran alkalmazzák gazdasági és természettudományos területeken."
        );
        break;
      case 3:
        setShowSubSubMenu3(!showSubSubMenu3);
        setSubSubMenuItemText(
          "A Háromszögek különböző típusainak és tulajdonságainak elemzése. Ezen belül a derékszögű háromszögek és egyenlőszárú háromszögek vizsgálata."
        );
        setSubMenuText(
          "A háromszögek tanulmányozása segít megérteni a síkgeometria alapjait és alkalmazásait a való életben."
        );
        break;
      case 4:
        setShowSubSubMenu4(!showSubSubMenu4);
        setSubSubMenuItemText(
          "Az Inferenciális Statisztika az adatokon alapuló következtetések és prognózisok tanulmányozása. Fontos a tudományos kutatásokban és döntéshozatali folyamatokban."
        );
        setSubMenuText(
          "Az inferenciális statisztika segít a következtetések levonásában és a jövőbeli események előrejelzésében adataink alapján."
        );
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Tooltip title="Több tananyag ebben a témában">
        <StyledDrawerButton onClick={toggleDrawer}>
          <MenuIcon />
        </StyledDrawerButton>
      </Tooltip>
      <StyledDrawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <StyledList>
          <StyledListItem button onClick={() => handleMenuItemClick(1)}>
            <StyledListItemText primary="Algebrai Kifejezések" />
          </StyledListItem>
          <Collapse in={showSubMenu1} timeout="auto" unmountOnExit>
            <StyledList
              component="div"
              disablePadding
              style={{ paddingLeft: "20px" }}
            >
              <StyledListItem button onClick={() => handleSubMenuItemClick(1)}>
                <StyledListItemText primary="Polinomok" />
              </StyledListItem>
              <Collapse in={showSubSubMenu1} timeout="auto" unmountOnExit>
                <StyledList
                  component="div"
                  disablePadding
                  style={{ paddingLeft: "20px" }}
                >
                  <StyledListItem button>
                    <StyledListItemText primary="Másodfokú Egyenletek" />
                  </StyledListItem>
                  <StyledListItem button>
                    <StyledListItemText primary="Harmadfokú Egyenletek" />
                  </StyledListItem>
                </StyledList>
              </Collapse>
              <StyledListItem button onClick={() => handleSubMenuItemClick(2)}>
                <StyledListItemText primary="Exponenciális Függvények" />
              </StyledListItem>
            </StyledList>
          </Collapse>
          <StyledListItem button onClick={() => handleMenuItemClick(2)}>
            <StyledListItemText primary="Geometria" />
          </StyledListItem>
          <Collapse in={showSubMenu2} timeout="auto" unmountOnExit>
            <StyledList
              component="div"
              disablePadding
              style={{ paddingLeft: "20px" }}
            >
              <StyledListItem button onClick={() => handleSubMenuItemClick(3)}>
                <StyledListItemText primary="Háromszögek" />
              </StyledListItem>
              <Collapse in={showSubSubMenu3} timeout="auto" unmountOnExit>
                <StyledList
                  component="div"
                  disablePadding
                  style={{ paddingLeft: "20px" }}
                >
                  <StyledListItem button>
                    <StyledListItemText primary="Derékszögű Háromszögek" />
                  </StyledListItem>
                  <StyledListItem button>
                    <StyledListItemText primary="Egyenlőszárú Háromszögek" />
                  </StyledListItem>
                </StyledList>
              </Collapse>
              <StyledListItem button onClick={() => handleSubMenuItemClick(4)}>
                <StyledListItemText primary="Körök" />
              </StyledListItem>
            </StyledList>
          </Collapse>
          <StyledListItem button onClick={() => handleMenuItemClick(3)}>
            <StyledListItemText primary="Kalkulus" />
          </StyledListItem>
          <Collapse in={showSubMenu3} timeout="auto" unmountOnExit>
            <StyledList
              component="div"
              disablePadding
              style={{ paddingLeft: "20px" }}
            >
              <StyledListItem button onClick={() => handleSubMenuItemClick(4)}>
                <StyledListItemText primary="Határérték" />
              </StyledListItem>
              <StyledListItem button>
                <StyledListItemText primary="Deriváltak" />
              </StyledListItem>
            </StyledList>
          </Collapse>
          <StyledListItem button onClick={() => handleMenuItemClick(4)}>
            <StyledListItemText primary="Statisztika" />
          </StyledListItem>
          <Collapse in={showSubMenu4} timeout="auto" unmountOnExit>
            <StyledList
              component="div"
              disablePadding
              style={{ paddingLeft: "20px" }}
            >
              <StyledListItem button onClick={() => handleSubMenuItemClick(4)}>
                <StyledListItemText primary="Inferenciális Statisztika" />
              </StyledListItem>
            </StyledList>
          </Collapse>
        </StyledList>
      </StyledDrawer>

      <StyledContainer>
        <Title variant="h3">A Matematikai Fogalmakról</Title>
      </StyledContainer>

      {mainMenuText && (
        <StyledContainer>
          <LargeText variant="body1">{mainMenuText}</LargeText>
        </StyledContainer>
      )}

      {subMenuText && (
        <StyledContainer>
          <LargeText variant="body1">{subMenuText}</LargeText>
        </StyledContainer>
      )}

      {subSubMenuItemText && (
        <StyledContainer>
          <LargeText variant="body1">{subSubMenuItemText}</LargeText>
        </StyledContainer>
      )}
      <CommentSection>
        <CommentHeader>Vélemények és hozzászólások</CommentHeader>
        <CommentInput
          placeholder="Mit gondolsz a tananyagról?..."
          value={newComment}
          onChange={handleCommentChange}
        />
        <CommentButton variant="contained" onClick={handleCommentSubmit}>
          Hozzászólás küldése
        </CommentButton>
        {comments.map((comment, index) => (
          <Comment key={index}>
            <CommentContent>{comment.content}</CommentContent>
            <div>
              <CommentAuthor>{comment.author}</CommentAuthor>
              <CommentDate>{comment.date}</CommentDate>
              <IconButton
                edge="end"
                color="inherit"
                onClick={() => handleCommentDelete(index)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </Comment>
        ))}
      </CommentSection>
    </>
  );
}
