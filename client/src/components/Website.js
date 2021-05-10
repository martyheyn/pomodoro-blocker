import React, { useContext } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

import { GlobalContext } from '../context/GlobalState';

import '../styles/Website.css';

const Website = ({ website, id }) => {
  const { deleteWebsite, running } = useContext(GlobalContext);

  return (
    <li className='website'>
      {website}
      {!running ? (
        <React.Fragment>
          {/* Delete the website from the list while not running */}
          <button
            className='website-delete-button'
            onClick={() => deleteWebsite(id)}
          >
            <DeleteIcon />
          </button>
        </React.Fragment>
      ) : (
        ''
      )}
    </li>
  );
};

export default Website;
