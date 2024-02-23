import React from 'react';
import { Container, Typography, IconButton, Drawer, List, ListItem, ListItemText, Collapse } from '@mui/material';
import { styled } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';

const StyledContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: '1px solid #ccc',
    paddingBottom: '16px',
    maxHeight: '100%',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
        width: '12px',
    },
    '&::-webkit-scrollbar-track': {
        background: '#f1f1f1',
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#888',
        borderRadius: '10px',
    },
});

const Title = styled(Typography)({
    marginBottom: theme => theme.spacing(4),
    fontSize: '2rem',
    marginTop: theme => theme.spacing(2),
});

const LargeText = styled(Typography)({
    marginBottom: theme => theme.spacing(2),
    fontSize: '1.5rem',
});

const StyledDrawerButton = styled(IconButton)({
    position: 'fixed',
    top: '70px',
    left: '25px',
    borderRadius: '50%',
    backgroundColor: '#333',
    color: 'white',
    fontSize: '1.2rem',
    '&:hover': {
        backgroundColor: '#555',
    },
});

const StyledDrawer = styled(Drawer)({
    '& .MuiPaper-root': {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        width: '200px',
    },
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
        <StyledContainer>
            <StyledDrawerButton onClick={toggleDrawer}>
                <MenuIcon />
            </StyledDrawerButton>

            <StyledDrawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <List>
                    <ListItem button onClick={() => handleMenuItemClick(1)}>
                        <ListItemText primary="A perifériák" />
                    </ListItem>
                    <Collapse in={showSubMenu1} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                            <ListItem button onClick={() => handleSubMenuItemClick(1)}>
                                <ListItemText primary="A bemeneti periférák" />
                            </ListItem>
                            <Collapse in={showSubSubMenu1} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                                    <ListItem button>
                                        <ListItemText primary="A webkamera" />
                                    </ListItem>
                                    <ListItem button>
                                        <ListItemText primary="A mikrofon" />
                                    </ListItem>
                                </List>
                            </Collapse>
                            <ListItem button onClick={() => handleSubMenuItemClick(2)}>
                                <ListItemText primary="A hangszórók" />
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem button onClick={() => handleMenuItemClick(2)}>
                        <ListItemText primary="A számítógép hardverek" />
                    </ListItem>
                    <Collapse in={showSubMenu2} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                            <ListItem button onClick={() => handleSubMenuItemClick(3)}>
                                <ListItemText primary="A processzorok" />
                            </ListItem>
                            <Collapse in={showSubSubMenu3} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                                    <ListItem button>
                                        <ListItemText primary="Az alaplap" />
                                    </ListItem>
                                    <ListItem button>
                                        <ListItemText primary="A memória" />
                                    </ListItem>
                                </List>
                            </Collapse>
                            <ListItem button onClick={() => handleSubMenuItemClick(4)}>
                                <ListItemText primary="A videokártyák" />
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem button onClick={() => handleMenuItemClick(3)}>
                        <ListItemText primary="A számítógép szoftverek" />
                    </ListItem>
                    <Collapse in={showSubMenu3} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                            <ListItem button>
                                <ListItemText primary="Az operációs rendszerek" />
                            </ListItem>
                            <ListItem button>
                                <ListItemText primary="A szoftveralkalmazások" />
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem button onClick={() => handleMenuItemClick(4)}>
                        <ListItemText primary="A hálózatok" />
                    </ListItem>
                    <Collapse in={showSubMenu4} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                            <ListItem button onClick={() => handleSubMenuItemClick(4)}>
                                <ListItemText primary="Az Ethernet hálózatok" />
                            </ListItem>
                            <Collapse in={showSubSubMenu4} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                                    <ListItem button>
                                        <ListItemText primary="Az USB hálózatok" />
                                    </ListItem>
                                </List>
                            </Collapse>
                            <ListItem button>
                                <ListItemText primary="A vezeték nélküli hálózatok" />
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
            </StyledDrawer>

            <Title variant="h3">A Szakmai angolról</Title>
            <StyledContainer>
                <LargeText variant="body1">
                    A szakmai angol az informatika területén elengedhetetlen. Az informatikai szakzsargonban való jártasság lehetővé
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
                    Összességében a szakmai angol nyelvtudás elengedhetetlen eszköz az informatikai szakemberek számára, hogy
                    sikeresek legyenek a dinamikus és versenyképes informatikai iparágban.
                </LargeText>
            </StyledContainer>
        </StyledContainer>
    );
}
