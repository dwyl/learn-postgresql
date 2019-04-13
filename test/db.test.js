process.env.DATABASE_URL = process.env.DATABASE_URL
  || "postgres://postgres:@localhost/codeface";

const seed = Math.floor(Math.random() * Math.floor(100000));
const tap = require('tap'); // see: github.com/dwyl/learn-tape
const escape = require('pg-escape'); // npmjs.com/package/pg-escape santise Q's
const db = require('../server/db');

// execute to exercise branch:
db.exec_cb(null, '(Don\'t Panic! This is only a test ;-)');
/*
const path = 'dwyl' + seed;
db.insert_log_item(path, null, function (err, result) {
  const select = escape('SELECT * FROM logs ORDER by id DESC LIMIT 1');
  db.PG_CLIENT.query(select, function(err, result) {
    // console.log(err, result.rows[0]);
    test.equal(result.rows[0].path, path, 'logs.path is ' + path);
    // db.end(); // close connection to database
  });
});

db.select_next_page(function (err, result) {
  const select = escape('SELECT * FROM logs ORDER by id DESC LIMIT 1');
  db.PG_CLIENT.query(select, function(err, result) {
    // console.log(err, result);
    test.equal(result.rows[0].path, path, 'next page is ' + path);
    // db.end(); // close connection to database
  });
});

*/
tap.test('insert_person', function(t) {
  const person = require('./fixtures/person.json');
  console.log(person.url);
  // we must TRUNCATE the orgs table when running tests:
  db.PG_CLIENT.query('TRUNCATE TABLE people CASCADE', function (err2, result2) {

    db.insert_person(person, function (err, result) {
      const select = escape('SELECT * FROM people ORDER by id DESC LIMIT 1');
      db.PG_CLIENT.query(select, function(err, result) {
        console.log(err, result);
        t.equal(result.rows[0].name, person.name, 'person.name ' + person.name);
        // db.end(); // close connection to database
        t.end();
      });
    });

  });
});
/*
tap.test('insert_org', function(t) {
  const org = require('./fixtures/org.json');
  // given that we have a uniqueness constraint on the name and uid fields
  // we must TRUNCATE the orgs table when running tests:
  db.PG_CLIENT.query('TRUNCATE TABLE orgs CASCADE', function (err2, result2) {

    db.insert_org(org, function (err, result) {

      const select = escape('SELECT * FROM orgs ORDER by id DESC LIMIT 1');
      db.PG_CLIENT.query(select, function(err, result) {
        // console.log(err, result.rows[0]);
        t.equal(result.rows[0].uid, org.uid, 'org.uid ' + org.uid);
        t.equal(result.rows[0].name, org.name, 'org.name ' + org.name);

        // db.end(() => {
          t.end();
        // }); // close connection to database
      });
    });
  });
});


tap.test('insert_repo', function(t) {
  const repo = require('./fixtures/repo.json');
  console.log('repo:', repo);
  // given that we have a uniqueness constraint on the name and uid fields
  // we must TRUNCATE the orgs table when running tests:
  db.PG_CLIENT.query('TRUNCATE TABLE repos CASCADE', function (err2, result2) {

    db.insert_repo(repo, function (err, result) {

      const select = escape('SELECT * FROM repos ORDER by id DESC LIMIT 1');
      db.PG_CLIENT.query(select, function(err, result) {
        // console.log(err, result.rows[0]);
        t.equal(result.rows[0].url, repo.url, 'repo.url ' + repo.url);
        // t.equal(result.rows[0].name, org.name, 'org.name ' + org.name);

        // db.end(() => {
          t.end();
        // }); // close connection to database
      });
    });
  });
});
*/


tap.test('db.end()', function(t) {
  db.end(function(err, data) {
    // console.log(db.PG_CLIENT);
    t.equal(db.PG_CLIENT._ending, true);
    t.end();
  });
});
