import React, { useState, useEffect } from 'react';
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
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = React.useState(true);
  const [newPost, setNewPost] = React.useState(false);
  const [newsModalOpen, setNewsModalOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [closedByUser, setClosedByUser] = useState(false);
  const [modalShouldOpen, setModalShouldOpen] = useState(true);


  useEffect(() => {
    // Ellenőrizzük, hogy a modális ablakot a felhasználó bezárta-e az "X" gombra kattintva
    if (!modalShouldOpen) {
      setOpen(false);
    }
  }, [modalShouldOpen]);

  const handleClose = () => { setOpen(false); setClosedByUser(true); setModalShouldOpen(false); }
  const handleClosePost = () => { setPosts([...posts, { title: newPostTitle, content: newPostContent }]); }

  const handleNewsModalOpen = () => {
    setNewsModalOpen(true);
  };

  const handleNewsModalClose = () => {
    setNewsModalOpen(false);
    setNewPostTitle('');
    setNewPostContent('');
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
              Amennyiben szeretné támogatni az oldal fejlődését azt az alábbi paypal{' '}
              <a href="https://www.paypal.me/Krisz37">linken</a> megteheti!
            </Typography>

            <BottomButtonsContainer>
              <Button variant="contained" color="secondary" component={Link} to="/LearnMore">
                Tudj meg többet
              </Button>
              <SignInButton component={Link} to="/AboutUs">
                Rólunk
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
                  Algoritmusok és Adatszerkezetek
                </div>
                <div className='contente'>
                  Az algoritmusok és adatszerkezetek kulcsfontosságú fogalmak az informatikában. Az algoritmusok hatékony megvalósítása és az optimális adatszerkezetek kiválasztása lehetővé teszi az informatikai problémák hatékony megoldását.
                </div>

              </div>
            </div>
          </div>

          <div className='contente-flex'>
            <div className='flexcontente-item'>
              <div className='contente-box'>
                <div className='contente-title'>
                  Felhőalapú Számítástechnika
                </div>
                <div className='contente'>
                  A felhőalapú számítástechnika forradalmasította az informatikát. Az egyre növekvő számú vállalat és felhasználó számára biztosítja az adatok tárolását, szolgáltatásokat és alkalmazásokat a világhálón keresztül.
                </div>

              </div>
            </div>
          </div>

          <div className='contente-flex'>
            <div className='flexcontente-item'>
              <div className='contente-box'>
                <div className='contente-title'>
                  Kiberbiztonság és Hálózatbiztonság
                </div>
                <div className='contente'>
                  A kiberbiztonság és hálózatbiztonság napjainkban kulcsfontosságú területe az informatikának. Az internetes fenyegetések és a számítógépes bűnözés elleni védelem elengedhetetlen a biztonságos online környezet megteremtéséhez.
                </div>

              </div>
            </div>
          </div>

          <div className='contente-flex'>
            <div className='flexcontente-item'>
              <div className='contente-box'>
                <div className='contente-title'>
                  Adattudomány és Nagy Adat
                </div>
                <div className='contente'>
                  Az adattudomány és a nagy adat elemzésének képességei forradalmasítják az üzleti és tudományos területeket egyaránt. Az adatokból való értelmezés lehetővé teszi a trendek felismerését és a jövőbeli döntések meghozatalát.
                </div>

              </div>
            </div>
          </div>

          <div className='contente-flex'>
            <div className='flexcontente-item'>
              <div className='contente-box'>
                <div className='contente-title'>
                  Mesterséges Intelligencia és Gépi Tanulás
                </div>
                <div className='contente'>
                  A mesterséges intelligencia és a gépi tanulás területei forradalmasítják az informatikát. Az olyan alkalmazások, mint az autonóm járművek és a nyelvi felismerés, az MI és a gépi tanulás legújabb fejlesztéseinek eredményei.
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className='flex-item'>
          <Button onClick={handleNewsModalOpen} variant="contained" color="primary">
            Új hír hozzáadása
          </Button>
        </div>
      </div>


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
          <TextField
            label="Cím"
            fullWidth
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
          />
          <TextField
            label="Tartalom"
            multiline
            rows={4}
            fullWidth
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          />
          <Button
            variant="contained"
            color="secondary"
            style={{ marginTop: '16px' }}
            onClick={() => {
              handleClosePost();
              handleNewsModalClose();
            }}
          >
            Hozzáadás
          </Button>
        </Box>
      </Modal>
      <div className='flex-container'>
        <div className='flex-item'>  </div>
        <div className='flex-item'>
          {posts.map((post, index) => (

            <div className='contente-flex' key={index}>
              <div className='flexcontente-item'>
                <div className='contente-box'>
                  <div className='contente-title'>{post.title}</div>
                  <div className='contente'>{post.content}</div>
                </div>
              </div>
            </div>

          ))}
        </div>
        <div className='flex-item'> </div>
      </div>
    </>
  );
}
