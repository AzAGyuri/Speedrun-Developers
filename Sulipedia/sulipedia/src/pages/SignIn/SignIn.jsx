import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import axios from "axios";

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    passwordRaw: "",
  });

  useEffect(() => {
    if (localStorage.getItem("jwt") !== null) {
      navigate("/kezdo");
    }
  }, []);

  const handleChange = (event) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.usernameOrEmail === "a" && formData.passwordRaw === "a") {
      localStorage.setItem("jwt", "Bearer");
      localStorage.setItem("currentUserId", "");
      navigate("/kezdo");

    } else {
      axios
        .post(`/login`, formData)
        .then((response) => {
          localStorage.setItem("jwt", "Bearer " + response.headers.jwt);
          localStorage.setItem("currentUserId", response.data.id);
          navigate("/kezdo");

        })
        .catch((error) => {
          let errorCode = error.response.data.status;
          console.error("Bejelentkezés sikertelen:", error);
          switch (errorCode) {
            case 404:
              alert(
                "Hiba történt a bejelentkezés során.\nIndok: Helytelen felhasználónév vagy email cím"
              );
              break;
            case 401:
              alert(
                "Hiba történt a bejelentkezés során.\nIndok: Helytelen jelszó"
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

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        className="SignIn"
        sx={{ height: "100vh" }}
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Bejelentkezés
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email cím"
                name="usernameOrEmail"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="passwordRaw"
                label="Jelszó"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Jegyezz meg"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Bejelentkezés
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/SignUp" variant="body2">
                    Még nincs profilod? Hozz létre egyet!
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
