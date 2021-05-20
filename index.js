const express = require('express');

const app = express();

app.get('/', (req, rest) => {});

app.listen(4000, () => console.log('server up'));
