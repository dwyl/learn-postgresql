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
      case 'stars':
        fetch_list_of_profiles_slowly(data, callback);
        break;
      // case 'followers':
      //   utils.exec_cb(callback, error, data);
      //   break;
    }
  })
}

function fetch_list_of_profiles_slowly (data, callback) {
  const len = data.entries.length;
  data.entries.forEach((u, i) => { // poor person's "async parallel":
    const username = u.username;
    setTimeout(function () {
      console.log('username:', username);
      gs(username, function process (error, profile) {

        console.log(error, profile.name);
        // delete(profile.contrib_matrix);
        db.insert_person(profile, function (err2, data2) {
          console.log(i, len, err2, data2.username);
          if(i == len - 1) {
            
            return utils.exec_cb(callback, null, data);
          }
        });
      });
    }, i * 1000); // timer gets longer as we go.
  });
}

module.exports = {
  fetch: fetch
}
