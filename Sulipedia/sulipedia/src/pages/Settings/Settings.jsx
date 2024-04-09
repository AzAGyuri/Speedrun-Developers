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
  const [email, setEmail] = useState("felhasznalo@pelda.com");
  const [phoneNumber, setPhoneNumber] = useState("123-456-7890");
  const [nickname, setNickname] = useState("Felhasznalo1");
  const [formData, setFormData] = useState({
    password: "",
  });
  const [passwordError, setPasswordError] = useState(false);

  const handleEmailChange = (newEmail) => {
    setEmail(newEmail);
  };

  const handlePhoneNumberChange = (newPhoneNumber) => {
    setPhoneNumber(newPhoneNumber);
  };

  const handleNicknameChange = (newNickname) => {
    setNickname(newNickname);
  };

  const handlePasswordChange = (newPassword) => {
    setFormData((prevData) => ({ ...prevData, password: newPassword }));
  };

  useEffect(() => {
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
  }, [formData]);

  const handleSaveChanges = () => {
    if (!passwordError) {
      console.log("Changes saved:", {
        email,
        phoneNumber,
        nickname,
        password: formData.password,
      });
    } else {
      console.error("Invalid data. Please fix the validation errors.");
    }
  };

  const currentUserId = localStorage.getItem("currentUserId");
  const [userData, setUserData] = useState({
    email: "pelda@email.com",
    username: "John Doe",
    phoneNumber: "123-456-7890",
    registrationDate: "2024-03-01",
    userId: "123456789",
    profileImage: "path/to/profile-image.jpg",
  });

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
          const nickname = user.nickname === null ? user.nickname : user.username

          setEmail(user.email);
          setPhoneNumber(user.phoneNumber);
          setNickname(nickname);
        })
        .catch((error) => {
          console.error("Hiba történt adat lekérdezéskor", error);
        });
    }
    setIsLoading(false);
  }, [currentUserId, setIsLoading, isLoading]);

  return (
    <Container maxWidth="sm" style={styles.container}>
      {children}
      <Paper elevation={3} style={styles.paper}>
        <Typography variant="h4">Beállítások</Typography>
        <section className="Settings-section">
          <Typography variant="h6">Saját adatok megváltoztatása</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Avatar className="Avatar-icon" style={styles.avatar}>
                {nickname.length > 0 ? nickname[0].toUpperCase() : null}
              </Avatar>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="E-mail"
                variant="outlined"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Telefonszám"
                variant="outlined"
                value={phoneNumber}
                onChange={(e) => handlePhoneNumberChange(e.target.value)}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Becenév"
                variant="outlined"
                value={nickname}
                onChange={(e) => handleNicknameChange(e.target.value)}
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
                onChange={(e) => handlePasswordChange(e.target.value)}
                error={passwordError}
                helperText={
                  passwordError
                    ? "A jelszónak legalább 8 karakter hosszúnak kell lennie, tartalmaznia kell betűt és számot"
                    : ""
                }
                InputProps={{
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
