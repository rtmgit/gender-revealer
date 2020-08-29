import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Confetti from 'react-confetti';
import { StoreUserDataContext } from '../context/StoreUserDataContext';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#ffb812'
  },  
  paper: {
    paddingTop: 90,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  revealBtn: {
    backgroundColor: '#ffb812',
    border: '2px solid black'
  }
}));

const flipCoin = (gender) => {
  console.log("Already in Flip Method")
  const coin = document.querySelector('#coin');
  coin.setAttribute('class', '');
  //const random = Math.random();
  let result = '';
  if(gender === 'boy') {
    result = 'heads';
  } else if(gender === 'girl') {
    result = 'tails';
  } else {
    result = "error";
  }
  
  setTimeout(() => {
   coin.setAttribute('class', 'animate-' + result);
 }, 1000);
}

export default function GenderRevealerPage() {
  const classes = useStyles();
  const { width, height } = window;
  const [isRevealed, setIfRevealed] = useState(false);
  const { userGlobalData } = useContext(StoreUserDataContext);

  const getContentToReveal = () => {
    let gender = undefined;
    console.log("Reveal gender: ",userGlobalData.actualGender);
    if(userGlobalData.actualGender.toLowerCase() === 'boy') {
      gender = 'Boy';
    } else if(userGlobalData.actualGender.toLowerCase() === 'girl') {
      gender = 'Girl';
    } 

    if(gender) {
      return (
        <div className="revealed-content">
          <Confetti width={width} height={height} />
          <h1 className="congrats-msg">Congratulations!</h1>
          <h1>{userGlobalData.husbandName.toUpperCase() +' & '+userGlobalData.spouseName.toUpperCase()}</h1>
          <div id="coin" className="image-center">
          {(gender === 'Boy')?<div id="heads" className="heads"></div>:<div id="tails" className="final-tails"></div>}
          </div>
          <h1 className="gender-reveal-msg">It's a Baby {gender}!</h1>
          {userGlobalData.videoURL&&<a href={userGlobalData.videoURL} download="video.webm">Download the video here</a>}
        </div>
      );
    } else {
      return (<h3>Sorry, unable to reveal the gender.</h3>);
    }
  }
  const reavelGender = () => {
    setIfRevealed(true);
  }

  return (
    <div className="App revealPage">
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        {isRevealed?getContentToReveal():
        <>
        <Typography component="h1" variant="h5">
          Is it King or Queen?
        </Typography>
        <div className="App">
          <div className='container1'>
            <div id="coin" onClick={() => reavelGender()}>
              <div id="heads" className="heads"></div>
              <div id="tails" className="tails"></div>
            </div>
            <Button id="flip" 
                  type="button"
                  fullWidth
                  variant="contained" 
                  className={classes.revealBtn}
                  onClick={ () => flipCoin(userGlobalData.actualGender)}>Reveal Gender
            </Button>
          </div>
          <br/>
          <Typography>
            Note: After few seconds click on rotating image to reveal it.
          </Typography>
        </div>
        </>
        }
      </div>
    </Container>
    </div>  
  );
}