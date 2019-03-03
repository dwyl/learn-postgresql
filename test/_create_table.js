var DBURL = process.env.DATABASE_URL || "postgres://postgres:@localhost/test";
var assert = require('assert');
var pg = require('pg');

/**
 * create_tables sets up the database tables we need for the MVP app
 * @param  {Function} callback called if/when the SQL script succeeds!
 */
function create_tables (callback) {
  var client = new pg.Client(DBURL);
  client.connect(function(err) {
    if (err) {
      console.log(' - - - - - - - - -err:')
      console.log(err);
      console.log('- - - - - - - - - - - - - - - - - - - ');
      assert(!err); // "die" if we cannot connect to the database!
    }
    var file = require('path').resolve('./schema.sql');
    var query = require('fs').readFileSync(file, 'utf8').toString();
    // console.log('\n', query);
    client.query(query, function(err, result) {
      console.log(err, result, 'DB Table Created & Test Data Inserted');
      var SELECT = 'SELECT * FROM people';
      client.query(SELECT, function(err, result) {

        client.end(); // close connection to database
        return callback(err, result);
      })
    });
  });
}

create_tables(function (err, result) {
  console.log(err, 'result:', result.rows[0]);
});
