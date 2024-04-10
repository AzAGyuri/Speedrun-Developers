import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Avatar,
  Link,
} from "@mui/material";
import "./Settings.css";
import { Loading } from "../../components/Loading/Loading";
import axios from "axios";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import EmailSharpIcon from "@mui/icons-material/EmailSharp";
import BadgeIcon from "@mui/icons-material/Badge";
import InputAdornment from "@mui/material/InputAdornment";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  paper: {
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    color: "white",
    maxWidth: "600px",
    width: "100%",
    border: "2px solid #fff",
  },
  avatar: {
    width: "50px",
    height: "50px",
    marginRight: "8px",
    border: "2px solid #fff",
  },
  passwordField: {
    width: "100%",
    marginBottom: "20px",
    border: "2px solid #fff",
    borderRadius: "4px",
  },
  saveButton: {
    marginTop: "20px",
    background: "#2ecc71",
    "&:hover": {
      background: "#27ae60",
    },
    border: "2px solid #fff",
    borderRadius: "4px",
  },
};

export function Settings({ children, setIsLoading, isLoading }) {
  const navigate = useNavigate();
  const [phoneLengthError, setPhoneLengthError] = useState(false);
  const [randomPfPBgColor, setRandomPfPBgColor] = useState("#bdbdbd");
  const [formData, setFormData] = useState({
    email: null,
    phoneNumber: null,
    nickname: null,
    password: null,
  });
  const [passwordError, setPasswordError] = useState(false);
  const [avatar, setAvatar] = useState("");

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    let formattedValue = value;
    console.log("HERE");

    if (name === "phoneNumber" || name === "password" || name === "nickname") {
      if (value.length === 0) {
        formattedValue = null;
      } else if (name === "phoneNumber") {
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
    setFormData((oldData) => ({
      ...oldData,
      [name]: formattedValue,
    }));
    console.log(formattedValue);
    console.log(formData);
  };

  useEffect(() => {
    if (formData.password !== null) {
      if (formData.password.length !== 0) {
        if (
          formData.password.length < 8 ||
          !/\d/.test(formData.password) ||
          !/[a-zA-Z]/.test(formData.password)
        ) {
          setPasswordError(true);
        } else {
          setPasswordError(false);
        }
      } else {
        setPasswordError(false);
      }
    }
  }, [formData.password]);

  const handleSaveChanges = () => {
    const requestData = {
      nickname: formData.nickname,
      email: formData.email,
      passwordRaw: formData.password,
      phoneNumber: formData.phoneNumber,
    };
    console.log(localStorage.getItem('jwt'));
    if (!passwordError) {
      axios.put(`/user`, requestData, {
        headers: {
          Authorization: localStorage.getItem("jwt").trim(),
        },
      })
      .then((response) => {
        console.log("Felhasználói adatok sikeresen frissítve:", response.data);
        setIsLoading(true);
        navigate("/MyProfile");
      })
      .catch((error) => {
        console.log(requestData);
        console.error("Hiba történt a felhasználói adatok frissítése közben:", error);
      });
      
    }
  };

  const currentUserId = localStorage.getItem("currentUserId");

  useEffect(() => {
    if (currentUserId !== 0) {
      axios
        .request({
          method: "GET",
          url: `/user/${currentUserId}`,
          headers: {
            Authorization: localStorage.getItem("jwt"),
          },
        })
        .then((response) => {
          const user = response.data;
          setFormData((prevData) => ({
            ...prevData,
            email: user.email,
            nickname: user.nickname,
            phoneNumber: user.phoneNumber,
          }));
          setRandomPfPBgColor(user.randomPfPBgColor);
          setAvatar(
            user.nickname !== null
              ? user.nickname.length === 0
                ? user.username
                : user.nickname
              : user.username
          );
          console.log(formData, avatar);
        })
        .catch((error) => {
          console.error("Hiba történt adat lekérdezéskor", error);
        });
    }
    setIsLoading(false);
  }, [currentUserId, setIsLoading, isLoading]);

  if (isLoading) return <Loading />;

  return (
    <Container maxWidth="sm" style={styles.container}>
      {children}
      <Paper elevation={3} style={styles.paper}>
        <Typography variant="h4">Beállítások</Typography>
        <section className="Settings-section">
          <Typography variant="h6">Saját adatok megváltoztatása</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Avatar
                className="Avatar-icon"
                style={{ ...styles.avatar, backgroundColor: randomPfPBgColor }}
              >
                {avatar.length > 0 ? avatar[0].toUpperCase() : null}
              </Avatar>
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
                label="E-mail megváltoztatása"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalPhoneIcon></LocalPhoneIcon>
                    </InputAdornment>
                  ),
                }}
                label="Telefonszám megváltoztatása"
                variant="outlined"
                name="phoneNumber"
                error={false}
                value={formData.phoneNumber}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                helperText={
                  phoneLengthError
                    ? "A telefonszám nem lehet hosszabb 11 karakternél"
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeIcon></BadgeIcon>
                    </InputAdornment>
                  ),
                }}
                label="Becenév megváltoztatása"
                variant="outlined"
                value={formData.nickname}
                name="nickname"
                onChange={handleFormChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="password"
                label="Jelszó megváltoztatása"
                type="text"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleFormChange}
                error={passwordError}
                helperText={
                  passwordError
                    ? "A jelszónak legalább 8 karakter hosszúnak kell lennie, tartalmaznia kell betűt és számot"
                    : ""
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EnhancedEncryptionIcon></EnhancedEncryptionIcon>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <Link onClick={() => {}} style={{ cursor: "pointer" }}>
                      {""}
                    </Link>
                  ),
                }}
                FormHelperTextProps={{
                  style: {
                    color: "#8B0000",
                    fontSize: "13px",
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: passwordError ? "#8B0000" : "black",
                  },
                }}
              />
            </Grid>
          </Grid>
        </section>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveChanges}
          style={styles.saveButton}
        >
          Változások mentése
        </Button>
      </Paper>
    </Container>
  );
}
