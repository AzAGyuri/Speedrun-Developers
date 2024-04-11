import React, { useState, useEffect } from "react";
import { Container, Typography, Avatar, Paper, Button } from "@mui/material";
import { Loading } from "../../components/Loading/Loading";
import axios from "axios";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import InputAdornment from '@mui/material/InputAdornment';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import LockSharpIcon from '@mui/icons-material/LockSharp';
import EmailSharpIcon from '@mui/icons-material/EmailSharp';
import BadgeIcon from '@mui/icons-material/Badge';
import NumbersIcon from '@mui/icons-material/Numbers';
import DateRangeIcon from '@mui/icons-material/DateRange';

const styles = {
  container: {
    padding: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #3494E6 0%, #EC6EAD 100%)",
    border: "5px solid #fff",
    borderRadius: "12px",
  },
  paper: {
    padding: "40px",
    borderRadius: "12px",
    border: "2px solid #ccc",
    maxWidth: "600px",
    width: "100%",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    color: "white",
  },
  avatar: {
    width: "120px",
    height: "120px",
    margin: "20px auto",
    border: "4px solid #fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "36px",
  },
  heading: {
    margin: "20px 0",
    fontWeight: "bold",
    color: "#fff",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
  },
  userInfo: {
    marginBottom: "20px",
    textAlign: "left",
  },
  infoItem: {
    margin: "10px 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #ddd",
    paddingBottom: "8px",
  },
  infoLabel: {
    marginRight: "10px",
    fontWeight: "bold",
    color: "#fff",
    display: "flex",
    alignItems: "center",
  },
  infoValue: {
    color: "#f0f0f0",
    marginLeft: "15px",
  },
  footer: {
    marginTop: "20px",
    borderTop: "1px solid #ddd",
    paddingTop: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
  },
  donateLink: {
    color: "#fff",
    fontWeight: "bold",
    textDecoration: "none",
    marginTop: "8px",
    fontSize: "18px",
  },
  footerText: {
    fontSize: "14px",
    color: "#ddd",
    marginBottom: "10px",
  },
  donateButton: {
    background: "#4caf50",
    color: "#fff",
    fontWeight: "bold",
    "&:hover": {
      background: "#388e3c",
    },
  },
};

export function MyProfile({ children, setIsLoading, isLoading }) {
  const currentUserId = localStorage.getItem("currentUserId");
  const [userData, setUserData] = useState({
    email: "pelda@email.com",
    username: "John Doe",
    phoneNumber: "123-456-7890",
    registrationDate: "2024-03-01",
    userId: "123456789",
    profileImage: "path/to/profile-image.jpg",
    randomPfPBgColor: ""
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
          let nickname = user.nickname === null ? user.username : user.nickname;
          if (user.nickname !== null) nickname = user.nickname.length === 0 ? user.username : user.nickname;
          setUserData({
            email: user.email,
            username: user.username,
            nickname: nickname,
            phoneNumber: user.phoneNumber ? user.phoneNumber : "N/A",
            registrationDate: user.createdOn.split("T")[0],
            userId: currentUserId,
            profileImage: user.profilePictureBase64,
            randomPfPBgColor: user.randomPfPBgColor,
          });
          console.log(userData);
        })
        .catch((error) => {
          console.error("Hiba történt adat lekérdezéskor", error);
        });
    }
    setTimeout(()=>{
      setIsLoading(false);
    },300);
  }, [currentUserId, setIsLoading, isLoading]);

  if (isLoading) return <Loading />;

  return (
    <Container maxWidth="lg" style={styles.container}>
      {children}
      <Paper elevation={5} style={styles.paper}>
        <Avatar style={{...styles.avatar, backgroundColor: userData.randomPfPBgColor}}>
          {userData.username.length > 0
            ? userData.username[0].toUpperCase()
            : null}
        </Avatar>
        <Typography variant="h4" style={styles.heading}>
          {`${userData.nickname}`}
        </Typography>
        <div style={styles.userInfo}>
          <div style={styles.infoItem}>
            <Typography variant="body1" style={styles.infoLabel}>
              <EmailSharpIcon></EmailSharpIcon>
              Email:
            </Typography>
            <Typography variant="body1" style={styles.infoValue}>
              {userData.email}
            </Typography>
          </div>
          <div style={styles.infoItem}>
            <Typography variant="body1" style={styles.infoLabel}>
              <BadgeIcon></BadgeIcon>
              Név:
            </Typography>
            <Typography variant="body1" style={styles.infoValue}>
              {userData.username}
            </Typography>
          </div>
          <div style={styles.infoItem}>
            <Typography variant="body1" style={styles.infoLabel}>
              <LocalPhoneIcon></LocalPhoneIcon>
              Telefonszám:
            </Typography>
            <Typography variant="body1" style={styles.infoValue}>
              {userData.phoneNumber}
            </Typography>
          </div>
          <div style={styles.infoItem}>
            <Typography variant="body1" style={styles.infoLabel}>
              <DateRangeIcon></DateRangeIcon>
              Regisztáció napja:
            </Typography>
            <Typography variant="body1" style={styles.infoValue}>
              {userData.registrationDate}
            </Typography>
          </div>
          <div style={styles.infoItem}>
            <Typography variant="body1" style={styles.infoLabel}>
              <NumbersIcon></NumbersIcon>
              ID:
            </Typography>
            <Typography variant="body1" style={styles.infoValue}>
              {userData.userId}
            </Typography>
          </div>
        </div>
        <div style={styles.footer}>
          <Typography variant="body1" style={styles.footerText}>
            Ha tetszik, amit csinálunk, támogass minket
          </Typography>
          <Button
            variant="contained"
            onClick={() =>
              window.open("https://revolut.me/krisz0925", "_blank")
            }
            style={styles.donateButton}
          >
            Donate
          </Button>
        </div>
      </Paper>
    </Container>
  );
}
