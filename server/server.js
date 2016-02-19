const express = require('express');
const fs = require('fs');
const path = require('path');
const bundler = require('../bundler/bundler.js');
const EasyZip = require('easy-zip').EasyZip;
const app = express();


app.use(express.static('/client'));

app.use('/download', bundler.bundle);
app.get('/download', (req, res) => {
  var zip = new EasyZip();
  zip.zipFolder(path.join(__dirname,'./../templates'), () => {
    zip.writeToResponse(res,'download');
  });
});


app.listen(3000);
