const express = require('express');
const app = express();
const books = require('./routes/books');
const chapters = require('./routes/chapters');
const movies = require('./routes/movies');
const quotes = require('./routes/quotes');

app.use(express.json());
const cors = require('cors');
app.use(cors())
app.use('/books', books);
app.use('/chapters', chapters);
app.use('/movies', movies);
app.use('/quotes', quotes);
require('dotenv').config();
const dbConnData = {
  host: process.env.MONGO_HOST || '127.0.0.1',
  port: process.env.MONGO_PORT || 27017,
  database: process.env.MONGO_DATABASE || 'lotr'
};

const mongoose = require('mongoose');

mongoose
  .connect(`mongodb://${dbConnData.host}:${dbConnData.port}/${dbConnData.database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(response => {
    console.log(`Connected to MongoDB. Database name: "${response.connections[0].name}"`)
    const port = process.env.PORT || 5000
    app.listen(port, () => {
      console.log(`API server listening at http://localhost:${port}`);
    });
  })
  .catch(error => console.error('Error connecting to MongoDB', error));

