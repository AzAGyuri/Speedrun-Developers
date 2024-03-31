import React, { useState } from 'react';
import {
  Container, Typography, Paper, Avatar, IconButton, List, ListItem, ListItemAvatar,
  ListItemText, Divider, Modal, TextField, Button, Tooltip,
} from '@mui/material';
import { Delete, Add } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const styles = {
  container: {
    paddingTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '85vh',
  },
  paper: {
    padding: '20px',
    width: '600px',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    borderRadius: '12px',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalPaper: {
    backgroundColor: '#fff',
    boxShadow: 24,
    padding: '20px',
    width: '400px',
    borderRadius: '8px',
  },
  addButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#218838',
    },
    marginTop: '20px',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  deleteButton: {
    color: '#fff',
    '&:hover': {
      backgroundColor: '#dc3545',
    },
    marginTop: '30px',
  },
  listItemTextMargin: {
    marginLeft: '20px',
    marginTop: '15px',
  }
};


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function MyGroups() {
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: 'Szakmai angol',
      description: 'Szakmai angol csoport',
      members: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Alice Smith' },
        { id: 3, name: 'Bob Johnson' },
      ],
    },
    {
      id: 2,
      name: 'Informatika',
      description: 'Informatika csoport',
      members: [
        { id: 4, name: 'Emily Brown' },
        { id: 5, name: 'Michael Wilson' },
        { id: 15, name: 'Bob Johnson' },
      ],
    },
    {
      id: 3,
      name: 'Magyar',
      description: 'Magyar csoport',
      members: [
        { id: 6, name: 'Jane Smith' },
        { id: 7, name: 'David Lee' },
        { id: 8, name: 'Grace Taylor' },
      ],
    },
    {
      id: 4,
      name: 'Matek',
      description: 'Matek csoport',
      members: [
        { id: 9, name: 'Alex Johnson' },
        { id: 10, name: 'Sophia Garcia' },
        { id: 11, name: 'Daniel Martinez' },
      ],
    },
    {
      id: 5,
      name: 'Történelem',
      description: 'Történelem csoport',
      members: [
        { id: 12, name: 'Liam Anderson' },
        { id: 13, name: 'Olivia Wilson' },
        { id: 14, name: 'Ethan Thompson' },
      ],
    },
  ]);

 
  const [open, setOpen] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

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


  const [groupName, setGroupName] = useState('');
  const [groupDesc, setGroupDesc] = useState('');

  function createNewGroup() {
    if (!groupName.trim() || !groupDesc.trim()) {
      alert('A csoport nevének és leírásának legalább 1 karakter hosszúnak kell lennie!');
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

    setGroupName('');
    setGroupDesc('');
  }


  function deleteGroup(id) {
    const updatedGroups = groups.filter(group => group.id !== id);
    setGroups(updatedGroups);
  }

  const getRandomColor = () => {
    const colors = ['#f00', '#ff0', '#0f0', '#0ff', '#00f', '#f60'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <Container maxWidth="lg" style={styles.container}>
      <Paper elevation={3} style={styles.paper}>
        <Typography variant="h5" align="center" gutterBottom>
          Csoportjaim
        </Typography>
        <List>
          {groups.map((group, index) => (
            <React.Fragment key={group.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar onClick={() => handleOpenMembers(group)}>
                  <Avatar alt={group.name} style={{ ...styles.avatar, backgroundColor: getRandomColor(), width: '70px', height: '70px' }}>
                    {group.name[0].toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText style={styles.listItemTextMargin}
                  primary={group.name}
                  secondary={
                    <React.Fragment>
                      <Typography component="span" variant="body2" color="textSecondary">
                        {group.description}
                      </Typography>
                    </React.Fragment>
                  }
                />
                <div style={styles.actions}>
                  <Tooltip title="Csoport törlése">
                    <IconButton color="secondary" aria-label="delete" style={styles.deleteButton} onClick={() => { deleteGroup(group.id) }}>
                      <Delete sx={{ color: '#d32f2f' }} />
                    </IconButton>
                  </Tooltip>
                </div>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
          <ListItem alignItems="center">
            <Tooltip title="Új csoport létrehozása">
              <IconButton color="primary" aria-label="add" onClick={handleOpen} style={styles.addButton}>
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
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Új csoport létrehozása
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
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
                '& > :not(style)': { m: 1, width: '25ch' },
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
            <Button variant="contained" color="success" onClick={() => { createNewGroup() }}>
              Mentés
            </Button>
          </Stack>
        </Box>
      </Modal>



      <Modal
        open={showMembers}
        onClose={handleCloseMembers}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            A csoport tagjai - {selectedGroup && selectedGroup.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <List>
              {selectedGroup && selectedGroup.members && selectedGroup.members.map(member => (
                <ListItem key={member.id}>
                  <ListItemAvatar>
                    <Avatar>{member.name[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={member.name} />
                </ListItem>
              ))}
            </List>
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="error" onClick={handleCloseMembers}>
              Bezárás
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Container>
  );
}
