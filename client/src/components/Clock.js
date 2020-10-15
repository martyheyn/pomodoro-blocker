import React, { useState } from 'react';
import StartStop from './StartStop';

const Clock = () => {
  const [time, setTime] = useState({ minutes: 25, seconds: 0 });
  const [running, setRunning] = useState(false);

  const tick = () => {
    if (!running) return;
    if (time.minutes === 0 && time.seconds === 0) return;
    else if (time.seconds === 0) {
      setTime({
        minutes: time.minutes - 1,
        seconds: 59,
      });
    } else {
      setTime({
        minutes: time.minutes,
        seconds: time.seconds - 1,
      });
    }
  };

  return (
    <React.Fragment>
      <h1>Clock</h1>
      <div className='clock'>
        {`${time.minutes
          .toString()
          .padStart(2, '0')} : ${time.seconds.toString().padStart(2, '0')}`}
      </div>
      <StartStop start={tick} running={running} setRunning={setRunning} />
    </React.Fragment>
  );
};

export default Clock;
