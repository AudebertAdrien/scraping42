const puppeteer = require("puppeteer");

const url = "https://example.com";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // { waitUntil: "networkidle2" }
  await page.goto(url);
  await page.screenshot({ path: "example.png" });

  await browser.close();
})();
