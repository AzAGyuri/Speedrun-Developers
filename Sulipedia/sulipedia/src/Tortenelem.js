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
  borderBottom: '1px solid #7ffc03', // Green border
});

const StyledListItemText = styled(ListItemText)({
  color: 'white',
});

const StyledDivider = styled(Divider)({
  backgroundColor: '#7ffc03', 
});

export function Tortenelem() {
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
                    <ListItem button onClick={() => handleMenuItemClick(1)}>
                        <ListItemText primary="Az őskor" />
                    </ListItem>
                    <Collapse in={showSubMenu1} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                            <ListItem button onClick={() => handleSubMenuItemClick(1)}>
                                <ListItemText primary="Az őskori civilizációk" />
                            </ListItem>
                            <Collapse in={showSubSubMenu1} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                                    <ListItem button>
                                        <ListItemText primary="Az Egyiptomi civilizáció" />
                                    </ListItem>
                                    <ListItem button>
                                        <ListItemText primary="A Mezopotámiai civilizáció" />
                                    </ListItem>
                                </List>
                            </Collapse>
                            <ListItem button onClick={() => handleSubMenuItemClick(2)}>
                                <ListItemText primary="Az őskori hatalmak" />
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem button onClick={() => handleMenuItemClick(2)}>
                        <ListItemText primary="A középkor" />
                    </ListItem>
                    <Collapse in={showSubMenu2} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                            <ListItem button onClick={() => handleSubMenuItemClick(3)}>
                                <ListItemText primary="A feudális rendszer" />
                            </ListItem>
                            <Collapse in={showSubSubMenu3} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                                    <ListItem button>
                                        <ListItemText primary="Az Angol kereszténység" />
                                    </ListItem>
                                    <ListItem button>
                                        <ListItemText primary="Az Arab birodalom" />
                                    </ListItem>
                                </List>
                            </Collapse>
                            <ListItem button onClick={() => handleSubMenuItemClick(4)}>
                                <ListItemText primary="A keresztes háborúk" />
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem button onClick={() => handleMenuItemClick(3)}>
                        <ListItemText primary="A kora újkor" />
                    </ListItem>
                    <Collapse in={showSubMenu3} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                            <ListItem button>
                                <ListItemText primary="Az európai felfedezések" />
                            </ListItem>
                            <ListItem button>
                                <ListItemText primary="A reformáció" />
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem button onClick={() => handleMenuItemClick(4)}>
                        <ListItemText primary="A modern kor" />
                    </ListItem>
                    <Collapse in={showSubMenu4} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                            <ListItem button onClick={() => handleSubMenuItemClick(4)}>
                                <ListItemText primary="Az ipari forradalom" />
                            </ListItem>
                            <Collapse in={showSubSubMenu4} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                                    <ListItem button>
                                        <ListItemText primary="A francia forradalom" />
                                    </ListItem>
                                </List>
                            </Collapse>
                            <ListItem button>
                                <ListItemText primary="Az első és második világháború" />
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
            </StyledDrawer>
            <StyledContainer>
                <Title variant="h3">A Történelemről</Title>
            </StyledContainer>
            <StyledContainer>
                <LargeText variant="body1">
                    A történelem tantárgy során a diákoknak lehetőségük nyílik felfedezni és megérteni különböző időszakokat és eseményeket. Az őskortól a modern korig terjedő témák segítenek abban, hogy mélyebb betekintést nyerjenek a világ múltjába.
                </LargeText>
            </StyledContainer>
            <StyledContainer>
                <LargeText variant="body1">
                    Az őskori civilizációk és hatalmak tanulmányozása lehetővé teszi a diákok számára, hogy megismerjék azokat az alapvető tényezőket, amelyek formálták az emberiség korai történetét. Az egyes korszakok és birodalmak részletes vizsgálata hozzájárul a diákok történelmi tudásához.
                </LargeText>
            </StyledContainer>
            <StyledContainer>
                <LargeText variant="body1">
                    A középkor témakörei segítenek a diákoknak megérteni a feudális rendszert, az egyes vallások terjedését és a korszak fontos eseményeit. A keresztes háborúk és a középkori Európa sokszínű kulturális és politikai kontextusát ismerve mélyebb megértésre tesznek szert.
                </LargeText>
            </StyledContainer>
            <StyledContainer>
                <LargeText variant="body1">
                    A kora újkor fókuszában az európai felfedezések és a reformáció állnak, amelyek átalakították a korszakot. A diákok ezen események tanulmányozásával megismerik az új világ térképét és a vallási változások hatásait.
                </LargeText>
            </StyledContainer>
            <StyledContainer>
                <LargeText variant="body1">
                    A modern kor témái között az ipari forradalom, a francia forradalom és a világháborúk szerepelnek. Ezek a témák lehetővé teszik a diákok számára, hogy megértsék a társadalmi, gazdasági és politikai változásokat, amelyek meghatározták a 19. és 20. század történelmét.
                </LargeText>
            </StyledContainer>
        </>
    );
}
