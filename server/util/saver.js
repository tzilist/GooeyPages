module.exports = function Saver(req, res, next) {
  var html = `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>${req.body.name}</title>
    </head>
    <body>
      ${req.body.inner}
    </body>
  </html>`

  console.log(html)
}
