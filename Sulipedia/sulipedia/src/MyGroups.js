import React, { useState } from 'react';
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
  Backdrop,
  Fade,
  TextField,
  Button,
} from '@mui/material';
import { Phone, Email, LocationOn, Edit, Delete, Add } from '@mui/icons-material';

const styles = {
  container: {
    paddingTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  paper: {
    padding: '20px',
    width: '600px',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    borderRadius: '12px',
  },
  avatar: {
    width: '60px',
    height: '60px',
    backgroundColor: '#6c757d',
    fontSize: '24px',
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
  },
  deleteButton: {
    color: '#fff',
    '&:hover': {
      backgroundColor: '#dc3545',
    },
  },
  addGroupButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
  },
};

const groups = [
  {
    id: 1,
    name: 'Szakmai angol',
    description: 'Szakmai angol csoport',
  },
  {
    id: 2,
    name: 'Informatika',
    description: 'Informatika csoport',
  },
  {
    id: 3,
    name: 'Magyar',
    description: 'Magyar csoport',
  },
  {
    id: 4,
    name: 'Matek',
    description: 'Matek csoport',
  },
  {
    id: 5,
    name: 'Történelem',
    description: 'Történelem csoport',
  },
];

export function MyGroups() {
  const [open, setOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddGroup = () => {
    // Implement logic to add a new group
    console.log('New group added:', newGroupName, newGroupDescription);
    setOpen(false);
  };

  return (
    <Container maxWidth="lg" style={styles.container}>
      <Paper elevation={3} style={styles.paper}>
        <Typography variant="h5" align="center" gutterBottom>
          Csoportjaim
        </Typography>
        <List>
          {groups.map((group) => (
            <React.Fragment key={group.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={group.name} style={styles.avatar}>
                    {group.name[0].toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
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
                  <IconButton color="secondary" aria-label="delete" style={styles.deleteButton}>
                    <Delete />
                  </IconButton>
                </div>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
          <ListItem alignItems="center">
            <IconButton color="primary" aria-label="add" onClick={handleOpen} style={styles.addButton}>
              <Add />
            </IconButton>
          </ListItem>
        </List>
      </Paper>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        style={styles.modal}
      >
        <Fade in={open}>
          <Paper elevation={3} style={styles.modalPaper}>
            <Typography variant="h6" gutterBottom>
              Új csoport hozzáadása
            </Typography>
            <TextField
              label="Csoportnév"
              variant="outlined"
              fullWidth
              margin="normal"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
            <TextField
              label="Leírás"
              variant="outlined"
              fullWidth
              margin="normal"
              value={newGroupDescription}
              onChange={(e) => setNewGroupDescription(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleAddGroup} style={styles.addGroupButton}>
              Hozzáadás
            </Button>
          </Paper>
        </Fade>
      </Modal>
    </Container>
  );
}
