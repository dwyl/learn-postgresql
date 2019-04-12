const test = require('tap').test;
const spider = require('../server/spider');
const db = require('../server/db');
const seed = Math.floor(Math.random() * Math.floor(100000));
/*
test('crawl non-existent page to test 404', function (t) {
  spider.fetch('/totesamaze' + seed, function(err, data) {
    t.equal(err, 404, 'err: ' + err + ' (as expected ;-)');
    // db.end(); // close connection to database
    t.end()
  });
});


test('crawl @dwyl org', function (t) {
  // we must TRUNCATE the orgs table when running tests:
  db.PG_CLIENT.query('TRUNCATE TABLE orgs CASCADE', function (err0, result0) {
    t.equal(err0, null, 'no error running "TRUNCATE TABLE orgs"');
    t.equal(result0.command, 'TRUNCATE', 'orgs table successfully truncated');

    spider.fetch('dwyl', function(err, data) {
      // console.log(err, data);
      // console.log(data);
      // require('./fixtures/make-fixture')('org.json', data);
      // db.end(); // close connection to database
      t.end()
    });
  });
});
*/
test('crawl @iteles person profile', function (t) {
  spider.fetch('iteles', function(err, data) {
    // console.log(err, data.entries[0]);
    // console.log(data);
    require('./fixtures/make-fixture')('person.json', data);
    db.end(); // close connection to database
    t.end()
  });
});
