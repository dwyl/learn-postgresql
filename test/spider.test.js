const test = require('tap').test;
const spider = require('../server/spider');

test('connect to server', function (t) {
  spider.fetch('dwyl', function(err, data) {
    console.log(err, data);
    t.end()
  });
});
