
import React, { useState } from 'react';
import {
  Button,
  Typography,
  Container,
  Paper,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  styled,
} from '@mui/material';

const StyledButton = styled(Button)({
  backgroundColor: '#ff9800',
  color: '#ffffff',
  margin: (theme) => theme.spacing(1),
  '&:hover': {
    backgroundColor: '#ffcc80',
  },
});

const VegyesButton = styled(Button)({
  backgroundColor: '#ff6347',
  color: '#ffffff',
  border: '4px solid #ff6347',
  '&:hover': {
    backgroundColor: '#ff7f50',
  },
  marginLeft: (theme) => theme.spacing(1),
  width: '150px',
});

const StyledContainer = styled(Container)({
  backgroundColor: '#333',
  border: '2px solid #555',
  padding: 100,
  marginTop: 50,
});

const StyledPaper = styled(Paper)({
  backgroundColor: '#fff59d',
});

const StyledCard = styled(Card)({
  backgroundColor: '#ccc',
  color: '#333',
});

const FlexContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '20px',
});

export function Tests() {
  const [selectedSubject, setSelectedSubject] = useState('');

  const testsData = [
    { title: 'Algebrai kifejezések', subject: 'Matematika' },
    { title: 'Geometriai háromszögek', subject: 'Matematika' },
    { title: 'Magyarország történelmi korszakai ', subject: 'Történelem' },
    { title: 'Szóbeli kifejezés', subject: 'Magyar Nyelv' },
    { title: 'Az epika', subject: 'Magyar Nyelv' },
    { title: 'Az reneszánsz', subject: 'Magyar Nyelv' },
    { title: 'Informatikai alapok', subject: 'Informatika' },
    { title: 'Informatikai alapok 3', subject: 'Informatika' },
    { title: 'Programozási paradigma', subject: 'Informatika' },
    { title: 'Magyarország történelmi korszakai 2', subject: 'Történelem' },
    { title: 'A reneszánsz kora', subject: 'Történelem' },
    { title: 'Szakmai angol nyelv', subject: 'Szakmai Angol' },
    { title: 'Szakmai angol szókincs', subject: 'Szakmai Angol' },
    { title: 'Szóbeli kifejezés 2', subject: 'Magyar Nyelv' },
    { title: 'Szakmai angol szókincs 2', subject: 'Szakmai Angol' },
    { title: 'Magyarország történelmi korszakai 3', subject: 'Történelem' },
    { title: 'Szakmai angol szókincs 3', subject: 'Szakmai Angol' },
    { title: 'Szakmai angol szókincs 4', subject: 'Szakmai Angol' },
    { title: 'Algebrai kifejezések 2', subject: 'Matematika' },
    { title: 'Algebrai kifejezések 3', subject: 'Matematika' },
    { title: 'Informatikai alapok 2', subject: 'Informatika' },
  ];

  const filteredTests = selectedSubject
    ? testsData.filter((test) => test.subject === selectedSubject)
    : testsData;

  const getTitleText = () => {
    if (selectedSubject === 'Vegyes tesztek') {
      return 'Válassz különböző tesztek közül!';
    } else if (selectedSubject) {
      return `Válassz ${selectedSubject} tesztek közül`;
    } else {
      return 'Válassz különböző tesztek közül!';
    }
  };

  const getDescriptionText = () => {
    if (selectedSubject === 'Vegyes tesztek') {
      return 'Itt különböző tantárgyakhoz kapcsolódó tesztek láthatók!';
    } else if (selectedSubject) {
      return `Itt a ${selectedSubject} tantárgyhoz kapcsolódó tesztek láthatók!`;
    } else {
      return 'Itt különböző tantárgyakhoz kapcsolódó tesztek láthatók!';
    }
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject === 'Vegyes tesztek' ? '' : subject);
  };

  return (
    <StyledContainer maxWidth="xl">
      <StyledPaper elevation={3}>
        <AppBar position="static">
          <FlexContainer>
            <StyledButton onClick={() => handleSubjectClick('Szakmai Angol')}>Szakmai Angol</StyledButton>
            <StyledButton onClick={() => handleSubjectClick('Matematika')}>Matematika</StyledButton>
            <StyledButton onClick={() => handleSubjectClick('Magyar Nyelv')}>Magyar Nyelv</StyledButton>
            <StyledButton onClick={() => handleSubjectClick('Történelem')}>Történelem</StyledButton>
            <StyledButton onClick={() => handleSubjectClick('Informatika')}>Informatika</StyledButton>
            <VegyesButton onClick={() => handleSubjectClick('Vegyes tesztek')}>Vegyes tesztek</VegyesButton>
          </FlexContainer>
        </AppBar>

        <Typography variant="h4" gutterBottom style={{ color: '#333', textAlign: 'center' }}>
          {getTitleText()}
        </Typography>
        <Typography variant="body1" paragraph style={{ color: '#333', textAlign: 'center' }}>
          {getDescriptionText()}
        </Typography>

        <Grid container spacing={3}>
          {filteredTests.map((test, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom style={{ color: '#ff9800', textAlign: 'center' }}>
                    {test.title}
                  </Typography>
                  <Typography variant="body2" style={{ color: '#333', textAlign: 'center' }}>
                    {test.subject}
                  </Typography>
                  <StyledButton variant="contained" color="primary">
                    Teszt kitöltése
                  </StyledButton>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </StyledPaper>
    </StyledContainer>
  );
}
