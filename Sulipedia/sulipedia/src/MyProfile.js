
import React, { useState, useEffect } from 'react';
import { Container, Typography, Avatar, Paper, Button } from '@mui/material';

const styles = {
  container: {
    padding: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #3494E6 0%, #EC6EAD 100%)',
    border: '5px solid #fff',
    borderRadius: '12px',
  },
  paper: {
    padding: '40px',
    borderRadius: '12px',
    border: '2px solid #ccc',
    maxWidth: '600px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',
  },
  avatar: {
    width: '120px',
    height: '120px',
    margin: '20px auto',
    border: '4px solid #fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '36px',
  },
  heading: {
    margin: '20px 0',
    fontWeight: 'bold',
    color: '#fff',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
  },
  userInfo: {
    marginBottom: '20px',
    textAlign: 'left',
  },
  infoItem: {
    margin: '10px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
    paddingBottom: '8px',
  },
  infoLabel: {
    marginRight: '10px',
    fontWeight: 'bold',
    color: '#fff',
  },
  infoValue: {
    color: '#f0f0f0',
  },
  footer: {
    marginTop: '20px',
    borderTop: '1px solid #ddd',
    paddingTop: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
  },
  donateLink: {
    color: '#fff',
    fontWeight: 'bold',
    textDecoration: 'none',
    marginTop: '8px',
    fontSize: '18px',
  },
  footerText: {
    fontSize: '14px',
    color: '#ddd',
    marginBottom: '10px',
  },
  donateButton: {
    background: '#4caf50',
    color: '#fff',
    fontWeight: 'bold',
    '&:hover': {
      background: '#388e3c',
    },
  },
};

export function MyProfile() {
  const [userData, setUserData] = useState({
    email: 'example@email.com',
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '123-456-7890',
    registrationDate: '2024-03-01',
    userId: '123456789',
    profileImage: 'path/to/profile-image.jpg',
  });

  useEffect(() => {
    // Példa API hívások vagy más adatlekérés
    // axiosos .then((data) => setUserData(data));
  }, []);

  return (
    <Container maxWidth="lg" style={styles.container}>
      <Paper elevation={5} style={styles.paper}>
        <Avatar style={styles.avatar}>
          {userData.firstName.length > 0 ? userData.firstName[0].toUpperCase() : null}
        </Avatar>
        <Typography variant="h4" style={styles.heading}>
          {`${userData.firstName} ${userData.lastName}`}
        </Typography>
        <div style={styles.userInfo}>
          <div style={styles.infoItem}>
            <Typography variant="body1" style={styles.infoLabel}>
              Email:
            </Typography>
            <Typography variant="body1" style={styles.infoValue}>
              {userData.email}
            </Typography>
          </div>
          <div style={styles.infoItem}>
            <Typography variant="body1" style={styles.infoLabel}>
              Név:
            </Typography>
            <Typography variant="body1" style={styles.infoValue}>
              {userData.firstName} {userData.lastName}
            </Typography>
          </div>
          <div style={styles.infoItem}>
            <Typography variant="body1" style={styles.infoLabel}>
              Telefonszám:
            </Typography>
            <Typography variant="body1" style={styles.infoValue}>
              {userData.phoneNumber}
            </Typography>
          </div>
          <div style={styles.infoItem}>
            <Typography variant="body1" style={styles.infoLabel}>
              Regisztáció napja:
            </Typography>
            <Typography variant="body1" style={styles.infoValue}>
              {userData.registrationDate}
            </Typography>
          </div>
          <div style={styles.infoItem}>
            <Typography variant="body1" style={styles.infoLabel}>
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
            onClick={() => window.open('https://www.paypal.me/Krisz37', '_blank')}
            style={styles.donateButton}
          >
            Donate
          </Button>
        </div>
      </Paper>
    </Container>
  );
}
