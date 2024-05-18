import { insertTransaction } from './insert';
import { Browser, Page } from 'puppeteer';
import puppeteer from 'puppeteer';
import { parseNkatalog, scrape } from './scraper';

async function seed() {
  console.log('Запускаем браузер');

  const browser = await puppeteer.launch({
    headless: false,
  });
  
  const nKatalogLinks = await getNkatalogLinks(browser);
  await Promise.all(nKatalogLinks.map(async (url) => {
    const phone = await parseNkatalog(browser, url);
    console.log(phone);
    await insertTransaction(phone);
  }));
  await browser.close();
}

async function getNkatalogLinks(browser: Browser) {
  
  const listUrl = 'https://n-katalog.ru/category/mobilnye-telefony/list';

  const $ = await scrape(browser, listUrl);
  const links: string[] = [];
  $('a.model-short-title').each(function (i) {
    links[i] = 'https://n-katalog.ru' + ($(this).attr('href') as string);
  });
  console.log(links);
  return links;
}

seed();
