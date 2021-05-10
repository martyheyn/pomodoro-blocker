import React, { useContext } from 'react';
import Navbar from './components/Navbar';
import Clock from './components/Clock';
import AddWebsites from './components/AddWebsites';

import { GlobalProvider } from './context/GlobalState';
import { GlobalContext } from './context/GlobalState';

import './App.css';

function App() {
  const { running } = useContext(GlobalContext);
  return (
    <GlobalProvider>
      <Navbar />
      <div className='container'>
        <Clock />
        {!running && <AddWebsites />}
      </div>
    </GlobalProvider>
  );
}

export default App;
