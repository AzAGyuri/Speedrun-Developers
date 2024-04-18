import React, { useEffect, useMemo, useState } from "react";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableCell,
  TableRow,
  Box,
  Table,
} from "@mui/material";
import { Delete, Add } from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Loading } from "../../components/Loading/Loading";
import axios from "axios";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

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
    cursor: "cell  ",
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

export function MyGroups({
  children,
  setIsLoading,
  isLoading,
  jwt,
  currentUserId,
}) {
  const staticGroups = useMemo(
    () => [
      {
        id: 1,
        name: "Szakmai angol",
        description: "Szakmai angol csoport",
        members: [
          { id: 1, name: "John Doe" },
          { id: 2, name: "Alice Smith" },
          { id: 3, name: "Bob Johnson" },
        ],
        ownerId: 1,
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
        ownerId: 4,
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
        ownerId: 6,
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
        ownerId: 9,
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
        ownerId: 12,
      },
    ],
    []
  );
  const [groups, setGroups] = useState(staticGroups);
  const [open, setOpen] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState({
    id: 1,
    name: "Szakmai angol",
    description: "Szakmai angol csoport",
    members: [
      {
        id: 1,
        name: "John Doe",
        email: "semmi@valami.com",
        memberSince: "2024-04-14 14:28:43",
        login: "2024-04-14 14:28:43",
        logoff: "2024-04-14 14:28:44"
      },
      {
        id: 2,
        name: "Alice Smith",
        email: "semmi@valami.com",
        memberSince: "2024-04-14 14:28:43",
        login: "2024-04-14 14:28:43",
        logoff: "2024-04-14 14:28:44"
      },
      {
        id: 3,
        name: "Bob Johnson",
        email: "semmi@valami.com",
        memberSince: "2024-04-14 14:28:43",
        login: "2024-04-14 14:28:43",
        logoff: "2024-04-14 14:28:44"
      },
    ],
    ownerId: 1,
  });
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [avatarColors, setAvatarColors] = useState({});
  const isSmallScreen = useMediaQuery("(max-width:950px)");

  const getRandomColor = () => {
    const colors = ["#f00", "#ff0", "#0f0", "#0ff", "#00f", "#f60"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    const colors = {};
    groups.forEach((group) => {
      colors[group.id] = loaded ? group.color : getRandomColor();
    });
    setAvatarColors(colors);
  }, [groups, loaded]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, [isLoading, setIsLoading]);

  useEffect(() => {
    axios
      .get(`/api/v1/group`, {
        headers: { Authorization: jwt },
      })
      .then((response) => {
        let localGroups = [];
        response.data.groups.forEach((group) => {
          localGroups.push({
            id: group.id,
            name: group.groupName,
            description: group.descriptionContent,
            members: null,
            color: group.randomAvatarBgColor,
            ownerId: group.creatorId,
          });
        });
        setGroups(localGroups);
        setLoaded(true);
      })
      .catch((error) => {
        console.error("Hiba történt adatok lekérdezése során", error);
        alert("Hiba történt adatok lekérdezése során!");
        setGroups(staticGroups);
        setLoaded(false);
      });
  }, [staticGroups, currentUserId, jwt]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenMembers = (group) => {
    let localGroups = groups;
    let index = localGroups.findIndex(
      (innerGroup) => innerGroup.id === group.id
    );

    if (group.members === null) {
      setIsLoading(true);
      let localMembers = [];

      axios
        .get(`/api/v1/group/${group.id}`, {
          headers: { Authorization: jwt },
        })

        .then((response) => {
          response.data.users.users.forEach((user) => {
            localMembers.push({
              id: user.id,
              name: user.username,
              email: user.email,
              memberSince: user.createdOn,
              login:user.lastLogin,
              logoff: user.lastLogoff,
              avatarColor: user.randomAvatarBgColor
            });
          });

          group.members = localMembers;
          localGroups[index] = group;
          setGroups(localGroups);
          setSelectedGroup(group);
          setShowMembers(true);
        })

        .catch((error) => {
          console.error("Hiba történt adat lekérdezése során", error);
          alert("Hiba történt adat lekérdezése során!");
        });
    } else {
      setSelectedGroup(group);
      setShowMembers(true);
    }
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
  const [specializations, setSpecializations] = useState([]);
  const [newMemberName, setNewMemberName] = useState("");

  function createNewGroup() {
    if (
      !groupName.trim() ||
      !groupDesc.trim() ||
      specializations.length === 0
    ) {
      alert(
        "A csoport nevének és leírásának legalább 1 karakter hosszúnak kell lennie, valamint kell legalább egy szakma beállítva legyen!"
      );
      return;
    }

    const newGroup = {
      groupName: groupName.trim(),
      descriptionContent: groupDesc.trim(),
      specializations: specializations,
    };

    axios
      .post("/api/v1/group", newGroup, { headers: { Authorization: jwt } })
      .then((response) => {
        setIsLoading(true);
        const group = response.data;

        const members = [];
        group.users.users.forEach((member) => {
          members.push({
            id: member.id,
            name: member.username,
            memberSince: member.createdOn,
            email: member.email,
            login: member.lastLogin,
            logoff: member.lastLogoff
          });
        });

        let localGroup = {
          id: group.id,
          name: group.groupName,
          description: group.descriptionContent,
          members: members,
          color: group.randomAvatarBgColor,
          ownerId: group.creatorId,
        };
        setGroups(groups.concat(localGroup));
      })
      .catch((error) => {
        console.error("Hiba történt csoport létrehozáskor", error);
        alert("Hiba történt csoport létrehozáskor");
      });

    handleClose();
    setGroupName("");
    setGroupDesc("");
    setSpecializations([]);
  }

  function deleteGroup(id) {
    if (window.confirm("Biztosan törlöd ezt a csoportot?")) {
      if (
        groups.filter((group) => group.id === id)[0].ownerId !==
        Number(currentUserId)
      ) {
        alert("Ez a csoport nem az ön készítménye; törlés megtagadva.");
        return;
      }

      axios
        .delete(`/api/v1/group/${id}`, { headers: { Authorization: jwt } })
        .then((response) => {
          setIsLoading(true);
          const updatedGroups = groups.filter(
            (group) => group.id !== response.data.id
          );
          setGroups(updatedGroups);
        })
        .catch((errResponse) => {
          const error = errResponse.response.data;
          console.error("Hiba történt csoport törlése közben", errResponse);
          switch (error.status) {
            case 404:
              alert(
                "A törlendő felhasználót, vagy a csoport, melyből törlést kell végrehajtani nem találtuk!"
              );
              break;
            case 410:
              alert(
                "Sajnáljuk, de nem ön a csoport vezetője, így a törlés végrehajtása sikertelen!"
              );
              break;
            case 400:
              alert(
                "A törlendő csoport nem üres! Törlés előtt rúgja ki a csapattagokat!"
              );
              break;
            case 401:
              alert(
                "Sajnáljuk, de a bejelentkezése érvénytelen. Kérjük jelentkezzen be újból."
              );
              break;
            default:
              alert("Váratlan hiba történt! Kérjük próbálja meg később");
              break;
          }
        });
    } else {
      alert("A csoport nem lett törölve!");
    }
  }

  function addMemberToGroup() {
    setIsLoading(true);

    const newMembersNames = [];
    if (newMemberName.trim().split(",").length === 1) {
      if (!newMemberName.trim()) {
        alert("A tag nevének legalább 1 karakter hosszúnak kell lennie!");
        return;
      }
    } else {
      let newMemberNameWrong = false;
      newMemberName
        .trim()
        .split(",")
        .forEach((newMemberNameInner) =>
          newMembersNames.push(newMemberNameInner.trim())
        );
      newMembersNames.forEach((newMemberNameInner) => {
        if (!newMemberNameInner.trim()) {
          alert("A tag nevének legalább 1 karakter hosszúnak kell lennie!");
          newMemberNameWrong = true;
        }
      });
      if (newMemberNameWrong) return;
    }

    if (newMembersNames.length === 0) {
      newMembersNames.push(newMemberName);
    }

    const newMembers = [];

    axios
      .put(`/api/v1/group/${selectedGroup.id}`, newMembersNames, {
        headers: { Authorization: jwt },
      })
      .then((response) => {
        const users = response.data.users.users;
        const usernamesNotFound = response.data.usernamesNotFound;
        if (users.length !== 0) {
          users.forEach((user) => {
            newMembers.push({
              id: user.id,
              name: user.username,
              memberSince: user.createdOn,
              email: user.email,
              login: user.lastLogin,
              logoff: user.lastLogoff,
              avatarColor: user.randomAvatarBgColor
            });
          });
          const updatedGroup = {
            ...selectedGroup,
            members: [...selectedGroup.members, ...newMembers],
          };
          const updatedGroups = groups.map((group) =>
            group.id === selectedGroup.id ? updatedGroup : group
          );

          setGroups(updatedGroups);
          handleCloseAddMember();
          handleOpenMembers(updatedGroup);
        }

        if (usernamesNotFound.length !== 0) {
          alert(
            `A következő felhasználó nevűeket nem sikerült hozzáadni a csoporthoz, mert nem találhatóak meg: ${usernamesNotFound}`
          );
        }
      })
      .catch((error) => {
        console.error("Hiba történt felhasználó hozzáadásakor", error);
        alert("Hiba történt felhasználó hozzáadásakor");
      });

    setNewMemberName("");
  }

  const handleEmailClick = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const handleLeaveGroup = (groupId) => {
    setIsLoading(true);
    axios
      .patch(`/api/v1/user/group/${groupId}`, null, {
        headers: { Authorization: jwt },
      })
      .then((response) => {
        console.log("Kilépés sikeresen megtörtént:", response.data);
        alert("Kilépés sikeresen megtörtént:");
        setGroups(groups.filter((group) => group.id !== groupId));
      })
      .catch((error) => {
        console.error("Hiba történt kilépés közben", error);
        alert("Sikertelen kilépés a csoportból.");
      });
  };

  const handleDeleteMember = (memberId) => {
    if (window.confirm("Biztosan kidobod ezt a tagot a csoportból?")) {
      setIsLoading(true);
      let updatedGroup = selectedGroup;

      axios
        .delete(`/api/v1/group/${selectedGroup.id}/${memberId}`, {
          headers: { Authorization: jwt },
        })
        .then((response) => {
          updatedGroup = {
            ...selectedGroup,
            members: selectedGroup.members.filter(
              (member) => member.id !== response.data.users.users[0].id
            ),
          };
          const updatedGroups = groups.map((group) =>
            group.id === selectedGroup.id ? updatedGroup : group
          );

          setGroups(updatedGroups);
          handleOpenMembers(updatedGroup);
          alert("Tag sikeresen eltávolítva  a csoportból");
        })
        .catch((errResponse) => {
          const error = errResponse.response.data;
          console.error("Hiba történt felhasználó törlése közben", errResponse);
          switch (error.status) {
            case 404:
              alert(
                "A törlendő felhasználót, vagy a csoport, melyből törlést kell végrehajtani nem találtuk"
              );
              break;
            case 410:
              alert(
                "Sajnáljuk, de nem ön a csoport vezetője, így a törlés végrehajtása sikertelen!"
              );
              break;
            case 400:
              if (error.message === "USER_NOT_IN_GROUP") {
                alert("A felhasználó nem található a megadott csoportban!");
              } else {
                alert("Sajnáljuk, de a csoport vezető nem törölheti önmagát!");
              }
              break;
            case 401:
              alert(
                "Sajnáljuk, de a bejelentkezése érvénytelen. Kérjük jelentkezzen be újból."
              );
              break;
            default:
              alert("Váratlan hiba történt! Kérjük próbálja meg később");
              break;
          }
        });
    } else {
      alert("A tag nem lett kidobva a csoportból.");
    }
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
          {groups.map((group) => (
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
                  <Tooltip
                    title={
                      group.ownerId === Number(currentUserId)
                        ? `${group.name} csoport törlése`
                        : "Kilépés a csoportból"
                    }
                  >
                    {group.ownerId === Number(currentUserId) ? (
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
                    ) : (
                      <IconButton
                        aria-label="delete"
                        style={styles.deleteButton}
                        onClick={() => handleLeaveGroup(group.id)}
                      >
                        <ExitToAppIcon sx={{ color: "#d32f2f" }} />
                      </IconButton>
                    )}
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
              <FormControl fullWidth sx={{ marginY: 1 }}>
                <InputLabel id="demo-simple-select-label">Szakma</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  multiple
                  value={specializations}
                  label="Szakma"
                  onChange={(e) => setSpecializations(e.target.value)}
                >
                  <MenuItem value={"IT"}>Informatika</MenuItem>
                  <MenuItem value={"ECONOMY"}>Közgazdaság</MenuItem>
                  <MenuItem value={"MANAGEMENT"}>Ügyvitel</MenuItem>
                </Select>
              </FormControl>
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
              <FormControl fullWidth sx={{ marginY: 1 }}>
                <InputLabel id="demo-simple-select-label">Szakma</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  multiple
                  value={specializations}
                  label="Szakma"
                  onChange={(e) => setSpecializations(e.target.value)}
                >
                  <MenuItem value={"IT"}>Informatika</MenuItem>
                  <MenuItem value={"ECONOMY"}>Közgazdaság</MenuItem>
                  <MenuItem value={"MANAGEMENT"}>Ügyvitel</MenuItem>
                </Select>
              </FormControl>
            </Typography>
            <Stack
              direction="row"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
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
            {selectedGroup.name} csoport tagjai
          </Typography>
          <List>
            {selectedGroup.members.map((member) => (
              <ListItem
                sx={{
                  border: "2px solid black",
                  marginTop: "2px",
                  borderRadius: "15px",
                }}
                key={member.id}
              >
                <ListItemAvatar>
                  <Tooltip
                    title={
                      <div style={{}}>
                        <Table>
                          <TableCell>
                            <TableRow>
                              <div
                                style={{
                                  padding: "5px",
                                  fontSize: "20px",
                                  color: "#eb365a",
                                  border: "1px solid black",
                                  backgroundColor: "#84adf0",
                                }}
                              >
                                {member.name}
                              </div>
                              <div
                                style={{
                                  padding: "5px",
                                  fontSize: "20px",
                                  color: "#eb365a",
                                  border: "1px solid black",
                                  backgroundColor: "#84adf0",
                                }}
                              >
                                {member.id}
                              </div>
                              <div
                                style={{
                                  padding: "auto",
                                  margin: "auto",
                                  fontSize: "15px",
                                  color: "#211ee3",
                                  border: "1px solid black",
                                  backgroundColor: "#84adf0",
                                  textDecoration: "underline",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleEmailClick(member.email)}
                              >
                                {member.email}
                              </div>
                              <div
                                style={{
                                  padding: "5px",
                                  fontSize: "20px",
                                  color: "#eb365a",
                                  border: "1px solid black",
                                  backgroundColor: "#84adf0",
                                }}
                              >
                                <div>Regisztáció napja:</div>
                                <div>{member.memberSince}</div>
                              </div>
                            </TableRow>
                            <TableRow
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "10px",
                              }}
                            >
                              <div
                                style={{
                                  padding: "5px",
                                  fontSize: "50px",
                                  color: "#eb365a",
                                  border: "1px solid black",
                                  backgroundColor: "#54538c",
                                }}
                              >
                                <Avatar
                                  style={{ 
                                    border:
                                      new Date(member.login).getTime() > new Date(member.logoff).getTime() ? ("2px solid blue") : ("2px solid red"),
                                    backgroundColor: member.avatarColor,
                                    alignSelf: "center",
                                  }}
                                >
                                  {member.name[0]}
                                </Avatar>
                              </div>
                            </TableRow>
                          </TableCell>
                        </Table>
                      </div>
                    }
                  >
                    <Avatar  style={{ 
                                    border:
                                      new Date(member.login).getTime() > new Date(member.logoff).getTime() ? ("2px solid blue") : ("2px solid red"),
                                      backgroundColor: member.avatarColor,
                                    alignSelf: "center",
                                  }}>{member.name[0]}</Avatar>
                  </Tooltip>
                </ListItemAvatar>
                <ListItemText primary={member.name} />
                <Tooltip
                  title={
                    Number(currentUserId) !== selectedGroup.ownerId
                      ? `Kilépés a csoportból`
                      : `${member.name} kidobása a csoportból`
                  }
                >
                  {member.id === selectedGroup.ownerId ? (
                    <></>
                  ) : Number(currentUserId) !== selectedGroup.ownerId ? (
                    <></>
                  ) : (
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteMember(member.id)}
                    >
                      <Delete sx={{ color: "#d32f2f" }} />
                    </IconButton>
                  )}
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
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{
              cursor: "cell",
            }}
          >
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
