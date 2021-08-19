const puppeteer = require("puppeteer");
const fs = require("fs");
require("dotenv").config();

(async () => {
  const url = process.env.URL;
  const email = process.env.EMAIL;

  const browser = await puppeteer.launch({
    headless: false,
    devtools: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 2000 });
  await page.goto(url, { waitUntil: "networkidle2" });

  await page.type("input[type=email]", email, { delay: 20 });
  await page.type("input[type=password]", process.env.PASSWORD, { delay: 20 });

  await page.click("[aria-label='allow cookies']");
  await page.waitForSelector("[aria-label='allow cookies']", { hidden: true });

  // await page.click("input[name=commit]");

  await Promise.all([
    page.waitForNavigation(),
    page.click("input[name=commit]"),
  ]);
  await page.waitForTimeout(2000);
  await page.screenshot({
    path: "images/example.png",
  });

  await browser.close();
})();
