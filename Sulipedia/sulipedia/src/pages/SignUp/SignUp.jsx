import React, { useEffect, useState } from "react";
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

import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import InputAdornment from "@mui/material/InputAdornment";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import LockSharpIcon from "@mui/icons-material/LockSharp";
import EmailSharpIcon from "@mui/icons-material/EmailSharp";
import BadgeIcon from "@mui/icons-material/Badge";

const defaultTheme = createTheme();

export default function SignUp({ children, setIsLoading, jwt }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    surName: null,
    realName: null,
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: null,
  });

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [phoneLengthError, setPhoneLengthError] = useState(false);

  useEffect(() => {
    if (jwt !== null) {
      axios
        .get("/api/v1/validatetoken", {
          headers: { Authorization: jwt },
        })
        .then(() => {
          navigate("/kezdo");
          setIsLoading(true);
        })
        .catch(() => {
          console.log(
            "Token invalid a backend szerint; folytatjuk a regisztrációhoz, navigálás nem történik."
          );
        });
    }
  }, [navigate, setIsLoading, jwt]);

  const handleSubmit = (event) => {
    event.preventDefault();
    validateForm();
    if (isFormValid()) {
      const finalFormData = {
        username: formData.username,
        email: formData.email,
        passwordRaw: formData.password,
        nickname:
          formData.surName && formData.realName
            ? `${formData.surName} ${formData.realName}`
            : null,
        phoneNumber: formData.phone,
      };
      axios
        .post("/api/v1/register", finalFormData)
        .then((response) => {
          localStorage.setItem("jwt", `Bearer ${response.headers.jwt}`);
          localStorage.setItem("currentUserId", response.data.id);
          setIsLoading(true);
          navigate("/kezdo");
        })
        .catch((error) => {
          let errorCode = error.config.data.status;
          console.error("Profil létrehozása sikertelen:", error);
          alert("Profil létrehozása sikertelen:", error);
          switch (errorCode) {
            case 409:
              alert(
                "Regisztráció sikertelen! A felhasználónév és/vagy email cím már foglalt!"
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
    const { name, value } = event.target;
    let formattedValue = value;

    if (name === "phone" || name === "password") {
      if (value.length === 0) {
        formattedValue = null;
      } else if (name === "phone") {
        formattedValue = value.replace(/\D/g, "");
        if (formattedValue.length > 11) {
          setPhoneLengthError(true);
          formattedValue = formattedValue.substring(0, 11);
        } else {
          setPhoneLengthError(false);
          formattedValue = formattedValue.substring(0, formattedValue.length);
        }

        if (formattedValue.length > 2) {
          formattedValue = `${formattedValue.substring(
            0,
            2
          )} ${formattedValue.substring(2)}`;
        }
        if (formattedValue.length > 5) {
          formattedValue = `${formattedValue.substring(
            0,
            5
          )} ${formattedValue.substring(5)}`;
        }
        if (formattedValue.length > 9) {
          formattedValue = `${formattedValue.substring(
            0,
            9
          )} ${formattedValue.substring(9)}`;
        }
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: formattedValue,
    }));
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
      case "username":
        setUsernameError(false);
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

    const passwordRegex = /^(?=.*[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setPasswordError(true);
    }
    if (!formData.password === formData.confirmPassword) {
      setPasswordError(true);
    }

    if (formData.username.length < 3) {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }

    if (
      formData.phone &&
      !(formData.phone.length > 13 && formData.phone.length < 15)
    ) {
      setPhoneError(true);
    }
  };

  const isFormValid = () => {
    return (
      !emailError &&
      !passwordError &&
      !usernameError &&
      !phoneError &&
      formData.password === formData.confirmPassword
    );
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {children}
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
            <Tooltip
              placement="top"
              title="Ez egy biztonságos létrehozási felület"
            >
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
                <Grid item xs={12}>
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BadgeIcon></BadgeIcon>
                        </InputAdornment>
                      ),
                    }}
                    required
                    fullWidth
                    name="username"
                    id="username"
                    label="Felhasználó név"
                    autoFocus
                    variant="outlined"
                    value={formData.username}
                    error={usernameError}
                    helperText={
                      usernameError
                        ? "A felhasználó névnek legalább 3 karakter hosszúnak kell lennie."
                        : ""
                    }
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BadgeIcon></BadgeIcon>
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                    id="lastName"
                    label="Vezetéknév (opcionális)"
                    name="surName"
                    minLength={3}
                    value={formData.surName}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BadgeIcon></BadgeIcon>
                        </InputAdornment>
                      ),
                    }}
                    name="realName"
                    fullWidth
                    id="firstName"
                    label="Keresztnév (opcionális)"
                    autoFocus
                    minLength={3}
                    value={formData.realName}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailSharpIcon></EmailSharpIcon>
                        </InputAdornment>
                      ),
                    }}
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
                        ? "A jelszónak legalább 8 karakter hosszúnak kell lennie, tartalmaznia kell betűket és számokat"
                        : ""
                    }
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockSharpIcon />
                        </InputAdornment>
                      ),
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
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EnhancedEncryptionIcon></EnhancedEncryptionIcon>
                        </InputAdornment>
                      ),
                    }}
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
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocalPhoneIcon></LocalPhoneIcon>
                        </InputAdornment>
                      ),
                      maxLength: 11,
                    }}
                    name="phone"
                    label="Telefonszám (opcionális) (06)"
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    error={phoneError}
                    helperText={
                      phoneError
                        ? "Érvénytelen telefonszám (11 számjegy szükséges)"
                        : phoneLengthError
                        ? "A telefonszám nem lehet hosszabb 11 karakternél"
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
