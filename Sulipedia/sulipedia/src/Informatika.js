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
  Divider,
} from '@mui/material';
import { styled } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import './All.css';

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

const StyledDivider = styled(Divider)({
  backgroundColor: '#7ffc03', 
});

export function Informatika() {
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

    const handleMenuItemClick = (menuItem) => {
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

    const handleSubMenuItemClick = (subMenuItem) => {
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
                <List>
                    <StyledListItem button onClick={() => handleMenuItemClick(1)}>
                        <StyledListItemText primary="A programozás alapjai" />
                    </StyledListItem>
                    <Collapse in={showSubMenu1} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                            <StyledListItem button onClick={() => handleSubMenuItemClick(1)}>
                                <StyledListItemText primary="A Java programozási nyelv" />
                            </StyledListItem>
                            <Collapse in={showSubSubMenu1} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                                    <StyledListItem button>
                                        <StyledListItemText primary="Az objektumorientált programozás" />
                                    </StyledListItem>
                                    <StyledListItem button>
                                        <StyledListItemText primary="A Java osztályok és metódusok" />
                                    </StyledListItem>
                                </List>
                            </Collapse>
                            <StyledListItem button onClick={() => handleSubMenuItemClick(2)}>
                                <StyledListItemText primary="A webfejlesztés alapjai" />
                            </StyledListItem>
                        </List>
                    </Collapse>
                    <StyledListItem button onClick={() => handleMenuItemClick(2)}>
                        <StyledListItemText primary="Az adatbázisok és SQL" />
                    </StyledListItem>
                    <Collapse in={showSubMenu2} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                            <StyledListItem button onClick={() => handleSubMenuItemClick(3)}>
                                <StyledListItemText primary="Az adatbázisok tervezése" />
                            </StyledListItem>
                            <Collapse in={showSubSubMenu3} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                                    <StyledListItem button>
                                        <StyledListItemText primary="A relációs adatbázisok" />
                                    </StyledListItem>
                                    <StyledListItem button>
                                        <StyledListItemText primary="Az SQL lekérdezések" />
                                    </StyledListItem>
                                </List>
                            </Collapse>
                            <StyledListItem button onClick={() => handleSubMenuItemClick(4)}>
                                <StyledListItemText primary="Az adatbázisok kezelése" />
                            </StyledListItem>
                        </List>
                    </Collapse>
                    <StyledListItem button onClick={() => handleMenuItemClick(3)}>
                        <StyledListItemText primary="A szoftvertervezés alapjai" />
                    </StyledListItem>
                    <Collapse in={showSubMenu3} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                            <StyledListItem button>
                                <StyledListItemText primary="Az UML diagramok" />
                            </StyledListItem>
                            <StyledListItem button>
                                <StyledListItemText primary="A tervezési minták" />
                            </StyledListItem>
                        </List>
                    </Collapse>
                    <StyledListItem button onClick={() => handleMenuItemClick(4)}>
                        <StyledListItemText primary="A hálózati technológiák" />
                    </StyledListItem>
                    <Collapse in={showSubMenu4} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                            <StyledListItem button onClick={() => handleSubMenuItemClick(4)}>
                                <StyledListItemText primary="A TCP/IP protokollcsalád" />
                            </StyledListItem>
                            <Collapse in={showSubSubMenu4} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                                    <StyledListItem button>
                                        <StyledListItemText primary="Az IPv4 és IPv6" />
                                    </StyledListItem>
                                </List>
                            </Collapse>
                            <StyledListItem button>
                                <StyledListItemText primary="A webes kommunikáció" />
                            </StyledListItem>
                        </List>
                    </Collapse>
                </List>
            </StyledDrawer>
            <StyledContainer>
                <Title variant="h3">Az Informatikáról</Title>
            </StyledContainer>
            <StyledContainer>
                <LargeText variant="body1">
                    Az informatika tantárgy során a diákok megismerhetik a programozás alapjait, beleértve a Java programozási nyelvet és az objektumorientált programozást. A webfejlesztés alapjai segítenek a modern webes alkalmazások létrehozásában és megértésében.
                </LargeText>
            </StyledContainer>
            <StyledContainer>
                <LargeText variant="body1">
                    Az adatbázisok és SQL témaköreiben a diákok megtanulhatják az adatbázisok tervezését, a relációs adatbázisokat, valamint az SQL lekérdezéseket. Emellett megismerhetik az adatbázisok hatékony kezelésének módszereit.
                </LargeText>
            </StyledContainer>
            <StyledContainer>
                <LargeText variant="body1">
                    A szoftvertervezés alapjai során az UML diagramok és tervezési minták segítenek a diákoknak a szofisztikáltabb és jól strukturált szoftverek tervezésében.
                </LargeText>
            </StyledContainer>
            <StyledContainer>
                <LargeText variant="body1">
                    A hálózati technológiák területén a diákok megismerkedhetnek a TCP/IP protokollcsaláddal, az IPv4 és IPv6 protokollokkal, valamint a webes kommunikációval és hálózatokkal.
                </LargeText>
            </StyledContainer>
            <StyledContainer>
    <LargeText variant="body1">
        Az alapvető matematikai fogalmak elsajátítása elengedhetetlen az informatika területén. A logikai gondolkodás és a matematikai alapok segítik a diákokat a hatékony programozásban és problémamegoldásban.
    </LargeText>
</StyledContainer>
<StyledContainer>
    <LargeText variant="body1">
        Az algoritmusok és adatszerkezetek megértése nélkülözhetetlen a hatékony programfejlesztéshez. A diákok megismerik a különböző algoritmusokat és adatszerkezeteket, és tanulnak arról, hogyan válasszák ki a legmegfelelőbbet adott problémához.
    </LargeText>
</StyledContainer>
<StyledContainer>
    <LargeText variant="body1">
        Az operációs rendszerek és számítógéparchitektúrák témakörei segítik a diákokat abban, hogy megértsék a számítógépek működését és azok összetevőit. Ez alapvető ismereteket nyújt a szoftverek és hardverek kölcsönhatásának megértéséhez.
    </LargeText>
</StyledContainer>
<StyledContainer>
    <LargeText variant="body1">
        A mesterséges intelligencia és gépi tanulás területén való elmélyülés lehetővé teszi a diákok számára, hogy megismerjék azokat a technológiákat, amelyek az intelligens rendszerek és döntéstámogató rendszerek hátterében állnak.
    </LargeText>
</StyledContainer>

        </>
    );
}
