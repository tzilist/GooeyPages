const fs = require('fs');
const path = require('path');


const Bundler = {};

Bundler.bundle = function(req,res, next) {
  //find files to bundle
  fs.readdir(path.join(__dirname, '../templates/html'), (err, files) => {
    if (err) throw err;

    //create server.js file with routes to each html page
    serverText =  "const express = require('express'); \nconst fs = require('fs');\nconst path = require('path'); \nconst app = express(); \n\n"

    //add file paths to html files
    for(var i in files) {
      serverText += `app.get('/${files[i].replace(/(.html)$/g,'')}', (req, res) => {\n\tres.sendFile(path.join(__dirname,'./../html/${files[i]}'))\n})\n\n`
    }
    //write actual file
    fs.writeFile(path.join(__dirname, '../templates/server/server.js'), serverText, (err) => {
      if (err) throw err;
    });

    next();
  });
};

module.exports = Bundler;
