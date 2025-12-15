const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { ArticlesRouter } = require('./routes/route');

app.use(ArticlesRouter)

app.get('/', (req, res) => {
  res.send('Hello World');
});

const port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(port, () => { console.log(`http://localhost:${port}`); });
}).catch((err) => { console.log(err); });