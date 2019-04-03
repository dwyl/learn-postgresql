/* istanbul ignore next */
process.env.DATABASE_URL = process.env.DATABASE_URL
  || "postgres://postgres:@localhost/codeface";
const assert = require('assert');
const escape = require('pg-escape'); // npmjs.com/package/pg-escape santise Q's
const pg = require('pg');
const PG_CLIENT = new pg.Client(process.env.DATABASE_URL);
console.log('L7: PG_CLIENT._connecting:', PG_CLIENT._connecting, // debug
  '| PG_CLIENT._connected:', PG_CLIENT._connected);

// auto-start pg connection when module is required so startup is faster!
connect(function (err, data) {
  console.log('L12: PG_CLIENT._connected:', PG_CLIENT._connected); // confirm
  console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -');
})

/**
 * exec_cb runs a callback if it's a function avoids type error if not a func.
 * @param {function} callback - the callback function to be executed if any.
 * @param
 */
function exec_cb (callback, error, data) {
  if (error) { console.info('db.js:23 ERROR:', error); }
  if (callback && typeof callback === 'function') {
    return callback(error, data);
  } // if callback is undefine or not a function do nothing!
  return;
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

function end () {
  if(PG_CLIENT && PG_CLIENT._connected && !PG_CLIENT._connecting) {
    PG_CLIENT.end();
  }
}

/**
 * insert_person saves a person's data to the people table.
 *
 */
function insert_person (person, callback) {
  console.log('L62: test', person);
  connect( function () {
    const { name, username, company, uid, location } = person;
    // console.log('name:', name, '| username:', username, '| company:', company,
    //   '| uid:', uid, '| location:', location);
    const fields = '(name, username, company, location, uid)'
    // console.log(fields, name, username, company, uid, location);
    let q = escape('INSERT INTO people %s VALUES (%L, %L, %L, %L, $1)',
      fields, name, username, company, location);
      q = q.replace('$1', parseInt(uid, 10));
    // console.log('L66: query:', q);

    PG_CLIENT.query(q, function(err, result) {
      // console.log(err, result);
      return exec_cb (callback, err, result);
    });
  });
}

/**
 * insert_log_item does exactly what it's name suggests inserts a log enty.
 *
 */
function insert_log_item (path, callback) {
  connect( function () {
    const query = escape(`INSERT INTO logs (path) VALUES (%L)`, path);
    // console.log('L66: query:', query);
    PG_CLIENT.query(query, function(err, result) {
      // console.log(err, result);
      return exec_cb (callback, err, result);
    });
  });
}

/**
 * select_next_page get the next path (page) to crawl
 */
function select_next_page (callback) {
  connect( function () {
    const q = escape(`SELECT path FROM logs
               ORDER BY id ASC
               LIMIT 1`);
    // console.log('L82: query:', q);
    PG_CLIENT.query(q, function(err, result) {
      // console.log('L84:', err, result);
      return exec_cb (callback, err, result);
    });
  });
}

module.exports = {
  connect: connect,
  end: end,
  exec_cb: exec_cb,
  insert_log_item: insert_log_item,
  select_next_page: select_next_page,
  insert_person: insert_person,
  PG_CLIENT: PG_CLIENT
}
