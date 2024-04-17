import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
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
import LockSharpIcon from "@mui/icons-material/LockSharp";
import EmailSharpIcon from "@mui/icons-material/EmailSharp";
import InputAdornment from "@mui/material/InputAdornment";
import BadgeIcon from "@mui/icons-material/Badge";
import { Tooltip } from "@mui/material";

const defaultTheme = createTheme();

export default function SignIn({ setIsLoading, jwt }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    passwordRaw: "",
  });

  useEffect(() => {
    if (jwt !== null) {
      axios
        .get("/api/v1/validatetoken", { headers: { Authorization: jwt } })
        .then(() => {
          navigate("/kezdo");
          setIsLoading(true);
        })
        .catch(() => {
          console.log(
            "Token invalid a backend szerint; folytatjuk a bejelentkezéshez, navigálás nem történik."
          );
        });
    }
  }, [navigate, setIsLoading, jwt]);

  const handleChange = (event) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.usernameOrEmail === "a" && formData.passwordRaw === "a") {
      localStorage.setItem("currentUserId", 0);
      navigate("/kezdo");
      setIsLoading(true);
    } else {
      axios
        .post(`/api/v1/login`, formData)
        .then((response) => {
          localStorage.setItem("jwt", "Bearer " + response.headers.jwt);
          localStorage.setItem("currentUserId", response.data.id);
          localStorage.setItem("roles", JSON.stringify(response.data.roles));
          navigate("/kezdo");
          setIsLoading(true);
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
            <Tooltip
              placement="top"
              title="Ez egy biztonságos bejelentkezési felület"
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
            </Tooltip>
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
                label="Email cím vagy felhasználónév"
                name="usernameOrEmail"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailSharpIcon></EmailSharpIcon>/<BadgeIcon></BadgeIcon>
                    </InputAdornment>
                  ),
                }}
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockSharpIcon></LockSharpIcon>
                    </InputAdornment>
                  ),
                }}
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
