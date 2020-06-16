const request = require('supertest');
const app = require('../src/app');

it('GET / should respond with a welcome message', done => {
  request(app)
    .get('/')
    .then(res => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('Welcome to my jokes API!');
      done();
    });
});

it('GET / should tell you it is the all jokes endpoint', done => {
  request(app)
    .get('/jokes')
    .then(res => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('This is the all jokes endpoint');
      done();
    });
});

it('GET / should tell you it gives you one random joke', done => {
  request(app)
    .get('/joke/random')
    .then(res => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('This serves one random joke');
      done();
    });
});

it('GET / should tell you it gives you one random joke with a personalised name', done => {
  request(app)
    .get('/joke/random/personal/Arianha/Bayley')
    .then(res => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('This serves on random joke with a personalised name');
      done();
    });
});