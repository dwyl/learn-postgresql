const fs = require('fs');
const path = require('path');

module.exports = function (filename, data) {
  filename = path.resolve('./test/fixtures/' + filename);
  fs.writeFileSync(filename, JSON.stringify(data, null, 2), 'utf8');
}
