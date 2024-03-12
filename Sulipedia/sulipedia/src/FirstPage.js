import React, { useState } from 'react';
import { Container, Box, Button, Typography, Modal, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import './FirstPage.css';

import mathematics from './resources/mat.png';
import grammer from './resources/grammer.png';
import history from './resources/history.png';
import it from './resources/it.png';
import iteng from './resources/iteng.png';

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

const SignInButton = styled(Button)({
  backgroundColor: 'green',
  color: 'white',
  '&:hover': {
    backgroundColor: 'darkgreen',
  },
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
  const [newsModalOpen, setNewsModalOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const handleNewsModalOpen = () => {
    setNewsModalOpen(true);
  };

  const handleNewsModalClose = () => {
    setNewsModalOpen(false);
  };

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
              <SignInButton component={Link} to="/SignIn">
                Az oldal használatához jelentkezz be!
              </SignInButton>
            </BottomButtonsContainer>
          </Box>
        </Modal>
      </div>

      <div className='flex-container'>
        <div className='flex-item'>
          <div className="drawer">
            <Link style={{ textDecoration: 'none', color: "white" }} to="/Matek" underline="none" rel="noreferrer" color="inherit">
              <div className="subject-container">
                <a>Matematika</a>
                <img src={mathematics} alt="Matematika" className="subjectIMG" />
              </div>
            </Link>
            <Link style={{ textDecoration: 'none', color: "white" }} to="/magyar" underline="none" rel="noreferrer" color="inherit">
              <div className="subject-container">
                <a>Magyar Nyelv</a>
                <img src={grammer} alt="Magyar Nyelv" className="subjectIMG" />
              </div>
            </Link>
            <Link style={{ textDecoration: 'none', color: "white" }} to="/Tortenelem" underline="none" rel="noreferrer" color="inherit">
              <div className="subject-container">
                <a>Történelem</a>
                <img src={history} alt="Történelem" className="subjectIMG" />
              </div>
            </Link>
            <Link style={{ textDecoration: 'none', color: "white" }} to="/szakmai-angol" underline="none" rel="noreferrer" color="inherit">
              <div className="subject-container">
                <a>Szakmai angol</a>
                <img src={iteng} alt="Szakmai angol" className="subjectIMG" />
              </div>
            </Link>
            <Link style={{ textDecoration: 'none', color: "white" }} to="/informatika" underline="none" rel="noreferrer" color="inherit">
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
                  asdadadasdas dansd n ojasnod daskndasnldnlas<br />
                  asdsadasdasdasdsadas
                </div>
                <div className='contente-button'>
                  <Button onClick={handleNewsModalOpen} variant="contained" color="primary">
                    Új hír hozzáadása
                  </Button>
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
                  asdadadasdas dansd n ojasnod daskndasnldnlas<br />
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
                  asdadadasdas dansd n ojasnod daskndasnldnlas<br />
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
                  asdadadasdas dansd n ojasnod daskndasnldnlas<br />
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
                  asdadadasdas dansd n ojasnod daskndasnldnlas<br />
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
                  asdadadasdas dansd n ojasnod daskndasnldnlas<br />
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
                  asdadadasdas dansd n ojasnod daskndasnldnlas<br />
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
      {/* Új hír hozzáadása Modal */}
      <Modal
        open={newsModalOpen}
        onClose={handleNewsModalClose}
        aria-labelledby="news-modal-title"
        aria-describedby="news-modal-description"
      >
        <Box sx={style}>
          <CloseButton onClick={handleNewsModalClose} color="primary">
            X
          </CloseButton>
          <Typography variant="h6" component="div" id="news-modal-title">
            Új hír hozzáadása
          </Typography>
          <TextField label="Cím" fullWidth />
          <TextField label="Tartalom" multiline rows={4} fullWidth />
          <Button variant="contained" color="primary" style={{ marginTop: '16px' }}>
            Hozzáadás
          </Button>
        </Box>
      </Modal>
    </>
  );
}
