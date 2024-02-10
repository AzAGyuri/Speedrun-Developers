import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function SignUp() {
  const [formData, setFormData] = React.useState({
    lastName: '',
    firstName: '',
    nickname: '',
    email: '',
    password: '',
    phone: '',
    allowExtraEmails: false,
  });

  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [lastNameError, setLastNameError] = React.useState(false);
  const [firstNameError, setFirstNameError] = React.useState(false);
  const [phoneError, setPhoneError] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    validateForm();
    if (isFormValid()) {
      console.log(formData);
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (name === 'email') {
      setEmailError(false);
    } else if (name === 'password') {
      setPasswordError(false);
    } else if (name === 'lastName') {
      setLastNameError(false);
    } else if (name === 'firstName') {
      setFirstNameError(false);
    } else if (name === 'phone') {
      setPhoneError(false);
    }
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setEmailError(true);
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setPasswordError(true);
    }

    if (formData.lastName.length < 3) {
      setLastNameError(true);
    }

    if (formData.firstName.length < 3) {
      setFirstNameError(true);
    }

    const phoneRegex = /^\d{11}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      setPhoneError(true);
    }
  };

  const isFormValid = () => {
    return !emailError && !passwordError && !lastNameError && !firstNameError && !phoneError;
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Profil létrehozása
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Vezetéknév"
                  name="lastName"
                  autoComplete="family-name"
                  minLength={3}
                  value={formData.lastName}
                  onChange={handleChange}
                  error={lastNameError}
                  helperText={lastNameError ? 'A vezetéknév legalább 3 karakter hosszú kell legyen' : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Keresztnév"
                  autoFocus
                  minLength={3}
                  value={formData.firstName}
                  onChange={handleChange}
                  error={firstNameError}
                  helperText={firstNameError ? 'A keresztnév legalább 3 karakter hosszú kell legyen' : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="nickname"
                  fullWidth
                  id="Nickname"
                  label="Becenév (opcionális)"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={emailError}
                  helperText={emailError ? 'Érvénytelen e-mail cím' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  error={passwordError}
                  helperText={
                    passwordError
                      ? 'A jelszónak legalább 8 karakter hosszúnak kell lennie, tartalmaznia kell kis- és nagybetűt, számot, valamint speciális karaktert (@$!%*?&)'
                      : ''
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="phone"
                  label="Telefonszám (opcionális)"
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={phoneError}
                  helperText={phoneError ? 'Érvénytelen telefonszám (11 számjegy szükséges)' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Szeretnék hasznos e-maileket kapni új tananyagokról és hasonlókról"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Profil létrehozása
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="SignIn.js" variant="body2">
                  Már van profilod? Jelentkezz be!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="Api.js">
            Sulipedia
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </ThemeProvider>
  );
}
