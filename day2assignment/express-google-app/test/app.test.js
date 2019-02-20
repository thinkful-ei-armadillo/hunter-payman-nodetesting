const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');

describe('GET /apps', () => {
  it('should return an array of apps', () => {
    return request(app)
      .get('/apps')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf.at.least(1);
        const app = res.body[0];
        expect(app).to.include.all.keys(
          'App',
          'Category',
          'Rating',
          'Reviews',
          'Size',
          'Installs',
          'Type',
          'Price',
          'Content Rating',
          'Genres'
        );
        expect(app).to.be.an('object');
      });
  });

  it.only('if sorted by app should return the first appropriate app', () => {
    const expected = {
      App: 'Angry Birds Rio',
      Category: 'GAME',
      Rating: 4.4,
      Reviews: '2610526',
      Size: '46M',
      Installs: '100,000,000+',
      Type: 'Free',
      Price: '0',
      'Content Rating': 'Everyone',
      Genres: 'Arcade',
      'Last Updated': 'July 3, 2018',
      'Current Ver': '2.6.9',
      'Android Ver': '4.1 and up'
    };

    return request(app)
      .get('/apps')
      .query({ sort: 'App' })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body[0]).to.deep.equal(expected);
      });
  });

  it.only('if sorted by rating should return the first appropriate app', () => {
    const expected = {
      App: 'Block Puzzle Classic Legend !',
      Category: 'GAME',
      Rating: 4.2,
      Reviews: '17039',
      Size: '4.9M',
      Installs: '5,000,000+',
      Type: 'Free',
      Price: '0',
      'Content Rating': 'Everyone',
      Genres: 'Puzzle',
      'Last Updated': 'April 13, 2018',
      'Current Ver': '2.9',
      'Android Ver': '2.3.3 and up'
    };

    return request(app)
      .get('/apps')
      .query({ sort: 'Rating' })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body[0]).to.deep.equal(expected);
      });
  });

  it.only('if genres and sort by app name should return the first appropriate app', () => {
    const expected = {
      App: 'Bubble Shooter',
      Category: 'GAME',
      Rating: 4.5,
      Reviews: '148897',
      Size: '46M',
      Installs: '10,000,000+',
      Type: 'Free',
      Price: '0',
      'Content Rating': 'Everyone',
      Genres: 'Casual',
      'Last Updated': 'July 17, 2018',
      'Current Ver': '1.20.1',
      'Android Ver': '4.0.3 and up'
    };

    return request(app)
      .get('/apps')
      .query({ genres: 'Casual', sort: 'App' })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body[0]).to.deep.equal(expected);
      });
  });

  it('should be 400 if sort is incorrect', () => {
    return request(app)
      .get('/apps')
      .query({ sort: 'MISTAKE' })
      .expect(400, 'Sort must be one of rating or app');
  });

  it('should be 400 if genres is incorrect', () => {
    return request(app)
      .get('/apps')
      .query({ genres: 'MMO' })
      .expect(
        400,
        'Genres must be one action, puzzle, strategy, casual, arcade, card'
      );
  });

  it('should be 200 if sort is capitalized and correct', () => {
    return request(app)
      .get('/apps')
      .query({ sort: 'Rating' })
      .expect(200);
  });

  it('should be 200 if sort is lowercase and correct', () => {
    return request(app)
      .get('/apps')
      .query({ sort: 'rating' })
      .expect(200);
  });

  it('should be 200 if sort is uppercase and correct', () => {
    return request(app)
      .get('/apps')
      .query({ sort: 'RATING' })
      .expect(200);
  });

  it('should be 200 if genres is capitalized and correct', () => {
    return request(app)
      .get('/apps')
      .query({ genres: 'Card' })
      .expect(200);
  });

  it('should be 200 if Genres is lowercase and correct', () => {
    return request(app)
      .get('/apps')
      .query({ genres: 'card' })
      .expect(200);
  });

  it('should be 200 if genres is uppercase and correct', () => {
    return request(app)
      .get('/apps')
      .query({ genres: 'CARD' })
      .expect(200);
  });
});
