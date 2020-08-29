import React, { useState, useContext } from 'react';
import {
  Typography, Button, CssBaseline, TextField, Checkbox, Link, Paper, Grid,
  Dialog, AppBar, List, ListItem, ListItemText, Divider, Toolbar, IconButton, Slide, FormControlLabel
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import ErrorIcon from '@material-ui/icons/Error';
import familyImg from '../family.jpg';
import VideoRecorder from '../components/VideoRecorder';
import { StoreUserDataContext } from '../context/StoreUserDataContext';
import GenerateSecretCode from '../components/GenerateSecretCode';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundColor: '#ffb812'
  },
  contentHolder: {

    backgroundColor: '#ffb812'
  },
  image: {
    backgroundImage: 'url(' + familyImg + ')',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#ffb812',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#ffb812'
  },

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  appBar: {
    position: 'relative',
    backgroundColor: '#ffb812'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  deleteVideoBtn: {
    marginLeft: "111px",
    padding: 1,
    minWidth: "27px"
  },
  errorMsg: {
    color: "#d91406"
  },
  errorMsgFont: {
    fontSize: "21px"
  },
  errorIcon: {
    fontSize: "1.3rem"
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function GetDetailsPage() {
  const classes = useStyles();
  const [isRecordVideoSelected, setRecordVideoSelected] = useState(false);
  const [open, setOpen] = useState(false);
  const { userGlobalData, storeUserGlobalData } = useContext(StoreUserDataContext);
  const [userLocalInfo, setUserDataLocally] = useState({ ...userGlobalData });
  const [isSecretCodeLinkEvent, captureSecretCodeLinkEvent] = useState(false);
  const [isDataProvided, setIfUserProvidedData] = useState(false);
  const genderData = ["boy", "girl"];
  //const genderTextFieldIDs = ["husbandExpectingGender", "spouseExpectingGender", "expectingGender", "actualGender", "gender"];
  const [errorMessage, setErrorMessage] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (isSecretCodeLinkEvent) {
      captureSecretCodeLinkEvent(false);
    }
    setOpen(false);
  };

  const handleInputChange = (e) => {
    setUserDataLocally({
      ...userLocalInfo,
      [e.target.name]: e.target.value
    });
  }

  const handleSecretCodeLink = () => {
    captureSecretCodeLinkEvent(true);
    handleClickOpen();
  }

  const setVideoContentToLocalStore = (blobContent, url) => {
    setUserDataLocally({
      ...userLocalInfo,
      videoContent: blobContent,
      videoURL: url
    });
  }

  const handleFormSubmit = () => {
    console.log("User Data: ", userLocalInfo);
    if ((userLocalInfo.husbandName !== '') && (userLocalInfo.spouseName !== '') && (userLocalInfo.expectingGender !== '') && (userLocalInfo.actualGender !== '') &&
      (!userLocalInfo.isVideoRecorded || (userLocalInfo.videoContent && userLocalInfo.videoURL))) {
      console.log("All data is provided. But need to validate the data: ", userLocalInfo.husbandName);
      if (genderData.includes(userLocalInfo.expectingGender.toLowerCase())) {
        if (genderData.includes(userLocalInfo.actualGender.toLowerCase())) {
          setIfUserProvidedData(true);
          let globalData = { type: "POST_USER_DATA", payload: { ...userLocalInfo } }
          globalData.payload['actualGender'] = userLocalInfo.actualGender.toLowerCase();
          storeUserGlobalData(globalData);
          console.log("User Global Data: ", userGlobalData);
        } else {
          let decodedGenderInfo = atob(userLocalInfo.actualGender);
          console.log("Decoded Gender: ", decodedGenderInfo);
          let genderInfo = decodedGenderInfo.split('##')[0];
          console.log("Decoded Gender: ", genderInfo);
          if (genderData.includes(genderInfo.toLowerCase())) {
            setIfUserProvidedData(true);
            let globalData = { type: "POST_USER_DATA", payload: { ...userLocalInfo } }
            globalData.payload['actualGender'] = genderInfo.toLowerCase();
            storeUserGlobalData(globalData);
            console.log("User Global Data: ", userGlobalData);
          } else {
            setErrorMessage("Please provide valid gender details");
            setIfUserProvidedData(false);
          }
        }
      } else {
        setErrorMessage("Please provide valid gender details");
        setIfUserProvidedData(false);
      }
    } else {
      console.log("All data is not provided.Please check");
      setErrorMessage("Please provide all the details");
      setIfUserProvidedData(false);
    }
  }

  const getVideoRecorderPopup = () => {
    return (
      <>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Camera
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            <ListItemText primary="What's your reaction if you are getting baby girl or baby boy?" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Can you predict how your baby will look?" />
          </ListItem>
          <ListItem>
            <ListItemText primary="What would you like your child to be in future?" />
          </ListItem>
          <Divider />
          <ListItem button>
            <VideoRecorder setVideoContentToParentState={setVideoContentToLocalStore} />
          </ListItem>
        </List>
      </>
    );
  }

  const getSecretCodePopup = () => {
    return (
      <>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Secret Code
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            <ListItemText primary="What is secret code?" />
          </ListItem>
          <ListItem>
            <ListItemText primary="If you don't know the gender and some of your well wishers knows the gender (like your parents, your doctor...). Your can ask them to generate this secret code by sharing the below URL" />
          </ListItem>
          <ListItem>
            <ListItemText primary="They will enter the gender in textbox and it automatically generate the secret code." />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Note: If you are facing problems with audio input. Please wait for some time. Sorry for the delay" />
          </ListItem>
          <Divider />
          <ListItem>
            <GenerateSecretCode />
          </ListItem>
        </List>
      </>
    );
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={false} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className={classes.contentHolder}>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Please fill below details:
          </Typography>
          <div className={classes.form}>
            <TextField id="husbandName" name="husbandName" label="Husband Name" value={userLocalInfo.husbandName} onChange={(e) => handleInputChange(e)} variant="outlined" margin="normal" required fullWidth autoComplete="off" />
            <TextField id="spouseName" name="spouseName" label="Spouse Name" value={userLocalInfo.spouseName} onChange={(e) => handleInputChange(e)} variant="outlined" margin="normal" required fullWidth autoComplete="off" />
            <TextField id="expectingGender" name="expectingGender" label="Expecting Boy or Girl" value={userLocalInfo.expectingGender} onChange={(e) => handleInputChange(e)} variant="outlined" margin="normal" required fullWidth autoComplete="off" />
            <TextField id="actualGender" name="actualGender" label="Enter Secret Code" value={userLocalInfo.actualGender} onChange={(e) => handleInputChange(e)} variant="outlined" margin="normal" required fullWidth autoComplete="off" />

            <Grid container>
              <Grid item xs>
                <Link variant="body2">What is secret code?</Link>
              </Grid>
              <Grid item>
                <Link variant="body2" onClick={() => handleSecretCodeLink()}>Get secret code</Link>
              </Grid>
            </Grid>

            {
              (userLocalInfo.videoURL === undefined) &&
              (<>
                <FormControlLabel control={<Checkbox checked={isRecordVideoSelected} onChange={() => setRecordVideoSelected(!isRecordVideoSelected)} color="primary" />}
                  label="Do you want to record video for your baby memory?" />
                <Button type="button" disabled={!isRecordVideoSelected} onClick={handleClickOpen} className={classes.submit} fullWidth variant="contained" color="primary">
                  Record our video
                  </Button>
              </>)
            }
            {
              (userLocalInfo.videoURL !== undefined) &&
              (<List>
                <Divider />
                <ListItem><h3>Recorded Video:</h3><Button type="button" onClick={() => setVideoContentToLocalStore()} className={classes.deleteVideoBtn} variant="contained" color="primary"><DeleteIcon /></Button></ListItem>
                <ListItem><video style={{ width: '400px', border: '5px solid black', borderRadius: '5px', marginBottom: '10px' }} src={userLocalInfo.videoURL} autoPlay controls /></ListItem>
                <Divider />
              </List>)
            }
            {!isDataProvided ? ((errorMessage !== undefined && errorMessage !== '') && (<div className={classes.errorMsg}><ErrorIcon className={classes.errorIcon} /><span className={classes.errorMsgFont}>{errorMessage}</span></div>)) : <Redirect to='/revealIt' />}
            <Button type="button" onClick={() => handleFormSubmit()} className={classes.submit} fullWidth variant="contained" color="primary">
              Continue <ArrowForwardIcon style={{ paddingLeft: 7, fontSize: 25 }} />
            </Button>
          </div>
          <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            {isSecretCodeLinkEvent ? getSecretCodePopup() : (open && getVideoRecorderPopup())}
          </Dialog>
        </div>
      </Grid>
    </Grid>
  );
}