import { ElementHandle, Browser, Page } from "puppeteer";

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

    await this.doesElementExist({
      path: invalidCredsPath,
      shouldExist: false,
      errMsg: "Invalid credentials",
    });

    await this.page.waitForNavigation({ waitUntil: "networkidle0" });

    await this.doesElementExist({
      path: signedInPath,
      shouldExist: true,
      errMsg: "Login process failed",
    });

    console.info("Login process completed successfully");
  }

  /**
   * @description Clicks on the specified element
   * @param {xpath} path
   * @param {boolean} evaluate
   * @returns {Promise<void>}
   */
  async click(path, evaluate = false) {
    const [button] = await this.page.$x(path);

    if (evaluate) {
      return await button.evaluate((btn) => btn.click());
    }

    await button.click();
  }

  /**
   * @param {xpath} path
   */
  async selectDropdownOption(path) {}

  /**
   *
   * @param {*} param0
   * @returns {ElementHandle}
   */
  async doesElementExist({ path, errMsg, shouldExist }) {
    const element = (await this.page.$x(path)) || [];

    if (shouldExist === true && element.length === 0) {
      throw new Error(errMsg);
    }

    if (shouldExist === false && element.length > 0) {
      throw new Error(errMsg);
    }

    return element[0];
  }
}
