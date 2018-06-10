const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const api = require('./routes/api.js');

app.use(bodyParser.json());

const allowedOrigins = [
    'http://localhost:7777',
    'http://localhost:7779',
    'http://localhost:4200'
]

app.use(function(req, res, next) {
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Credentials', true);

    next();
});

app.use('/api', api.usersRouter);
app.use('/api', api.placesRouter);

// Unknown EndPoint
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(3003, () => console.log('The server is listening on http://localhost:3003'));
