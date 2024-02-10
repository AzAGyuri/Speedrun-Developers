import './App.css';
import { AppBar, ResAppBar } from './ResAppBar';
import SignInSide from './SignInSide';  
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function App() {
  return (
    <>
    <ResAppBar></ResAppBar>
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
