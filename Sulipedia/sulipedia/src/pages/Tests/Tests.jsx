import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Container,
  Paper,
  Grid,
  Card,
  CardContent,
  AppBar,
  styled,
  List,
  ListItem,
  ListItemText,
  Radio,
  RadioGroup,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import useMediaQuery from "@mui/material/useMediaQuery";
import FormatListBulletedTwoToneIcon from "@mui/icons-material/FormatListBulletedTwoTone";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Drawer from "@mui/material/Drawer";
import MenuItem from "@mui/material/MenuItem";
import { Loading } from "../../components/Loading/Loading";
import axios from "axios";

const StyledButton = styled(Button)({
  backgroundColor: "#ff9800",
  color: "#ffffff",
  margin: (theme) => theme.spacing(1),
  "&:hover": {
    backgroundColor: "#ffcc80",
  },
});

const VegyesButton = styled(Button)({
  backgroundColor: "#ff6347",
  color: "#ffffff",
  border: "4px solid #ff6347",
  "&:hover": {
    backgroundColor: "#ff7f50",
  },
  marginLeft: (theme) => theme.spacing(1),
  width: "150px",
});

const StyledContainer = styled(Container)({
  backgroundColor: "#333",
  border: "2px solid #555",
  padding: "10vw",
  marginTop: 0,
});

const StyledPaper = styled(Paper)({
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
});

const StyledCard = styled(Card)({
  backgroundColor: "#808080",
  color: "#333",
  borderRadius: "10px",
});

const FlexContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "20px",
});

export function Tests({ children, setIsLoading, isLoading }) {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTest, setSelectedTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [showCorrectAnswer, setShowCorrectAnswer] = useState({});
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const isSmallScreen = useMediaQuery("(max-width:950px)");
  const [subject, setSubject] = useState("");

  const testsData = [
    { title: "Algebrai kifejezések", subject: "Matematika" },
    { title: "Geometriai háromszögek", subject: "Matematika" },
    { title: "Informatikai alapok", subject: "Informatika" },
    { title: "Informatikai alapok 3", subject: "Informatika" },
    { title: "Programozási paradigma", subject: "Informatika" },
    { title: "Magyarország történelmi korszakai", subject: "Történelem" },
    { title: "Szakmai angol szókincs 2", subject: "Szakmai Angol" },
    { title: "Szakmai angol szókincs 3", subject: "Szakmai Angol" },
    { title: "Szakmai angol szókincs 1", subject: "Szakmai Angol" },
    { title: "Informatikai alapok 2", subject: "Informatika" },
  ];

  const questionsAndAnswers = {
    "Algebrai kifejezések": [
      {
        question: "Mennyi 6*6",
        answers: ["36", "7", "18", "11"],
        correctAnswer: "36",
      },
      {
        question: "Melyik nem matematikai kifejezése",
        answers: ["Pitagorasz-tétel", "Kutya", "Számok", "Egyenlet"],
        correctAnswer: "Kutya",
      },
    ],
    "Geometriai háromszögek": [
      {
        question: "Mi a háromszögek belső szögeinek összege?",
        answers: ["180 fok", "270 fok", "360 fok"],
        correctAnswer: "180 fok",
      },
      {
        question: "Melyik alábbi szög típusra jellemző az 1 fokos szög?",
        answers: ["Hegyes szög", "Derékszög", "Tompaszög", "Teljes szög"],
        correctAnswer: "Élesen szöget",
      },
    ],

    "Informatikai alapok": [
      {
        question: "Melyik az alapvető adattípus a JavaScriptben?",
        answers: ["Integer", "String", "Boolean", "Array"],
        correctAnswer: "String",
      },
      {
        question:
          "Melyik nyelvet használják leginkább az internetes fejlesztés során?",
        answers: ["Java", "Python", "HTML", "JavaScript"],
        correctAnswer: "JavaScript",
      },
    ],
    "Informatikai alapok 3": [
      {
        question: "Mi a legismertebb szövegszerkesztő program?",
        answers: ["Microsoft Word", "Google Docs", "Notepad", "Sublime Text"],
        correctAnswer: "Microsoft Word",
      },
      {
        question: "Melyik az egyik legnépszerűbb webes böngésző?",
        answers: ["Internet Explorer", "Firefox", "Safari", "Opera"],
        correctAnswer: "Firefox",
      },
    ],
    "Programozási paradigma": [
      {
        question:
          "Mi a népszerű programozási nyelvek között számon tartott Python másik neve?",
        answers: ["Snake", "Viper", "Lizard", "Cobra"],
        correctAnswer: "Snake",
      },
      {
        question: "Mi az objektumorientált programozás egyik alapelke?",
        answers: ["Inkapszuláció", "Polimorfizmus", "Öröklődés", "Absztrakció"],
        correctAnswer: "Inkapszuláció",
      },
    ],
    "Magyarország történelmi korszakai": [
      {
        question: "Melyik történelmi korszakban éltek a honfoglaló magyarok?",
        answers: ["Római kor", "Kora újkor", "Ókor", "Középkor"],
        correctAnswer: "Középkor",
      },
      {
        question: "Melyik évben került sor a Mohácsi csatára?",
        answers: ["1456", "1526", "1492", "1568"],
        correctAnswer: "1526",
      },
    ],
    "Szakmai angol szókincs 2": [
      {
        question: 'Hogyan mondod angolul: "Hol szerezted a tapasztalatod?"',
        answers: [
          "Where did you gain experience?",
          "Where did you gained experience?",
          "Where you did gain experience?",
          "Where did gain you experience?",
        ],
        correctAnswer: "Where did you gain experience?",
      },
      {
        question: 'Hogyan mondod angolul: "Milyen tapasztalatod van?"',
        answers: [
          "What experience do you have?",
          "What do you experience have?",
          "What do experience you have?",
          "What have experience you do?",
        ],
        correctAnswer: "What experience do you have?",
      },
    ],
    "Szakmai angol szókincs 3": [
      {
        question: 'Hogyan mondod angolul: "Mi a neved?"',
        answers: [
          "What is your name?",
          "What is name you?",
          "What your name is?",
          "Your name is what?",
        ],
        correctAnswer: "What is your name?",
      },
      {
        question: 'Hogyan mondod angolul: "Hol laksz?"',
        answers: [
          "Where do you live?",
          "Where you live?",
          "You live where?",
          "Do you live where?",
        ],
        correctAnswer: "Where do you live?",
      },
    ],
    "Szakmai angol szókincs 1": [
      {
        question: 'Hogyan mondod angolul: "Mi a szakmai célod?"',
        answers: [
          "What is your professional goal?",
          "What is professional goal you?",
          "What your professional goal is?",
          "Your professional goal is what?",
        ],
        correctAnswer: "What is your professional goal?",
      },
      {
        question: 'Hogyan mondod angolul: "Milyen nyelveket beszélsz?"',
        answers: [
          "What languages do you speak?",
          "What languages speak you?",
          "You speak what languages?",
          "Do you speak what languages?",
        ],
        correctAnswer: "What languages do you speak?",
      },
    ],
    "Informatikai alapok 2": [
      {
        question: "Melyik a legnépszerűbb programozási nyelv?",
        answers: ["Python", "Java", "C++", "JavaScript"],
        correctAnswer: "JavaScript",
      },
      {
        question: "Milyen típusú adattároló a JavaScript-ben a tömb?",
        answers: ["Sorozat", "Tároló", "Adattábla", "Vektor"],
        correctAnswer: "Sorozat",
      },
    ],
  };

  const [requestedTestData, setRequestedTestData] = useState(testsData);
  const [requestedQuestionsAndAnswers, setRequestedQuestionsAndAnswers] =
    useState(questionsAndAnswers);

  const [filteredTests, setFilteredTests] = useState(testsData);

  useEffect(() => {
    if (filteredTests.length > 0) {
      setSelectedTest((selectedTest) =>
        selectedTest
          ? filteredTests.find((test) => test.title === selectedTest.title) ||
            filteredTests[0]
          : filteredTests[0]
      );
    } else {
      setSelectedTest(null);
    }
    if (selectedSubject) {
      setSelectedTest(filteredTests.length > 0 ? filteredTests[0] : null);
    }
  }, [filteredTests, selectedSubject]);

  useEffect(() => {
    switch (selectedSubject) {
      case "Szakmai Angol":
        setSubject("TECHNICAL_ENGLISH");
        break;
      case "Matematika":
        setSubject("MATHS");
        break;
      case "Informatika":
        setSubject("ICT");
        break;
      case "Történelem":
        setSubject("HISTORY");
        break;
      case "Magyar nyelv":
        setSubject("HUNGARIAN");
        break;
      default:
        setSubject(null);
        break;
    }
  }, [selectedSubject]);

  useEffect(() => {
    console.log(`/entry/test?subject=${subject}`);
    axios
      .get(subject ? `/entry/test?subject=${subject}` : "/entry/test", {
        headers: { Authorization: localStorage.getItem("jwt") },
      })
      .then((response) => {
        response.data.entries.forEach((entry) => {
          setRequestedTestData(
            [
              { title: entry.title, subject: reverseGetSubject(entry.subject) },
            ].concat(testsData)
          );

          let questions = [];
          entry.questions.questions.forEach((question) => {
            let correctAnswerText = question.answers.answers
              .filter((answer) => answer.correct)
              .map((answer) => answer.text)[0];

            questions.push({
              question: question.text,
              answers: question.answers.answers.map((answer) => answer.text),
              correctAnswer: correctAnswerText,
            });
          });

          setRequestedQuestionsAndAnswers((prevData) => ({
            [entry.title]: questions,
            ...prevData
          }));
        });
        console.log(requestedTestData, requestedQuestionsAndAnswers);
      })
      .catch((error) => {
        console.error("Hiba történt adat lekérdezéskor", error);
      });
    setTimeout(()=>{
      setIsLoading(false);
    },300)
  }, [subject, setIsLoading, isLoading]);

  const reverseGetSubject = (subject) => {
    switch (subject) {
      case "HISTORY":
        return "Történelem";
      case "HUNGARIAN":
        return "Magyar nyelv";
      case "ICT":
        return "Informatika";
      case "MATHS":
        return "Matematika";
      case "TECHNICAL_ENGLISH":
        return "Szakmai angol";
      default:
        break;
    }
  };

  const getTitleText = () => {
    if (selectedSubject) {
      return `Válassz ${selectedSubject} tesztek közül`;
    } else {
      return "Válassz különböző tesztek közül!";
    }
  };
  const getDescriptionText = () => {
    if (selectedSubject) {
      return `Itt a ${selectedSubject} tantárgyhoz kapcsolódó tesztek láthatók!`;
    } else {
      return "Itt különböző tantárgyakhoz kapcsolódó tesztek láthatók!";
    }
  };

  const handleSubject = (event) => {
    let subject = event.target.id;
    setIsLoading(true);
    setSelectedSubject(subject);
    setFilteredTests(
      subject
        ? requestedTestData.filter((test) => test.subject === subject)
        : requestedTestData
    );
    setShowResults(false);
  };

  const handleTestSelection = (test) => {
    setSelectedTest(test);
    setShowResults(false);
    setAnswers({});
    setCorrectAnswers({});
    setShowCorrectAnswer({});

    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const handleAnswerChange = (event, questionIndex) => {
    const { value } = event.target;
    setAnswers({ ...answers, [questionIndex]: value });
  };

  const handleCheckAnswers = () => {
    const correctAnswersData = {};
    Object.keys(requestedQuestionsAndAnswers[selectedTest.title]).forEach(
      (key) => {
        const question = requestedQuestionsAndAnswers[selectedTest.title][key];
        correctAnswersData[key] = question.correctAnswer;
      }
    );
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

  if (isLoading) return <Loading />;

  return (
    <StyledContainer maxWidth="xl">
      {children}
      <StyledPaper elevation={3}>
        <AppBar
          position="static"
          style={{ borderTopLeftRadius: "9px", borderTopRightRadius: "9px" }}
        >
          {isSmallScreen ? (
            <>
              <Tooltip title="Tesztek kiválasztása">
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
                sx={{ "& .MuiDrawer-paper": { backgroundColor: "#f0f0f0" } }}
              >
                <MenuItem
                  sx={{
                    color: "white",
                    display: "block",
                    backgroundColor: "#FF5733",
                    border: "1px solid black",
                  }}
                  id="Szakmai Angol"
                  onClick={handleSubject}
                >
                  Szakmai Angol
                </MenuItem>
                <MenuItem
                  sx={{
                    color: "white",
                    display: "block",
                    backgroundColor: "#FF5733",
                    border: "1px solid black",
                  }}
                  id="Matematika"
                  onClick={handleSubject}
                >
                  Matematika
                </MenuItem>
                <MenuItem
                  sx={{
                    color: "white",
                    display: "block",
                    backgroundColor: "#FF5733",
                    border: "1px solid black",
                  }}
                  id="Magyar Nyelv"
                  onClick={handleSubject}
                >
                  Magyar Nyelv
                </MenuItem>
                <MenuItem
                  sx={{
                    color: "white",
                    display: "block",
                    backgroundColor: "#FF5733",
                    border: "1px solid black",
                  }}
                  id="Történelem"
                  onClick={handleSubject}
                >
                  Történelem
                </MenuItem>
                <MenuItem
                  sx={{
                    color: "white",
                    display: "block",
                    backgroundColor: "#FF5733",
                    border: "1px solid black",
                  }}
                  id="Informatika"
                  onClick={handleSubject}
                >
                  Informatika
                </MenuItem>
                <VegyesButton onClick={handleSubject}>
                  Vegyes tesztek
                </VegyesButton>
              </Drawer>{" "}
            </>
          ) : (
            <FlexContainer>
              <StyledButton id="Szakmai Angol" onClick={handleSubject}>
                Szakmai Angol
              </StyledButton>
              <StyledButton id="Matematika" onClick={handleSubject}>
                Matematika
              </StyledButton>
              <StyledButton id="Magyar nyelv" onClick={handleSubject}>
                Magyar Nyelv
              </StyledButton>
              <StyledButton id="Történelem" onClick={handleSubject}>
                Történelem
              </StyledButton>
              <StyledButton id="Informatika" onClick={handleSubject}>
                Informatika
              </StyledButton>
              <VegyesButton id="" onClick={handleSubject}>
                Vegyes tesztek
              </VegyesButton>
            </FlexContainer>
          )}
        </AppBar>

        <Typography
          variant="h4"
          gutterBottom
          style={{ color: "#333", textAlign: "center" }}
        >
          {getTitleText()}
        </Typography>
        <Typography
          variant="body1"
          paragraph
          style={{ color: "#333", textAlign: "center" }}
        >
          {getDescriptionText()}
        </Typography>

        <Grid container spacing={3}>
          {filteredTests.map((test, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <StyledCard>
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{ color: "#ff9800", textAlign: "center" }}
                  >
                    {test.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ color: "#333", textAlign: "center" }}
                  >
                    {test.subject}
                  </Typography>
                  <StyledButton
                    variant="contained"
                    color="primary"
                    onClick={() => handleTestSelection(test)}
                  >
                    Teszt kitöltése
                  </StyledButton>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        {selectedTest && (
          <Paper
            elevation={3}
            style={{ padding: "20px", borderRadius: "10px", marginTop: "20px" }}
          >
            <Typography
              variant="h5"
              gutterBottom
              style={{ color: "#333", textAlign: "center" }}
            >
              {selectedTest.title} - {selectedTest.subject}
            </Typography>
            <List>
              {requestedQuestionsAndAnswers[selectedTest.title].map(
                (item, index) => (
                  <div key={index} style={{ marginBottom: "20px" }}>
                    <ListItem
                      style={{
                        backgroundColor: "#f0f0f0",
                        borderRadius: "5px",
                        padding: "10px",
                        border: "1px solid #ccc",
                      }}
                    >
                      <ListItemText
                        primary={`${index + 1}. kérdés: ${item.question}`}
                        style={{ color: "#333" }}
                      />
                    </ListItem>
                    <ListItem
                      style={{
                        backgroundColor: "#f0f0f0",
                        borderRadius: "5px",
                        padding: "10px",
                        border: "1px solid #ccc",
                      }}
                    >
                      <RadioGroup
                        value={answers[index] || ""}
                        onChange={(event) => handleAnswerChange(event, index)}
                      >
                        {item.answers.map((answer, answerIndex) => (
                          <FormControlLabel
                            key={answerIndex}
                            value={answer}
                            control={<Radio />}
                            label={answer}
                            disabled={showResults}
                            style={{ color: "#333" }}
                          />
                        ))}
                      </RadioGroup>
                    </ListItem>
                    <hr style={{ margin: "10px 0", borderColor: "#ddd" }} />
                  </div>
                )
              )}
            </List>

            <StyledButton
              variant="contained"
              color="primary"
              onClick={handleCheckAnswers}
              disabled={showResults}
            >
              Ellenőrzés
            </StyledButton>
          </Paper>
        )}
        {showResults && (
          <Paper
            elevation={3}
            style={{ padding: "20px", borderRadius: "10px", marginTop: "20px" }}
          >
            <Typography
              variant="h5"
              gutterBottom
              style={{ color: "#333", textAlign: "center" }}
            >
              Eredmények
            </Typography>
            <List>
              {Object.keys(answers).map((questionIndex) => (
                <ListItem key={questionIndex}>
                  <ListItemText
                    primary={`${parseInt(questionIndex) + 1}. kérdés: ${
                      requestedQuestionsAndAnswers[selectedTest.title][
                        questionIndex
                      ].question
                    }`}
                    secondary={
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Typography
                          variant="body2"
                          style={{
                            color: isAnswerCorrect(
                              questionIndex,
                              answers[questionIndex]
                            )
                              ? "green"
                              : "red",
                          }}
                        >
                          {isAnswerCorrect(
                            questionIndex,
                            answers[questionIndex]
                          )
                            ? "Helyes válasz"
                            : "Rossz válasz"}
                        </Typography>
                        <IconButton
                          onClick={() => handleShowCorrectAnswer(questionIndex)}
                          style={{ marginLeft: "10px" }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                        {showCorrectAnswer[questionIndex] && (
                          <Typography
                            variant="body2"
                            style={{ marginLeft: "10px", color: "blue" }}
                          >
                            {
                              requestedQuestionsAndAnswers[selectedTest.title][
                                questionIndex
                              ].correctAnswer
                            }
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
