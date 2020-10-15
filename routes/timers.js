const express = require('express');
const router = express.Router();
const { startTimer, stopTimer, deleteTimer } = require('../controllers/timers');

router.route('/').get(stopTimer).post(startTimer);

router.route('/:id').delete(deleteTimer);

module.exports = router;
