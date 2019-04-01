const DBURL = process.env.DATABASE_URL
  || "postgres://postgres:@localhost/codeface";
const pg = require('pg');
const client = new pg.Client(DBURL); // Create PostgreSQL Client/Connection
const test = require('tap'); // see: github.com/dwyl/learn-tape

client.connect(function(err) {
  if (err) {
    console.log(' - - - - - - - - - - - - - - - -> err:')
    console.error(err);
    console.log('- - - - - - - - - - - - - - - - - - - ');
    assert(!err); // "die" if we cannot connect to the database!
  }
  else {
    var SELECT = 'SELECT * FROM people';
    client.query(SELECT, function (err, result) {
      if (err) {
        console.error(err);
      }
      console.log('result:', result.rows[0]);
      test.equal(result.rows[0].username, 'jimmy', 'username is jimmy');
      client.end(); // close connection to database
    });
  }
});