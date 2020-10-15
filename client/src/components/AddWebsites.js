import React, { useState, useContext } from 'react';
import { TextField } from '@material-ui/core';
import WebsiteList from './WebsiteList';
import AddIcon from '@material-ui/icons/Add';
import { v4 as uuidv4 } from 'uuid';

import { GlobalContext } from '../context/GlobalState';

const AddWebsites = () => {
  const { addWebsite } = useContext(GlobalContext);
  const [website, setWebsite] = useState();

  const onSubmit = (e) => {
    e.preventDefault();

    // Add to the list
    const newSite = {
      id: uuidv4(),
      website,
    };

    setWebsite('');
    addWebsite(newSite);
  };

  return (
    <React.Fragment>
      <form noValidate autoComplete='off' onSubmit={onSubmit}>
        <TextField
          id='filled-basic'
          label='Websites to block'
          variant='filled'
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        {/* Add a website to the list */}
        <button>
          <AddIcon />
        </button>
        <WebsiteList />
      </form>
    </React.Fragment>
  );
};

export default AddWebsites;
