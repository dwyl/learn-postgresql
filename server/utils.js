const BG = '\x1b[44m\x1b[33m\x1b[1m';
const RESET = '\x1b[0m'; // see: https://stackoverflow.com/a/41407246/1148249

/**
 * log_error is a basic error logger function which logs errors when present.
 * the beauty of centralising error logging in your apps is that it makes it
 * easy to change the logging to use a logging *service* or tool later
 * without having to change all instances of your logger.
 * @param {Object|String} error - the error reported
 * @param {Object} data - any data being passed back to the calling function.
 * @param {String} stack - the call stack where log_error was called from.
 * @example
 * utils.log_error(error, data, new Error().stack); //
 */
function log_error (error, data, stack) {
  stack = stack || 'remember to include `stack` (third param) in log_error!'
  if (error) {
    console.error(
      BG,
      'ERROR:', error, stack.toString(),
      RESET
    ); // .split('\n')[1]
  }
  return;
}

/**
 * exec_cb runs a callback if it's a function avoids type error if not a func.
 * @param {function} callback - the callback function to be executed if any.
 * @param {Object|String} error - the error reported
 * @param {Object} data - any data being passed back to the calling function.
 */
function exec_cb (callback, error, data) {
  log_error(error, data, new Error().stack);
  if (callback && typeof callback === 'function') {
    return callback(error, data);
  } // if callback is undefine or not a function do nothing!
  return;
}

module.exports = {
  log_error: log_error,
  exec_cb: exec_cb
}
