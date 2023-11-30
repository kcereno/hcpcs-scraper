import chromium from '@sparticuz/chromium';
import puppeteerCore from 'puppeteer-core';
import puppeteer from 'puppeteer';

export async function scrape() {
  let browser;

  if (process.env.NODE_ENV === 'production') {
    // THIS WORKS WITH VERCEL
    browser = await puppeteerCore.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
  } else {
    console.log('development');
    browser = await puppeteer.launch({ headless: true });
  }

  const url = 'https://www.mozilla.org/en-US/firefox/';
  const selector = 'h1';

  const page = await browser!.newPage();
  await page.goto(url);

  const el = await page.$(selector);

  if (el) {
    const text = await page.evaluate((el: any) => el.textContent, el);

    return {
      message: text,
    };
  }

  return {
    message: 'Scrape data',
  };
}
