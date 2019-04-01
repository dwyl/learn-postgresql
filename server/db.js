process.env.DATABASE_URL = process.env.DATABASE_URL
  || "postgres://postgres:@localhost/codeface";
const assert = require('assert');
const pg = require('pg');
const escape = require('pg-escape'); // npmjs.com/package/pg-escape
let PG_CLIENT; // connect once and expose the connection via PG_CLIENT
pg.connect(process.env.DATABASE_URL, function(err, client, done) {
  assert(!err, 'ERROR Connecting to PostgreSQL!');
  PG_CLIENT = client; // assign client to GLOBAL for later use
  const select = escape('SELECT * FROM people WHERE id = %L', '1');
  console.log(select);
  PG_CLIENT.query(select, function(err, result) {
    // console.log(err, result);
    console.log(JSON.stringify(result.rows[0]), ' ... it\'s working. ;-)');
  });
  return;
});

/**
 * insert_person saves a person's data.
 *
 */
