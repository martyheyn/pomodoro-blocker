import React from 'react';
import Navbar from './components/Navbar';
import Clock from './components/Clock';
import AddWebsites from './components/AddWebsites';

import { GlobalProvider } from './context/GlobalState';

function App() {
  return (
    <GlobalProvider>
      <Navbar />
      <div className='container'>
        <Clock />
        {/* if running === true then make websites disappear */}
        <AddWebsites />
      </div>
    </GlobalProvider>
  );
}

export default App;
