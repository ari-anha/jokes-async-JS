const mainController = (req, res) => {
  res.send({
    message: 'Welcome to my jokes API!',
  });
}

const serveJokes = (req, res) => {
  res.send({
    message: "This is the all jokes endpoint",
  });
}

const serveOneJoke = (req, res) => {
  res.send({
    message: "This serves one random joke",
  });
}

const servePersonalJoke = (req, res) => {
  res.send({
    message: "This serves on random joke with a personalised name",
  });
}

module.exports = {
  mainController,
  serveJokes,
  serveOneJoke,
  servePersonalJoke
};