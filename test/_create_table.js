const DBURL = process.env.DATABASE_URL
  || "postgres://postgres:@localhost/codeface";
const assert = require('assert');
const pg = require('pg');
const resolve = require('path').resolve;
const read = require('fs').readFileSync;
const client = new pg.Client(DBURL); // Create PostgreSQL Client

// NEXT: use https://github.com/dwyl/ordem to run the tasks ...


const schema = read(resolve('./schema.sql'), 'utf8').toString();
console.log('\n', schema);

/**
 * create_tables sets up the database tables we need for the MVP app
 * @param  {Function} callback called if/when the SQL script succeeds!
 */
function create_tables (callback) {

  client.query(schema, function(err, result) {
    if (err) {
      console.error(err);
    }
    console.info('DB Table Created & Test Data Inserted');
    var SELECT = 'SELECT * FROM people';
    client.query(SELECT, function(err, result) {

      client.end(); // close connection to database
      return callback(err, result);
    })
  });

}

client.connect(function(err) {
  if (err) {
    console.log(' - - - - - - - - - - - - - - - -> err:')
    console.error(err);
    console.log('- - - - - - - - - - - - - - - - - - - ');
    assert(!err); // "die" if we cannot connect to the database!
  }
  else {
    create_tables(function (err, result) {
      if (err) {
        console.error(err);
      }
      console.log('result:', result.rows[0]);
    });
  }
});
