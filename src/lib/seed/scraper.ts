import * as cheerio from 'cheerio';
import type { NewPhone } from '../db/schema';
import { Browser } from 'puppeteer';
import {setTimeout} from 'node:timers/promises'

export async function scrape(browser: Browser, url: string) {
  const page = await browser.newPage();
  console.log('Открываем страницу '+url);
  await page.goto(url, {
    // waitUntil: 'networkidle0',
  });
  await setTimeout(3000)
  console.log('Считываем');
  const body = await page.evaluate(
    () => document.querySelector('*')!.outerHTML
  );

  return cheerio.load(body);
}

export async function parseNkatalog(browser: Browser, url: string): Promise<NewPhone> {
  const $ = await scrape(browser, url);
  const name = $('h1.title-for-page').text().replace('Смартфон', '').trim();
  const description = $('div#description p')
    .text()
    .trim();
  const manufacturer = name.split(' ')[0];
  const price = Number($('span[itemprop="lowPrice"]').text().trim());
  return { name, description, manufacturer, year: 2024, price };
}
