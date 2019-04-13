const tap = require('tap'); // see: github.com/dwyl/learn-tape
const utils = require('../server/utils');

tap.only('utils.log_error', function testfn (t) {
  const error = 'DON\'T PANIC! This is only a utils.log_error test execution ☔️'
  utils.log_error(error, { "hello": "world"}, new Error().stack);
  utils.log_error(error, { "hello": "world"});
  t.end();
});

tap.test('utils.exec_cb', function(t) {
  const error = 'DON\'T PANIC! This is only a utils.exec_cb test ☔️ '
  // call without params:
  utils.exec_cb(); // no expectation but also no error!
  utils.exec_cb(function callback (e, data) {
    t.equal(e, error, 'woohoo our exec_cb works as expected!');
    t.equal(data, 'hai', 'exec_cb simply executes the callback');
    t.end();
  }, error, 'hai');
});
