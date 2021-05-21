const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(express.static('public'));
app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => console.log('server up'));
