import { Browser, Page } from "puppeteer";

export class Scraper {
  #browser;
  page;

  /**
   * @param {Browser} browser
   */
  constructor(browser) {
    this.#browser = browser;
  }

  /**
   * @returns {Page}
   */
  get() {
    return this.page;
  }

  /**
   * @returns {Promise<void>}
   */
  async init() {
    this.page = await this.#browser.newPage();
  }

  /**
   * @returns {Promise<void>}
   */
  async close() {
    await this.#browser.close();
  }

  /**
   * @returns {Promise<void>}
   * @param {string} url
   */
  async goto(url) {
    await this.page.goto(url);
  }

  /**
   * @returns {Promise<void>}
   * @param {string} filename
   */
  async takeScreenshot(filename) {
    await this.page.screenshot({ path: filename });
  }
}
