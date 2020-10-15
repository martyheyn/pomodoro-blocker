import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import InfoIcon from '@material-ui/icons/Info';

import Website from './Website';

import { GlobalContext } from '../context/GlobalState';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
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
      <button type='button' onClick={handleOpen}>
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
            <h2>Blocked Sites</h2>
            {websites.length >= 1 ? (
              <p>
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
