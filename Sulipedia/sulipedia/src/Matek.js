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

export function Matek() {
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
                        <ListItemText primary="Algebrai Kifejezések" />
                    </ListItem>
                    <Collapse in={showSubMenu1} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                            <ListItem button onClick={() => handleSubMenuItemClick(1)}>
                                <ListItemText primary="Polinomok" />
                            </ListItem>
                            <Collapse in={showSubSubMenu1} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                                    <ListItem button>
                                        <ListItemText primary="Másodfokú Egyenletek" />
                                    </ListItem>
                                    <ListItem button>
                                        <ListItemText primary="Harmadfokú Egyenletek" />
                                    </ListItem>
                                </List>
                            </Collapse>
                            <ListItem button onClick={() => handleSubMenuItemClick(2)}>
                                <ListItemText primary="Exponenciális Függvények" />
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem button onClick={() => handleMenuItemClick(2)}>
                        <ListItemText primary="Geometria" />
                    </ListItem>
                    <Collapse in={showSubMenu2} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                            <ListItem button onClick={() => handleSubMenuItemClick(3)}>
                                <ListItemText primary="Háromszögek" />
                            </ListItem>
                            <Collapse in={showSubSubMenu3} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                                    <ListItem button>
                                        <ListItemText primary="Derékszögű Háromszögek" />
                                    </ListItem>
                                    <ListItem button>
                                        <ListItemText primary="Egyenlőszárú Háromszögek" />
                                    </ListItem>
                                </List>
                            </Collapse>
                            <ListItem button onClick={() => handleSubMenuItemClick(4)}>
                                <ListItemText primary="Körök" />
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem button onClick={() => handleMenuItemClick(3)}>
                        <ListItemText primary="Kalkulus" />
                    </ListItem>
                    <Collapse in={showSubMenu3} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                            <ListItem button>
                                <ListItemText primary="Határérték" />
                            </ListItem>
                            <ListItem button>
                                <ListItemText primary="Deriváltak" />
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem button onClick={() => handleMenuItemClick(4)}>
                        <ListItemText primary="Statisztika" />
                    </ListItem>
                    <Collapse in={showSubMenu4} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                            <ListItem button onClick={() => handleSubMenuItemClick(4)}>
                                <ListItemText primary="Inferenciális Statisztika" />
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
            </StyledDrawer>

            <Title variant="h3">A Matematikai Fogalmakról</Title>
            <StyledContainer>
                <LargeText variant="body1">
                    Különböző matematikai fogalmak felfedezése elengedhetetlen a tantárgy szilárd megértéséhez. Merüljünk el néhány alapvető matematikai témában.
                </LargeText>
            </StyledContainer>
            <StyledContainer>
                <LargeText variant="body1">
                    Az algebrai kifejezések és egyenletek megértése, valamint a grafikus ábrázolásuk elengedhetetlen a matematikai problémák megoldásához.
                </LargeText>
            </StyledContainer>
            <StyledContainer>
                <LargeText variant="body1">
                    A geometria segít nekünk tanulmányozni az alakokat, méreteket és a tér tulajdonságait. Alapvető szerepet játszik a körülöttünk lévő világ megértésében.
                </LargeText>
            </StyledContainer>
            <StyledContainer>
                <LargeText variant="body1">
                    A kalkulus a határértékek és deriváltak fogalmával az analízis matematikai alapja, és széles körben használják különböző tudományos területeken.
                </LargeText>
            </StyledContainer>
            <StyledContainer>
                <LargeText variant="body1">
                    A statisztika az adatok gyűjtésével, elemzésével, értelmezésével, prezentálásával és rendezésével foglalkozik. Kulcsfontosságú a tájékozott döntéshozatalban különböző területeken.
                </LargeText>
            </StyledContainer>
        </StyledContainer>
    );
}
