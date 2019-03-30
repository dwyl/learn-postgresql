const DBURL = process.env.DATABASE_URL
  || "postgres://postgres:@localhost/codeface";
const pg = require('pg');
const client = new pg.Client(DBURL); // Create PostgreSQL Client/Connection

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
      client.end(); // close connection to database
    });
  }
});
