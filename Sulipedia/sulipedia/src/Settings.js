// Settings.js
import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Container,
  Typography,
  Paper,
  Radio,
  Checkbox,
  TextField,
  Button,
} from '@mui/material';
import './Settings.css';

const themeLight = createTheme({
  palette: {
    mode: 'light',
  },
});

const themeDark = createTheme({
  palette: {
    mode: 'dark',
  },
});

const themeBlue = createTheme({
  palette: {
    primary: {
      main: '#2196f3', // Blue color
    },
  },
});

const themeGreen = createTheme({
  palette: {
    primary: {
      main: '#4caf50', // Green color
    },
  },
});

const themePurple = createTheme({
  palette: {
    primary: {
      main: '#673ab7', // Purple color
    },
  },
});

const themeOrange = createTheme({
  palette: {
    primary: {
      main: '#ff9800', // Orange color
    },
  },
});

const themeRed = createTheme({
  palette: {
    primary: {
      main: '#f44336', // Red color
    },
  },
});

const themeYellow = createTheme({
  palette: {
    primary: {
      main: '#ffeb3b', // Yellow color
    },
  },
});

const themeCyan = createTheme({
  palette: {
    primary: {
      main: '#00bcd4', // Cyan color
    },
  },
});

export function Settings() {
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);
  const [email, setEmail] = useState('felhasznalo@pelda.com');
  const [phoneNumber, setPhoneNumber] = useState('123-456-7890');
  const [nickname, setNickname] = useState('Felhasznalo1');

  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const handleNotificationsChange = () => {
    setNotifications(!notifications);
  };

  const handleEmailChange = (newEmail) => {
    setEmail(newEmail);
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!emailRegex.test(newEmail));
  };

  const handlePhoneNumberChange = (newPhoneNumber) => {
    setPhoneNumber(newPhoneNumber);
    // Validate phone number length
    setPhoneError(newPhoneNumber.length !== 11);
  };

  const handleNicknameChange = (newNickname) => {
    setNickname(newNickname);
  };

  const handleSaveChanges = () => {
    // Perform save logic here, for example, sending data to a server or storing in local storage
    if (!emailError && !phoneError) {
      console.log('Changes saved:', { theme, notifications, email, phoneNumber, nickname });
    } else {
      console.error('Invalid data. Please fix the validation errors.');
    }
  };

  // useEffect to apply theme class to the body element
  useEffect(() => {
    document.body.className = theme + '-theme';
  }, [theme]);

  return (
    <ThemeProvider theme={getThemeObject(theme)}>
      <Container component="div" maxWidth="sm" className="Settings-container">
        <Paper elevation={3} className="Settings-paper">
          <Typography variant="h4">Beállítások</Typography>
          <section className="Settings-section">
            <Typography variant="h6">Téma</Typography>
            <div className="Theme-grid">
              {renderThemeOption('light', 'Világos', theme, setTheme)}
              {renderThemeOption('dark', 'Sötét', theme, setTheme)}
              {renderThemeOption('blue', 'Kék', theme, setTheme)}
              {renderThemeOption('green', 'Zöld', theme, setTheme)}
              {renderThemeOption('purple', 'Lila', theme, setTheme)}
              {renderThemeOption('orange', 'Narancs', theme, setTheme)}
              {renderThemeOption('red', 'Piros', theme, setTheme)}
              {renderThemeOption('cyan', 'Cián', theme, setTheme)}
            </div>
          </section>
          <section className="Settings-section">
            <Typography variant="h6">Értesítések</Typography>
            <Checkbox checked={notifications} onChange={handleNotificationsChange} color="primary" />
            <Typography variant="body2">Értesítések engedélyezése</Typography>
          </section>
          <section className="Settings-section">
            <Typography variant="h6">Saját adatok megváltoztatása</Typography>
            <TextField
              label="E-mail"
              variant="outlined"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              fullWidth
              margin="normal"
              error={emailError}
              helperText={emailError ? 'Érvénytelen e-mail cím' : ''}
            />
            <TextField
              label="Telefonszám"
              variant="outlined"
              value={phoneNumber}
              onChange={(e) => handlePhoneNumberChange(e.target.value)}
              fullWidth
              margin="normal"
              error={phoneError}
              helperText={phoneError ? 'A telefonszám hossza pontosan 11 karakter kell legyen' : ''}
            />
            <TextField
              label="Becenév"
              variant="outlined"
              value={nickname}
              onChange={(e) => handleNicknameChange(e.target.value)}
              fullWidth
              margin="normal"
            />
          </section>
          <Button variant="contained" color="primary" onClick={handleSaveChanges}>
            Változások mentése
          </Button>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

function renderThemeOption(themeKey, themeLabel, currentTheme, setThemeFunction) {
  return (
    <label key={themeKey}>
      {themeLabel}
      <Radio
        value={themeKey}
        checked={currentTheme === themeKey}
        onChange={() => setThemeFunction(themeKey)}
      />
    </label>
  );
}

function getThemeObject(selectedTheme) {
  switch (selectedTheme) {
    case 'light':
      return themeLight;
    case 'dark':
      return themeDark;
    case 'blue':
      return themeBlue;
    case 'green':
      return themeGreen;
    case 'purple':
      return themePurple;
    case 'orange':
      return themeOrange;
    case 'red':
      return themeRed;
    case 'cyan':
      return themeCyan;
    default:
      return themeLight;
  }
}
