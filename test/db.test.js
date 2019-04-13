process.env.DATABASE_URL = process.env.DATABASE_URL
  || "postgres://postgres:@localhost/codeface";

const tap = require('tap'); // see: github.com/dwyl/learn-tape
const escape = require('pg-escape'); // npmjs.com/package/pg-escape santise Q's
const db = require('../server/db');

const seed = Math.floor(Math.random() * Math.floor(100000));
const path = 'dwyl' + seed;

tap.test('db.select_next_page selects next_page to be viewed', function(t) {
  db.insert_log_item(path, null, function (err, result) {
    const select = escape('SELECT * FROM logs ORDER by id DESC LIMIT 1');
    db.PG_CLIENT.query(select, function(err, result) {
      t.equal(result.rows[0].path, path, 'logs.path is ' + path);
      t.end();
    });
  });
});

tap.test('db.select_next_page selects next_page to be viewed', function(t) {
  db.select_next_page(function (err, result) {
    const select = escape('SELECT * FROM logs ORDER by id DESC LIMIT 1');
    db.PG_CLIENT.query(select, function(err, result) {
      t.equal(result.rows[0].path, path, 'next page is ' + path);
      t.end();
    });
  });
});


tap.test('insert_person insert test/fixtures/person.json data', function(t) {
  const person = require('./fixtures/person.json');
  console.log(person.url);
  // we must TRUNCATE the orgs table when running tests:
  db.PG_CLIENT.query('TRUNCATE TABLE people CASCADE', function (err2, result2) {

    db.insert_person(person, function (err, result) {
      const select = escape('SELECT * FROM people ORDER by id DESC LIMIT 1');
      db.PG_CLIENT.query(select, function(err, result) {
        t.equal(result.rows[0].name, person.name, 'person.name ' + person.name);
        t.end();
      });
    });

  });
});

tap.test('insert_org', function(t) {
  const org = require('./fixtures/org.json');
  // given that we have a uniqueness constraint on the name and uid fields
  // we must TRUNCATE the orgs table when running tests:
  db.PG_CLIENT.query('TRUNCATE TABLE orgs CASCADE', function (err2, result2) {

    db.insert_org(org, function (err, result) {
      const select = escape('SELECT * FROM orgs ORDER by id DESC LIMIT 1');
      db.PG_CLIENT.query(select, function(err, result) {
        t.equal(result.rows[0].uid, org.uid, 'org.uid ' + org.uid);
        t.equal(result.rows[0].name, org.name, 'org.name ' + org.name);
        t.end();
      });
    });
  });
});

tap.test('insert_repo', function(t) {
  const repo = require('./fixtures/repo.json');
  // given that we have a uniqueness constraint on the name and uid fields
  // we must TRUNCATE the orgs table when running tests:
  db.PG_CLIENT.query('TRUNCATE TABLE repos CASCADE', function (err2, result2) {

    db.insert_repo(repo, function (err, result) {

      const select = escape('SELECT * FROM repos ORDER by id DESC LIMIT 1');
      db.PG_CLIENT.query(select, function(err, result) {
        t.equal(result.rows[0].url, repo.url, 'repo.url ' + repo.url);
        t.end();
      });
    });
  });
});

tap.test('db.end() close database connection so tests can finish', function(t) {
  db.end(function(err, data) {
    t.equal(db.PG_CLIENT._ending, true,
        'db.PG_CLIENT._ending: ' + db.PG_CLIENT._ending);
    t.end();
  });
});
