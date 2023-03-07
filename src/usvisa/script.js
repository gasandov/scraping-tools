import { launch } from "puppeteer";
import { Scraper } from "../../scraper.js";

(async () => {
  const browser = await launch();
  const scraper = new Scraper(browser);

  const signInPage = "https://ais.usvisa-info.com/es-mx/niv/users/sign_in";

  await scraper.init();
  await scraper.goto(signInPage);
  await scraper.takeScreenshot("screenshot.png");
  await scraper.close();
})();
