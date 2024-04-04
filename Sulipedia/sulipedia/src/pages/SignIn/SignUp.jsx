import React, { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./SignUp.css";
import { Tooltip } from "@mui/material";

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    allowExtraEmails: false,
  });

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    validateForm();
    if (isFormValid()) {
      const finalFormData = {
        userName: formData.firstName + formData.lastName,
        email: formData.email,
        passwordRaw: formData.password,
        nickname: formData.nickname,
        phoneNumber: formData.phone,
      };
      axios
        .post("/register", finalFormData)
        .then((response) => {
          localStorage.setItem("Authorization", response.headers.jwt);
          localStorage.setItem("loginAuth", "true");
          navigate("/kezdo");
          window.location.reload();
        })
        .catch((error) => {
          let errorCode = error.config.data.status;
          console.error("Profil létrehozása sikertelen:", error);
          switch (errorCode) {
            case 409:
              alert(
                "Regisztráció sikertelen!\nIndok: a felhasználónév és/vagy email cím már foglalt!"
              );
              break;
            case 500:
              alert(
                "Váratlan belső hiba történt, kérjük próbálja újra később."
              );
              break;
            default:
              break;
          }
        });
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Reset error state when the user types
    resetErrorState(name);
  };

  const resetErrorState = (name) => {
    switch (name) {
      case "email":
        setEmailError(false);
        break;
      case "password":
        setPasswordError(false);
        break;
      case "lastName":
        setLastNameError(false);
        break;
      case "firstName":
        setFirstNameError(false);
        break;
      case "phone":
        setPhoneError(false);
        break;
      case "confirmPassword":
        setPasswordError(false);
        break;
      default:
        break;
    }
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setEmailError(true);
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setPasswordError(true);
    }

    if (formData.lastName.length < 2) {
      setLastNameError(true);
    }

    if (formData.firstName.length < 3) {
      setFirstNameError(true);
    }

    const phoneRegex = /^\d{11}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      setPhoneError(true);
    }

    if (formData.password !== formData.confirmPassword) {
      setPasswordError(true);
    }
  };

  const isFormValid = () => {
    return (
      !emailError &&
      !passwordError &&
      !lastNameError &&
      !firstNameError &&
      !phoneError &&
      formData.password === formData.confirmPassword
    );
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="SignUp">
        <Container component="main" maxWidth="xs" className="signup-container">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              padding: "24px",
            }}
            className="signup-form"
          >
            <Tooltip title="Ez egy biztonságos létrehozási felület">
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
            </Tooltip>
            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
              Profil létrehozása
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
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
                    helperText={
                      lastNameError
                        ? "Vezetéknév legalább 3 karakter hosszú kell legyen"
                        : ""
                    }
                    variant="outlined"
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
                    helperText={
                      firstNameError
                        ? "Keresztnév legalább 3 karakter hosszú kell legyen"
                        : ""
                    }
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="Becenév"
                    fullWidth
                    id="Nickname"
                    label="Becenév (opcionális)"
                    autoFocus
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={emailError}
                    helperText={emailError ? "Érvénytelen e-mail cím" : ""}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Jelszó"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    error={passwordError}
                    helperText={
                      passwordError
                        ? "A jelszónak legalább 8 karakter hosszúnak kell lennie, tartalmaznia kell kis- és nagybetűt, számot, valamint speciális karaktert (@$!%*?&)"
                        : ""
                    }
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <Link
                          onClick={handleTogglePasswordVisibility}
                          style={{ cursor: "pointer" }}
                        >
                          {showPassword ? (
                            <Tooltip title="Ne látszódjon a jelszó">
                              {" "}
                              <Visibility />{" "}
                            </Tooltip>
                          ) : (
                            <Tooltip title="Látszódjon a jelszó">
                              {" "}
                              <VisibilityOff />{" "}
                            </Tooltip>
                          )}
                        </Link>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Jelszó újra"
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={passwordError}
                    helperText={
                      passwordError
                        ? "A jelszónak egyeznie kell és a megadott feltételeknek teljesülni!"
                        : ""
                    }
                    variant="outlined"
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
                    helperText={
                      phoneError
                        ? "Érvénytelen telefonszám (11 számjegy szükséges)"
                        : ""
                    }
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                className="submit-button"
              >
                Profil létrehozása
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/SignIn" variant="body2" className="signin-link">
                    Már van profilod? Jelentkezz be!
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}
