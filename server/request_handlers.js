var fs = require('fs');
var path = require('path');
// var db = require('./db.js');
var index = path.resolve(__dirname, '../client/index.html');
var app = path.resolve(__dirname, '../client/app.js');

function serve_index(req, res) {
  return fs.readFile(index, function (err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
  });
}

// function serve_app(req, res) {
//   return fs.readFile(app, function (err, data) {
//     res.writeHead(200, {'Content-Type': 'text/javascript'});
//     res.end(data);
//   });
// }

module.exports = {
  serve_index: serve_index,
  // serve_app: serve_app,
  // serve_static: serve_static,
  // handle_post: handle_post,
  // handle_email_verification_request: handle_email_verification_request
}
