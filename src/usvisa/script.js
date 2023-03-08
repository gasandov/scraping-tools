import { launch } from "puppeteer";

import config from "./vars.js";
import { xpaths } from "./utils.js";
import { Scraper } from "../../scraper.js";

/**
 * @description Logs in to the US Visa website
 * @param {Page} page
 * @param {string} username
 * @param {string} password
 * @returns {Promise<void>}
 */
async function login(page, username, password) {
  const [usernameInput] = await page.$x(xpaths.usernameInput);
  const [passwordInput] = await page.$x(xpaths.passwordInput);
  const [policyCheckbox] = await page.$x(xpaths.policyCheckbox);
  const [loginButton] = await page.$x(xpaths.loginButton);

  await usernameInput.type(username);
  await passwordInput.type(password);
  await policyCheckbox.click();
  await loginButton.click();
}

(async () => {
  const browser = await launch({ headless: false });
  const scraper = new Scraper(browser);
  const signInPage = "https://ais.usvisa-info.com/es-mx/niv/users/sign_in";

  await scraper.init();
  await scraper.goto(signInPage);

  const page = scraper.get();

  await login(page, config.username, config.password);

  // verify if login was successful
  await scraper.verifyLoginStatus(xpaths.signedIn, xpaths.invalidCredentials);

  // click on appointment based on scheduleId and wait for page to load
  await scraper.click(xpaths.continueWithAppoinmentButton, true);
  await page.waitForNavigation({ waitUntil: "networkidle0" });

  // click on "reschdule" button and wait for page to load
  await scraper.click(xpaths.reScheduleButton, true);
  await page.waitForNavigation({ waitUntil: "networkidle0" });

  // verify if there are no appointments available
  await scraper.doesElementExist({
    path: xpaths.noAppointmentsAvailable,
    errMsg: "No hay citas disponibles",
    shouldExist: false,
  });

  // TODO: select consulate facility
})();
