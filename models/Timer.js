const mongoose = require('mongoose');

const TimerSchema = new mongoose.Schema({
  time: {
    minutes: {
      type: Number,
      required: true,
    },
    seconds: {
      type: Number,
      required: true,
    },
  },
  websites: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Timer', TimerSchema);
