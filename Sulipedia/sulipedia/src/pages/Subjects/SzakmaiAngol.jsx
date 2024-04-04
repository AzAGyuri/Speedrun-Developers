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
  marginTop: (theme) => theme.spacing(3),
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
  backgroundColor: "#fff",
  borderRadius: "5px",
  boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.1)",
});

const CommentContent = styled("p")({
  marginBottom: (theme) => theme.spacing(1),
  fontSize: "1.4rem",
  textAlign: "justify",
});

const CommentAuthor = styled("span")({
  fontSize: "1rem",
  color: "#777",
  marginRight: (theme) => theme.spacing(1),
  fontWeight: "bold",
});

const CommentDate = styled("span")({
  fontSize: "1rem",
  color: "#777",
});

export function SzakAngol({ children }) {
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
    "Understanding various aspects of computer science is crucial for a solid foundation in the field. Explore fundamental topics in computer science."
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
          "The field of algorithms and data structures is essential for efficient problem-solving and information organization. Explore the foundations of computational thinking."
        );
        setMainMenuText(
          "Understanding algorithms and data structures is crucial for designing efficient and scalable software solutions."
        );
        break;
      case 2:
        setShowSubMenu2(!showSubMenu2);
        setSubMenuText(
          "Software development methodologies involve the practices and processes used in creating software. Learn about agile, waterfall, and other development methodologies."
        );
        setMainMenuText(
          "Choosing the right software development methodology is key to project success."
        );
        break;
      case 3:
        setShowSubMenu3(!showSubMenu3);
        setSubMenuText(
          "The field of database management focuses on designing, implementing, and maintaining databases. Explore relational databases, SQL, and NoSQL solutions."
        );
        setMainMenuText(
          "Efficient database management is crucial for storing, retrieving, and managing data in modern applications."
        );
        break;
      case 4:
        setShowSubMenu4(!showSubMenu4);
        setSubMenuText(
          "Cybersecurity involves protecting computer systems, networks, and data from security breaches. Learn about encryption, firewalls, and best practices in cybersecurity."
        );
        setMainMenuText(
          "Cybersecurity is essential in the digital age to safeguard sensitive information and ensure the integrity of systems."
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
          "Explore different sorting and searching algorithms, as well as data structures like arrays, linked lists, and trees."
        );
        setSubMenuText(
          "A solid understanding of algorithms and data structures is fundamental for efficient problem-solving in programming."
        );
        break;
      case 2:
        setShowSubSubMenu2(!showSubSubMenu2);
        setSubSubMenuItemText(
          "Learn about methodologies like Scrum, Kanban, and the traditional waterfall model. Understand the advantages and disadvantages of each approach."
        );
        setSubMenuText(
          "Choosing the right software development methodology depends on project requirements, team dynamics, and other factors."
        );
        break;
      case 3:
        setShowSubSubMenu3(!showSubSubMenu3);
        setSubSubMenuItemText(
          "Gain knowledge in designing and managing databases using SQL and NoSQL solutions. Understand the principles of normalization and database optimization."
        );
        setSubMenuText(
          "Effective database management is crucial for applications that handle large amounts of data and require quick and reliable access."
        );
        break;
      case 4:
        setShowSubSubMenu4(!showSubSubMenu4);
        setSubSubMenuItemText(
          "Explore techniques and tools for securing computer systems and networks. Understand common cyber threats and how to implement protective measures."
        );
        setSubMenuText(
          "Cybersecurity measures are essential to protect against cyber attacks and ensure the confidentiality and integrity of sensitive information."
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
            <StyledListItemText primary="Algorithms and Data Structures" />
          </StyledListItem>
          <Collapse in={showSubMenu1} timeout="auto" unmountOnExit>
            <StyledList
              component="div"
              disablePadding
              style={{ paddingLeft: "20px" }}
            >
              <StyledListItem button onClick={() => handleSubMenuItemClick(1)}>
                <StyledListItemText primary="Sorting and Searching" />
              </StyledListItem>
              <Collapse in={showSubSubMenu1} timeout="auto" unmountOnExit>
                <StyledList
                  component="div"
                  disablePadding
                  style={{ paddingLeft: "20px" }}
                >
                  <StyledListItem button>
                    <StyledListItemText primary="Arrays and Linked Lists" />
                  </StyledListItem>
                  <StyledListItem button>
                    <StyledListItemText primary="Trees and Graphs" />
                  </StyledListItem>
                </StyledList>
              </Collapse>
              <StyledListItem button onClick={() => handleSubMenuItemClick(2)}>
                <StyledListItemText primary="Software Development Methodologies" />
              </StyledListItem>
            </StyledList>
          </Collapse>
          <StyledListItem button onClick={() => handleMenuItemClick(2)}>
            <StyledListItemText primary="Software Development Practices" />
          </StyledListItem>
          <Collapse in={showSubMenu2} timeout="auto" unmountOnExit>
            <StyledList
              component="div"
              disablePadding
              style={{ paddingLeft: "20px" }}
            >
              <StyledListItem button onClick={() => handleSubMenuItemClick(3)}>
                <StyledListItemText primary="Database Management" />
              </StyledListItem>
              <Collapse in={showSubSubMenu3} timeout="auto" unmountOnExit>
                <StyledList
                  component="div"
                  disablePadding
                  style={{ paddingLeft: "20px" }}
                >
                  <StyledListItem button>
                    <StyledListItemText primary="Relational Databases" />
                  </StyledListItem>
                  <StyledListItem button>
                    <StyledListItemText primary="NoSQL Solutions" />
                  </StyledListItem>
                </StyledList>
              </Collapse>
              <StyledListItem button onClick={() => handleSubMenuItemClick(4)}>
                <StyledListItemText primary="Cybersecurity" />
              </StyledListItem>
            </StyledList>
          </Collapse>
          <StyledListItem button onClick={() => handleMenuItemClick(3)}>
            <StyledListItemText primary="Database Design and Optimization" />
          </StyledListItem>
          <Collapse in={showSubMenu3} timeout="auto" unmountOnExit>
            <StyledList
              component="div"
              disablePadding
              style={{ paddingLeft: "20px" }}
            >
              <StyledListItem button onClick={() => handleSubMenuItemClick(4)}>
                <StyledListItemText primary="Network Security" />
              </StyledListItem>
              <StyledListItem button>
                <StyledListItemText primary="Security Measures" />
              </StyledListItem>
            </StyledList>
          </Collapse>
          <StyledListItem button onClick={() => handleMenuItemClick(4)}>
            <StyledListItemText primary="Cybersecurity Measures" />
          </StyledListItem>
          <Collapse in={showSubMenu4} timeout="auto" unmountOnExit>
            <StyledList
              component="div"
              disablePadding
              style={{ paddingLeft: "20px" }}
            >
              <StyledListItem button onClick={() => handleSubMenuItemClick(4)}>
                <StyledListItemText primary="Protective Measures" />
              </StyledListItem>
            </StyledList>
          </Collapse>
        </StyledList>
      </StyledDrawer>

      <StyledContainer>
        <Title variant="h3">Professional English in Computer Science</Title>
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
