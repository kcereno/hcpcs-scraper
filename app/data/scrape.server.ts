import chromium from '@sparticuz/chromium';
import puppeteerCore from 'puppeteer-core';
import puppeteer from 'puppeteer';
import type { lcdDataType } from 'types';

const startBrowser = async () => {
  let browser;

  const minimal_args = [
    '--autoplay-policy=user-gesture-required',
    '--disable-background-networking',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-breakpad',
    '--disable-client-side-phishing-detection',
    '--disable-component-update',
    '--disable-default-apps',
    '--disable-dev-shm-usage',
    '--disable-domain-reliability',
    '--disable-extensions',
    '--disable-features=AudioServiceOutOfProcess',
    '--disable-hang-monitor',
    '--disable-ipc-flooding-protection',
    '--disable-notifications',
    '--disable-offer-store-unmasked-wallet-cards',
    '--disable-popup-blocking',
    '--disable-print-preview',
    '--disable-prompt-on-repost',
    '--disable-renderer-backgrounding',
    '--disable-setuid-sandbox',
    '--disable-speech-api',
    '--disable-sync',
    '--hide-scrollbars',
    '--ignore-gpu-blacklist',
    '--metrics-recording-only',
    '--mute-audio',
    '--no-default-browser-check',
    '--no-first-run',
    '--no-pings',
    '--no-sandbox',
    '--no-zygote',
    '--password-store=basic',
    '--use-gl=swiftshader',
    '--use-mock-keychain',
  ];

  if (process.env.NODE_ENV === 'development') {
    browser = await puppeteer.launch({ headless: 'new', args: minimal_args });
  } else {
    console.log('pruduction');
    // THIS WORKS WITH VERCEL
    browser = await puppeteerCore.launch({
      args: minimal_args,
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
        url: linkHref,
        hcpcsModifiers,
      };

      results.push(data);
    }
  }

  await browser.close();
  return results.slice(1);
}

export async function getDocumentationRequirements(url: string) {
  console.log('fetching doc requirements', url);

  const browser = await startBrowser();
  const page = await browser.newPage();

  try {
    await page.goto(url);

    const selector = 'span[id="lblAssociatedInformation"]';

    const scrapedElement = await page.$(selector);
    const content = await page.evaluate((el) => el.innerHTML, scrapedElement);

    return content;
  } catch (error) {
    console.log('getDocumentationRequirements ~ error:', error);
    throw new Error(error.message);
  } finally {
    await browser.close();
  }
}

export async function getCoverageGuidance(url: string) {
  console.log('fetching coverage guidance');

  const browser = await startBrowser();
  const page = await browser.newPage();

  try {
    await page.goto(url);

    const selector = 'div[id="divCoverageIndication"]';

    const scrapedElement = await page.$(selector);
    const content = await page.evaluate((el) => el.innerHTML, scrapedElement);

    return content;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    await browser.close();
  }
}
