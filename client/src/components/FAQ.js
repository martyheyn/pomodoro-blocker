import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Backdrop, Fade, Button } from '@material-ui/core';

import '../styles/FAQ.css';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    width: 800,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const FAQ = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen} style={{ color: 'white' }}>
        FAQ
      </Button>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <div className={classes.paper}>
            <h1>FAQ's</h1>
            <ul>
              <li>
                This page is designed to be a Pomodoro Timer with the capabilty
                to block specificied websites.
              </li>
              <li>
                To unblock a website simply the click stop or reset button
              </li>
              <li>
                Althought the traditional Pomodoro timer starts at 25 minutes
                with 5 minute intervals you have the ability to change the timer
              </li>
              <li>
                You can only block up to 5 sites at a time so choose wisely
              </li>
            </ul>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default FAQ;
