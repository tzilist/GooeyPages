var sessionController = require('./sessionController');

var cookieController = {};
cookieController.setCookie = setCookie;
cookieController.setSSIDCookie = setSSIDCookie;

/**
* setCookie - set a cookie with a random number

*
* @param req - http.IncomingRequest
* @param rs - http.ServerResponse
* @param next - Callback with signature ([err])
*/
function setCookie(req, res, next) {
  var secret_cookie = Math.floor(Math.random()*99);
  res.cookie('secret', secret_cookie, {httpOnly: true});
  res.cookie('codesmith', 'hi', {httpOnly: true} );
  next();
}

/**
* setSSIDCookie - store the supplied id in a cookie
*
* @param req - http.IncomingRequest
* @param rs - http.ServerResponse
* @param id - id of the cookie to set
*/
function setSSIDCookie(res, id) {
  res.cookie('ssid', id, { httpOnly: true });
  sessionController.startSession(id);
}

module.exports = cookieController;
