import { launch } from "puppeteer";

import config from "../config/vars.js";
import { Scraper } from "../../scraper.js";

const xpaths = {
  usernameInput: '//input[@id="user_email"]',
  passwordInput: '//input[@id="user_password"]',
  policyCheckbox: '//input[@id="policy_confirmed"]',
  loginButton: '//input[@type="submit"]',
  signedIn: '(//a[@href="/es-mx/niv/users/sign_out"])[1]',
  invalidCredentials: '//p[contains(@class, "error")]',
};

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
  const { usvisa } = config;

  const browser = await launch({ headless: false });
  const scraper = new Scraper(browser);

  const signInPage = "https://ais.usvisa-info.com/es-mx/niv/users/sign_in";

  await scraper.init();
  await scraper.goto(signInPage);

  const page = scraper.get();

  await login(page, usvisa.username, usvisa.password);

  await scraper.verifyLoginStatus(xpaths.signedIn, xpaths.invalidCredentials);
})();
