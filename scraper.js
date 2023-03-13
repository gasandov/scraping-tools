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
   * @param {string} url
   * @returns {Promise<void>}
   */
  async goto(url) {
    await this.page.goto(url);
  }

  /**
   * @description Waits for the specified time
   * @param {number} time
   * @returns {Promise<void>}
   */
  async sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  /**
   * @description Takes a screenshot of the current page
   * @param {string} filename
   * @returns {Promise<void>}
   */
  async takeScreenshot(filename) {
    await this.page.screenshot({ path: filename });
  }

  /**
   * @description Verifies the login status, either by checking valid credentials
   *  or by looking for the "signed in" element
   * @param {string} signedInPath
   * @param {string} invalidCredsPath
   * @returns {Promise<void>}
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
   * @description Gets dropdown element and its options
   * @param {xpath} path
   * @returns {Promise<[ElementHandle, string[]]>}
   */
  async getDropdownAndOptions(path) {
    const [dropdown] = await this.page.$x(path);

    const rawOptions = await dropdown.$$eval("option", (opts) =>
      opts.map((option) => option.value)
    );
    const options = rawOptions.filter((option) => option);

    return [dropdown, options];
  }

  /**
   * @description Get group of elements by xpath
   * @param {xpath} path
   * @returns {Promise<ElementHandle[]>}
   */
  async getGroupElements(path) {
    const elements = await this.page.$x(path);

    return elements;
  }

  /**
   * @description Verifies the existence of an element
   * @param {*} param0
   * @returns {Promise<ElementHandle>}
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
