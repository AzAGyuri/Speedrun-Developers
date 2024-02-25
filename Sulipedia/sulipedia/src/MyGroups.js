import React, { useState } from 'react';
import {
  AppBar,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tab,
  Tabs,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FunctionsIcon from '@mui/icons-material/Functions';
import LanguageIcon from '@mui/icons-material/Language';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import HistoryIcon from '@mui/icons-material/History';

const tabData = [
  { label: '12/C Szakmai Angol', members: ['Member 1', 'Member 2', 'Member 3'] },
  { label: '12/C Matematika', members: ['Member 4', 'Member 5', 'Member 6'] },
  { label: '12/C Magyar Nyelv', members: ['Member 7', 'Member 8', 'Member 9'] },
  { label: '12/C Informatika', members: ['Member 10', 'Member 11', 'Member 12'] },
  { label: '12/C Történelem', members: ['Member 13', 'Member 14', 'Member 15'] },
];

const drawerItems = [
  { label: '12/C Szakmai Angol', color: '#ff8a65', icon: <AssignmentIcon style={{ color: 'black' }} /> },
  { label: '12/C Matematika', color: '#4caf50', icon: <FunctionsIcon style={{ color: 'black' }} /> },
  { label: '12/C Magyar Nyelv', color: '#2196f3', icon: <LanguageIcon style={{ color: 'black' }} /> },
  { label: '12/C Informatika', color: '#e91e63', icon: <DesktopWindowsIcon style={{ color: 'black' }} /> },
  { label: '12/C Történelem', color: '#ffc107', icon: <HistoryIcon style={{ color: 'black' }} /> },
];

export function MyGroups() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleGroupClick = (groupName) => {
    console.log(`Clicked on group: ${groupName}`);
    setDrawerOpen(false);
  };

  return (
    <div>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar sx={{ backgroundColor: '#3f51b5' }}>
          <IconButton
            onClick={handleDrawerToggle}
            edge="start"
            sx={{
              border: '1px solid #ccc',
              borderRadius: '4px',
              color: 'white',
              backgroundColor: '#333',
              '&:hover': {
                backgroundColor: '#333',
              },
              position: 'relative',
              zIndex: drawerOpen ? 1 : 'auto',
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 2, display: 'flex' }}>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          sx={{ display: 'flex', flexDirection: 'column', gap: '8px', backgroundColor: '#00bcd4', height: '100%' }}
        >
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            orientation="vertical"
            variant="scrollable"
            sx={{ borderRight: 1, borderColor: 'divider', minWidth: 200, display: 'flex', flexDirection: 'column', gap: '8px', height: '100%' }}
          >
            {drawerItems.map((item, index) => (
              <Tab
                label={
                  <React.Fragment>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <Typography variant="body2">{item.label}</Typography>
                    </Box>
                  </React.Fragment>
                }
                key={index}
                sx={{ color: 'black', backgroundColor: item.color, flexGrow: 1 }}
              />
            ))}
          </Tabs>
        </Drawer>
        <Box sx={{ flexGrow: 1 }}>
          {tabData.map((item, index) => (
            <TabPanel value={selectedTab} index={index} key={index}>
              <List>
                <ListItem>
                  <ListItemText primary={`Members of ${item.label}`} />
                </ListItem>
                {item.members.map((member, memberIndex) => (
                  <ListItem key={memberIndex}>
                    <ListItemText primary={member} />
                  </ListItem>
                ))}
              </List>
            </TabPanel>
          ))}
        </Box>
      </Container>
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}
