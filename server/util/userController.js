const User = require('./userModel');
const path = require('path');
const bcrypt = require('bcrypt');
const cookieController = require('./cookieController.js');
const sessionController = require('./sessionController.js');
const fs = require('fs');
const userController = {};

userController.createUser = function(req, res) {
  if (!req.body.username || !req.body.password) {
    return res.render(path.join(client, 'signup'), {error: 'Must include username and password'});
  }

  var newUser = new User({
    username: req.body.username,
    password: req.body.password
  });
  newUser.save(function(err, result) {
  	if (err) return res.render('./../client/signup', {error: 'Username invalid'});
    User.findOne({username: req.body.username,}, (err, result) => {
      const userFolder = path.join(__dirname, '../userpages/') + result._id;
      fs.mkdir(`userpages/${result._id}`, (err) => {
        if(err) return console.log(err);
        fs.mkdir(`userpages/${result._id}/client`, (err => {
          if(err) return console.log(err);
          fs.mkdir(`userpages/${result._id}/server`, (err => {
            fs.createReadStream(path.join(__dirname,'../../templates/package.json')).pipe(fs.createWriteStream(path.join(__dirname,`../../userpages/${result._id}/package.json`)));
          }));
          cookieController.setSSIDCookie(res, result._id);
          res.redirect('/build');
        }));
      });
    });
  });
};

userController.verifyUser = function(req, res) {
  // no username or password provided
  if (!req.body.username || !req.body.password) {
    return res.redirect('/signup');
  }
  // username/password is incorrect
  User.findOne({username: req.body.username}, function(err, result) {

    // username not found
    if (err || !result) return res.redirect('/signup');

    result.comparePassword(req.body.password, function(err, pswdCheck) {
      if(!pswdCheck) return res.redirect('/signup');
      cookieController.setSSIDCookie(res, result._id);
      res.redirect('/build');
    });
  });
};


module.exports = userController;
