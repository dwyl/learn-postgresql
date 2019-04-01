process.env.DATABASE_URL = process.env.DATABASE_URL
  || "postgres://postgres:@localhost/codeface";

const test = require('tap'); // see: github.com/dwyl/learn-tape
const escape = require('pg-escape'); // npmjs.com/package/pg-escape santise Q's
const db = require('../server/db');


db.connect(function (err, PG_CLIENT) {
  const select = escape('SELECT * FROM people WHERE id = %L', '1');
  PG_CLIENT.query(select, function(err, result) {
    test.equal(result.rows[0].username, 'jimmy', 'username is jimmy');
    PG_CLIENT.end(); // close connection to database
  });
});
