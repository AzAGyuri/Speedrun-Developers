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

export function Tortenelem({ children }) {
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
    "Az egyes történelmi események és korszakok felfedezése létfontosságú a szilárd történelmi megértéshez. Merüljünk el néhány alapvető magyar történelmi témában."
  );

  const [subMenuText, setSubMenuText] = React.useState("");

  const [subSubMenuItemText, setSubSubMenuItemText] = React.useState("");
  const [comments, setComments] = React.useState([]);
  const [newComment, setNewComment] = React.useState("");

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };
  const handleCommentSubmit = () => {  
    const backendUrl = '/comment';
    const requestBody = {
      content: newComment,
      entryId: 0 
    };
    axios.post(backendUrl, requestBody)
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
          "Az ókori magyar törzsrendszerek és a honfoglalás ideje. Ismerje meg az Árpád-ház kialakulásának és az első magyar állam megalapításának történetét."
        );
        setMainMenuText(
          "Az ókori magyar történelem tanulmányozása feltárja az Árpád-ház és a magyar állam kialakulásának kritikus eseményeit."
        );
        break;
      case 2:
        setShowSubMenu2(!showSubMenu2);
        setSubMenuText(
          "A középkori Magyar Királyság és az Anjou-kor. Ismerje meg a középkori Magyarország társadalmi, politikai és kulturális fejleményeit."
        );
        setMainMenuText(
          "A középkori Magyar Királyság történetének megértése betekintést nyújt a kor társadalmi szerkezetébe."
        );
        break;
      case 3:
        setShowSubMenu3(!showSubMenu3);
        setSubMenuText(
          "A török uralom és a Habsburg Monarchia időszaka Magyarországon. Ismerje meg a török háborúk, a Mohácsi csata és a Habsburg uralom hatásait."
        );
        setMainMenuText(
          "A török uralom és a Habsburg Monarchia időszaka fontos eseményeket hozott Magyarország történetében."
        );
        break;
      case 4:
        setShowSubMenu4(!showSubMenu4);
        setSubMenuText(
          "Az 1956-os forradalom és az ezt követő időszak. Ismerje meg a magyar forradalom eseményeit és az ország történelmi fejlődését a 20. század második felében."
        );
        setMainMenuText(
          "Az 1956-os forradalom és az azt követő időszak kulcsfontosságú volt Magyarország modern történelmében."
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
          "Az Árpád-ház és az első magyar állam kialakulásának folyamata. Ismerje meg a honfoglalás korszakát és az államalapító Szent István uralkodását."
        );
        setSubMenuText(
          "Az ókori magyar történelem mélyebb megértése segít felfedezni az Árpád-ház és az első magyar állam létrejöttének kulcsfontosságú tényezőit."
        );
        break;
      case 2:
        setShowSubSubMenu2(!showSubSubMenu2);
        setSubSubMenuItemText(
          "A középkori Magyar Királyság társadalmi és gazdasági jellemzői. Az Anjou-kor kulturális és politikai hatásai a magyar történelem alakulására."
        );
        setSubMenuText(
          "A középkori Magyar Királyság történelmi részleteinek megértése lehetővé teszi a kor társadalmi és gazdasági jellemzőinek jobb feltárását."
        );
        break;
      case 3:
        setShowSubSubMenu3(!showSubSubMenu3);
        setSubSubMenuItemText(
          "A török uralom kihívásai és a Habsburg Monarchia befolyása. A Mohácsi csata és a török háborúk hatásai Magyarországon."
        );
        setSubMenuText(
          "A török uralom és a Habsburg Monarchia időszakának tanulmányozása segít megérteni a török háborúk és a Habsburg befolyás hatásait Magyarországon."
        );
        break;
      case 4:
        setShowSubSubMenu4(!showSubSubMenu4);
        setSubSubMenuItemText(
          "Az 1956-os forradalom eseményei és az azt követő időszak változásai. Az 56-os események hatása a hidegháborús időszakban."
        );
        setSubMenuText(
          "Az 1956-os forradalom és az azt követő időszak részletes vizsgálata árnyaltabb képet ad a modern Magyarország kialakulásáról."
        );
        break;
      default:
        break;
    }
  };

  return (
    <>
      {children}
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
            <StyledListItemText primary="Ókori Magyar Történelem" />
          </StyledListItem>
          <Collapse in={showSubMenu1} timeout="auto" unmountOnExit>
            <StyledList
              component="div"
              disablePadding
              style={{ paddingLeft: "20px" }}
            >
              <StyledListItem button onClick={() => handleSubMenuItemClick(1)}>
                <StyledListItemText primary="Árpád-ház és Honfoglalás" />
              </StyledListItem>
              <Collapse in={showSubSubMenu1} timeout="auto" unmountOnExit>
                <StyledList
                  component="div"
                  disablePadding
                  style={{ paddingLeft: "20px" }}
                >
                  <StyledListItem button>
                    <StyledListItemText primary="Szent István Uralkodása" />
                  </StyledListItem>
                  <StyledListItem button>
                    <StyledListItemText primary="Államalapítás Folyamata" />
                  </StyledListItem>
                </StyledList>
              </Collapse>
            </StyledList>
          </Collapse>
          <StyledListItem button onClick={() => handleMenuItemClick(2)}>
            <StyledListItemText primary="Középkori Magyarország" />
          </StyledListItem>
          <Collapse in={showSubMenu2} timeout="auto" unmountOnExit>
            <StyledList
              component="div"
              disablePadding
              style={{ paddingLeft: "20px" }}
            >
              <StyledListItem button onClick={() => handleSubMenuItemClick(2)}>
                <StyledListItemText primary="Magyar Királyság és Anjou-kor" />
              </StyledListItem>
              <Collapse in={showSubSubMenu2} timeout="auto" unmountOnExit>
                <StyledList
                  component="div"
                  disablePadding
                  style={{ paddingLeft: "20px" }}
                >
                  <StyledListItem button>
                    <StyledListItemText primary="Társadalmi és Gazdasági Jellemzők" />
                  </StyledListItem>
                  <StyledListItem button>
                    <StyledListItemText primary="Kulturális Hatások" />
                  </StyledListItem>
                </StyledList>
              </Collapse>
            </StyledList>
          </Collapse>
          <StyledListItem button onClick={() => handleMenuItemClick(3)}>
            <StyledListItemText primary="Török Uralom és Habsburg Monarchia" />
          </StyledListItem>
          <Collapse in={showSubMenu3} timeout="auto" unmountOnExit>
            <StyledList
              component="div"
              disablePadding
              style={{ paddingLeft: "20px" }}
            >
              <StyledListItem button onClick={() => handleSubMenuItemClick(3)}>
                <StyledListItemText primary="Török Háborúk és Mohácsi Csata" />
              </StyledListItem>
              <Collapse in={showSubSubMenu3} timeout="auto" unmountOnExit>
                <StyledList
                  component="div"
                  disablePadding
                  style={{ paddingLeft: "20px" }}
                >
                  <StyledListItem button>
                    <StyledListItemText primary="Habsburg Befolyás" />
                  </StyledListItem>
                </StyledList>
              </Collapse>
            </StyledList>
          </Collapse>
          <StyledListItem button onClick={() => handleMenuItemClick(4)}>
            <StyledListItemText primary="1956-os Forradalom és Az Utána Következő Időszak" />
          </StyledListItem>
          <Collapse in={showSubMenu4} timeout="auto" unmountOnExit>
            <StyledList
              component="div"
              disablePadding
              style={{ paddingLeft: "20px" }}
            >
              <StyledListItem button onClick={() => handleSubMenuItemClick(4)}>
                <StyledListItemText primary="Forradalom Eseményei" />
              </StyledListItem>
              <Collapse in={showSubSubMenu4} timeout="auto" unmountOnExit>
                <StyledList
                  component="div"
                  disablePadding
                  style={{ paddingLeft: "20px" }}
                >
                  <StyledListItem button>
                    <StyledListItemText primary="Hidegháborús Hatások" />
                  </StyledListItem>
                </StyledList>
              </Collapse>
            </StyledList>
          </Collapse>
        </StyledList>
      </StyledDrawer>

      <StyledContainer>
        <Title variant="h3">A Magyar Történelemről</Title>
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
