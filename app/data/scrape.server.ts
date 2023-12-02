import chromium from '@sparticuz/chromium';
import puppeteerCore from 'puppeteer-core';
import puppeteer from 'puppeteer';
import { lcdDataType } from 'types';

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

export async function getLCDData(): Promise<lcdDataType[]> {
  console.log('getting lcds');

  const browser = await startBrowser();
  const page = await browser.newPage();

  const url = 'https://cgsmedicare.com/jc/coverage/lcdinfo.html';
  await page.goto(url);

  const table = await page.$('table[class="greenbackground"]');

  const results = [];

  if (table) {
    const tableRows = await table.$$('tr');
    let linkText;
    let linkHref;
    let hcpcsModifiers;

    for (const row in tableRows) {
      const linkColumn = await tableRows[row].$('td:nth-child(1)');
      if (linkColumn) {
        linkText = await page.evaluate((el: any) => el.textContent, linkColumn);
        linkHref = await linkColumn.evaluate((el) =>
          el.querySelector('a').getAttribute('href')
        );
      }

      const hcpcsModifierCol = await tableRows[row].$('td:nth-child(3)');
      if (hcpcsModifierCol) {
        hcpcsModifiers = await page.evaluate(
          (el: any) => el.textContent,
          hcpcsModifierCol
        );
      }

      const data = {
        name: linkText,
        link: linkHref,
        hcpcsModifiers,
      };

      results.push(data);
    }
  }

  await browser.close();
  return results.slice(1);
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

export async function getHCPCSTableData(url: string) {
  console.log('url:', url);
}
