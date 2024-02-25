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
    <>
            <StyledDrawerButton onClick={toggleDrawer}>
                <MenuIcon />
            </StyledDrawerButton>

            <StyledDrawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <List>
                    <StyledListItem button onClick={() => handleMenuItemClick(1)}>
                        <StyledListItemText primary="Algebrai Kifejezések" />
                    </StyledListItem>
                    <Collapse in={showSubMenu1} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                            <StyledListItem button onClick={() => handleSubMenuItemClick(1)}>
                                <StyledListItemText primary="Polinomok" />
                            </StyledListItem>
                            <Collapse in={showSubSubMenu1} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                                    <StyledListItem button>
                                        <StyledListItemText primary="Másodfokú Egyenletek" />
                                    </StyledListItem>
                                    <StyledListItem button>
                                        <StyledListItemText primary="Harmadfokú Egyenletek" />
                                    </StyledListItem>
                                </List>
                            </Collapse>
                            <StyledListItem button onClick={() => handleSubMenuItemClick(2)}>
                                <StyledListItemText primary="Exponenciális Függvények" />
                            </StyledListItem>
                        </List>
                    </Collapse>
                    <StyledListItem button onClick={() => handleMenuItemClick(2)}>
                        <StyledListItemText primary="Geometria" />
                    </StyledListItem>
                    <Collapse in={showSubMenu2} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                            <StyledListItem button onClick={() => handleSubMenuItemClick(3)}>
                                <StyledListItemText primary="Háromszögek" />
                            </StyledListItem>
                            <Collapse in={showSubSubMenu3} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                                    <StyledListItem button>
                                        <StyledListItemText primary="Derékszögű Háromszögek" />
                                    </StyledListItem>
                                    <StyledListItem button>
                                        <StyledListItemText primary="Egyenlőszárú Háromszögek" />
                                    </StyledListItem>
                                </List>
                            </Collapse>
                            <StyledListItem button onClick={() => handleSubMenuItemClick(4)}>
                                <StyledListItemText primary="Körök" />
                            </StyledListItem>
                        </List>
                    </Collapse>
                    <StyledListItem button onClick={() => handleMenuItemClick(3)}>
                        <StyledListItemText primary="Kalkulus" />
                    </StyledListItem>
                    <Collapse in={showSubMenu3} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                            <StyledListItem button>
                                <StyledListItemText primary="Határérték" />
                            </StyledListItem>
                            <StyledListItem button>
                                <StyledListItemText primary="Deriváltak" />
                            </StyledListItem>
                        </List>
                    </Collapse>
                    <StyledListItem button onClick={() => handleMenuItemClick(4)}>
                        <StyledListItemText primary="Statisztika" />
                    </StyledListItem>
                    <Collapse in={showSubMenu4} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                            <StyledListItem button onClick={() => handleSubMenuItemClick(4)}>
                                <StyledListItemText primary="Inferenciális Statisztika" />
                            </StyledListItem>
                        </List>
                    </Collapse>
                </List>
            </StyledDrawer>

<StyledContainer>
            <Title variant="h3">A Matematikai Fogalmakról</Title>
            
            </StyledContainer>
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
            <StyledContainer>
    <LargeText variant="body1">
        A matematika tantárgyban való szilárd megértéshez elengedhetetlen különböző matematikai fogalmak felfedezése. Ebben a keretben mélyedjünk el néhány alapvető matematikai téma tanulmányozásában.
    </LargeText>
</StyledContainer>
<StyledContainer>
    <LargeText variant="body1">
        Az algebrai kifejezések és egyenletek megértése, valamint a grafikus ábrázolásuk kulcsfontosságú a matematikai problémák hatékony megoldásához és az absztrakt gondolkodás fejlesztéséhez.
    </LargeText>
</StyledContainer>
<StyledContainer>
    <LargeText variant="body1">
        A geometria segít nekünk megismerni az alakokat, méreteket és a tér tulajdonságait. Alapvető szerepet játszik a körülöttünk lévő világ szerkezetének megértésében és az életünkben való eligazodásban.
    </LargeText>
</StyledContainer>
<StyledContainer>
    <LargeText variant="body1">
        A kalkulus, amely a határértékek és deriváltak fogalmával foglalkozik, az analízis matematikai alapja. Széles körben használják különböző tudományos területeken, és hozzájárul a változások és folyamatok mélyebb megértéséhez.
    </LargeText>
</StyledContainer>
<StyledContainer>
    <LargeText variant="body1">
        A statisztika az adatok gyűjtésével, elemzésével, értelmezésével, prezentálásával és rendezésével foglalkozik. Kulcsfontosságú a tájékozott döntéshozatalban különböző területeken, és segít a világ jelenségeinek empirikus vizsgálatában.
    </LargeText>
</StyledContainer>

           
            </>
    );
}
