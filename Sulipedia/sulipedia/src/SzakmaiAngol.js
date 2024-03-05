import React from 'react';
import {
  Container,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
} from '@mui/material';
import { styled } from '@mui/system';

import MenuIcon from '@mui/icons-material/Menu';

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',
  marginTop: '20px',
  backgroundColor: '#4caf50',
  color: '#333',
  borderRadius: '10px',
  boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
  marginBottom: '20px',
  border: '2.5px solid #2f3826',
});

const Title = styled(Typography)({
  marginBottom: theme => theme.spacing(2),
  fontSize: '2rem',
  marginTop: theme => theme.spacing(1),
  fontWeight: 'bold',
});

const LargeText = styled(Typography)({
  marginBottom: theme => theme.spacing(1),
  fontSize: '1.5rem',
  textAlign: 'justify',
  lineHeight: '1.6',
});

const StyledDrawerButton = styled(IconButton)({
  position: 'fixed',
  top: '70px',
  left: '25px',
  borderRadius: '50%',
  backgroundColor: '#2f3826',
  color: 'white',
  fontSize: '1.2rem',
  zIndex: 1000,
  '&:hover': {
    backgroundColor: '#6c7530',
  },
});

const StyledDrawer = styled(Drawer)({
  '& .MuiPaper-root': {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    color: 'white',
    width: '200px',
  },
});

const StyledList = styled(List)({
  width: '100%',
});

const StyledListItem = styled(ListItem)({
  borderBottom: '1px solid #7ffc03',
});

const StyledListItemText = styled(ListItemText)({
  color: 'white',
});

export function SzakAngol() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [showSubMenu1, setShowSubMenu1] = React.useState(false);
  const [showSubMenu2, setShowSubMenu2] = React.useState(false);
  const [showSubMenu3, setShowSubMenu3] = React.useState(false);
  const [showSubMenu4, setShowSubMenu4] = React.useState(false);

  const [showSubSubMenu1, setShowSubSubMenu1] = React.useState(false);
  const [showSubSubMenu2, setShowSubSubMenu2] = React.useState(false);
  const [showSubSubMenu3, setShowSubSubMenu3] = React.useState(false);
  const [showSubSubMenu4, setShowSubSubMenu4] = React.useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuItemClick = menuItem => {
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
        break;
      case 2:
        setShowSubMenu2(!showSubMenu2);
        break;
      case 3:
        setShowSubMenu3(!showSubMenu3);
        break;
      case 4:
        setShowSubMenu4(!showSubMenu4);
        break;
      default:
        break;
    }
  };

  const handleSubMenuItemClick = subMenuItem => {
    switch (subMenuItem) {
      case 1:
        setShowSubSubMenu1(!showSubSubMenu1);
        break;
      case 2:
        setShowSubSubMenu2(!showSubSubMenu2);
        break;
      case 3:
        setShowSubSubMenu3(!showSubSubMenu3);
        break;
      case 4:
        setShowSubSubMenu4(!showSubSubMenu4);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <StyledDrawerButton onClick={toggleDrawer}>
        <MenuIcon />
      </StyledDrawerButton>

      <StyledDrawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <StyledList>
          <StyledListItem button onClick={() => handleMenuItemClick(1)}>
            <StyledListItemText primary="A perifériák" />
          </StyledListItem>
          <Collapse in={showSubMenu1} timeout="auto" unmountOnExit>
            <StyledList component="div" disablePadding style={{ paddingLeft: '20px' }}>
              <StyledListItem button onClick={() => handleSubMenuItemClick(1)}>
                <StyledListItemText primary="A bemeneti periférák" />
              </StyledListItem>
              <Collapse in={showSubSubMenu1} timeout="auto" unmountOnExit>
                <StyledList component="div" disablePadding style={{ paddingLeft: '20px' }}>
                  <StyledListItem button>
                    <StyledListItemText primary="A webkamera" />
                  </StyledListItem>
                  <StyledListItem button>
                    <StyledListItemText primary="A mikrofon" />
                  </StyledListItem>
                </StyledList>
              </Collapse>
              <StyledListItem button onClick={() => handleSubMenuItemClick(2)}>
                <StyledListItemText primary="A hangszórók" />
              </StyledListItem>
            </StyledList>
          </Collapse>
          <StyledListItem button onClick={() => handleMenuItemClick(2)}>
            <StyledListItemText primary="A számítógép hardverek" />
          </StyledListItem>
          <Collapse in={showSubMenu2} timeout="auto" unmountOnExit>
            <StyledList component="div" disablePadding style={{ paddingLeft: '20px' }}>
              <StyledListItem button onClick={() => handleSubMenuItemClick(3)}>
                <StyledListItemText primary="A processzorok" />
              </StyledListItem>
              <Collapse in={showSubSubMenu3} timeout="auto" unmountOnExit>
                <StyledList component="div" disablePadding style={{ paddingLeft: '20px' }}>
                  <StyledListItem button>
                    <StyledListItemText primary="Az alaplap" />
                  </StyledListItem>
                  <StyledListItem button>
                    <StyledListItemText primary="A memória" />
                  </StyledListItem>
                </StyledList>
              </Collapse>
              <StyledListItem button onClick={() => handleSubMenuItemClick(4)}>
                <StyledListItemText primary="A videokártyák" />
              </StyledListItem>
            </StyledList>
          </Collapse>
          <StyledListItem button onClick={() => handleMenuItemClick(3)}>
            <StyledListItemText primary="A számítógép szoftverek" />
          </StyledListItem>
          <Collapse in={showSubMenu3} timeout="auto" unmountOnExit>
            <StyledList component="div" disablePadding style={{ paddingLeft: '20px' }}>
              <StyledListItem button>
                <StyledListItemText primary="Az operációs rendszerek" />
              </StyledListItem>
              <StyledListItem button>
                <StyledListItemText primary="A szoftveralkalmazások" />
              </StyledListItem>
            </StyledList>
          </Collapse>
          <StyledListItem button onClick={() => handleMenuItemClick(4)}>
            <StyledListItemText primary="A hálózatok" />
          </StyledListItem>
          <Collapse in={showSubMenu4} timeout="auto" unmountOnExit>
            <StyledList component="div" disablePadding style={{ paddingLeft: '20px' }}>
              <StyledListItem button onClick={() => handleSubMenuItemClick(4)}>
                <StyledListItemText primary="Az Ethernet hálózatok" />
              </StyledListItem>
              <Collapse in={showSubSubMenu4} timeout="auto" unmountOnExit>
                <StyledList component="div" disablePadding style={{ paddingLeft: '20px' }}>
                  <StyledListItem button>
                    <StyledListItemText primary="Az USB hálózatok" />
                  </StyledListItem>
                </StyledList>
              </Collapse>
              <StyledListItem button>
                <StyledListItemText primary="A vezeték nélküli hálózatok" />
              </StyledListItem>
            </StyledList>
          </Collapse>
        </StyledList>
      </StyledDrawer>
      <StyledContainer>
        <Title variant="h3">A Szakmai angolról</Title>
      </StyledContainer>
      <StyledContainer>
        <LargeText variant="body1">
          A szakmai angol az informatika területén elenghetetlen. Az informatikai szakzsargonban való jártasság lehetővé
          teszi a hatékonyság és a pontos információcserének a szakemberek között.
        </LargeText>
      </StyledContainer>
      <StyledContainer>
        <LargeText variant="body1">
          Az informatikai szakmai angol tartalmazza azokat a kifejezéseket, szavakat és kifejezéseket, amelyekre szükség
          van az informatika területén való munkavégzés során. Ez magában foglalja a hardverek, szoftverek, hálózatok,
          adatbázisok és egyéb informatikai témákkal kapcsolatos szakzsargont.
        </LargeText>
      </StyledContainer>
      <StyledContainer>
        <LargeText variant="body1">
          Az informatikai szakmai angol használata növeli az együttműködés hatékonyságát, mivel lehetővé teszi a
          szakemberek számára, hogy pontosan megértsék egymást. Ezenkívül segít a szakembereknek abban is, hogy
          könnyebben megértsék és kezeljék az informatikai problémákat és kihívásokat.
        </LargeText>
      </StyledContainer>
      <StyledContainer>
        <LargeText variant="body1">
          A szakmai angol nyelvtudás kulcsfontosságú az informatikai szektorban történő karrierépítés során. A
          szakembereknek nemcsak a technikai készségeikben, hanem a kommunikációs képességeikben is kiemelkedőnek
          kell lenniük ahhoz, hogy sikeresek legyenek a szakmában.
        </LargeText>
      </StyledContainer>
      <StyledContainer>
        <LargeText variant="body1">
          Az informatikai szakmai angol tanulása és alkalmazása segít a szakembereknek abban, hogy magabiztosan
          kommunikáljanak az ügyfelekkel, csapatukkal és más szakemberekkel. Ezáltal elősegíti a projektjeik
          hatékonyságát és hozzájárul a szakmai fejlődésükhöz.
        </LargeText>
      </StyledContainer>
      <StyledContainer>
        <LargeText variant="body1">
          Összességében a szakmai angol nyelvtudás elenghetetlen eszköz az informatikai szakemberek számára, hogy
          sikeresek legyenek a dinamikus és versenyképes informatikai iparágban.
        </LargeText>
      </StyledContainer>
    </>
  );
}
