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
const git = require('./util/githubupload.js');
const mongoose = require('mongoose');
const saver = require('./util/saver.js');
const app = express();
const mongoURI = 'mongodb://localhost/gooeypages';
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
  console.log(req.cookies.ssid);
});


//scrapped for now - would like to add oauth to github to create github pages creation
// app.get('/github', git.start);
// app.get('/gitgo', git.oauth);
// app.get('/gitoauth', (req, res) => {
//   console.log('here')
// })

//download function
app.use('/download', bundler.bundle);
app.get('/download', (req, res) => {
  //zip folder and sends to user
  var zip = new EasyZip();
  zip.zipFolder(path.join(__dirname,`./../userpages/${req.cookies.ssid}`), (err) => {
    if(err) console.log(err);
    zip.writeToResponse(res,'download');
  });
});


app.post('/signup', userController.createUser);
app.get('/signup', function(req, res) {
  res.render('./../client/signup');
});


app.post('/login', userController.verifyUser);

app.use('/logout', cookieParser());
app.get('/logout', function(req, res) {
  sessionController.logout(req.cookies.ssid);
  res.redirect('/');
});




app.listen(3000);
