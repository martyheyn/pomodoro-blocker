import React, { useContext } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

import { GlobalContext } from '../context/GlobalState';

const Website = ({ website, id }) => {
  const { deleteWebsite } = useContext(GlobalContext);

  return (
    <li>
      {website}
      {/* Delete the website from the list */}
      <button onClick={() => deleteWebsite(id)}>
        <DeleteIcon />
      </button>
    </li>
  );
};

export default Website;
