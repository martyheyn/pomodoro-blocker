import React, { useContext } from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import { GlobalContext } from '../context/GlobalState';

const TabBar = ({ setTime }) => {
  const { setWork, setBreak, stopTimer, timer } = useContext(GlobalContext);
  const [value, setValue] = React.useState(0);
  const initialWorkTime = { minutes: 25, seconds: 0 };
  const initialBreakTime = { minutes: 5, seconds: 0 };

  console.log('render');

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const workTime = (e) => {
    e.preventDefault();
    setTime(initialWorkTime);
    setValue(0);
    setWork();
  };

  const breakTime = (e) => {
    e.preventDefault();

    // Unblock sites
    const id = timer.map((time) => time._id);
    stopTimer(id[0]);

    setTime(initialBreakTime);
    setValue(1);
    setBreak();
  };

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary">
        <Tab label='Work' onClick={workTime} />
        <Tab label='Break' onClick={breakTime} />
      </Tabs>
    </div>
  );
};

export default TabBar;
