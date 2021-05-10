import React, { useState, useContext, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import WebsiteList from './WebsiteList';
import AddIcon from '@material-ui/icons/Add';
import { v4 as uuidv4 } from 'uuid';
import formatWebsite from '../utils/formatWebsite';

import { GlobalContext } from '../context/GlobalState';

import '../styles/AddWebsite.css';

const AddWebsites = () => {
  const { addWebsite, websites } = useContext(GlobalContext);
  const [website, setWebsite] = useState('');
  const [helperText, setHelperText] = useState();

  const onSubmit = (e) => {
    e.preventDefault();

    // Add to the list
    const newSite = {
      id: uuidv4(),
      website: formatWebsite(website),
    };

    setWebsite('');

    // Quality testing error checks
    // If website isn't null or the site name
    if (newSite.website === null) {
      setHelperText('Website is null');
    } else if (newSite.website.includes('localhost:3000')) {
      setHelperText('Cannot block this site silly');
    } else if (websites.length > 4) {
      setHelperText('Cannot add more than 5 sites');
    } else {
      setHelperText('Great success');
      addWebsite(newSite);
    }
  };

  // Only rerender when the website is submitted
  useEffect(() => {
    setTimeout(() => {
      setHelperText('');
    }, 3000);
  }, [websites]);

  return (
    <div className='add-website'>
      <form noValidate autoComplete='off' onSubmit={onSubmit}>
        <div className='add-website-row'>
          <TextField
            className='add-website-input'
            id='filled-basic'
            label='Websites to block'
            variant='filled'
            value={website}
            helperText={helperText}
            onChange={(e) => setWebsite(e.target.value)}
          />
          {/* Add a website to the list */}
          <button className='add-website-button'>
            <AddIcon />
          </button>
          <WebsiteList />
        </div>
      </form>
    </div>
  );
};

export default AddWebsites;
