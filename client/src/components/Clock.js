import React, { useState, useContext } from 'react';
import StartStop from './StartStop';
import TabBar from './TabBar';

import { GlobalContext } from '../context/GlobalState';

import '../styles/Clock.css';

const Clock = () => {
  const { stopTimer, stopRunning, timer, work, running } = useContext(
    GlobalContext
  );
  const initialWorkTime = { minutes: 25, seconds: 0 };
  const initialBreakTime = { minutes: 5, seconds: 0 };
  const [time, setTime] = useState(initialWorkTime);

  const tick = () => {
    if (!running) return;
    if (time.minutes === 0 && time.seconds === 0) {
      stopTimer(timer.map((time) => time._id)[0]);
      stopRunning();
    } else if (time.seconds === 0) {
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

  const minuteUp = (e) => {
    e.preventDefault();

    setTime({ minutes: time.minutes + 1, seconds: time.seconds });
  };

  const minuteDown = (e) => {
    e.preventDefault();

    if (time.minutes > 0) {
      setTime({ minutes: time.minutes - 1, seconds: time.seconds });
    }
  };

  const secondUp = (e) => {
    e.preventDefault();

    if (time.seconds < 59) {
      setTime({ minutes: time.minutes, seconds: time.seconds + 1 });
    } else {
      setTime({ minutes: time.minutes + 1, seconds: 0 });
    }
  };

  const secondDown = (e) => {
    e.preventDefault();

    if (time.seconds > 0) {
      setTime({ minutes: time.minutes, seconds: time.seconds - 1 });
    } else {
      setTime({
        minutes: time.minutes - 1,
        seconds: 59,
      });
    }
  };

  const reset = () => {
    // Set running false
    stopTimer(timer.map((time) => time._id)[0]);
    stopRunning();

    if (work === true) {
      setTime({
        minutes: initialWorkTime.minutes,
        seconds: initialWorkTime.seconds,
      });
    } else {
      setTime({
        minutes: initialBreakTime.minutes,
        seconds: initialBreakTime.seconds,
      });
    }
  };

  return (
    <div className='clock'>
      <TabBar setTime={setTime} />
      <div className={!running ? 'caret top-caret' : 'top-caret disabled'}>
        <span onClick={minuteUp} className='caret-spacing'>
          &#9650;
        </span>
        <span onClick={secondUp}>&#9650;</span>
      </div>
      <div className='clock-time'>
        {`${time.minutes.toString().padStart(2, '0')} :
        ${time.seconds.toString().padStart(2, '0')}`}
      </div>
      <div className={!running ? 'caret' : 'disabled'}>
        <span onClick={minuteDown} className='caret-spacing'>
          &#9660;
        </span>
        <span onClick={secondDown}>&#9660;</span>
      </div>
      <StartStop time={time} start={tick} reset={reset} />
    </div>
  );
};

export default Clock;
