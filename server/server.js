const express = require('express');
const fs = require('fs');
const path = require('path');
const bundler = require('../bundler/bundler.js');
const serveStatic = require('serve-static');
const archiver = require('archiver')
const app = express();


app.use(express.static('../'));
app.use('/download', bundler.bundle);
var zipLogs = function(working_directory) {
  var fs = require('fs');
  var path = require('path');
  var output = fs.createWriteStream(path.join(working_directory, 'logs.zip'));
  var archiver =  require('archiver');
  var zipArchive = archiver('zip');

  zipArchive.pipe(output);
  zipArchive.bulk([{src: [path.join(working_directory, '*.log')],  expand: true}]);
  zipArchive.finalize(function(err, bytes) {
      if (err)
          throw err;

  console.log('done:', base, bytes);
  });
}
 });

app.listen(3000);
