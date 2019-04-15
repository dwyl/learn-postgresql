const db = require('./db');
const utils = require('./utils');
const gs = require('github-scraper');

function fetch (path, callback) {
  gs(path, function(error, data) {
    if (error) { // don't bother trying to save data if an error occurred
      utils.log_error(error, data, new Error().stack); // get exact stack trace.
      return utils.exec_cb(callback, error, data);
    }
    console.log('data.type:', data.type);
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
      case 'followers': // multiple cases same outcome.
      case 'following':
      case 'people':
      case 'stars':
        fetch_list_of_profiles_slowly(data, callback);
        break;
    }
  });
}

/**
 * fetch_list_of_profiles_slowly does what it's name suggests.
 * attempting to fetch GitHub profiles too quickly results in errors.
 * @param {object} data - should contain url and entries (a list of people).
 * @param {function} next - the function executed once profiles are saved.
 * @param {function} callback - the callback function to be executed if any.
 */
function fetch_list_of_profiles_slowly (data, callback) {
  const len = data.entries.length;

  data.entries.forEach((u, i) => { // poor person's "async parallel":

    setTimeout(function delayed_request () { // delay requests to avoid errors

      gs(u.username, function process (error, profile) {
        utils.log_error(error, profile, new Error().stack);

        db.insert_person(profile, function (err2, data2) {

          if (i == len - 1) { // only insert relationships once people records
            return db.insert_relationships(data, callback); // once per batch.
          }  // e.g: db.insert_stars(data, callback) in the case of 'stars' page
        });
      });
    }, i * 1000); // timer gets longer as i increases to avoid flooding!
  });
}

module.exports = {
  fetch: fetch
}
