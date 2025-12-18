const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const app = express();

// CORS configuration - Allow all origins
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

const port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(port, () => { console.log(`http://localhost:${port}`); });
}).catch((err) => { console.log(err); });