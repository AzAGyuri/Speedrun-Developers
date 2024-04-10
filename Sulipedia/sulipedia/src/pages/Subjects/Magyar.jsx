import React from "react";
import {
  Container,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Collapse,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import DeleteIcon from "@mui/icons-material/Delete";

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

export function Magyar({ children }) {
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
    "Különböző irodalmi fogalmak felfedezése elengedhetetlen a tantárgy szilárd megértéséhez. Merüljünk el néhány alapvető irodalmi témában."
  );

  const [subMenuText, setSubMenuText] = React.useState("");

  const [subSubMenuItemText, setSubSubMenuItemText] = React.useState("");

  const [comments, setComments] = React.useState([]);
  const [newComment, setNewComment] = React.useState("");

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    const newComments = [
      ...comments,
      {
        content: newComment,
        author: "Felhasználó", // itt később a bejelentkezett felhasználó adatait kellene használni
        date: new Date().toLocaleDateString(),
      },
    ];
    setComments(newComments);
    setNewComment("");
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
          "Az irodalmi műfajok és alkotóelemek területe foglalkozik az irodalmi kifejezések manipulációjával és azok megértésével. A költemények, regények és drámák elemzése itt történik."
        );
        setMainMenuText(
          "Az irodalmi fogalmak segítenek megérteni az írásokkal való kölcsönhatást és azok kulturális kontextusát."
        );
        break;
      case 2:
        setShowSubMenu2(!showSubMenu2);
        setSubMenuText(
          "A nyelvtan és stilisztika a nyelvi formák, kifejezésmódok és azok jellemzőinek tanulmányozásával foglalkozik. Ide tartozik például a szókincs, nyelvhelyesség és stílus elemzése."
        );
        setMainMenuText(
          "A nyelvtan és stilisztika segít a pontos és hatékony kifejezés elsajátításában."
        );
        break;
      case 3:
        setShowSubMenu3(!showSubMenu3);
        setSubMenuText(
          "Az irodalomtörténet az írott művek kronologikus sorrendben történő vizsgálatával és azok kulturális összefüggésekben való értelmezésével foglalkozik. Ide tartozik például a középkori és reneszánsz irodalom elemzése."
        );
        setMainMenuText(
          "Az irodalomtörténet segít feltárni az írások fejlődését és azok hatását a különböző korokban."
        );
        break;
      case 4:
        setShowSubMenu4(!showSubMenu4);
        setSubMenuText(
          "A kommunikáció és retorika az érvelés és meggyőzés művészetével foglalkozik. Az érvelési technikák és különböző retorikai eszközök tanulmányozása itt történik."
        );
        setMainMenuText(
          "A kommunikáció és retorika segít hatékonyan kifejezni gondolatainkat és meggyőzni másokat az álláspontunkról."
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
          "A költemények és lírai alkotások megértése és elemzése. Ezek a műfajok gyakran kifejezik az érzelmeket és gondolatokat."
        );
        setSubMenuText(
          "A költemények és lírai alkotások mellett a regények és drámák is fontosak az irodalomban és más művészeti ágakban."
        );
        break;
      case 2:
        setShowSubSubMenu2(!showSubSubMenu2);
        setSubSubMenuItemText(
          "A nyelvtan és helyesírás alapjai, beleértve a mondat és szövegszerkezet, a stilisztikai eszközök és a helyesírási szabályok tanulmányozása."
        );
        setSubMenuText(
          "A nyelvtan és helyesírás ismerete segít tisztán és hatékonyan kifejezni gondolatainkat írásban."
        );
        break;
      case 3:
        setShowSubSubMenu3(!showSubSubMenu3);
        setSubSubMenuItemText(
          "Az irodalom történetének áttekintése és az egyes korszakok jellemzőinek elemzése. Ide tartozik például a romantika és realizmus korszakok."
        );
        setSubMenuText(
          "Az irodalomtörténet tanulmányozása segít megérteni az írások és szerzők kontextusát és befolyását."
        );
        break;
      case 4:
        setShowSubSubMenu4(!showSubSubMenu4);
        setSubSubMenuItemText(
          "A meggyőző kommunikáció és a retorikai eszközök használatának tanulmányozása. Az érvelés logikájának és a közlési formák megértése."
        );
        setSubMenuText(
          "A meggyőző kommunikáció és retorika segít hatékonyan átadni az üzenetünket és befolyásolni mások véleményét."
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
            <StyledListItemText primary="Irodalmi Műfajok" />
          </StyledListItem>
          <Collapse in={showSubMenu1} timeout="auto" unmountOnExit>
            <StyledList
              component="div"
              disablePadding
              style={{ paddingLeft: "20px" }}
            >
              <StyledListItem button onClick={() => handleSubMenuItemClick(1)}>
                <StyledListItemText primary="Költemények" />
              </StyledListItem>
              <Collapse in={showSubSubMenu1} timeout="auto" unmountOnExit>
                <StyledList
                  component="div"
                  disablePadding
                  style={{ paddingLeft: "20px" }}
                >
                  <StyledListItem button>
                    <StyledListItemText primary="Lírai Alkotások" />
                  </StyledListItem>
                  <StyledListItem button>
                    <StyledListItemText primary="Regények" />
                  </StyledListItem>
                  <StyledListItem button>
                    <StyledListItemText primary="Drámák" />
                  </StyledListItem>
                </StyledList>
              </Collapse>
              <StyledListItem button onClick={() => handleSubMenuItemClick(2)}>
                <StyledListItemText primary="Nyelvtan és Stilisztika" />
              </StyledListItem>
            </StyledList>
          </Collapse>
          <StyledListItem button onClick={() => handleMenuItemClick(2)}>
            <StyledListItemText primary="Nyelvtan és Helyesírás" />
          </StyledListItem>
          <Collapse in={showSubMenu2} timeout="auto" unmountOnExit>
            <StyledList
              component="div"
              disablePadding
              style={{ paddingLeft: "20px" }}
            >
              <StyledListItem button onClick={() => handleSubMenuItemClick(3)}>
                <StyledListItemText primary="Irodalomtörténet" />
              </StyledListItem>
              <Collapse in={showSubSubMenu3} timeout="auto" unmountOnExit>
                <StyledList
                  component="div"
                  disablePadding
                  style={{ paddingLeft: "20px" }}
                >
                  <StyledListItem button>
                    <StyledListItemText primary="Romantika Korszak" />
                  </StyledListItem>
                  <StyledListItem button>
                    <StyledListItemText primary="Realizmus Korszak" />
                  </StyledListItem>
                </StyledList>
              </Collapse>
              <StyledListItem button onClick={() => handleSubMenuItemClick(4)}>
                <StyledListItemText primary="Kommunikáció és Retorika" />
              </StyledListItem>
            </StyledList>
          </Collapse>
          <StyledListItem button onClick={() => handleMenuItemClick(3)}>
            <StyledListItemText primary="Közlési Formák" />
          </StyledListItem>
          <Collapse in={showSubMenu3} timeout="auto" unmountOnExit>
            <StyledList
              component="div"
              disablePadding
              style={{ paddingLeft: "20px" }}
            >
              <StyledListItem button onClick={() => handleSubMenuItemClick(4)}>
                <StyledListItemText primary="Érvelés Logikája" />
              </StyledListItem>
              <StyledListItem button>
                <StyledListItemText primary="Közlési Formák" />
              </StyledListItem>
            </StyledList>
          </Collapse>
          <StyledListItem button onClick={() => handleMenuItemClick(4)}>
            <StyledListItemText primary="Kommunikáció és Nyelvhasználat" />
          </StyledListItem>
          <Collapse in={showSubMenu4} timeout="auto" unmountOnExit>
            <StyledList
              component="div"
              disablePadding
              style={{ paddingLeft: "20px" }}
            >
              <StyledListItem button onClick={() => handleSubMenuItemClick(4)}>
                <StyledListItemText primary="Meggyőző Kommunikáció" />
              </StyledListItem>
            </StyledList>
          </Collapse>
        </StyledList>
      </StyledDrawer>

      <StyledContainer>
        <Title variant="h3">A Magyar Nyelvről</Title>
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
