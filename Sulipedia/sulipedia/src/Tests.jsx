  import React, { useState } from 'react';
  import {
    Button,Typography,Container,Paper,Grid,Card,CardContent,AppBar,styled,
    List,ListItem,ListItemText,Radio,RadioGroup,FormControlLabel,IconButton,
  } from '@mui/material';
  import VisibilityIcon from '@mui/icons-material/Visibility';
  import useMediaQuery from '@mui/material/useMediaQuery';
  import FormatListBulletedTwoToneIcon from '@mui/icons-material/FormatListBulletedTwoTone';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';


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
    padding: '10vw',
    marginTop: 0,
  });

  const StyledPaper = styled(Paper)({
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  });

  const StyledCard = styled(Card)({
    backgroundColor: '#808080',
    color: '#333',
    borderRadius: '10px',
  });

  const FlexContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
  });

  export function Tests() {
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedTest, setSelectedTest] = useState(null);
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState({});
    const [showCorrectAnswer, setShowCorrectAnswer] = useState({});
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const isSmallScreen = useMediaQuery('(max-width:950px)');


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

    const questionsAndAnswers = {
      'Algebrai kifejezések': [
        { question: 'Mi a főnevek elsődleges funkciója a mondatban?', answers: ['Tárgy szerep', 'Alany szerep', 'Határozó szerep', 'Állítmány szerep'], correctAnswer: 'Alany szerep' },
        { question: 'Melyik alábbi szó összetett főnév?', answers: ['Házépítő', 'Kutya', 'Futball', 'Iskola'], correctAnswer: 'Házépítő' },

      ],
      'Geometriai háromszögek': [
        { question: 'Mi a háromszögek belső szögeinek összege?', answers: ['180 fok', '270 fok', '360 fok'], correctAnswer: '180 fok' },
        { question: 'Melyik alábbi szög típusra jellemző az 1 fokos szög?', answers: ['Élesen szöget', 'Derékszöget', 'Tompaszöget', 'Fél egyenest'], correctAnswer: 'Élesen szöget' },

      ],
      'Magyarország történelmi korszakai ': [
        { question: 'Melyik történelmi korszakot nevezzük az Árpád-házi királyok kora néven?', answers: ['Középkor', 'Ókor', 'Kora újkor', 'Korai középkor'], correctAnswer: 'Korai középkor' },
        { question: 'Melyik évben tartották az Aradi vértanúk kivégzését?', answers: ['1857', '1848', '1849', '1867'], correctAnswer: '1849' },

      ],
      'Szóbeli kifejezés': [
        { question: 'Melyik a helyes mondat?', answers: ['Én tanultam meg a leckét.', 'Én tanultam megtanulni a leckét.', 'Én tanultam meg a leckétet.', 'Én tanultam meg, hogy a lecke.'], correctAnswer: 'Én tanultam meg a leckét.' },
        { question: 'Melyik a helyes írásmód?', answers: ['Hogy vagy?', 'Hogyvagy?', 'Hogy vagy', 'Hogy vagy!'], correctAnswer: 'Hogy vagy?' },

      ],
      'Az epika': [
        { question: 'Ki az A tanár úr című regény írója?', answers: ['Perczel Róbert', 'Németh László', 'Molnár Ferenc', 'Fekete István'], correctAnswer: 'Molnár Ferenc' },
        { question: 'Ki az Egy magyar nábob írója?', answers: ['Perczel Róbert', 'Németh László', 'Molnár Ferenc', 'Fekete István'], correctAnswer: 'Jókai Mór' },

      ],
      'Az reneszánsz': [
        { question: 'Melyik országban bontakozott ki a reneszánsz?', answers: ['Németország', 'Spanyolország', 'Olaszország', 'Anglia'], correctAnswer: 'Olaszország' },
        { question: 'Ki volt a reneszánsz kor egyik kiemelkedő festőművésze?', answers: ['Leonardo da Vinci', 'Pablo Picasso', 'Vincent van Gogh', 'Rembrandt'], correctAnswer: 'Leonardo da Vinci' },

      ],
      'Informatikai alapok': [
        { question: 'Melyik az alapvető adattípus a JavaScriptben?', answers: ['Integer', 'String', 'Boolean', 'Array'], correctAnswer: 'String' },
        { question: 'Melyik nyelvet használják leginkább az internetes fejlesztés során?', answers: ['Java', 'Python', 'HTML', 'JavaScript'], correctAnswer: 'JavaScript' },

      ],
      'Informatikai alapok 3': [
        { question: 'Mi a legismertebb szövegszerkesztő program?', answers: ['Microsoft Word', 'Google Docs', 'Notepad', 'Sublime Text'], correctAnswer: 'Microsoft Word' },
        { question: 'Melyik az egyik legnépszerűbb webes böngésző?', answers: ['Internet Explorer', 'Firefox', 'Safari', 'Opera'], correctAnswer: 'Firefox' },

      ],
      'Programozási paradigma': [
        { question: 'Mi a népszerű programozási nyelvek között számon tartott Python másik neve?', answers: ['Snake', 'Viper', 'Lizard', 'Cobra'], correctAnswer: 'Snake' },
        { question: 'Mi az objektumorientált programozás egyik alapelke?', answers: ['Inkapszuláció', 'Polimorfizmus', 'Öröklődés', 'Absztrakció'], correctAnswer: 'Inkapszuláció' },

      ],
      'Magyarország történelmi korszakai 2': [
        { question: 'Melyik történelmi korszakban éltek a honfoglaló magyarok?', answers: ['Római kor', 'Kora újkor', 'Ókor', 'Középkor'], correctAnswer: 'Középkor' },
        { question: 'Melyik évben került sor a Mohácsi csatára?', answers: ['1456', '1526', '1492', '1568'], correctAnswer: '1526' },

      ],
      'A reneszánsz kora': [
        { question: 'Ki volt a reneszánsz kor legnagyobb festőművésze?', answers: ['Leonardo da Vinci', 'Michelangelo', 'Raffaello Sanzio', 'Titian'], correctAnswer: 'Leonardo da Vinci' },
        { question: 'Melyik város volt a reneszánsz egyik központja?', answers: ['Párizs', 'Firenze', 'London', 'Budapest'], correctAnswer: 'Firenze' },

      ],
      'Szakmai angol nyelv': [
        { question: 'Mi a jelentése a "database" kifejezésnek?', answers: ['Adatbázis', 'Fájl', 'Kereső', 'Tár'], correctAnswer: 'Adatbázis' },
        { question: 'Mi a jelentése a "server" kifejezésnek?', answers: ['Szerver', 'Ügyfél', 'Hálózat', 'Kapcsolat'], correctAnswer: 'Szerver' },

      ],
      'Szakmai angol szókincs': [
        { question: 'Hogyan mondod angolul: "Készítettél már valaha weboldalt?"', answers: ['Did you ever make a website?', 'Did you ever make website?', 'Did you made a website ever?', 'Did ever you make a website?'], correctAnswer: 'Did you ever make a website?' },
        { question: 'Hogyan mondod angolul: "Hol szereztél tapasztalatot?"', answers: ['Where did you gain experience?', 'Where did you gained experience?', 'Where you did gain experience?', 'Where did gain you experience?'], correctAnswer: 'Where did you gain experience?' },

      ],
      'Szóbeli kifejezés 2': [
        { question: 'Melyik az igaz mondat?', answers: ['A nap süt.', 'A felhő süt.', 'A felhők süt.', 'A hó süt.'], correctAnswer: 'A nap süt.' },
        { question: 'Melyik a helyes mondat?', answers: ['Ezt a mondatot írtam le.', 'Ezt a mondatot irtam le.', 'Ezt a mondatot írta le.', 'Ezt a mondatot írta írta le.'], correctAnswer: 'Ezt a mondatot írtam le.' },

      ],
      'Szakmai angol szókincs 2': [
        { question: 'Hogyan mondod angolul: "Hol szerezted a tapasztalatod?"', answers: ['Where did you gain experience?', 'Where did you gained experience?', 'Where you did gain experience?', 'Where did gain you experience?'], correctAnswer: 'Where did you gain experience?' },
        { question: 'Hogyan mondod angolul: "Milyen tapasztalatod van?"', answers: ['What experience do you have?', 'What do you experience have?', 'What do experience you have?', 'What have experience you do?'], correctAnswer: 'What experience do you have?' },

      ],
      'Magyarország történelmi korszakai 3': [
        { question: 'Melyik évben volt a mohácsi csata?', answers: ['1526', '1456', '1848', '1867'], correctAnswer: '1526' },
        { question: 'Ki volt a mohácsi csata magyar királya?', answers: ['I. Ferdinánd', 'II. Lajos', 'III. Béla', 'I. Szapolyai János'], correctAnswer: 'II. Lajos' },

      ],
      'Szakmai angol szókincs 3': [
        { question: 'Hogyan mondod angolul: "Mi a neved?"', answers: ['What is your name?', 'What is name you?', 'What your name is?', 'Your name is what?'], correctAnswer: 'What is your name?' },
        { question: 'Hogyan mondod angolul: "Hol laksz?"', answers: ['Where do you live?', 'Where you live?', 'You live where?', 'Do you live where?'], correctAnswer: 'Where do you live?' },

      ],
      'Szakmai angol szókincs 4': [
        { question: 'Hogyan mondod angolul: "Mi a szakmai célod?"', answers: ['What is your professional goal?', 'What is professional goal you?', 'What your professional goal is?', 'Your professional goal is what?'], correctAnswer: 'What is your professional goal?' },
        { question: 'Hogyan mondod angolul: "Milyen nyelveket beszélsz?"', answers: ['What languages do you speak?', 'What languages speak you?', 'You speak what languages?', 'Do you speak what languages?'], correctAnswer: 'What languages do you speak?' },

      ],
      'Algebrai kifejezések 2': [
        { question: 'Melyik a helyes alábbi főnév?', answers: ['Futóverseny', 'Futó', 'Futás', 'Futók'], correctAnswer: 'Futóverseny' },
        { question: 'Melyik a helyes alábbi melléknév?', answers: ['Szép', 'Szépség', 'Szépesség', 'Széplelkű'], correctAnswer: 'Szép' },

      ],
      'Algebrai kifejezések 3': [
        { question: 'Milyen alábbi szóösszetétel nevezi a "házőr" kifejezés?', answers: ['Egyszerű', 'Alanyi', 'Összetett', 'Többes'], correctAnswer: 'Összetett' },
        { question: 'Mi a helyes alábbi összetett szó?', answers: ['Házépítő', 'Házikó', 'Ház', 'Házba'], correctAnswer: 'Házépítő' },

      ],
      'Informatikai alapok 2': [
        { question: 'Melyik a legnépszerűbb programozási nyelv?', answers: ['Python', 'Java', 'C++', 'JavaScript'], correctAnswer: 'JavaScript' },
        { question: 'Milyen típusú adattároló a JavaScript-ben a tömb?', answers: ['Sorozat', 'Tároló', 'Adattábla', 'Vektor'], correctAnswer: 'Sorozat' },

      ],
    };
    
    const filteredTests = selectedSubject
      ? testsData.filter((test) => test.subject === selectedSubject)
      : testsData;
    const getTitleText = () => {
      if (selectedSubject === 'Vegyes tesztek') { return 'Válassz különböző tesztek közül!'; }
      else if (selectedSubject) { return `Válassz ${selectedSubject} tesztek közül`; }
      else { return 'Válassz különböző tesztek közül!'; }
    };
    const getDescriptionText = () => {
      if (selectedSubject === 'Vegyes tesztek') {
        return 'Itt különböző tantárgyakhoz kapcsolódó tesztek láthatók!';
      }
      else if (selectedSubject) {
        return `Itt a ${selectedSubject} tantárgyhoz kapcsolódó tesztek láthatók!`;
      }
      else { return 'Itt különböző tantárgyakhoz kapcsolódó tesztek láthatók!'; }
    };

    const handleSubjectClick = (subject) => {
      setSelectedSubject(subject === 'Vegyes tesztek' ? '' : subject);
      setSelectedTest(subject === 'Vegyes tesztek' ? testsData[0] : selectedTest);
    };

    const handleTestSelection = (test) => {
      setSelectedTest(test);
      setShowResults(false);
      setAnswers({});
      setCorrectAnswers({});

      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    };

    const handleAnswerChange = (event, questionIndex) => {
      const { value } = event.target;
      setAnswers({ ...answers, [questionIndex]: value });
    };

    const handleCheckAnswers = () => {
      const correctAnswersData = {};
      Object.keys(questionsAndAnswers[selectedTest.title]).forEach((key) => {
        const question = questionsAndAnswers[selectedTest.title][key];
        correctAnswersData[key] = question.correctAnswer;
      });
      setCorrectAnswers(correctAnswersData);
      setShowResults(true);
    };

    const isAnswerCorrect = (questionIndex, selectedAnswer) => {
      return correctAnswers[questionIndex] === selectedAnswer;
    };
    const toggleDrawer = () => {
      setDrawerOpen(!drawerOpen);
    };

    const handleShowCorrectAnswer = (questionIndex) => {
      setShowCorrectAnswer({ ...showCorrectAnswer, [questionIndex]: true });
    };
    

    return (
      <StyledContainer maxWidth="xl">
        <StyledPaper elevation={3}>
          <AppBar position="static" style={{ borderTopLeftRadius: '9px', borderTopRightRadius: '9px' }}>
           { isSmallScreen ? (
            <>
            <Tooltip title="Főoldal, Tananyagok, Tesztek, Csoportjaim">
            <IconButton onClick={toggleDrawer} sx={{ p: 0, mr: 1 }}>
              <Avatar>
                <FormatListBulletedTwoToneIcon />
              </Avatar>
            </IconButton>
          </Tooltip>

          <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer}
          sx={{ '& .MuiDrawer-paper': { backgroundColor: '#f0f0f0' } }}
        >
            

              <MenuItem sx={{  color: 'white', display: 'block', backgroundColor: '#FF5733', border: '1px solid black' }} onClick={() => handleSubjectClick('Szakmai Angol')}>Szakmai Angol</MenuItem>
              <MenuItem sx={{  color: 'white', display: 'block', backgroundColor: '#FF5733', border: '1px solid black' }} onClick={() => handleSubjectClick('Matematika')}>Matematika</MenuItem>
              <MenuItem sx={{  color: 'white', display: 'block', backgroundColor: '#FF5733', border: '1px solid black' }} onClick={() => handleSubjectClick('Magyar Nyelv')}>Magyar Nyelv</MenuItem>
              <MenuItem sx={{  color: 'white', display: 'block', backgroundColor: '#FF5733', border: '1px solid black' }} onClick={() => handleSubjectClick('Történelem')}>Történelem</MenuItem>
              <MenuItem sx={{  color: 'white', display: 'block', backgroundColor: '#FF5733', border: '1px solid black' }} onClick={() => handleSubjectClick('Informatika')}>Informatika</MenuItem>
              <VegyesButton onClick={() => handleSubjectClick('Vegyes tesztek')}>Vegyes tesztek</VegyesButton>
            
            </Drawer>  </>):( <FlexContainer>
              <StyledButton onClick={() => handleSubjectClick('Szakmai Angol')}>Szakmai Angol</StyledButton>
              <StyledButton onClick={() => handleSubjectClick('Matematika')}>Matematika</StyledButton>
              <StyledButton onClick={() => handleSubjectClick('Magyar Nyelv')}>Magyar Nyelv</StyledButton>
              <StyledButton onClick={() => handleSubjectClick('Történelem')}>Történelem</StyledButton>
              <StyledButton onClick={() => handleSubjectClick('Informatika')}>Informatika</StyledButton>
              <VegyesButton onClick={() => handleSubjectClick('Vegyes tesztek')}>Vegyes tesztek</VegyesButton>
            </FlexContainer>)}
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
                    <StyledButton variant="contained" color="primary" onClick={() => handleTestSelection(test)}>
                      Teszt kitöltése
                    </StyledButton>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>

          {selectedTest && (
  <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
    <Typography variant="h5" gutterBottom style={{ color: '#333', textAlign: 'center' }}>
      {selectedTest.title} - {selectedTest.subject}
    </Typography>
    <List>
      {questionsAndAnswers[selectedTest.title].map((item, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <ListItem style={{ backgroundColor: '#f0f0f0', borderRadius: '5px', padding: '10px', border: '1px solid #ccc' }}>
            <ListItemText
              primary={`Question ${index + 1}: ${item.question}`}
              style={{ color: '#333' }}
            />
          </ListItem>
          <ListItem style={{ backgroundColor: '#f0f0f0', borderRadius: '5px', padding: '10px', border: '1px solid #ccc' }}>
            <RadioGroup value={answers[index] || ''} onChange={(event) => handleAnswerChange(event, index)}>
              {item.answers.map((answer, answerIndex) => (
                <FormControlLabel
                  key={answerIndex}
                  value={answer}
                  control={<Radio />}
                  label={answer}
                  disabled={showResults}
                  style={{ color: '#333' }}
                />
              ))}
            </RadioGroup>
          </ListItem>
          <hr style={{ margin: '10px 0', borderColor: '#ddd' }} />
        </div>
      ))}
    </List>

    <StyledButton variant="contained" color="primary" onClick={handleCheckAnswers} disabled={showResults}>
      Ellenőrzés
    </StyledButton>
  </Paper>
)}
          {showResults && (
            <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
              <Typography variant="h5" gutterBottom style={{ color: '#333', textAlign: 'center' }}>
                Eredmények
              </Typography>
              <List>
                {Object.keys(answers).map((questionIndex) => (
                  <ListItem key={questionIndex}>
                  <ListItemText
                    primary={`Kérdés ${parseInt(questionIndex) + 1}: ${questionsAndAnswers[selectedTest.title][questionIndex].question}`}
                    secondary={
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" style={{ color: isAnswerCorrect(questionIndex, answers[questionIndex]) ? 'green' : 'red' }}>
                          {isAnswerCorrect(questionIndex, answers[questionIndex]) ? 'Helyes válasz' : 'Rossz válasz'}
                        </Typography>
                        <IconButton onClick={() => handleShowCorrectAnswer(questionIndex)} style={{ marginLeft: '10px' }}>
                          <VisibilityIcon />
                        </IconButton>
                        {showCorrectAnswer[questionIndex] && (
                          <Typography variant="body2" style={{ marginLeft: '10px', color: 'blue' }}>
                            {questionsAndAnswers[selectedTest.title][questionIndex].correctAnswer}
                          </Typography>
                        )}
                      </div>
                    }
                  />
                </ListItem>
                
                ))}
              </List>
            </Paper>
          )}
        </StyledPaper>
      </StyledContainer>
    );
  }
