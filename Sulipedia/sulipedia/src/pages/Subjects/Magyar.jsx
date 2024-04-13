import React, { useEffect } from "react";
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
} from "@mui/material";
import { styled } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

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
  marginLeft: "5px",
  fontWeight: "bold",
});

const CommentDate = styled("span")({
  fontSize: "1rem",
  color: "#777",
  marginLeft: "6px",
});

function Entry({ id, title, content, date, author, handleEntryClick }) {
  return (
    <StyledContainer
      style={{ backgroundColor: "#4caf50" }}
      onClick={() => handleEntryClick({ title, content, date, author, id })}
    >
      <Title variant="h4">{title}</Title>
      <LargeText style={{ paddingBottom: "5px" }}>{content}</LargeText>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          borderTop: "2px solid #2f3826",
          marginTop: "auto",
          paddingRight: "16px",
          paddingLeft: "16px",
          paddingTop: "5px",
        }}
      >
        <Typography
          variant="body2"
          style={{
            padding: "7px 5px",
            backgroundColor: "#ba8d63",
            borderRadius: "8px",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          {date}
        </Typography>
        <Typography
          variant="body2"
          style={{
            padding: "7px 4px",
            backgroundColor: "#6384ba",
            borderRadius: "8px",
            color: "#fff",
            fontWeight: "bold",
            marginLeft: "10px",
          }}
        >
          {author}
        </Typography>
      </div>
    </StyledContainer>
  );
}

export function Magyar({ children, jwt }) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [selectedAuthor, setSelectedAuthor] = React.useState(null);
  const [entries, setEntries] = React.useState([]);
  const dummyDataForEntries = [
    {
      title: "Petőfi Sándor élete és művei",
      content: "A magyar irodalom kiemelkedő alakja és költői öröksége",
      date: "2023.01.15",
      author: "Emberke 1",
      category: "HUNGARIAN",
    },
    {
      title: "A Jókai-regények világa",
      content: "Jókai Mór regényeinek jelentősége és hatása",
      date: "2023.02.03",
      author: "Emberke 2",
      category: "HUNGARIAN",
    },
    {
      title: "Az Áprily-regények és novellák",
      content: "Áprily Lajos műveinek sokszínűsége és irodalmi értéke",
      date: "2023.03.15",
      author: "Emberke 2",
      category: "HUNGARIAN",
    },
    {
      title: "A magyar költészet aranykora",
      content: "A romantika és a szimbolizmus jelentős költői és alkotásai",
      date: "2023.04.04",
      author: "Emberke 1",
      category: "HUNGARIAN",
    },
    {
      title: "A XX. századi magyar drámaírás",
      content: "Az újító drámaírók és a kortárs magyar dráma jellegzetességei",
      date: "2023.05.20",
      author: "Emberke 3",
      category: "HUNGARIAN",
    },
  ];

  const [comments, setComments] = React.useState([]);
  const [newComment, setNewComment] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };
  const fetchComments = () => {
    const backendUrl = "/comment";
    axios
      .get(backendUrl)
      .then((response) => {
        const fetchedComments = response.data.comments;
        console.log("Komment", fetchedComments);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
        alert("Hiba a kommentek lekérdezésekor", error);
      });
  };
  const deleteComment = (commentId) => {
    const backendUrl = `/comment/${commentId}`;

    axios
      .delete(backendUrl)
      .then((response) => {
        console.log("Komment törölve", response.data);
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
        alert("Hiba a komment törlésekor", error);
      });
  };
  const handleCommentSubmit = () => {
    const backendUrl = "/comment";
    const requestBody = {
      content: newComment,
      entryId: 0,
    };
    axios
      .post(backendUrl, requestBody, {
        headers: { Authorization: localStorage.getItem("jwt") },
      })
      .then((response) => {
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
      .catch((error) => {
        console.error("Error submitting comment:", error);
        alert("Hiba a komment elküldésekor", error);
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

  useEffect(() => {
    axios
      .get("/entry?subject=HUNGARIAN", {
        headers: { Authorization: jwt },
      })
      .then((response) => {
        const receivedEntries = response.data.entries;
        if (receivedEntries.length === 0) {
          setEntries(dummyDataForEntries);
        } else {
          setEntries(receivedEntries);
        }
      })
      .catch((error) => {
        setEntries(dummyDataForEntries);
        console.error("Error fetching data:", error);
      });
  }, []);

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
              if (!authors.includes(entry.author)) {
                authors.push(entry.author);
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
        <Title variant="h3">Magyar nyelv és irodalmi bejegyzések</Title>
        {selectedAuthor === null
          ? entries.map((entry, index) => (
              <Entry
                key={index}
                title={entry.title}
                content={entry.content}
                date={entry.date}
                author={entry.author}
              />
            ))
          : entries
              .filter((entry) => entry.author === selectedAuthor)
              .map((entry, index) => (
                <Entry
                  key={index}
                  title={entry.title}
                  content={entry.content}
                  date={entry.date}
                  author={entry.author}
                />
              ))}
      </StyledContainer>

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
