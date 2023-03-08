import { Browser, Page } from "puppeteer";

export class Scraper {
  #browser;
  page;

  /**
   * @description Creates a new instance of the Scraper class
   * @param {Browser} browser
   */
  constructor(browser) {
    this.#browser = browser;
  }

  /**
   * @description Returns the page property
   * @returns {Page}
   */
  get() {
    return this.page;
  }

  /**
   * @decription Creates a new page and assigns it to the page property
   * @returns {Promise<void>}
   */
  async init() {
    this.page = await this.#browser.newPage();
  }

  /**
   * @description Closes the browser, ending the session
   * @returns {Promise<void>}
   */
  async close() {
    await this.#browser.close();
  }

  /**
   * @description Navigates to the specified URL
   * @returns {Promise<void>}
   * @param {string} url
   */
  async goto(url) {
    await this.page.goto(url);
  }

  /**
   * @description Waits for the specified time
   * @returns {Promise<void>}
   * @param {number} time
   */
  async sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  /**
   * @description Takes a screenshot of the current page
   * @returns {Promise<void>}
   * @param {string} filename
   */
  async takeScreenshot(filename) {
    await this.page.screenshot({ path: filename });
  }

  /**
   * @description Verifies the login status, either by checking valid credentials
   *  or by looking for the "signed in" element
   * @returns {Promise<void>}
   * @param {string} signedInPath
   * @param {string} invalidCredsPath
   */
  async verifyLoginStatus(signedInPath, invalidCredsPath) {
    await this.sleep(1000);

    const invalidCreds = (await this.page.$x(invalidCredsPath)) || [];

    if (invalidCreds.length > 0) {
      throw new Error("Invalid credentials");
    }

    this.page.waitForNavigation({ waitUntil: "networkidle0" });

    const signedIn = (await this.page.$x(signedInPath)) || [];

    if (signedIn.length === 0) {
      throw new Error("Login process failed");
    }

    console.info("Login process completed successfully");
  }
}
