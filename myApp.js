require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// simple logger
app.use(function (req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// root
app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'));

// static assets
app.use('/public', express.static(__dirname + '/public'));

// >>> /json (LEE process.env DENTRO DEL HANDLER) <<<
app.get('/json', (req, res) => {
  const base = 'Hello json';
  const message =
    process.env.MESSAGE_STYLE === 'uppercase' ? base.toUpperCase() : base;
  res.json({ message });
});

// chained middleware example
app.get(
  '/now',
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => res.json({ time: req.time })
);

// echo
app.get('/:word/echo', (req, res) => res.json({ echo: req.params.word }));

// query + body
app
  .route('/name')
  .get((req, res) => {
    res.json({ name: `${req.query.first} ${req.query.last}` });
  })
  .post((req, res) => {
    res.json({ name: `${req.body.first} ${req.body.last}` });
  });

module.exports = app;
