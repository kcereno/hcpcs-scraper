import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

export async function scrape() {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });

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
