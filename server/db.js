process.env.DATABASE_URL = process.env.DATABASE_URL
  || "postgres://postgres:@localhost/codeface";
const assert = require('assert');
const escape = require('pg-escape'); // npmjs.com/package/pg-escape santise Q's
const pg = require('pg');
const PG_CLIENT = new pg.Client(process.env.DATABASE_URL);
console.log('L7: PG_CLIENT._connecting:', PG_CLIENT._connecting, // debug
  '| PG_CLIENT._connected:', PG_CLIENT._connected);

// start pg connection when module is required
connect(function (err, data) {
  console.log('L12: PG_CLIENT._connected:', PG_CLIENT._connected); // confirm
  console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -');
})

// pg.connect(process.env.DATABASE_URL, function(err, client, done) {
//   assert(!err, 'ERROR Connecting to PostgreSQL!');
//
//   console.log({ client: client, done: done});
//
//   PG_CLIENT = client; // assign client to GLOBAL for later use
//   const select = escape('SELECT * FROM people WHERE id = %L', '1');
//   console.log(select);
//   PG_CLIENT.query(select, function(err, result) {
//     // console.log(err, result);
//     console.log(JSON.stringify(result.rows[0]), ' ... it\'s working. ;-)');
//   });
//   return PG_CLIENT;
// });

/**
 * exec_cb runs a callback if it's a function avoids type error if not a func.
 */
function exec_cb (callback, err, data) {
  if (typeof callback === 'function') {
    return callback(err, data);
  } // if callback is undefine or not a function do nothing!
}

/**
 * connnect ensures that a postgres connection is available before continuing
 * @param {function} callback - function called once connection is confirmed.
 */
function connect (callback) {
  // console.log('L45: PG_CLIENT._connecting:', PG_CLIENT._connecting,
  //   '| PG_CLIENT._connected:', PG_CLIENT._connected);
  if (PG_CLIENT && !PG_CLIENT._connected && !PG_CLIENT._connecting) {
    PG_CLIENT.connect(function (error, data) {
      assert(!error, 'L49: ERROR Connecting to PostgreSQL!');
      return exec_cb(callback, error, PG_CLIENT);
    });
  } else {
    return exec_cb (callback, null, PG_CLIENT);
  }
}

/**
 * insert_person saves a person's data.
 *
 */
function insert_person (data, callback) {

}

/**
 * insert_log_item does exactly what it's name suggests inserts a log enty.
 *
 */
function insert_log_item (path, callback) {
  const q = escape(`INSERT INTO log (path) VALUES (%L)`, path);
}

/**
 * select_next_page get the next path (page) to crawl
 */
function select_next_page (callback) {
  const q = escape(`SELECT DISTINCT(path) FROM log
             ORDER BY inserted_at DESC
             LIMIT 1`);

}

module.exports = {
  connect: connect,
  insert_log_item: insert_log_item,
  select_next_page: select_next_page,
  PG_CLIENT: PG_CLIENT
}
