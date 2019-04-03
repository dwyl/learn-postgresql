const http = require('http');
const exec = require('child_process').exec;
const terminate = require('terminate');
let RUN = false;
const child = exec('npm start');
// console.log('child:', child);

child.stdout.setEncoding('utf8');

child.stdout.on('data', function(data) {
  if(!RUN) { // this will only happen once
    // sio.emit(secret, "refresh");
    RUN = true;
    console.log("RUN: ", RUN);
  } else {
    // don't polute the console unless you are debugging
  }
  if(data.indexOf('http:') > -1) {
    // console.log('data', data);
    const URL = data.replace('GOTO: ', '');
    console.log('server.test.js:L21: URL:', URL);
    http.get(URL, function(response) {
      // console.log('Status:', response.statusCode);
      // console.log('Headers: ', response.headers);

      response.on('end', () => {
        console.log(data);
        terminate(child.pid);
      });
    }).on('error', (e) => {
      console.error(`server.test.js:L31: CHILD PROCESS ERROR: ${e.message}`);
    });
  }
});

child.on('close', function(code) {
  console.log('>> Closing Child Process', code);
  terminate(child.pid);
});
