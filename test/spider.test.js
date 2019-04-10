const test = require('tap').test;
const spider = require('../server/spider');
const db = require('../server/db');

test('connect to server', function (t) {
  spider.fetch('dwyl', function(err, data) {
    console.log(err, data);
    db.end(); // close connection to database
    t.end()
  });
});
