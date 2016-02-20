var Session = require('./sessionModel');

var sessionController = {};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*
* @param req - http.IncomingRequest
* @param rs - http.ServerResponse
* @param next - Callback with signature ([err])
*/
sessionController.isLoggedIn = function(req, res, next) {
  Session.findOne({cookieId: req.cookies.ssid}, function(err, result) {
    if (err || !result) return res.redirect('/');
    next();
  });
};


sessionController.logout = function(id){
  Session.findOne({cookieId: id}).remove().exec();
};
/**
* startSession - create a new Session model and then save the new session to the
* database.
*
* @param cookieId - id to use as the id of the new session
* @param callback - Callback with signature (Session)
*/
sessionController.startSession = function(cookieId, callback) {
  Session.create({cookieId: cookieId});
};

module.exports = sessionController;
