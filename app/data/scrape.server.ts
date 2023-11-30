import chromium from '@sparticuz/chromium';
import puppeteerCore from 'puppeteer-core';
import puppeteer from 'puppeteer';

export async function getTitle() {
  console.log(process.env.NODE_ENV);

  let browser;

  if (process.env.NODE_ENV === 'development') {
    browser = await puppeteer.launch({ headless: 'new' });
  } else {
    console.log('development');
    // THIS WORKS WITH VERCEL
    browser = await puppeteerCore.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
  }

  const url = 'https://www.mozilla.org/en-US/firefox/';
  const selector = 'h1';

  const page = await browser!.newPage();
  await page.goto(url);

  const el = await page.$(selector);

  if (el) {
    const text = await page.evaluate((el: any) => el.textContent, el);

    await browser.close();
    return {
      message: text,
    };
  }

  return {
    message: 'Scrape data',
  };
}
