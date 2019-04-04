process.env.PORT = process.env.PORT || 4000;
const http = require('http');
const handlers = require('./request_handlers.js');

const server = http.createServer(function run (req, res) { // can you make simplify it? ;-)
  console.log(req.method, ':', req.url);    // absolute minimum request logging
  var url = req.url.split('?')[0];          // strip query params for routing
  switch (url) {
    // case '/elmo.js':                        // not "DRY" ... #helpwanted!
    //   handlers.serve_static(req, res);
    //   break;
    // case '/app.js':                         // serve the client application
    //   handlers.serve_app(req, res);
    //   break;
    // case '/save':                           // save state to server
    //   handlers.handle_post(req, res);
    //   break;
    default:                                // serve the application
      handlers.serve_index(req, res);
      break;
  }
}).listen(process.env.PORT); // start the server with the command: npm run dev

// url used in tests:
server.url = "http://" + require('./lanip.js') + ":" + process.env.PORT;
// show local LAN IP address in console so we can connect to the app on mobile:
console.info("GOTO:", server.url);

module.exports = server;
