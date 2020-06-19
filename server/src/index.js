const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
app.use(morgan('common'));
app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});

app.use((req, res, next) => {
  const error = new Error('Not found - ${req.originalUrl}');
  res.statusCode(404);
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? 'Hidden' : error.stack,
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Listening at http://localhost:8080');
});
