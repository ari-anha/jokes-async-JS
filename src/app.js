const express = require('express');

const app = express();

const {
  mainController,
  jokesController,
  randomJokeController,
  personalJokeController
} = require('../src/controller.js')

app.get('/', mainController);

app.get('/jokes', jokesController);

app.get('/jokes/random', randomJokeController);

app.get('/jokes/random/personal/:first/:last', personalJokeController);

module.exports = app;
