/* istanbul ignore next */
process.env.DATABASE_URL = process.env.DATABASE_URL
  || "postgres://postgres:@localhost/codeface";
const pg = require('pg');
const PG_CLIENT = new pg.Client(process.env.DATABASE_URL);
const utils = require('./utils');

console.log('db.js:L7: PG_CLIENT._connecting:', PG_CLIENT._connecting, // debug
  '| PG_CLIENT._connected:', PG_CLIENT._connected);

// auto-start pg connection when module is required so startup is faster!
connect(function (err, data) {
  console.log('db.js:L12: PG_CLIENT._connected:', PG_CLIENT._connected);
  console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -');
})

/**
 * connnect ensures that a postgres connection is available before continuing
 * @param {function} callback - function called once connection is confirmed.
 */
function connect (callback) {
  // console.log('L45: PG_CLIENT._connecting:', PG_CLIENT._connecting,
  //   '| PG_CLIENT._connected:', PG_CLIENT._connected);
  if (PG_CLIENT && !PG_CLIENT._connected && !PG_CLIENT._connecting) {
    PG_CLIENT.connect(function (error, data) {
      utils.log_error(error, data, new Error().stack);
      return utils.exec_cb(callback, error, PG_CLIENT);
    });
  } else {
    return utils.exec_cb(callback, null, PG_CLIENT);
  }
}

/**
 * end used in testing to end/close the Postgres connection:
 * @param {function} callback - callback function to be executed on success.
 */
function end (callback) {
  /* istanbul ignore else */
  if(PG_CLIENT && PG_CLIENT._connected && !PG_CLIENT._connecting) {
    PG_CLIENT.end(() => {
      return utils.exec_cb (callback, null, PG_CLIENT);
    });
  }
}

/**
 * insert_person saves a person's data to the people table.
 * @param {object} data - a valid JSON object containing data to be inserted.
 * @param {function} callback - callback function to be executed on success.
 */
function insert_person (data, callback) {
  connect( function insert_person_after_connected () {
    const { name, username, bio, worksfor, location, website, uid,
      stars, followers, following, contribs } = data;
    const recent_activity = utils.recent_activity(data);
    const query = `INSERT INTO people (name, username, bio, worksfor, location,
      website, uid, stars, followers, following, contribs, recent_activity)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;
    const values = [name, username, bio, worksfor, location, website, uid,
      stars, followers, following, contribs, recent_activity];

    PG_CLIENT.query(query, values, function(error, result) {
      utils.log_error(error, data, new Error().stack);
      return insert_next_page (data, callback);
    });
  });
}

/**
 * select_person gets the person from people table.
 * @param {string} username - username of the person e.g: 'iteles'
 * @param {function} callback - callback function to be executed on success.
 */
function select_person (username, callback) {
  connect( function select_person_after_connected () {
    const query = `SELECT * FROM people WHERE username = $1
      ORDER BY id ASC LIMIT 1`;
    PG_CLIENT.query(query, [username], function(error, result) {
      utils.log_error(error, result, new Error().stack);
      return utils.exec_cb(callback, error, result);
    });
  });
}

/**
 * insert_org saves an org's data to the orgs table.
 *
 */
function insert_org (data, callback) {
  connect( function insert_org_after_connected () {
    const { url,name,description,location,website,email,pcount,uid } = data;
    const query = `INSERT INTO orgs
    (url, name, description, location, website, email, pcount, uid)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
    const values = [url,name,description,location,website,email,pcount,uid];

    PG_CLIENT.query(query, values, function(error, result) {
      utils.log_error(error, data, new Error().stack);
      return insert_next_page (data, callback);
    });
  });
}

/**
 * select_org retrieves the org for a given url.
 * @param {string} url - url of the repo (e.g: /dwyl)
 * @param {function} callback - callback function to be executed on success.
 */
function select_org (url, callback) {
  connect( function select_repo_after_connected () {
    const query = `SELECT * FROM orgs WHERE url = $1 ORDER BY id ASC LIMIT 1`;
    console.log(query, url);
    PG_CLIENT.query(query, [url], function(error, result) {
      utils.log_error(error, result, new Error().stack);
      return utils.exec_cb(callback, error, result);
    });
  });
}

/**
 * insert_repo saves an repo's stats to the repos table.
 * @param {object} data - a valid JSON object containing data to be inserted.
 * @param {function} callback - callback function to be executed on success.
 */
function insert_repo (data, callback) {
  connect( function insert_repo_after_connected () {
    const { url, description, website, tags, langs,
      watchers, stars, forks, commits} = data;
    const query = `INSERT INTO repos
    (url, description, website, tags, langs, watchers, stars, forks, commits)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
    const values = [url, description, website, tags, langs.join(','),
      watchers, stars, forks, commits];

    PG_CLIENT.query(query, values, function(error, result) {
      utils.log_error(error, data, new Error().stack);
      return insert_next_page (data, callback);
    });
  });
}

/**
 * select_repo retrieves the repo for a given url.
 * @param {string} url - url of the repo (e.g: /dwyl/start-here)
 * @param {function} callback - callback function to be executed on success.
 */
function select_repo (url, callback) {
  connect( function select_repo_after_connected () {
    const query = `SELECT * FROM repos WHERE url = $1 ORDER BY id ASC LIMIT 1`;
    url = url.replace('/stargazers', '');
    PG_CLIENT.query(query, [url], function(error, result) {
      utils.log_error(error, result, new Error().stack);
      return utils.exec_cb(callback, error, result);
    });
  });
}

/**
 * insert_relationship saves the list of people who related to another record.
 * @param {object} data - a valid JSON object containing data to be inserted.
 * @param {function} callback - callback function to be executed on success.
 */
function insert_relationships (data, callback) {
  let fields, rel_id, url, username;
  const len = data.entries.length - 1;

  function insert_rows () { // inner function has access to outer variables
    data.entries.forEach((p, i) => { // poor person's "async parallel":
      const username = p.username;
      // console.log('username:', username);
      select_person(username, function(error1, result1) {
        // console.log('L251 > result1: ', result1.rows[0]);
        const person_id = result1.rows[0].id;
        const query = `INSERT INTO relationships (${fields}) VALUES ($1, $2)`
        const values = [person_id, rel_id];
        // console.log('query:', query, 'values:', values);
        PG_CLIENT.query(query, values, function(error2, result2) {
          utils.log_error(error2, result2, new Error().stack);

          if(i === len) {
            return insert_next_page(data, callback);
          }
        });
      });
    }); // END data.entries.forEach
  }
  // there are three types of relationships, we switch based on data.type
  switch (data.type) {
    case 'stars':
      fields = 'person_id, repo_id';
      select_repo(data.url, function (error, result) {
        rel_id = result.rows[0].id;
        insert_rows();
      }); // END select_repo
      break;
    case 'people': // this is a list of members of an organisation
      fields = 'person_id, org_id';
      url =  '/' + data.url.split('/')[2];// /orgs/dwyl/people > /dwyl
      select_org(url, function (error, result) {
        rel_id = result.rows[0].id;
        insert_rows();
      }); // END select_org
      break;
    case 'followers': // this is a list of followers/following
      fields = 'person_id, leader_id';
      username =  data.url.split('/')[1]; // /dwylbot/followers > dwylbot
      // console.log('username', username);
      // list of followers:
      select_person(username, function (error, result) {
        rel_id = result.rows[0].id;
        insert_rows();
      }); // END select_org
      break;
    case 'following': // pay attention to the subtle difference in fields order
      fields = 'leader_id, person_id';
      username =  data.url.split('/')[1]; // /dwylbot/following > dwylbot
      // console.log('username', username);
      // list of followers:
      select_person(username, function (error, result) {
        rel_id = result.rows[0].id;
        insert_rows();
      }); // END select_org
      break;
  }
}

/**
 * insert_log_item does exactly what it's name suggests inserts a log enty
 * @param {String} url - the current url (page) being viewed.
 * @param {String} next_page - the next page to be fetched.
 * @param {function} callback - callback function to be executed on success.
 */
function insert_log_item (url, next_page, callback) {
  connect( function () {
    const query = `INSERT INTO logs (url, next_page) VALUES ($1, $2)`;
    const values = [url, next_page]
    PG_CLIENT.query(query, values, function(error, data) {
      utils.log_error(error, data, new Error().stack);
      return utils.exec_cb(callback, error, data);
    });
  });
}

function profile_next_page(urls, username) {
  urls.push(username + '/followers');
  urls.push(username + '/following');
  urls.push(username + '?tab=repositories');
  return urls;
}

/**
 * insert_next_page inserts the list of next pages to be crawled.
 * @param {Object} data - a valid JSON object containing data to be inserted.
 * @param {function} callback - callback function to be executed on success.
 */
function insert_next_page (data, callback) {
  let urls = []
  switch (data.type) {
    case 'org':
      // console.log('data.name', data.name);
      urls = data.entries.map((e) => e.url);
      urls.push('orgs/' + data.name + '/people'); // list of PUBLIC org members.
      urls.push(data.next_page); // if it exists.
      break;
    case 'profile':
      urls = data.pinned.map((e) => e.url);
      const orgs = Object.keys(data.orgs);
      orgs.forEach(org => urls.push(org));
      urls = profile_next_page(urls, data.username);
      break;
    case 'repo':
      urls.push(data.url + '/stargazers');
      break;
    case 'followers':
    case 'following':
    case 'people':
    case 'stars':
      urls.push(data.next_page);
      data.entries.forEach((e) => { urls = profile_next_page(urls, e.username)})
      break;
  }
  let len = urls.length;
  urls.filter((e) => e !== null) // filter out blanks (if next_page is null)
  .forEach((next_page, i) => { // poor person's "async parallel":
    insert_log_item(data.url, next_page, (error, data2) => {
      if(--len == 0) {
        return utils.exec_cb(callback, null, data);
      }
    })
  });
}

/**
 * select_next_page get the next url (page) to crawl
 */
function select_next_page (callback) {
  connect( function () {
    const query = `SELECT next_page, COUNT (next_page) AS c
    FROM logs
    WHERE next_page IS NOT null
    AND next_page NOT IN (
      SELECT url
      FROM logs
      WHERE url IS NOT NULL
    )
    GROUP BY next_page
    ORDER BY c ASC
    LIMIT 1;`;
    // console.log('L82: query:', query);
    PG_CLIENT.query(query, function(error, data) {
      utils.log_error(error, data, new Error().stack);
      return utils.exec_cb(callback, error, data);
    });
  });
}

module.exports = {
  connect: connect,
  end: end,
  insert_log_item: insert_log_item,
  select_next_page: select_next_page,
  insert_person: insert_person,
  select_person: select_person,
  insert_org: insert_org,
  select_org: select_org,
  insert_repo: insert_repo,
  select_repo: select_repo,
  insert_relationships: insert_relationships,
  PG_CLIENT: PG_CLIENT
}
