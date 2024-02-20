import React from 'react';
import { Container, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import InformatikaImage from './resources/informatika.png';
import SzakmaiAngolImage from './resources/informatika.png';
import MatematikaImage from './resources/informatika.png';
import MagyarNyelvImage from './resources/informatika.png';
import TortenelemImage from './resources/informatika.png';

const SubjectCard = styled(Card)({
  backgroundColor: '#f8f8f8',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const ColorfulButton = styled(Button)({
  backgroundColor: '#4caf50', 
  color: 'white',
  '&:hover': {
    backgroundColor: '#388e3c', 
  },
});

const IconImage = styled('img')({
  width: '40px',
  height: '40px', 
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
      link: '/matematika',
      icon: MatematikaImage,
    },
    {
      title: 'Magyar Nyelv',
      description:
        'A magyar nyelv tantárgy célja a magyar nyelvtudás fejlesztése. Az irodalmi elemzés, helyesírás és stílusgyakorlatok is részét képezik a tananyagnak.',
      link: '/magyar-nyelv',
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
      <Typography variant="h2" style={{ margin: '32px 0', textAlign: 'center' }}>
        Tantárgyak
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {subjects.map((subject, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <SubjectCard>
              <CardContent>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="h5" gutterBottom>
                    {subject.title}
                  </Typography>
                  <IconImage src={subject.icon} alt={`${subject.title} icon`} />
                </div>
                <Typography variant="body1">{subject.description}</Typography>
                <ColorfulButton component={Link} to={subject.link} fullWidth>
                  Részletek
                </ColorfulButton>
              </CardContent>
            </SubjectCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
