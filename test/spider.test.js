const test = require('tap').test;
const spider = require('../server/spider');
const db = require('../server/db');

test('crawl @dwyl org', function (t) {
  spider.fetch('dwyl', function(err, data) {
    // console.log(err, data.entries[0]);
    // console.log(data);
    require('./fixtures/make-fixture')('org.json', data);
    db.end(); // close connection to database
    t.end()
  });
});

/*

desc: 'Start here: https://github.com/dwyl/start-here',
  location: 'London, UK',
  website: 'https://dwyl.com',
  email: 'hello+github@dwyl.com',
  pcount: 171,
  avatar:
   'https://avatars1.githubusercontent.com/u/11708465?s=200&v=4',
*/
