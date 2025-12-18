const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const app = express();

// CORS configuration
const corsOptions = {
    origin: [
        'https://bronze-dashboard.vercel.app',
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:5173',
        'http://localhost:5174'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
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