import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './App.js';
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

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function exportdatas(name,desc,kategoria){
    
  }

  return (
    <div>
      <Button onClick={handleOpen} sx={{ color: 'white', fontSize:30,  position: 'relative', left: 49.67}}>+</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Csinálnivaló hozzáadása
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           Név: <input type={'text'} id='name'></input> <br></br>
           Leírás: <input type={'text'} id = 'desc'></input> <br></br>
           Kategória: <input type={'text'} id= 'kategoria'></input> <br></br>
           <button onClick={exportdatas(document.getElementById('name'),document.getElementById('desc'),document.getElementById('kategoria'))}>Hozzáadás</button>
          </Typography>
        </Box>
      </Modal>
    </div>
    
  );
 
}
