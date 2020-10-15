const Timer = require('../models/Timer');
const { block, unblock } = require('./block');

// @desc    Start the timer & block sites
// @route   POST /api/timer/
// @access  Public
exports.startTimer = async (req, res, next) => {
  try {
    const { time, websites } = req.body;

    // const timer = await Timer.create(req.body);

    // Block sites function
    unblock();

    return res.status(201).json({
      // success: true,
      // data: timer,
      data: 'Blocked Maybe',
    });
  } catch (err) {
    console.log(err);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: err,
      });
    }
  }
};

// @desc    Stop the timer & unblock sites
// @route   GET /api/timer/ Stop timer by added id maybe
// @access  Public
exports.stopTimer = async (req, res, next) => {
  try {
    const timer = await Timer.find();

    return res.status(201).json({
      success: true,
      data: timer,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  }
};

// @desc    Delete transaction
// @route   DELETE /api/v1/timer/:id
// @access  Public
exports.deleteTimer = async (req, res, next) => {
  try {
    const timer = await Timer.findById(req.params.id);

    if (!timer) {
      return res.status(404).json({
        success: false,
        error: 'No timer found',
      });
    }

    // Unblock

    await timer.remove();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};
