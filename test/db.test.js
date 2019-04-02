process.env.DATABASE_URL = process.env.DATABASE_URL
  || "postgres://postgres:@localhost/codeface";

const seed = Math.floor(Math.random() * Math.floor(100000));
const test = require('tap'); // see: github.com/dwyl/learn-tape
const escape = require('pg-escape'); // npmjs.com/package/pg-escape santise Q's
const db = require('../server/db');

// execute to exercise branch:
db.exec_cb(null, 'Running Tests (Don\'t Panic!)');

db.connect(function (err, PG_CLIENT) {
  const select = escape('SELECT * FROM people WHERE id = %L', '1');
  PG_CLIENT.query(select, function(err, result) {
    test.equal(result.rows[0].username, 'jimmy', 'username is jimmy');
    // db.end(); // close connection to database
  });
});

const path = 'dwyl' + seed;
db.insert_log_item(path, function (err, result) {
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

const person = {
  name: 'Alex',
  username: 'alex' + seed,
  company: 'Alex Scuba Co',
  uid: seed,
  location: 'Atlantis'
};
db.insert_person(person, function (err, result) {
  const select = escape('SELECT * FROM people ORDER by id DESC LIMIT 1');
  db.PG_CLIENT.query(select, function(err, result) {
    // console.log(err, result.rows[0]);
    test.equal(result.rows[0].name, person.name, 'person.name ' + person.name);
    db.end(); // close connection to database
    db.end(); // close connection to database
  });
});

db.end();
