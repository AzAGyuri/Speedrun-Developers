import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Modal,
  TextField,
  Button,
  Tooltip,
} from "@mui/material";
import { Delete, Add } from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Loading } from "../../components/Loading/Loading";
import axios from "axios";

const styles = {
  container: {
    paddingTop: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "85vh",
  },
  paper: {
    padding: "20px",
    width: "600px",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    borderRadius: "12px",
  },
  actions: {
    display: "flex",
    alignItems: "center",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalPaper: {
    backgroundColor: "#fff",
    boxShadow: 24,
    padding: "20px",
    width: "400px",
    borderRadius: "8px",
  },
  addButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#218838",
    },
    marginBottom: "auto",
    marginLeft: "auto",
    marginRight: "auto",
  },
  deleteButton: {
    color: "#fff",
    "&:hover": {
      backgroundColor: "#dc3545",
    },
    marginTop: "30px",
  },
  listItemTextMargin: {
    marginLeft: "20px",
    marginTop: "15px",
  },
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#e0dede",
  border: "2px solid #000",
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
  width: "80vw",
  bgcolor: "#e0dede",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "15px",
  borderStyle: "double",
  borderColor: "#db140d",
};

export function MyGroups({ children, setIsLoading, isLoading }) {
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Szakmai angol",
      description: "Szakmai angol csoport",
      members: [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Alice Smith" },
        { id: 3, name: "Bob Johnson" },
      ],
    },
    {
      id: 2,
      name: "Informatika",
      description: "Informatika csoport",
      members: [
        { id: 4, name: "Emily Brown" },
        { id: 5, name: "Michael Wilson" },
        { id: 15, name: "Bob Johnson" },
      ],
    },
    {
      id: 3,
      name: "Magyar",
      description: "Magyar csoport",
      members: [
        { id: 6, name: "Jane Smith" },
        { id: 7, name: "David Lee" },
        { id: 8, name: "Grace Taylor" },
      ],
    },
    {
      id: 4,
      name: "Matek",
      description: "Matek csoport",
      members: [
        { id: 9, name: "Alex Johnson" },
        { id: 10, name: "Sophia Garcia" },
        { id: 11, name: "Daniel Martinez" },
      ],
    },
    {
      id: 5,
      name: "Történelem",
      description: "Történelem csoport",
      members: [
        { id: 12, name: "Liam Anderson" },
        { id: 13, name: "Olivia Wilson" },
        { id: 14, name: "Ethan Thompson" },
      ],
    },
  ]);

  const [open, setOpen] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:950px)");

  const [avatarColors, setAvatarColors] = useState({});
  React.useEffect(() => {
    if (!loaded) {
      const colors = {};
      groups.forEach((group) => {
        colors[group.id] = getRandomColor();
      });
      setAvatarColors(colors);
    }
  }, [groups]);

  useEffect(() => {
    axios.get(`/group?userId=${localStorage.getItem("currentUserId")}`, {
      headers: {
        Authorization: localStorage.getItem("jwt"),
      },
    }).then((response) => {
      console.log(response.data);
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, [setIsLoading, isLoading]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenMembers = (group) => {
    setSelectedGroup(group);
    setShowMembers(true);
  };

  const handleCloseMembers = () => {
    setShowMembers(false);
  };

  const handleOpenAddMember = () => {
    setShowAddMemberModal(true);
  };

  const handleCloseAddMember = () => {
    setShowAddMemberModal(false);
  };

  const [groupName, setGroupName] = useState("");
  const [groupDesc, setGroupDesc] = useState("");
  const [newMemberName, setNewMemberName] = useState("");

  function createNewGroup() {
    if (!groupName.trim() || !groupDesc.trim()) {
      alert(
        "A csoport nevének és leírásának legalább 1 karakter hosszúnak kell lennie!"
      );
      return;
    }

    const newGroup = {
      id: groups.length + 1,
      name: groupName.trim(),
      description: groupDesc.trim(),
    };

    const updatedGroups = [...groups, newGroup];
    setGroups(updatedGroups);
    handleClose();
    setGroupName("");
    setGroupDesc("");
  }

  function deleteGroup(id) {
    const updatedGroups = groups.filter((group) => group.id !== id);
    setGroups(updatedGroups);
  }

  const getRandomColor = () => {
    const colors = ["#f00", "#ff0", "#0f0", "#0ff", "#00f", "#f60"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  function addMemberToGroup() {
    if (!newMemberName.trim()) {
      alert("A tag nevének legalább 1 karakter hosszúnak kell lennie!");
      return;
    }
    const newMember = {
      id: selectedGroup.members.length + 1,
      name: newMemberName.trim(),
    };
    const updatedGroup = {
      ...selectedGroup,
      members: [...selectedGroup.members, newMember],
    };
    const updatedGroups = groups.map((group) =>
      group.id === selectedGroup.id ? updatedGroup : group
    );

    setGroups(updatedGroups);
    handleCloseAddMember();
    handleOpenMembers(updatedGroup);
    setNewMemberName("");
  }

  const handleDeleteMember = (memberId) => {
    const updatedGroup = {
      ...selectedGroup,
      members: selectedGroup.members.filter((member) => member.id !== memberId),
    };
    const updatedGroups = groups.map((group) =>
      group.id === selectedGroup.id ? updatedGroup : group
    );
    setGroups(updatedGroups);
    handleOpenMembers(updatedGroup);
  };

  if (isLoading) return <Loading />;

  return (
    <Container maxWidth="lg" style={styles.container}>
      {children}
      <Paper elevation={3} style={styles.paper}>
        <Typography variant="h5" align="center" gutterBottom>
          Csoportjaim
        </Typography>
        <List>
          {groups.map((group, index) => (
            <React.Fragment key={group.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar onClick={() => handleOpenMembers(group)}>
                  <Tooltip
                    title={`${group.name} csoport tagjainak megtekintése`}
                  >
                    <Avatar
                      alt={group.name}
                      style={{
                        ...styles.avatar,
                        backgroundColor: avatarColors[group.id],
                        width: "70px",
                        height: "70px",
                        cursor: "pointer",
                      }}
                    >
                      {group.name[0].toUpperCase()}
                    </Avatar>
                  </Tooltip>
                </ListItemAvatar>
                <ListItemText
                  style={styles.listItemTextMargin}
                  primary={group.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textSecondary"
                      >
                        {group.description}
                      </Typography>
                    </React.Fragment>
                  }
                />
                <div style={styles.actions}>
                  <Tooltip title={`${group.name} csoport törlése`}>
                    <IconButton
                      color="secondary"
                      aria-label="delete"
                      style={styles.deleteButton}
                      onClick={() => {
                        deleteGroup(group.id);
                      }}
                    >
                      <Delete sx={{ color: "#d32f2f" }} />
                    </IconButton>
                  </Tooltip>
                </div>
              </ListItem>
              <Divider
                variant="fullwidth"
                component="li"
                sx={{ borderBottomWidth: 3 }}
              />
            </React.Fragment>
          ))}
          <ListItem alignItems="center">
            <Tooltip title="Új csoport létrehozása">
              <IconButton
                color="primary"
                aria-label="add"
                onClick={handleOpen}
                style={styles.addButton}
              >
                <Add />
              </IconButton>
            </Tooltip>
          </ListItem>
        </List>
      </Paper>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {isSmallScreen ? (
          <Box sx={styleSmall}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Új csoport létrehozása
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Csoport neve"
                  variant="standard"
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </Box>

              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Csoport leírása"
                  variant="standard"
                  onChange={(e) => setGroupDesc(e.target.value)}
                />
              </Box>
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" color="error" onClick={handleClose}>
                Bezárás
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  createNewGroup();
                }}
              >
                Mentés
              </Button>
            </Stack>
          </Box>
        ) : (
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Új csoport létrehozása
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Csoport neve"
                  variant="standard"
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </Box>

              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Csoport leírása"
                  variant="standard"
                  onChange={(e) => setGroupDesc(e.target.value)}
                />
              </Box>
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" color="error" onClick={handleClose}>
                Bezárás
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  createNewGroup();
                }}
              >
                Mentés
              </Button>
            </Stack>
          </Box>
        )}
      </Modal>

      <Modal
        open={showMembers}
        onClose={handleCloseMembers}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={isSmallScreen ? styleSmall : style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
            {selectedGroup && selectedGroup.name} csoport tagjai
          </Typography>
          <List>
            {selectedGroup &&
              selectedGroup.members &&
              selectedGroup.members.map((member) => (
                <ListItem
                  sx={{
                    border: "2px solid black",
                    marginTop: "2px",
                    borderRadius: "15px",
                  }}
                  key={member.id}
                >
                  <ListItemAvatar>
                    <Avatar>{member.name[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={member.name} />
                  <Tooltip title={`${member.name} kidobása a csoportból`}>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteMember(member.id)}
                    >
                      <Delete sx={{ color: "#d32f2f" }} />
                    </IconButton>
                  </Tooltip>
                </ListItem>
              ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenAddMember}
            >
              Tag hozzáadása
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleCloseMembers}
            >
              Bezárás
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Modal
        open={showAddMemberModal}
        onClose={handleCloseAddMember}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={isSmallScreen ? styleSmall : style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Új tag hozzáadása - {selectedGroup && selectedGroup.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-basic"
                label="Tag neve"
                variant="standard"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
              />
            </Box>
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="error"
              onClick={handleCloseAddMember}
            >
              Mégse
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => addMemberToGroup()}
              style={styles.addButton}
            >
              Hozzáadás
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Container>
  );
}
