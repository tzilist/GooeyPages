const express = require('express');
const fs = require('fs');
const path = require('path');
const bundler = require('./util/bundler.js');
const EasyZip = require('easy-zip').EasyZip;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userController = require('./util/userController');
const app = express();
const mongoURI = process.env.NODE_ENV === 'test' ? 'mongodb://localhost/unit11test' : 'mongodb://localhost/unit11dev';
mongoose.connect(mongoURI);


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));


//home page
app.get('/', function(req, res) {
  res.render('./../client/index');
});


//build page after login
app.use('/build', express.static('client'));
app.get('/build', (req, res) => {
  res.sendFile(path.join(__dirname, './../client/build.html'));
});



//download function
app.use('/download', bundler.bundle);
app.get('/download', (req, res) => {
  //zip folder and sends to user
  var zip = new EasyZip();
  zip.zipFolder(path.join(__dirname,'./../templates'), () => {
    zip.writeToResponse(res,'download');
  });
});

app.get('/signup', function(req, res) {
  res.render('./../client/signup');
});

app.post('/signup', userController.createUser);
app.post('/login', userController.verifyUser);


app.get('/logout', function(req, res) {
  res.redirect('/');
});




app.listen(3000)
