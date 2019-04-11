const test = require('tap').test;
const spider = require('../server/spider');
const db = require('../server/db');

test('crawl @dwyl org', function (t) {
  spider.fetch('dwyl', function(err, data) {
    console.log(err, data.entries[0]);
    db.end(); // close connection to database
    t.end()
  });
});
