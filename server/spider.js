const db = require('./db');
const gs = require('github-scraper');


function fetch (path, callback) {
  gs(path, function(err, data) {
    return db.exec_cb(callback, err, data)
    // console.log(data); // or what ever you want to do with the data
  })
}

module.exports = {
  fetch: fetch
}

// gs('torvalds', function(err, data) {
//   console.log(err, data);
// });
