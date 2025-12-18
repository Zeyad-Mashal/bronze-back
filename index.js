const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const app = express();

// Manual CORS headers middleware (runs before everything)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  res.header('Access-Control-Allow-Origin', origin || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  res.header('Access-Control-Expose-Headers', 'Content-Range, X-Content-Range');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
});

// CORS configuration - Allow all origins (backup)
const corsOptions = {
  origin: true, // Allow all origins
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin'
  ],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { ArticlesRouter, ServicesRouter, ReservationsRouter } = require('./routes/route');

app.use(ArticlesRouter);
app.use(ServicesRouter);
app.use(ReservationsRouter);

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Global error handler to ensure CORS headers are always set
app.use((err, req, res, next) => {
  // Set CORS headers even on errors
  const origin = req.headers.origin;
  res.header('Access-Control-Allow-Origin', origin || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');

  if (err) {
    console.error('Error:', err);
    return res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error',
      error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
  next();
});

const port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(port, () => { console.log(`http://localhost:${port}`); });
}).catch((err) => { console.log(err); });