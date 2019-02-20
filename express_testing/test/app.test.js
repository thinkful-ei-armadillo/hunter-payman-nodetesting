const app = require('../app');
const expect = require('chai').expect;
const request = require('supertest');

describe('Express App', () => {
  it('GET / should return a message', () => {
    return request(app)
      .get('/')
      .expect(200, 'Hello Express!');
  });
});

describe('GET /sum', () => {
  it('8/4 should be 2', () => {
    return request(app)
      .get('/sum')
      .query({ a: 8, b: 4 })
      .expect(200, '8 divided by 4 is 2');
  });

  it('should return 400 if a is missing', () => {
    return request(app)
      .get('/sum')
      .query({ b: 4 })
      .expect(400, 'Value for a is needed');
  });
});

describe('Frequnecy Endpoint', () => {
  it('Query passed in return 200 when query exists', () => {
    return request(app)
      .get('/frequency')
      .query({ s: 'hello' })
      .expect(200);
  });
  it('return 400 when query does not exist', () => {
    return request(app)
      .get('/frequency')
      .expect(400);
  });

  it('return 200 if only spaces', () => {
    return request(app)
      .get('/frequency')
      .query({ s: '    ' })
      .expect(200);
  });

  it('response should be an object with the correct keys', () => {
    const expected = {
      unique: 4,
      average: 1,
      highest: 2,
      h: 1,
      e: 1,
      l: 2,
      o: 1
    };
    return request(app)
      .get('/frequency')
      .query({ s: 'hello' })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.any.keys('unique', 'average', 'highest');
        expect(res.body).to.have.all.keys(
          'average',
          'highest',
          'unique',
          'h',
          'e',
          'l',
          'o'
        );
      });
    expect(res.body).to.eql(expected);
  });
});
