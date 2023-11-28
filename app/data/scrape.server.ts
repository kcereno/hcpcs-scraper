import puppeteer from 'puppeteer';

export async function scrape() {
  const browser = await puppeteer.launch();

  const url = 'https://www.mozilla.org/en-US/firefox/';
  const selector = 'h1';

  const page = await browser.newPage();
  await page.goto(url);

  const el = await page.$(selector);

  if (el) {
    const text = await page.evaluate((el) => el.textContent, el);

    return {
      message: text,
    };
  }

  return {
    message: 'Scrape data',
  };
}
