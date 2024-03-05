import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import './FirstPage.css';

import mathematics from './resources/mat.png';
import grammer from './resources/grammer.png';
import history from './resources/history.png';
import chemistry from './resources/chem.png';
import it from './resources/it.png';
import iteng from './resources/iteng.png';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';

const RootContainer = styled(Container)({
  flexGrow: 1,
  padding: '16px',
  textAlign: 'center',
  transition: 'background-image 1s ease-in-out',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundColor: 'grey',
  '& > *': {
    textShadow: '2px 2px 2px green',
  },
});

const HeaderTypography = styled(Typography)({
  marginBottom: '16px',
});

const SubheaderTypography = styled(Typography)({
  marginBottom: '32px',
});

const BottomButtonsContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '32px',
});

const CloseButton = styled(Button)({
  position: 'absolute',
  top: 0,
  right: 0,
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function Kezdo() {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <CloseButton onClick={handleClose} color="primary">
              X
            </CloseButton>
            <HeaderTypography variant="h3">
              Üdvözöljük a Sulipedia oldalon!
            </HeaderTypography>
            <SubheaderTypography variant="body1">
              Az oldalt és a hozzá tartozó funkcionalitásokat a{' '}
              <Link
                style={{ textDecoration: 'none', color: 'blue' }}
                to="/aboutUs"
                underline="none"
                rel="noreferrer"
                color="inherit"
              >
                Speedrun Developers
              </Link>{' '}
              csapata készítette!
            </SubheaderTypography>
            <Typography variant="body1">
              Ön ezen oldal jelenlegi alfa verzióját látja. A jövőben - mint minden más oldalra is - erre is
              további fejlesztések és új funkciók várnak majd.
              <br />
              Amennyiben szeretné támogatni az oldal fejlődését azt az alábbi{' '}
              <a href="https://www.paypal.me/Krisz37">linken</a> megteheti!
            </Typography>

            <BottomButtonsContainer>
              <Button variant="contained" color="secondary" component={Link} to="/LearnMore">
                Tudj meg többet
              </Button>
            </BottomButtonsContainer>
          </Box>
        </Modal>
      </div>


    <div className='flex-container'>

      <div className='flex-item'>
        <div className="drawer">
        <Link  style={{ textDecoration: 'none',color:"white" }} to="/Matek" underline="none" rel="noreferrer"  color="inherit">
          <div className="subject-container">
            <a>Matematika</a>
            <img src={mathematics} alt="Matematika" className="subjectIMG" />
          </div>
          </Link>
          <Link  style={{ textDecoration: 'none',color:"white" }} to="/magyar" underline="none" rel="noreferrer"  color="inherit">
          <div className="subject-container">
            <a>Magyar Nyelv</a>
            <img src={grammer} alt="Magyar Nyelv" className="subjectIMG" />
          </div>
          </Link>
          <Link  style={{ textDecoration: 'none',color:"white" }} to="/Tortenelem" underline="none" rel="noreferrer"  color="inherit">
          <div className="subject-container">
            <a>Történelem</a>
            <img src={history} alt="Történelem" className="subjectIMG" />
          </div>
          </Link>
          <Link  style={{ textDecoration: 'none',color:"white" }} to="/szakmai-angol" underline="none" rel="noreferrer"  color="inherit">
          <div className="subject-container">
            <a>Szakmai angol</a>
            <img src={iteng} alt="Szakmai angol" className="subjectIMG" />
          </div>
          </Link>
          <Link  style={{ textDecoration: 'none',color:"white" }} to="/informatika" underline="none" rel="noreferrer"  color="inherit">
          <div className="subject-container">
            <a>Informatika</a>
            <img src={it} alt="Informatika" className="subjectIMG" />
          </div>
          </Link>
          <div className="blackLine"></div>
        </div>
      </div>


      <div className='flex-item'>
        <div className='contente-flex'>
        <div className='flexcontente-item'>
          <div className='contente-box'>
            <div className='contente-title'>
              Informatika
            </div>
            <div className='contente'>
              asdadadasdas dansd n ojasnod daskndasnldnlas<br/>
              asdsadasdasdasdsadas
            </div>
            <div className='contente-button'>
              <div className='detailsButton'>Részletek</div>
            </div>
          </div>
        </div>
        </div>

        <div className='contente-flex'>
        <div className='flexcontente-item'>
          <div className='contente-box'>
            <div className='contente-title'>
              Informatika
            </div>
            <div className='contente'>
              asdadadasdas dansd n ojasnod daskndasnldnlas<br/>
              asdsadasdasdasdsadas
            </div>
            <div className='contente-button'>
              <div className='detailsButton'>Részletek</div>
            </div>
          </div>
        </div>
        </div>

        <div className='contente-flex'>
        <div className='flexcontente-item'>
          <div className='contente-box'>
            <div className='contente-title'>
              Informatika
            </div>
            <div className='contente'>
              asdadadasdas dansd n ojasnod daskndasnldnlas<br/>
              asdsadasdasdasdsadas
            </div>
            <div className='contente-button'>
              <div className='detailsButton'>Részletek</div>
            </div>
          </div>
        </div>
        </div>

        <div className='contente-flex'>
        <div className='flexcontente-item'>
          <div className='contente-box'>
            <div className='contente-title'>
              Informatika
            </div>
            <div className='contente'>
              asdadadasdas dansd n ojasnod daskndasnldnlas<br/>
              asdsadasdasdasdsadas
            </div>
            <div className='contente-button'>
              <div className='detailsButton'>Részletek</div>
            </div>
          </div>
        </div>
        </div>

        <div className='contente-flex'>
        <div className='flexcontente-item'>
          <div className='contente-box'>
            <div className='contente-title'>
              Informatika
            </div>
            <div className='contente'>
              asdadadasdas dansd n ojasnod daskndasnldnlas<br/>
              asdsadasdasdasdsadas
            </div>
            <div className='contente-button'>
              <div className='detailsButton'>Részletek</div>
            </div>
          </div>
        </div>
        </div>

        <div className='contente-flex'>
        <div className='flexcontente-item'>
          <div className='contente-box'>
            <div className='contente-title'>
              Informatika
            </div>
            <div className='contente'>
              asdadadasdas dansd n ojasnod daskndasnldnlas<br/>
              asdsadasdasdasdsadas
            </div>
            <div className='contente-button'>
              <div className='detailsButton'>Részletek</div>
            </div>
          </div>
        </div>
        </div>

        <div className='contente-flex'>
        <div className='flexcontente-item'>
          <div className='contente-box'>
            <div className='contente-title'>
              Informatika
            </div>
            <div className='contente'>
              asdadadasdas dansd n ojasnod daskndasnldnlas<br/>
              asdsadasdasdasdsadas
            </div>
            <div className='contente-button'>
              <div className='detailsButton'>Részletek</div>
            </div>
          </div>
        </div>
        </div>

      </div>
      
      <div className='flex-item'> </div>
    </div>  
    </>
  );
}
