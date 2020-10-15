import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';

const StartStop = ({ start, running, setRunning }) => {
  // GlobalContext blobk and unblock Onclick of the Buttons

  useEffect(() => {
    let timerID = setInterval(() => start(), 1000);
    return () => clearInterval(timerID);
  });

  return (
    <React.Fragment>
      {!running ? (
        <div>
          <Button
            variant='contained'
            color='primary'
            onClick={() => setRunning(true)}
          >
            Start
          </Button>
          <Button variant='contained' color='secondary' disableElevation>
            Stop
          </Button>
        </div>
      ) : (
        <div>
          <Button variant='contained' color='primary' disableElevation>
            Start
          </Button>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => setRunning(false)}
          >
            Stop
          </Button>
        </div>
      )}
    </React.Fragment>
  );
};

export default StartStop;
