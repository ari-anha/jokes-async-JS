const express = require('express');

const app = express();

const {
  jokesController,
  randomJokeController,
  personalJokeController
} = require('../src/controller.js')

app.use(express.static('public'));

app.get('/jokes', jokesController);

app.get('/jokes/random', randomJokeController);

app.get('/jokes/random/personal/:first/:last', personalJokeController);

module.exports = app;