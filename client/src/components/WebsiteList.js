import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Backdrop, Fade } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import Website from './Website';

import { GlobalContext } from '../context/GlobalState';

import '../styles/WebsiteList.css';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    whiteSpace: 'pre-wrap',       /* CSS3 */   
    // whiteSpace: '-moz-pre-wrap',  /* Firefox */  
    wordWrap: 'break-word',       /* IE */
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // width: '100%',
    maxWidth: 900,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const WebsiteList = () => {
  const { websites } = useContext(GlobalContext);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpen} className='info-button'>
        <InfoIcon />
      </button>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h1>Blocked Sites</h1>
            {websites.length >= 1 ? (
              <p className='modal-text'>
                {websites.map((website) => (
                  <Website
                    key={website.id}
                    id={website.id}
                    website={website.website}
                  />
                ))}
              </p>
            ) : (
              <p>None</p>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
export default WebsiteList;
