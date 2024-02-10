import './App.css';
import { AppBar, ResAppBar } from './ResAppBar';
import SignIn from './SignIn';  
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import SignUp from './SignUp';

function App() {
  return (
    <>
        <ResAppBar></ResAppBar>
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
