const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');

require('dotenv').config();

const middlewares = require('./middlewares');
const routes = require('./routes/catalog');

const app = express();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(morgan('common'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});

app.use('/api/logs', routes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Listening at http://localhost:8080');
});
