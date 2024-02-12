import './App.css';
import { AppBar, ResAppBar } from './ResAppBar';
import SignIn from './SignIn';  
import {Tests} from './Tests';  
import {Curriculums} from './Curriculums';  
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import SignUp from './SignUp';
import { MyGroups } from './MyGroups';
import { Settings } from './Settings';

function App() {
  return (
    <>
    <Settings></Settings>
    <ResAppBar></ResAppBar>
    <MyGroups></MyGroups>
    <Tests></Tests>
    <Curriculums></Curriculums>
    <SignIn></SignIn>
    <SignUp></SignUp>
    <Copyright></Copyright>
    </>
  )
}

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="App.js">
        Sulipedia
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default App;
