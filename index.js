const puppeteer = require("puppeteer");
require("dotenv").config();

(async () => {
  const url = "https://admissions.42.fr/users/sign_in";
  const email = "audebertadrien.pro@gmail.com";

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
    path: "example.png",
  });

  await browser.close();
})();
