import React, { useEffect, useContext } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { GlobalContext } from '../context/GlobalState';

import '../styles/StartStop.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const StartStop = ({ time, start, reset }) => {
  const classes = useStyles();
  const {
    addTimer,
    stopTimer,
    websites,
    timer,
    running,
    work,
    unblock,
  } = useContext(GlobalContext);

  let websiteList = '';
  if (work) {
    websiteList = websites;
  } else {
    websiteList = [];
  }

  const startTimer = () => {
    console.log(websites.length);
    console.log(websiteList.length);
    const newTimer = {
      time: {
        minutes: time.minutes,
        seconds: time.seconds,
      },
      websites: websiteList,
    };

    addTimer(newTimer);
  };

  const stopTimerButton = () => {
    const id = timer.map((time) => time._id);
    stopTimer(id[0]);
  };

  const unblockButton = () => {
    unblock(timer);
  };

  useEffect(() => {
    let timerID = setInterval(() => start(), 1000);
    return () => clearInterval(timerID);
  });

  return (
    <div className='start-stop'>
      {!running ? (
        <div className={classes.root}>
          <Button variant='contained' color='primary' onClick={startTimer}>
            Start
          </Button>
          <Button variant='contained' color='secondary' disableElevation>
            Stop
          </Button>
          <Button variant='contained' onClick={reset}>
            Reset
          </Button>
          <Button variant='contained' color='primary' disableElevation>
            Unblock
          </Button>
        </div>
      ) : (
        <div className={classes.root}>
          <Button variant='contained' color='primary' disableElevation>
            Start
          </Button>
          <Button
            variant='contained'
            color='secondary'
            onClick={stopTimerButton}
          >
            Stop
          </Button>
          <Button variant='contained' onClick={reset}>
            Reset
          </Button>
          <Button variant='contained' color='primary' onClick={unblockButton}>
            Unblock
          </Button>
        </div>
      )}
    </div>
  );
};

export default StartStop;
