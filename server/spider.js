const db = require('./db');
const gs = require('github-scraper');

function fetch (path, callback) {
  gs(path, function(err, data) {
    // console.log('data:', data);

    return db.exec_cb(callback, err, data)
  })
}

module.exports = {
  fetch: fetch
}
