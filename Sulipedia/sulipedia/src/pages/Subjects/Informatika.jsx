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
  Tooltip,

  Box,
  Modal,
} from "@mui/material";
import { height, styled } from "@mui/system";
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
const StyledListItem = styled(ListItem)({
  padding: "10px",
  marginBottom: "8px",
  backgroundColor: "#2f3826",
  borderRadius: "5px",
  color: "white",
  border: "2px solid #4caf50",
  fontFamily: "Arial, sans-serif",
  fontSize: "1.2rem",
  "&:hover": {
    backgroundColor: "#6c7530",
  },
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
  "&:hover": {
    backgroundColor: "#6c7530",
  },
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#e0e0e0",
  },
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
  marginLeft: "10px",
  fontWeight: "bold",
});

const CommentDate = styled("span")({
  fontSize: "1rem",
  color: "#777",
  marginLeft: "6px",
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  height: '85%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Entry({ id, title, content, date, author, handleEntryClick }) {
  return (
    <StyledContainer style={{ backgroundColor: "#4caf50" }} onClick={() => handleEntryClick({ title, content, date, author, id })}>
      <Title variant="h4">{title}</Title>
      <LargeText style={{paddingBottom: "5px"}}>{content}</LargeText>
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", borderTop: "2px solid #2f3826", marginTop: "auto", paddingRight: "16px", paddingLeft: "16px", paddingTop: "5px" }}>
        <Typography variant="body2" style={{ padding: "7px 5px", backgroundColor: "#ba8d63", borderRadius: "8px", color: "#fff", fontWeight: "bold" }}>{new Date(date).toLocaleDateString()}</Typography>
        <Typography variant="body2" style={{ padding: "7px 4px", backgroundColor: "#6384ba", borderRadius: "8px", color: "#fff", fontWeight: "bold", marginLeft: "10px" }}>{author}</Typography>
      </div>
    </StyledContainer>
  );
}
export function Informatika({ children, jwt }) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [selectedAuthor, setSelectedAuthor] = React.useState(null);
  const [entries, setEntries] = React.useState([]);
  const dummyDataForEntrie = [
    {
      id: 1,
      title: "Algoritmusok és Adatszerkezetek",
      content: "Az algoritmusok és adatszerkezetek kulcsfontosságú fogalmak az informatikában. Az algoritmusok hatékony megvalósítása és az optimális adatszerkezetek kiválasztása lehetővé teszi az informatikai problémák hatékony megoldását.",
      createdOn: "2024-04-01",
      author: "Emberke 1",
      category: "ICT",
    },
    {
      id: 2,
      title: "Felhőalapú Számítástechnika",
      content: "A felhőalapú számítástechnika forradalmasította az informatikát. Az egyre növekvő számú vállalat és felhasználó számára biztosítja az adatok tárolását, szolgáltatásokat és alkalmazásokat a világhálón keresztül.",
      createdOn: "2024-04-01",
      author: "Emberke 2",
      category: "ICT",
    },
    {
      id: 3,
      title: "Kiberbiztonság és Hálózatbiztonság",
      content: "A kiberbiztonság és hálózatbiztonság napjainkban kulcsfontosságú területe az informatikának. Az internetes fenyegetések és a számítógépes bűnözés elleni védelem elengedhetetlen a biztonságos online környezet megteremtéséhez.",
      createdOn: "2024-04-01",
      author: "Emberke 3",
      category: "ICT",
    },
    {
      id: 4,
      title: "Adattudomány és Nagy Adat",
      content: "Az adattudomány és a nagy adat elemzésének képességei forradalmasítják az üzleti és tudományos területeket egyaránt. Az adatokból való értelmezés lehetővé teszi a trendek felismerését és a jövőbeli döntések meghozatalát.",
      createdOn: "2024-04-01",
      author: "Emberke 1",
      category: "ICT",
    },
    {
      id: 5,
      title: "Mesterséges Intelligencia és Gépi Tanulás",
      content: "A mesterséges intelligencia és a gépi tanulás területei forradalmasítják az informatikát. Az olyan alkalmazások, mint az autonóm járművek és a nyelvi felismerés, az MI és a gépi tanulás legújabb fejlesztéseinek eredményei.",
      createdOn: "2024-04-01",
      author: "Emberke 3",
      category: "ICT",
    },
  ];
  
  const [comments, setComments] = React.useState([]);
  const [newComment, setNewComment] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
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
    axios.post('/comment', {
      content: newComment,
      entryId: selectedEntry.id
    }, { headers: { Authorization: localStorage.getItem("jwt") } })
    .then(function (response) {
      console.log('Response:', response.data);
    })
    .catch(function (error) {
      console.error('Error submitting comment:', error);
      alert('Hiba a komment elküldésekor', error);
    });
  };

  const handleCommentDelete = (index) => {
    const updatedComments = [...comments];
    updatedComments.splice(index, 1);
    setComments(updatedComments);
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

  axios.get('/entry?subject=ICT', {
    headers: { Authorization: jwt },
  })
  .then(response => {
    const receivedEntries = response.data.entries;
    if (receivedEntries.length === 0) {
      setEntries(dummyDataForEntrie);
    } else {
      setEntries(receivedEntries);
    }
  })
  .catch(error => {
    setEntries(dummyDataForEntrie);
    console.error('Error fetching data:', error);
  });
  


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
  <div style={{ padding: "16px", backgroundColor: "#333", borderBottom: "1px solid #555" }}>
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
        if (!authors.includes(entry.author)) {
          authors.push(entry.author);
        }
        return authors;
      }, [])
      .filter(author => author.toLowerCase().includes(searchValue.toLowerCase()))
      .map((author, index) => (
        <StyledListItem key={index} onClick={() => handleAuthorSelect(author)}>
          <ListItemText primary={author} />
        </StyledListItem>
      ))}
  </StyledList>
</StyledDrawer>


      <StyledContainer style={{ backgroundColor: "#ccc" }}>
        <Title variant="h3">Informatikai bejegyzések</Title>
        {selectedAuthor === null ? (
          entries.map((entry, index) => (
          <Entry
            key={index}
            id={entry.id} // Pass the id prop here
            title={entry.title}
            content={entry.content}
            date={entry.createdOn}
            author={entry.author}
            handleEntryClick={handleEntryClick}
          />

          ))
        ) : (
          entries
            .filter((entry) => entry.author === selectedAuthor)
            .map((entry, index) => (
              <Entry
                key={index}
                id={entry.id} // Pass the id prop here
                title={entry.title}
                content={entry.content}
                date={entry.createdOn}
                author={entry.author}
                handleEntryClick={handleEntryClick}
              />

            ))
        )}
      </StyledContainer>

      {selectedEntry && (
        <div>
          <Button onClick={handleOpen}>Open modal</Button>
          <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={{
                ...style,
                backgroundColor: "#4b8efa",
              }}>
                <Button
                  edge="end"
                  color="error"
                  variant="contained"
                  onClick={handleClose}
                  style={{ position: 'absolute', top: 0, right: 0, marginTop: '5px', marginRight: '5px' }}
                >
                  X
                </Button>

                <StyledContainer style={{ backgroundColor: "#4caf50" }}>
                  <Title variant="h4">{selectedEntry.title}</Title>
                  <LargeText style={{paddingBottom: "5px"}}>{selectedEntry.content}</LargeText>
                  <div style={{ display: "flex", justifyContent: "space-between", width: "100%", borderTop: "2px solid #2f3826", marginTop: "auto", paddingRight: "16px", paddingLeft: "16px", paddingTop: "5px" }}>
                    <Typography variant="body2" style={{ padding: "7px 5px", backgroundColor: "#ba8d63", borderRadius: "8px", color: "#fff", fontWeight: "bold" }}>{new Date(selectedEntry.createdOn).toLocaleDateString()}</Typography>
                    <Typography variant="body2" style={{ padding: "7px 4px", backgroundColor: "#6384ba", borderRadius: "8px", color: "#fff", fontWeight: "bold", marginLeft: "10px" }}>{selectedEntry.author}</Typography>
                  </div>
                </StyledContainer>

                <CommentSection>
                  <CommentHeader>Vélemények és hozzászólások</CommentHeader>
                  <CommentInput
                    placeholder="Mit gondolsz a tananyagról?..."
                    value={newComment}
                    onChange={handleCommentChange}
                  />
                  <CommentButton variant="contained" onClick={handleCommentSubmit} style={{marginLeft: '3px', marginBottom: '3px'}}>
                    Hozzászólás küldése
                  </CommentButton>
                  {comments.map((comment, index) => (
                    <Comment key={index}>
                      <CommentContent>{comment.content}</CommentContent>
                      <div>
                        <CommentAuthor>{comment.author}</CommentAuthor>
                        <CommentDate>{comment.createdOn}</CommentDate>
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
              </Box>
            </Modal>
        </div>
      )}

    </>
  );
}
