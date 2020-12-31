const tap = require('tap');
const bot = require('../server/bot');
const db = require('../server/db');
const seed = Math.floor(Math.random() * Math.floor(100000));

tap.test('crawl non-existent page to test 404', function (t) {
  bot.fetch('/totesamaze' + seed, function(err, data) {
    t.equal(err, 404, 'err: ' + err + ' (as expected ;-)');
    t.end()
  });
});

tap.test('crawl @dwyl org', function (t) {
  // we must TRUNCATE the orgs table when running tests:
  db.PG_CLIENT.query('TRUNCATE TABLE orgs CASCADE', function (err0, result0) {
    t.equal(err0, null, 'no error running "TRUNCATE TABLE orgs"');
    t.equal(result0.command, 'TRUNCATE', 'orgs table successfully truncated');

    bot.fetch('dwyl', function(err, data) {
      require('./fixtures/make-fixture')('org.json', data); // keep up-to-date
      t.end();
    });
  });
});

tap.test('crawl @iteles person profile', function (t) {
  db.PG_CLIENT.query('TRUNCATE TABLE people CASCADE', function (err0, result0) {
    t.equal(err0, null, 'no error running "TRUNCATE TABLE people"');
    t.equal(result0.command, 'TRUNCATE', 'people table successfully truncated');

    bot.fetch('iteles', function(err, data) {
      // delete(data.contrib_matrix); // TMI!
      require('./fixtures/make-fixture')('person.json', data);
      t.end()
    });

  }); // end TRUNCATE
});

tap.test('crawl dwyl/todo-list-javascript-tutorial', function (t) {
  db.PG_CLIENT.query('TRUNCATE TABLE repos CASCADE', function (err0, result0) {
    t.equal(err0, null, 'no error running "TRUNCATE TABLE repos"');
    t.equal(result0.command, 'TRUNCATE', 'repos table successfully truncated');

    bot.fetch('dwyl/todo-list-javascript-tutorial', function(err, data) {
      require('./fixtures/make-fixture')('repo.json', data);
      t.end()
    });
  }); // end TRUNCATE
});

tap.test('crawl dwyl/health', function (t) {
  // db.PG_CLIENT.query('TRUNCATE TABLE repos CASCADE', function (err0, result0) {
    // t.equal(err0, null, 'no error running "TRUNCATE TABLE repos"');
    // t.equal(result0.command, 'TRUNCATE', 'repos table successfully truncated');

    bot.fetch('dwyl/health', function(err, data) {
      require('./fixtures/make-fixture')('repo.json', data);

      const select = 'SELECT * FROM repos ORDER by id DESC LIMIT 1';
      db.PG_CLIENT.query(select, function(err, result) {
        t.equal(result.rows[0].url, data.url, 'repo.url ' + data.url);
        t.end();
      });
    });
  // }); // end TRUNCATE
});

tap.test('crawl /dwyl/health/stargazers', function (t) {
  bot.fetch('/dwyl/health/stargazers', function(err, data) {
    require('./fixtures/make-fixture')('stargazers.json', data);
    t.end()
  });
});

tap.test('crawl org members /orgs/SafeLives/people (3?)', function (t) {
  bot.fetch('/SafeLives', function(err1, data1) { // first store the org
    bot.fetch('/orgs/SafeLives/people', function(err, data) {
      require('./fixtures/make-fixture')('members.json', data);
      // console.log(data);
      t.equal(data.entries.length, 3, '/orgs/SafeLives/people has 3 people.');
      t.end()
    });
  });
});

tap.test('crawl /dwylbot/followers (expect 1)', function (t) {
  bot.fetch('/dwylbot', function(err1, data1) { // first fetch the profile
    bot.fetch('/dwylbot/followers', function(err, data) {
      require('./fixtures/make-fixture')('followers.json', data);
      // console.log(data);
      t.equal(data.entries.length, 4, '/dwylbot/following is following Simon.');
      t.end()
    });
  });
});


tap.test('crawl /dwylbot/following (expect 1)', function (t) {
  bot.fetch('/dwylbot', function(err1, data1) { // first fetch the profile
    bot.fetch('/dwylbot/following', function(err, data) {
      require('./fixtures/make-fixture')('following.json', data);
      // console.log(data);
      t.equal(data.entries.length, 1, '/dwylbot/following is following Simon.');
      t.end()
    });
  });
});

tap.test('db.end() close database connection so tests can finish', function(t) {
  db.end(function(err, data) {
    t.equal(db.PG_CLIENT._ending, true,
        'db.PG_CLIENT._ending: ' + db.PG_CLIENT._ending);
    t.end();
  });
});
