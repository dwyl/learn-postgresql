/* istanbul ignore next */
process.env.DATABASE_URL = process.env.DATABASE_URL
  || "postgres://postgres:@localhost/codeface";
const escape = require('pg-escape'); // npmjs.com/package/pg-escape santise Q's
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
    const fields = `(name, username, bio, worksfor, location, website, uid,
      stars, followers, following, contribs, recent_activity)`;
    let q = escape(`INSERT INTO people %s
      VALUES (%L, %L, %L, %L, %L, %L, $u, $s, $f, $g, $c, $r)`,
      fields, name, username, bio, worksfor, location, website);
      q = q.replace('$u', parseInt(uid, 10))
        .replace('$s', parseInt(stars, 10))
        .replace('$f', parseInt(followers, 10))
        .replace('$g', parseInt(following, 10))
        .replace('$c', parseInt(contribs, 10))
        .replace('$r', utils.recent_activity(data));

    // console.log('L69: insert_person query:', q);

    PG_CLIENT.query(q, function(error, result) {
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
    let q = escape(`SELECT * FROM people WHERE username = %L
      ORDER BY id ASC LIMIT 1`, username);
    // console.log('L87 q:', q);
    PG_CLIENT.query(q, function(error, result) {
      // console.log(error, result.rows[0]);
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
  const fields = '(' + [ "url", "name", "description", "location",
  "website", "email", "pcount", "uid"].join(',') + ')';
  connect( function insert_org_after_connected () {
    const { url,name,description,location,website,email,pcount,uid } = data;
    // console.log(fields, name, username, company, uid, location);
    const placeholders = '%L, %L, %L, %L, %L, %L, $p, $1'
    let q = escape('INSERT INTO orgs %s VALUES (' + placeholders + ')',
      fields, url,name,description,location,website,email);
      // for some reason pg-escape does not play well with integers ...
      // see: https://github.com/segmentio/pg-escape/issues/15
      // so we are manually replacing the values:
      q = q.replace('$1', parseInt(uid, 10));
      q = q.replace('$p', parseInt(pcount, 10));
    // console.log('L93: query:', q);

    PG_CLIENT.query(q, function(error, result) {
      utils.log_error(error, data, new Error().stack);
      return insert_next_page (data, callback);
    });
  });
}

/**
 * insert_repo saves an repo's stats to the repos table.
 * @param {object} data - a valid JSON object containing data to be inserted.
 * @param {function} callback - callback function to be executed on success.
 */
function insert_repo (data, callback) {

  const fields = '(' + [ "url", "description", "website", "tags", "langs",
  "watchers", "stars", "forks", "commits"].join(',') + ')';
  // console.log('db.js:L105: insert_repo > data', Object.keys(data).join(','));
  connect( function insert_repo_after_connected () {
    const { url, description, website, tags, langs, // string data
      watchers, stars, forks, commits} = data; // int data
    // console.log(fields, name, username, company, uid, location);
    const placeholders = '%L, %L, %L, %L, %L, $w, $s, $f, $c'
    let q = escape('INSERT INTO repos %s VALUES (' + placeholders + ')',
      fields, url, description, website, tags, langs.join(','));
      // for some reason pg-escape does not play well with integers ...
      // see: https://github.com/segmentio/pg-escape/issues/15
      // so we are manually replacing the values:
      q = q.replace('$w', parseInt(watchers, 10))
        .replace('$s', parseInt(stars, 10))
        .replace('$f', parseInt(forks, 10))
        .replace('$c', parseInt(commits, 10));

    // console.log('L121: query:', q);

    PG_CLIENT.query(q, function(error, result) {
      utils.log_error(error, data, new Error().stack);
      return insert_next_page (data, callback);
    });
  });
}

/**
 * select_repo saves the list of people who have starred a repo to "stars".
 * @param {string} url - url of the repo (e.g: /dwyl/start-here)
 * @param {function} callback - callback function to be executed on success.
 */
function select_repo (url, callback) {
  connect( function select_repo_after_connected () {
    let q = escape(`SELECT * FROM repos WHERE url = %L
      ORDER BY id ASC LIMIT 1`,
      url.replace('/stargazers', ''));
    // console.log('L168 q:', q);
    PG_CLIENT.query(q, function(error, result) {
      utils.log_error(error, result, new Error().stack);
      return utils.exec_cb(callback, error, result);
    });
  });
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
      urls.push(data.url + '/followers');
      urls.push(data.url + '/following');
      urls.push(data.url + '?tab=repositories');
      break;
    case 'repo':
      urls.push(data.url + '/stargazers');
      break;
    case 'stars':
      urls.push(data.next_page);
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
 * insert_log_item does exactly what it's name suggests inserts a log enty
 * @param {String} path - the current path (page) being viewed.
 * @param {String} next_page - the next page to be fetched.
 * @param {function} callback - callback function to be executed on success.
 */
function insert_log_item (path, next_page, callback) {
  connect( function () {
    const query = escape(`INSERT INTO logs (path, next_page) VALUES (%L, %L)`,
      path, next_page);
    // console.log('L66: query:', query);
    PG_CLIENT.query(query, function(error, data) {
      utils.log_error(error, data, new Error().stack);
      return utils.exec_cb(callback, error, data);
    });
  });
}

/**
 * insert_relationship saves the list of people who related to another record.
 * @param {object} data - a valid JSON object containing data to be inserted.
 * @param {function} callback - callback function to be executed on success.
 */
function insert_relationship (data, callback) {
  select_repo(data.url, function (error, result) {
    const repo_id = result.rows[0].id;
    // console.log('repo_id:', repo_id);
    let len = data.entries.length - 1;
    data.entries.forEach((p, i) => { // poor person's "async parallel":
      const username = p.username;
      // console.log('username:', username);
      select_person(username, function(error1, result1) {
        // console.log('L251 > result1: ', result1.rows[0]);
        const person_id = result1.rows[0].id;
        const table_fields = 'relationships (person_id, repo_id)';
        let q = escape(`INSERT INTO %s VALUES ($pid, $rid)`, table_fields);
        q = q.replace('$pid', person_id)
         .replace('$rid', repo_id);
        // console.log('L257 q:', q);
        PG_CLIENT.query(q, function(error2, result2) {
          utils.log_error(error2, result2, new Error().stack);

          if(i === len) {
            return insert_next_page(data, callback);
          }
        });
      });
    });
  });
}



/**
 * select_next_page get the next path (page) to crawl
 */
function select_next_page (callback) {
  connect( function () {
    const q = escape(`SELECT next_page, COUNT (next_page) AS c
    FROM logs
    WHERE next_page IS NOT null
    AND next_page NOT IN (
      SELECT path
      FROM logs
      WHERE path IS NOT NULL
    )
    GROUP BY next_page
    ORDER BY c ASC
    LIMIT 1;`);
    // console.log('L82: query:', q);
    PG_CLIENT.query(q, function(error, data) {
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
  insert_repo: insert_repo,
  select_repo: select_repo,
  insert_relationship: insert_relationship,
  PG_CLIENT: PG_CLIENT
}
