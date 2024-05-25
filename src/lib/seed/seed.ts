import { insertTransaction } from './insert';
import { Browser } from 'puppeteer';
import puppeteer from 'puppeteer';
import { parseNkatalog, parseRbt, parseHatico, scrape, type FullPhone } from './scraper';

async function seed() {
  console.log('Запускаем браузер');

  const browser = await puppeteer.launch({
    headless: false,
  });

  for (let page = 2; page <= 3; page++) {
    // const getLinks = makeGetLinkFunction(
    //   'https://n-katalog.ru/category/mobilnye-telefony/list/page-' + page,
    //     'https://n-katalog.ru',
    //     'a.model-short-title'
    // );
    const getLinks = makeGetLinkFunction(
      'https://voronezh.hatiko.ru/category/smartfony/?page=' + page,
        'https://voronezh.hatiko.ru',
        'a.s-product-header'
    );
    // const getLinks = makeGetLinkFunction(
    //   'https://www.rbt.ru/cat/cifrovye_ustroistva/smartfony/~/page/' +
    //     page +
    //     '/',
    //   'https://www.rbt.ru',
    //   'a.link_theme_item-catalogue'
    // );
    const links = await getLinks(browser);

    await parseLinks(links, browser, parseHatico);
  }

  await browser.close();
}

function makeGetLinkFunction(
  listUrl: string,
  hostUrl: string,
  selector: string
) {
  return async function (browser: Browser) {
    const { $ } = await scrape(browser, listUrl);
    const links: string[] = [];
    $(selector).each(function (i) {
      links[i] = hostUrl + ($(this).attr('href') as string);
    });
    console.log(links);
    return links;
  };
}

async function parseLinks(
  links: string[],
  browser: Browser,
  parseFunction: (browser: Browser, url: string) => Promise<FullPhone>
) {
  await Promise.all(
    links.map(async (url) => {
      let fullPhone: FullPhone;
      try {
        fullPhone = await parseFunction(browser, url);
      } catch (error) {
        return;
      }
      console.log(fullPhone);
      if (!fullPhone.phone.name) {
        return;
      }
      await insertTransaction(fullPhone);
    })
  );
}

seed();
