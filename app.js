var puppeteer = require('puppeteer');
var express = require('express');
var cors = require('cors')
var app = express();
app.use(cors());

app.set('port', (process.env.PORT || 4004));

app.get('/', async function(req, res, next) {
  try {
    const browser = await puppeteer.launch({
      args: [
        '--enable-font-antialiasing',
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    })
    const page = await browser.newPage()
    await page.goto(req.query.url || 'google.com')
    const b64string = await page.screenshot({ encoding: "base64" });
    await browser.close()
    res.send(JSON.stringify({image: "data:image/png;base64," + b64string}));
    next();
  } catch (error) {
    next(error);
  }
});

app.listen(app.get('port'), function() {
  console.log("running at localhost:" + app.get('port'))
});
