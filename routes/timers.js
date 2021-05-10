const express = require('express');
const router = express.Router();
const {
  startTimer,
  getTimer,
  deleteTimer,
  unblock,
} = require('../controllers/timers');

router.route('/').get(getTimer).post(startTimer).delete(unblock);

router.route('/:id').delete(deleteTimer);

module.exports = router;
