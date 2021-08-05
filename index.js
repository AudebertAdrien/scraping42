const puppeteer = require("puppeteer");
require("dotenv").config();

(async () => {
  const url = "https://admissions.42.fr/users/sign_in";
  const email = "audebertadrien.pro@gmail.com";

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle2" });

  await page.type("input[type=email]", email, { delay: 20 });
  await page.type("input[type=password]", process.env.PASSWORD, { delay: 20 });

  await page.click("[aria-label='allow cookies']");
  await page.waitForSelector("[aria-label='allow cookies']", { hidden: true });

  await page.click("input[name=commit]");

  /*   const [response] = await Promise.all([
    page.waitForNavigation({ timeout: 2000 }, { waitUntil: "networkidle2" }),
    page.click("input[name=commit]"),
  ]);

  console.log(response); */
  //document.querySelector("[aria-label='allow cookies']")
  //user_email => document.querySelector(".user_email").innerHTML
  //user_password => document.querySelector("input[type=password]")
  //value="Connexion" => document.querySelector("[value=Connexion]")

  /* await page.setViewport({
    width: 1200,
    height: 1000,
  });

  await page.screenshot({ path: "example.png" });

  await page.pdf({
    path: "page.pdf",
    format: "A4",
  }); */

  /* await browser.close(); */
})();
