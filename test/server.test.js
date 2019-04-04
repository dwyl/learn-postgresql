const test = require('tap').test;
const server = require('../server/server.js');
const request = require('supertest')(server.url);

test('connect to server', function (t) {
  request.get('/')
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      server.close(function () { console.log('Server closed!'); });
      t.end()
    });
});
