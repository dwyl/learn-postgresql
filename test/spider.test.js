const tap = require('tap');
const escape = require('pg-escape');
const spider = require('../server/spider');
const db = require('../server/db');
const seed = Math.floor(Math.random() * Math.floor(100000));

tap.test('crawl non-existent page to test 404', function (t) {
  spider.fetch('/totesamaze' + seed, function(err, data) {
    t.equal(err, 404, 'err: ' + err + ' (as expected ;-)');
    t.end()
  });
});


tap.test('crawl @dwyl org', function (t) {
  // we must TRUNCATE the orgs table when running tests:
  db.PG_CLIENT.query('TRUNCATE TABLE orgs CASCADE', function (err0, result0) {
    t.equal(err0, null, 'no error running "TRUNCATE TABLE orgs"');
    t.equal(result0.command, 'TRUNCATE', 'orgs table successfully truncated');

    spider.fetch('dwyl', function(err, data) {
      require('./fixtures/make-fixture')('org.json', data);
      t.end();
    });
  });
});

tap.test('crawl @iteles person profile', function (t) {
  db.PG_CLIENT.query('TRUNCATE TABLE people CASCADE', function (err0, result0) {
    t.equal(err0, null, 'no error running "TRUNCATE TABLE people"');
    t.equal(result0.command, 'TRUNCATE', 'people table successfully truncated');

    spider.fetch('iteles', function(err, data) {
      // delete(data.contrib_matrix); // TMI!
      require('./fixtures/make-fixture')('person.json', data);
      t.end()
    });

  }); // end TRUNCATE
});

tap.test('crawl dwyl/todo-list-javascript-tutorial', function (t) {
  db.PG_CLIENT.query('TRUNCATE TABLE repos CASCADE', function (err0, result0) {
    t.equal(err0, null, 'no error running "TRUNCATE TABLE repos"');
    t.equal(result0.command, 'TRUNCATE', 'repos table successfully truncated');

    spider.fetch('dwyl/todo-list-javascript-tutorial', function(err, data) {
      require('./fixtures/make-fixture')('repo.json', data);
      t.end()
    });
  }); // end TRUNCATE
});

tap.test('crawl dwyl/health', function (t) {
  db.PG_CLIENT.query('TRUNCATE TABLE repos CASCADE', function (err0, result0) {
    t.equal(err0, null, 'no error running "TRUNCATE TABLE repos"');
    t.equal(result0.command, 'TRUNCATE', 'repos table successfully truncated');

    spider.fetch('dwyl/health', function(err, data) {
      require('./fixtures/make-fixture')('repo.json', data);

      const select = escape('SELECT * FROM repos ORDER by id DESC LIMIT 1');
      db.PG_CLIENT.query(select, function(err, result) {
        t.equal(result.rows[0].url, data.url, 'repo.url ' + data.url);
        t.end();
      });
    });

  }); // end TRUNCATE
});


tap.test('crawl /dwyl/health/stargazers', function (t) {
  // db.PG_CLIENT.query('TRUNCATE TABLE repos CASCADE', function (err0, result0) {
  //   t.equal(err0, null, 'no error running "TRUNCATE TABLE repos"');
  //   t.equal(result0.command, 'TRUNCATE', 'repos table successfully truncated');

    spider.fetch('/dwyl/health/stargazers', function(err, data) {
      require('./fixtures/make-fixture')('stargazers.json', data);
      db.end(() => {
        t.end()
      }); // close connection to database
    });

  // }); // end TRUNCATE
});
