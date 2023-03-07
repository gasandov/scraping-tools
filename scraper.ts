import { Browser, Page } from "puppeteer"

export class Scraper {
  page: Page | null = null

  constructor(private readonly browser: Browser) {}
}
