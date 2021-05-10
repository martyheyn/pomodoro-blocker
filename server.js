const path = require('path');
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/db');

// Connect to environment variables
dotenv.config({ path: './config/config.env' });

// Connect to DB
connectDB();

// connect the routes script
const timers = require('./routes/timers');

// Initialize express
const app = express();

// Middleware
app.use(express.json());

// Specify dev mode with morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/timer', timers);

// Specify production with morgan
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

// Connect to http
app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
      .yellow.bold
  )
);
