const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { dbConnection } = require('./db/config');

dotenv.config();
const app = express();
dbConnection();

app.use(cors());

app.use(express.static('public'));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/event', require('./routes/events'));

app.listen(process.env.PORT, () =>
  console.log('server up in: ', process.env.PORT)
);
