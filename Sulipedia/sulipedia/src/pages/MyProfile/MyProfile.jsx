import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Avatar,
  Paper,
  Button,
  useMediaQuery,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Loading } from "../../components/Loading/Loading";
import axios from "axios";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailSharpIcon from "@mui/icons-material/EmailSharp";
import BadgeIcon from "@mui/icons-material/Badge";
import NumbersIcon from "@mui/icons-material/Numbers";
import DateRangeIcon from "@mui/icons-material/DateRange";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    padding: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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

export function MyProfile({
  children,
  setIsLoading,
  isLoading,
  jwt,
  currentUserId,
}) {
  const [userData, setUserData] = useState({
    email: "pelda@email.com",
    username: "John Doe",
    phoneNumber: "123-456-7890",
    nickname: "Jani",
    registrationDate: "2024-03-01 12:00:00",
    userId: "123456789",
    profileImage: "path/to/profile-image.jpg",
    randomAvatarBgColor: "",
  });
  const isSmallScreen = useMediaQuery("(max-width:950px)");
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUserId !== 0) {
      axios
        .get(`/api/v1/user/${currentUserId}`, {
          headers: { Authorization: jwt },
        })
        .then((response) => {
          const user = response.data;
          let nickname = user.nickname === null ? user.username : user.nickname;
          if (user.nickname !== null)
            nickname =
              user.nickname.length === 0 ? user.username : user.nickname;
          setUserData({
            email: user.email,
            username: user.username,
            nickname: nickname,
            phoneNumber: user.phoneNumber ? user.phoneNumber : "N/A",
            registrationDate: user.createdOn,
            userId: currentUserId,
            profileImage: user.profilePictureBase64,
            randomAvatarBgColor: user.randomAvatarBgColor,
          });
        })
        .catch((error) => {
          console.error("Hiba történt adat lekérdezéskor", error);
          alert("Hiba történt adat lekérdezéskor");
        });
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 650);
  }, [currentUserId, setIsLoading, isLoading, jwt]);

  const deleteUser = () => {
    if (window.confirm("Biztosan folytatja felhasználója törlését?")) {
      axios
        .delete(`/api/v1/user/${currentUserId}`, {
          headers: { Authorization: jwt },
        })
        .then((response) => {
          alert(
            "Köszönjük, hogy minket választott. Várjuk vissza legközelebb is oldalunkra.\nNavigálás a belépési oldalra"
          );
          console.log("Törlésere kerülő adatok:", response.data);
          localStorage.removeItem("currentUserId");
          localStorage.removeItem("roles");
          localStorage.removeItem("jwt");
          navigate("/signin");
        })
        .catch((error) => {
          console.error("Hiba történt felhasználó törlés során", error);
          alert("Törlés sikeretelen");
        });
    } else alert("Profilja nem lett törölve.");
  };

  if (isLoading) return <Loading />;

  return (
    <Container maxWidth="lg" style={styles.container}>
      {children}
      <Paper elevation={5} style={styles.paper}>
        <Avatar
          style={{
            ...styles.avatar,
            backgroundColor: userData.randomAvatarBgColor,
          }}
        >
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
              <EmailSharpIcon />
              Email:
            </Typography>
            <Typography variant="body1" style={styles.infoValue}>
              <div>{userData.email.split("@")[0]}</div>
              {"@" + userData.email.split("@")[1]}
            </Typography>
          </div>
          <div style={styles.infoItem}>
            <Typography variant="body1" style={styles.infoLabel}>
              <BadgeIcon />
              Név:
            </Typography>
            <Typography variant="body1" style={styles.infoValue}>
              {userData.username}
            </Typography>
          </div>
          <div style={styles.infoItem}>
            <Typography variant="body1" style={styles.infoLabel}>
              <LocalPhoneIcon />
              Tel.Szám:
            </Typography>
            <Typography variant="body1" style={styles.infoValue}>
              {userData.phoneNumber}
            </Typography>
          </div>
          <div style={styles.infoItem}>
            <Typography variant="body1" style={styles.infoLabel}>
              <DateRangeIcon />
              {isSmallScreen ? "Reg. napja:" : "Regisztáció napja:"}
            </Typography>
            <Typography variant="body1" style={styles.infoValue}>
              <div>{userData.registrationDate.split(" ")[0]}</div>
              {userData.registrationDate.split(" ")[1]}
            </Typography>
          </div>
          <div style={styles.infoItem}>
            <Typography variant="body1" style={styles.infoLabel}>
              <NumbersIcon />
              ID:
            </Typography>
            <Typography variant="body1" style={styles.infoValue}>
              {userData.userId}
            </Typography>
          </div>
          <div style={styles.infoItem}>
            <Typography variant="body1" style={styles.infoLabel}>
              <DeleteIcon />
              Profil törlése:
            </Typography>
            <Typography variant="body1" style={styles.infoValue}>
              <Tooltip title={"FIGYELEM! Ez a folyamat nem visszafordítható."}>
                <IconButton onClick={deleteUser} sx={{ color: "red" }}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
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
