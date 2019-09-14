const puppeteer = require("puppeteer");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.set("port", process.env.PORT || 3000);

app.get("/", async function(req, res, next) {
  try {
    if (!req.query.url) {
      res.json({ image: "" });
      return next();
    }

    const browser = await puppeteer.launch({
      args: [
        "--enable-font-antialiasing",
        "--no-sandbox",
        "--disable-setuid-sandbox"
      ]
    });
    const page = await browser.newPage();
    await page.goto(req.query.url);
    const base64 = await page.screenshot({ encoding: "base64" });
    await browser.close();
    res.json({ image: `data:image/png;base64,${base64}` });
    next();
  } catch (error) {
    next(error);
  }
});

app.listen(app.get("port"), function() {
  console.log("running at localhost:" + app.get("port"));
});
