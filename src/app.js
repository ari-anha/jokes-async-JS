const express = require('express');

const app = express();
app.use(express.json());

const {mainController} = require('../src/controller.js')

app.get('/', mainController);

app.get('/jokes', (req, res) => {
  res.send({
    message: "This is the all jokes endpoint",
  });
})

app.get('/joke/random', (req, res) => {
  res.send({
    message: "This serves one random joke",
  });
})

app.get('/joke/random/personal/:first/:last', (req, res) => {
  res.send({
    message: "This serves on random joke with a personalised name",
  })
})

module.exports = app;
