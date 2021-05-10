const Timer = require('../models/Timer');
const { block, unblock } = require('./block');

// @desc    Start the timer & block sites
// @route   POST /api/timer/
// @access  Public
exports.startTimer = async (req, res, next) => {
  try {
    const { time, websites } = req.body;
    const timer = await Timer.create(req.body);

    // Block sites
    if (websites.length > 0) {
      const blockedSites = websites.map((website) => website.website);
      block(blockedSites);
    }

    return res.status(201).json({
      success: true,
      data: timer,
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

// @desc    Delete transaction
// @route   DELETE /api/timer/:id
// @access  Public
exports.deleteTimer = async (req, res, next) => {
  try {
    const timer = await Timer.findById(req.params.id);
    const { websites } = timer;

    // Unblock
    if (websites.length > 0) {
      const unBlockedSites = websites.map((website) => website.website);
      unblock(unBlockedSites);
    }

    if (!timer) {
      return res.status(404).json({
        success: false,
        error: 'No timer found',
      });
    }

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

// For backend testing
// @desc    get all timers just for backend testing purposes
// @route   GET /api/timer/ Stop timer by added id maybe
// @access  Public
exports.getTimer = async (req, res, next) => {
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

// For backend testing
// @desc    delete/unblock all sites
// @route   DELETE /api/timer Stop timer by added id maybe
// @access  Public
exports.unblock = async (req, res, next) => {
  try {
    const data  = await Timer.find();
    console.log('Now')

    // clear mongodb db
    if(data.length > 0){
      console.log('Here')
      // Get all of the websites
      let websites = [];
      data.forEach(d => {
        // get site array
        const site = d.websites;
        // check to see if the array is empty
        if(site.length > 0){
          site.map(s => {
            websites.push(s.website)
          });
        };

      // Call unblock on them
      unblock(websites);
      });
      
      await Timer.deleteMany();
    }

    return res.status(201).json({
      success: true,
      // data: timer,
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
