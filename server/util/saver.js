const fs = require('fs');
const path = require('path');


//creates html page
module.exports = function Saver(req, res, next) {
  const html =
  `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>${req.body.name}</title>
    </head>
    <body>
      ${req.body.inner}
    </body>
  </html>`;

  fs.writeFile(path.join(__dirname, `../../userpages/${req.cookies.ssid}/client/${req.body.name.replace(/(.html)/gm,"")}.html`), html, (err) => {
    if (err) throw err;
  });
}
