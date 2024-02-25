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

export function Magyar() {
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
                        <StyledListItemText primary="Az irodalmi műfajok" />
                    </StyledListItem>
                    <Collapse in={showSubMenu1} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                            <StyledListItem button onClick={() => handleSubMenuItemClick(1)}>
                                <StyledListItemText primary="Az epika" />
                            </StyledListItem>
                            <Collapse in={showSubSubMenu1} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                                    <StyledListItem button>
                                        <StyledListItemText primary="Az eposz" />
                                    </StyledListItem>
                                    <StyledListItem button>
                                        <StyledListItemText primary="A regény" />
                                    </StyledListItem>
                                </List>
                            </Collapse>
                            <StyledListItem button onClick={() => handleSubMenuItemClick(2)}>
                                <StyledListItemText primary="A líra" />
                            </StyledListItem>
                        </List>
                    </Collapse>
                    <StyledListItem button onClick={() => handleMenuItemClick(2)}>
                        <StyledListItemText primary="A nyelvtan és a helyesírás" />
                    </StyledListItem>
                    <Collapse in={showSubMenu2} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                            <StyledListItem button onClick={() => handleSubMenuItemClick(3)}>
                                <StyledListItemText primary="A mondat és a szöveg" />
                            </StyledListItem>
                            <Collapse in={showSubSubMenu3} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                                    <StyledListItem button>
                                        <StyledListItemText primary="Az összetett mondatok" />
                                    </StyledListItem>
                                    <StyledListItem button>
                                        <StyledListItemText primary="Az idéző mondatok" />
                                    </StyledListItem>
                                </List>
                            </Collapse>
                            <StyledListItem button onClick={() => handleSubMenuItemClick(4)}>
                                <StyledListItemText primary="A helyesírási szabályok" />
                            </StyledListItem>
                        </List>
                    </Collapse>
                    <StyledListItem button onClick={() => handleMenuItemClick(3)}>
                        <StyledListItemText primary="A magyar irodalom története" />
                    </StyledListItem>
                    <Collapse in={showSubMenu3} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                            <StyledListItem button>
                                <StyledListItemText primary="A középkori irodalom" />
                            </StyledListItem>
                            <StyledListItem button>
                                <StyledListItemText primary="A reneszánsz irodalom" />
                            </StyledListItem>
                        </List>
                    </Collapse>
                    <StyledListItem button onClick={() => handleMenuItemClick(4)}>
                        <StyledListItemText primary="A kommunikáció és a nyelvhasználat" />
                    </StyledListItem>
                    <Collapse in={showSubMenu4} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                            <StyledListItem button onClick={() => handleSubMenuItemClick(4)}>
                                <StyledListItemText primary="Az érvelési és meggyőzési technikák" />
                            </StyledListItem>
                            <Collapse in={showSubSubMenu4} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                                    <StyledListItem button>
                                        <StyledListItemText primary="Az érvelés logikája" />
                                    </StyledListItem>
                                </List>
                            </Collapse>
                            <StyledListItem button>
                                <StyledListItemText primary="A közlési formák" />
                            </StyledListItem>
                        </List>
                    </Collapse>
                </List>
            </StyledDrawer>
            <StyledContainer>
                <Title variant="h3">A Magyar Nyelvről</Title>
            </StyledContainer>
            <StyledContainer>
                <LargeText variant="body1">
                    A magyar nyelv és irodalom tantárgy fontos része az oktatásnak. Az irodalmi műfajok megismerése és a nyelvtan
                    szabályainak elsajátítása segít a diákoknak széleskörű szövegértési és kommunikációs készségek kialakításában.
                </LargeText>
            </StyledContainer>
            <StyledContainer>
                <LargeText variant="body1">
                    A nyelvtan és a helyesírás tanulása során a diákok megtanulják a helyes mondatelemzést, a helyes szórendet,
                    és a helyesírási szabályok alkalmazását. Ez nélkülözhetetlen a megfelelő és érthető írásbeli kommunikációhoz.
                </LargeText>
            </StyledContainer>
            <StyledContainer>
                <LargeText variant="body1">
                    A magyar irodalom történetének megismerése során a diákok bepillantást nyernek a különböző korszakok
                    irodalmi alkotásaiba, megismerik azokat az eszközöket, amelyeket az írók alkalmaztak, és értelmezni tudják a
                    műveket a történelmi és kulturális kontextusban.
                </LargeText>
            </StyledContainer>
            <StyledContainer>
                <LargeText variant="body1">
                    A kommunikáció és a nyelvhasználat tantárgyban a diákok olyan készségeket sajátíthatnak el, mint az
                    érvelés, a meggyőzés és a hatékony közlés. Ez segíti őket abban, hogy tudatosan és hatékonyan kommunikáljanak
                    különböző helyzetekben.
                </LargeText>
            </StyledContainer>
            <StyledContainer>
    <LargeText variant="body1">
        A magyar nyelv és irodalom tantárgy meghatározó eleme az oktatásnak, hiszen segít a diákoknak kialakítani széleskörű szövegértési és kommunikációs készségeiket. Az irodalmi műfajok megismerése révén a diákok nemcsak kulturális kincsekre lelnek, hanem fejlesztik kritikai gondolkodásukat is.
    </LargeText>
</StyledContainer>
<StyledContainer>
    <LargeText variant="body1">
        A nyelvtan és helyesírás tanulása során a diákok elsajátítják a helyes mondatelemzés, a helyes szórend és a helyesírási szabályok alkalmazását. Ezek az ismeretek nélkülözhetetlenek a megfelelő és érthető írásbeli kommunikációhoz.
    </LargeText>
</StyledContainer>
<StyledContainer>
    <LargeText variant="body1">
        A magyar irodalom történetének tanulmányozása során a diákok betekintést nyernek a különböző korszakok művészi alkotásaiba, és megtanulják azokat történelmi és kulturális kontextusukban értelmezni.
    </LargeText>
</StyledContainer>
<StyledContainer>
    <LargeText variant="body1">
        A kommunikáció és a nyelvhasználat tantárgy segíti a diákokat az érvelés, a meggyőzés és a hatékony közlés készségeinek fejlesztésében. Ezen készségek különböző élethelyzetekben és szakmai területeken is hasznosak, hozzájárulva a diákok sikeres és tudatos kommunikációjához.
    </LargeText>
</StyledContainer>

        </>
    );
}
