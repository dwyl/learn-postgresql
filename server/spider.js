const db = require('./db');
const utils = require('./utils');
const gs = require('github-scraper');

function fetch (path, callback) {
  gs(path, function(error, data) {
    if (error) { // don't bother trying to save data if an error occurred
      utils.log_error(error, data, new Error().stack);
      return utils.exec_cb(callback, error, data);
    }
    console.log('data.type:', data.type, ' | data.name:', data.name);
    switch (data.type) {
      case 'org':
        db.insert_org(data, callback);
        break;
      case 'profile':
        db.insert_person(data, callback);
        break;
      case 'repo':
        db.insert_repo(data, callback);
        break;
    }
  })
}

module.exports = {
  fetch: fetch
}
