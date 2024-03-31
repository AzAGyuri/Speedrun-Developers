import React, { useState, useEffect } from 'react';
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
  Tooltip,
} from '@mui/material';
import { Phone, Email, LocationOn, Edit, Delete, Add } from '@mui/icons-material';
import { margin } from '@mui/system';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { red } from '@mui/material/colors';

import { useNavigate } from 'react-router-dom';

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },

  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

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
  ]);
  const [open, setOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const [groupName, setGroupName] = useState('');
  const [groupDesc, setGroupDesc] = useState('');
  const [groupType, setGroupType] = useState('');

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
                <ListItemAvatar>
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
            Új feladat hozzáadása
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

            <div>
              {/*   <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
                <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                onChange={(e) => setGroupType(e.target.value)}
                label="Csoport típusa"
                >
                <MenuItem value={"TORTENELEM"}>Történelem</MenuItem>
                <MenuItem value={"MATEK"}>Matek</MenuItem>
                <MenuItem value={"MAGYAR"}>Magyar</MenuItem>
                <MenuItem value={"INFORMATIKA"}>Informatika</MenuItem>
                </Select>
              </FormControl> */}
            </div>
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
    </Container>
  );
}
