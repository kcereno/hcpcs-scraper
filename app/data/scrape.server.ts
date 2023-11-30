import chromium from '@sparticuz/chromium';
import puppeteerCore from 'puppeteer-core';
import puppeteer from 'puppeteer';

const startBrowser = async () => {
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

  return browser;
};

export async function getLCDs() {
  console.log('getting lcds');

  const browser = await startBrowser();
  const page = await browser.newPage();

  const url = 'https://cgsmedicare.com/jc/coverage/lcdinfo.html';
  await page.goto(url);

  const firstColumnData = await page.evaluate(() => {
    const tableRows = Array.from(
      document.querySelectorAll('table.greenbackground tr')
    );
    const firstColumn = tableRows.map((row) => {
      const cells = Array.from(row.querySelectorAll('td, th'));
      return cells[0] ? cells[0].textContent.trim() : null;
    });

    return firstColumn.slice(1);
  });

  await browser.close();

  return firstColumnData;
}

export async function getTitle() {
  const browser = await startBrowser();

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
