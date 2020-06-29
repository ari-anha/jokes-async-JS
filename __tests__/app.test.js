/**
 * @jest-environment node
 */

const request = require('supertest');
const nock = require('nock');
const app = require('../src/app');

describe('GET / - Homepage', () => {
  it('should respond with some homepage markup', async () => {
    const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain('Welcome!');
  });
});

describe('GET /jokes', () => {
  it('should respond with a list of jokes', async () => {
      const mockResponse = {
        type: 'success',
        value: [
          {
            id: 1,
            joke: 'i am a joke',
            categories: [],
          },
          {
            id: 2,
            joke: 'i am another joke',
            categories: [],
          },
        ],
      }
      nock('https://api.icndb.com')
        .get('/jokes')
        .reply(200, mockResponse);

    const res = await request(app).get('/jokes');
    expect(res.statusCode).toEqual(200);
    expect(res.body.jokes).toEqual([
        {
          categories: [],
          id: 1,
          joke: 'i am a joke',
        },
        {
          categories: [],
          id: 2,
          joke: 'i am another joke',
        },
      ]);
    });

  it('should respond with an error message if something goes wrong', async () => {
    nock('https://api.icndb.com')
      .get('/jokes')
      .replyWithError({ statusCode: 500, message: 'huge error'});
    
    const res = await request(app).get('/jokes');
    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toEqual('huge error');
  });
});

describe('GET /jokes/random', () => {
  it ('should respond with a random joke', async () => {
      const mockResponse = {
        type: 'success',
        value: {
          id: 115,
          joke: 'i am a random joke',
          categories: [],
        },
      };

      nock('https://api.icndb.com')
        .get('/jokes/random')
        .query({ exclude: '[explicit]' })
        .reply(200, mockResponse);

      const res = await request(app).get('jokes/random');
      expect(res.statusCode).toEqual(200);
      expect(res.body.randomJoke).toEqual({ categories: [], id: 115, joke: 'i am a random joke' });
  });

  it('should respond with an error message if something goes wrong', async () => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]' })
      .replyWithError({ statusCode: 404, message: 'Unknown resource' });

    const res = await request(app).get('/jokes/random');
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toEqual('Unknown resource');
  });
});

describe('GET /jokes/random/personal', () => {
  it('should respond with a personal joke', async () => {
      const mockResponse = {
        type: "success",
        value: {
          id: 141,
          joke: 'random joke about manchester codes',
          categories: [],
        },
      };

      nock('https://api.icndb.com')
        .get('/jokes/random')
        .query({  exclude: '[explicit]', firstName: 'manchester', lastName: 'codes' })
        .reply(200, mockResponse);

      request(app)
        .get('/jokes/random/personal/manchester/codes')
        .then(res => {
          expect(res.statusCode).toEqual(200);
          expect(res.body.personalJoke).toEqual(mockResponse.value);
        });
  });

  it('should respond with an error message if something goes wrong', async () => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({  exclude: '[explicit]', firstName: 'manchester', lastName: 'codes' })
      .replyWithError({ statusCode: 500, message: 'huge error' });

    request(app)
      .get('/jokes/random/personal/manchester/codes')
      .then(res => {
        expect(res.statusCode).toEqual(500);
        expect(res.body.error).toEqual('huge error');
      });
  });
});