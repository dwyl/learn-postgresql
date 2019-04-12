const db = require('./db');
const gs = require('github-scraper');




function fetch (path, callback) {
  gs(path, function(err, data) {
    if (err) { // don't bother trying to save data if an error occurred
      return db.exec_cb(callback, err, data);
    }
    console.log('data.type:', data.type);
    switch (data.type) {
      case 'org':
        console.log('org.name:', data.name);
        db.insert_org(data, callback);
        break;
      case 'profile':

        return db.exec_cb(callback, err, data)
        // break;
    }
    // if (data && data.)
    // console.log('data:', data);

    //
  })
}

module.exports = {
  fetch: fetch
}
