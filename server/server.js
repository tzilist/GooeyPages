const express = require('express');
const fs = require('fs');
const path = require('path');
const bundler = require('./util/bundler.js');
const EasyZip = require('easy-zip').EasyZip;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sessionController = require('./util/sessionController.js');
const cookieController = require('./util/cookieController.js');
const userController = require('./util/userController.js');
const mongoose = require('mongoose');
const saver = require('./util/saver.js');
const app = express();
const mongoURI = process.env.NODE_ENV === 'test' ? 'mongodb://localhost/unit11test' : 'mongodb://localhost/unit11dev';
mongoose.connect(mongoURI);


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cookieParser());

//home page
app.get('/', function(req, res) {
  res.render('./../client/index');
});


//build page after login
app.get('/build', sessionController.isLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, './../client/build.html'));
});
app.use(express.static('client'));

app.post('/save', saver, (req, res) => {
  console.log(req.cookies.ssid)
});

//download function
app.use('/download', bundler.bundle);
app.get('/download', (req, res) => {
  //zip folder and sends to user
  var zip = new EasyZip();
  zip.zipFolder(path.join(__dirname,`./../userpages/${req.cookies.ssid}`), (err) => {
    if(err) console.log(err)
    zip.writeToResponse(res,'download');
  });
});

app.get('/signup', function(req, res) {
  res.render('./../client/signup');
});

app.post('/signup', userController.createUser);
app.post('/login', userController.verifyUser);

app.use('/logout', cookieParser());
app.get('/logout', function(req, res) {
  sessionController.logout(request.cookies.ssid);
  res.redirect('/');
});




app.listen(3000);
