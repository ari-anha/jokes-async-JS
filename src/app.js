const express = require('express');

const app = express();
app.use(express.json());

const {
  mainController,
  serveJokes,
  serveOneJoke,
  servePersonalJoke
} = require('../src/controller.js')

app.get('/', mainController);

app.get('/jokes', serveJokes);

app.get('/joke/random', serveOneJoke);

app.get('/joke/random/personal/:first/:last', servePersonalJoke);

module.exports = app;
