import React from 'react';
import { Container, Typography, Card, CardContent, Grid, Button, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

import InformatikaImage from './resources/it.png';
import SzakmaiAngolImage from './resources/iteng.png';
import MatematikaImage from './resources/mat.png';
import MagyarNyelvImage from './resources/grammer.png';
import TortenelemImage from './resources/history.png';
 
const SubjectCard = styled(Card)({
  backgroundColor: '#f5f5f5',
  borderRadius: '10px',
  border: '2px solid grey', 
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s',
  overflow: 'hidden',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const CardHeader = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px',
  borderBottom: '1px solid #e0e0e0',
  backgroundColor: '#ffffff',
  borderRadius: '10px 10px 0 0',
});

const CardTitle = styled(Typography)({
  fontSize: '1.8rem',
  fontWeight: 'bold',
  color: '#333',
});

const CardDescription = styled(Typography)({
  marginBottom: '16px',
  padding: '16px',
  color: '#666',
});

const CardButton = styled(Button)({
  borderRadius: '8px',
  padding: '10px 20px',
  backgroundColor: '#4caf50',
  color: 'white',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#388e3c',
  },
});

const IconImage = styled('img')({
  width: '50px',
  height: '50px',
  marginLeft: '8px',
});

export function Curriculums() {
  const subjects = [
    {
      title: 'Szakmai Angol',
      description:
        'A szakmai angol tantárgy célja a szakmai kommunikációs készségek fejlesztése az angol nyelven. Fontos szerepet kapnak a szakmai szókincs, a prezentációs technikák és a szaknyelvi írás.',
      link: '/szakmai-angol',
      icon: SzakmaiAngolImage,
    },
    {
      title: 'Matematika',
      description:
        'A matematika tantárgy célja a logikus gondolkodás és a számolási készségek fejlesztése. Témák között szerepelnek az algebra, geometria és matematikai analízis.',
      link: '/matek',
      icon: MatematikaImage,
    },
    {
      title: 'Magyar Nyelv',
      description:
        'A magyar nyelv tantárgy célja a magyar nyelvtudás fejlesztése. Az irodalmi elemzés, helyesírás és stílusgyakorlatok is részét képezik a tananyagnak.',
      link: '/magyar',
      icon: MagyarNyelvImage,
    },
    {
      title: 'Történelem',
      description:
        'A történelem tantárgy a világ és Magyarország történelmének tanulmányozására összpontosít. Fontos események, korszakok és történelmi személyiségek kerülnek bemutatásra.',
      link: '/tortenelem',
      icon: TortenelemImage,
    },
    {
      title: 'Informatika',
      description:
        'Az informatika tantárgy célja a számítógépes ismeretek és programozási alapismeretek elsajátítása. Témák között szerepelnek az algoritmusok, adatszerkezetek és webfejlesztés alapjai.',
      link: '/informatika',
      icon: InformatikaImage,
    },
  ];

  const gridRows = Math.ceil(subjects.length / 2);

  return (
    <Container>
      <Typography variant="h2" style={{ margin: '32px 0', textAlign: 'center', color: '#333' }}>
        Tantárgyak
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {subjects.map((subject, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <SubjectCard component={Paper}>
              <CardContent>
                <CardHeader>
                  <CardTitle variant="h5" gutterBottom>
                    {subject.title}
                  </CardTitle>
                  <IconImage src={subject.icon} alt={`${subject.title} icon`} />
                </CardHeader>
                <CardDescription variant="body1">{subject.description}</CardDescription>
                <CardButton component={Link} to={subject.link} fullWidth>
                  Részletek
                </CardButton>
              </CardContent>
            </SubjectCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
