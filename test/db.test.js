process.env.DATABASE_URL = process.env.DATABASE_URL
  || "postgres://postgres:@localhost/codeface";

const tap = require('tap'); // see: github.com/dwyl/learn-tape
const db = require('../server/db');

const seed = Math.floor(Math.random() * Math.floor(100000));
const url = '/dwyl';

tap.test('db.select_next_page selects next_page to be viewed', function(t) {
  db.PG_CLIENT.query('TRUNCATE TABLE logs', function (err0, result0) {
    t.equal(err0, null, 'no error running "TRUNCATE TABLE logs"');
    t.equal(result0.command, 'TRUNCATE', 'logs table successfully truncated');

    db.insert_log_item(url, url + seed, function (err, result) {
      const select = 'SELECT * FROM logs ORDER by id DESC LIMIT 1';
      db.PG_CLIENT.query(select, function(err, result) {
        // console.log(result);
        t.equal(result.rows[0].url, url, 'logs.url is ' + url);
        t.end();
      });
    });
  });
});

tap.test('db.select_next_page selects next_page to be viewed', function(t) {
  db.select_next_page(function (err, result) {
    t.equal(result.rows[0].next_page, url + seed,
      'next_page is: ' + result.rows[0].next_page);
    t.end();
  });
});


tap.test('insert_person insert test/fixtures/person.json data', function(t) {
  const person = require('./fixtures/person.json');
  db.insert_person(person, function (err, result) {
    db.select_person(person.username, function(err, result) {
      t.equal(result.rows[0].name, person.name, 'person.name ' + person.name);
      t.end();
    });
  });
});

tap.test('insert_org', function(t) {
  const org = require('./fixtures/org.json');
  // given that we have a uniqueness constraint on the name and uid fields
  // we must TRUNCATE the orgs table when running tests:
  db.PG_CLIENT.query('TRUNCATE TABLE orgs CASCADE', function (err2, result2) {

    db.insert_org(org, function (err, result) {
      const select = 'SELECT * FROM orgs ORDER by id DESC LIMIT 1';
      db.PG_CLIENT.query(select, function(err, result) {
        t.equal(result.rows[0].uid, org.uid, 'org.uid ' + org.uid);
        t.equal(result.rows[0].name, org.name, 'org.name ' + org.name);
        t.end();
      });
    });
  });
});

tap.test('select_repo', function(t) {
  const repo = require('./fixtures/repo.json');
  db.insert_repo(repo, function (err, result) {
    db.select_repo(repo.url, function (err1, result1) {
      t.equal(result1.rows[0].url, repo.url, 'repo.url ' + repo.url);
      t.end();
    });
  });
});

tap.test('insert_relationships', function(t) {
  const stars = require('./fixtures/stargazers.json');
  db.insert_relationships(stars, function (err0, result0) { // insert all "stars"

    const repo_url = stars.url.replace('/stargazers', ''); // e.g: /dwyl/health

    db.select_repo(repo_url, function (err1, data1) {

      const repo_id = data1.rows[0].id;
      console.log('repo_id:', repo_id);
      const username = stars.entries[0].username; // e.g: SimonLab
      console.log('username:', username);

      db.select_person(username, function (err2, data2) {
        const person_id = data2.rows[0].id;
        const select = `SELECT * FROM relationships
          WHERE person_id = $1 AND repo_id = $2
          ORDER by inserted_at DESC LIMIT 1`;

        db.PG_CLIENT.query(select, [person_id, repo_id], function(err, result) {
          t.equal(result.rowCount, 1, '"stars" relationship inserted');
          t.end();
        });
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
