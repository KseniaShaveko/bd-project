import * as cheerio from 'cheerio';
import type {
  NewCharacteristics,
  NewOffer,
  NewPhone,
  NewPhoto,
} from '../db/schema';
import { Browser, type PuppeteerLifeCycleEvent } from 'puppeteer';
import { setTimeout } from 'node:timers/promises';

export type FullPhone = {
  phone: NewPhone;
  photos: NewPhoto[];
  offers: NewOffer[];
  characteristics: NewCharacteristics;
};

export async function scrape(
  browser: Browser,
  url: string,
  waitUntil?: PuppeteerLifeCycleEvent
) {
  const page = await browser.newPage();
  console.log('Открываем страницу ' + url);
  await page.goto(url, {
    timeout: 10 * 60 * 60 * 1000,
    waitUntil: waitUntil || 'domcontentloaded',
  });

  await setTimeout(3000);

  console.log('Считываем');
  const body = await page.evaluate(() => {
    return document.querySelector('*')!.outerHTML;
  });
  await page.close();

  return { $: cheerio.load(body), page };
}

const EMPTY = '—';

export async function parseNkatalog(
  browser: Browser,
  url: string
): Promise<FullPhone> {
  const { $ } = await scrape(browser, url);
  const name = $('h1.title-for-page').text().replace('Смартфон', '').trim();
  const description = $('div#description p').text().trim();
  const manufacturer = name.split(' ')[0];
  const price = Number($('span[itemprop="lowPrice"]').text().trim());
  const phone: NewPhone = {
    name,
    description,
    manufacturer,
    year: 2024,
    price,
    url,
  };
  const color = EMPTY;
  const simCards =
    $('#table-grid-mobile td.op1:contains("Количество SIM")')
      .next()
      .text()
      .trim() || EMPTY;
  const diagonal =
    $('#table-grid-mobile td.op1:contains("Диагональ")').next().text().trim() ??
    EMPTY;
  const resolution =
    $('#table-grid-mobile td.op1:contains("Разрешение")')
      .next()
      .text()
      .trim() || EMPTY;
  const material =
    $('#table-grid-mobile td.op1:contains("Материал рамки/крышки")')
      .next()
      .text()
      .trim() || EMPTY;
  const operationSystem =
    $('#table-grid-mobile td.op1:contains("Операционная система")')
      .next()
      .text()
      .trim() || EMPTY;
  const cpu =
    $('#table-grid-mobile td.op1:contains("Модель процессора")')
      .next()
      .text()
      .trim() || EMPTY;
  const gpu =
    $('#table-grid-mobile td.op1:contains("Графический процессор")')
      .next()
      .text()
      .trim() || EMPTY;
  const ram =
    $('#table-grid-mobile td.op1:contains("Оперативная память")')
      .next()
      .text()
      .trim() || EMPTY;
  const storage =
    $('#table-grid-mobile td.op1:contains("Встроенная память")')
      .next()
      .text()
      .trim() || EMPTY;
  const backCameraQuality =
    $('#table-grid-mobile td.op1:contains("Основной объектив")')
      .last()
      .next()
      .text()
      .trim() || EMPTY;
  const frontCameraQuality =
    $('#table-grid-mobile td.op1:contains("Основной объектив")')
      .first()
      .next()
      .text()
      .trim() || EMPTY;
  const portsText =
    $('#table-grid-mobile td.op1:contains("Порты подключения")')
      .next()
      .text()
      .trim() || EMPTY;
  let chargingPort = EMPTY;
  let audioPort = EMPTY;
  for (const text in portsText.split(',')) {
    if (
      text.toLowerCase().includes('usb') ||
      text.toLowerCase().includes('lightning')
    ) {
      chargingPort = text.trim();
    }
    if (text.toLowerCase().includes('jack')) {
      audioPort = text.trim();
    }
  }
  const batteryCapacity =
    $('#table-grid-mobile td.op1:contains("Емкость аккумулятора")')
      .next()
      .text()
      .trim() || EMPTY;
  const characteristics: NewCharacteristics = {
    color,
    simCards,
    diagonal,
    resolution,
    material,
    operationSystem,
    cpu,
    gpu,
    ram,
    storage,
    backCameraQuality,
    frontCameraQuality,
    chargingPort,
    audioPort,
    batteryCapacity,
  };

  const photoUrl = $('.item-img-div img').first().attr('src') ?? '';
  const photo: NewPhoto = { url: photoUrl };
  const photos = [photo];

  const offers: NewOffer[] = [];
  $('.desc-hot-prices tr').each(function () {
    const vendor = $(this).find('.model-shop-name a u').text().trim();
    const description = $(this).find('.model-shop-price a').text().trim();
    const offerUrl = '/';

    const offer: NewOffer = {
      vendor,
      description,
      url: offerUrl,
    };
    offers.push(offer);
  });
  return { phone, characteristics, photos, offers };
}

export async function parseRbt(
  browser: Browser,
  url: string
): Promise<FullPhone> {
  let { $ } = await scrape(browser, url);
  const name = $('h1.page-item__title-h1')
    .text()
    .replace('Смартфон', '')
    .trim();
  const description = $('div.content__html').text().trim();
  const manufacturer = name.split(' ')[0];

  const price = Number(
    $('div.price__row_current')
      .first()
      .text()
      .trim()
      .replaceAll(' ', '')
      .replaceAll('\n', '')
  );

  $ = (await scrape(browser, url + 'harakteristiki/', 'load')).$;

  const year = Number(
    $(
      '.item-characteristics__groups div.item-characteristics__attrs-el-name-wrap:contains("Год релиза:")'
    )
      .next()
      .text()
      .trim()
  );

  const phone: NewPhone = {
    name,
    description,
    manufacturer,
    year,
    price,
    url,
  };
  const color =
    $(
      '.item-characteristics__groups div.item-characteristics__attrs-el-name-wrap:contains("Цвет:")'
    )
      .next()
      .text()
      .trim() || EMPTY;
  const simCards =
    $(
      '.item-characteristics__groups div.item-characteristics__attrs-el-name-wrap:contains("Количество SIM-карт:")'
    )
      .next()
      .text()
      .trim() || EMPTY;
  const diagonal =
    $(
      '.item-characteristics__groups div.item-characteristics__attrs-el-name-wrap:contains("Диагональ экрана:")'
    )
      .next()
      .text()
      .trim() ?? EMPTY;
  const resolution =
    $(
      '.item-characteristics__groups div.item-characteristics__attrs-el-name-wrap:contains("Разрешение экрана:")'
    )
      .next()
      .text()
      .trim() || EMPTY;
  const material =
    $(
      '.item-characteristics__groups div.item-characteristics__attrs-el-name-wrap:contains("Материал корпуса:")'
    )
      .next()
      .text()
      .trim() || EMPTY;
  const operationSystem =
    $(
      '.item-characteristics__groups div.item-characteristics__attrs-el-name-wrap:contains("Операционная система:")'
    )
      .next()
      .text()
      .trim() || EMPTY;
  const cpu =
    $(
      '.item-characteristics__groups div.item-characteristics__attrs-el-name-wrap:contains("Процессор:")'
    )
      .next()
      .text()
      .trim() || EMPTY;
  const gpu =
    $(
      '.item-characteristics__groups div.item-characteristics__attrs-el-name-wrap:contains("Видеопроцессор:")'
    )
      .next()
      .text()
      .trim() || EMPTY;
  const ram =
    $(
      '.item-characteristics__groups div.item-characteristics__attrs-el-name-wrap:contains("Объём оперативной памяти:")'
    )
      .next()
      .text()
      .trim() || EMPTY;
  const storage =
    $(
      '.item-characteristics__groups div.item-characteristics__attrs-el-name-wrap:contains("Объём встроенной памяти:")'
    )
      .next()
      .text()
      .trim() || EMPTY;
  const backCameraQuality =
    $(
      '.item-characteristics__groups div.item-characteristics__attrs-el-name-wrap:contains("Разрешение основной камеры:")'
    )
      .next()
      .text()
      .trim() || EMPTY;
  const frontCameraQuality =
    $(
      '.item-characteristics__groups div.item-characteristics__attrs-el-name-wrap:contains("Фронтальная камера:")'
    )
      .next()
      .text()
      .trim() || EMPTY;
  const chargingPort =
    $(
      '.item-characteristics__groups div.item-characteristics__attrs-el-name-wrap:contains("Тип разъема для зарядки:")'
    )
      .next()
      .text()
      .trim() || EMPTY;
  const audioPort =
    $(
      '.item-characteristics__groups div.item-characteristics__attrs-el-name-wrap:contains("Разъем для наушников:")'
    )
      .next()
      .text()
      .trim() || EMPTY;

  const batteryCapacity =
    $(
      '.item-characteristics__groups div.item-characteristics__attrs-el-name-wrap:contains("Емкость аккумулятора:")'
    )
      .next()
      .text()
      .trim() || EMPTY;
  const characteristics: NewCharacteristics = {
    color,
    simCards,
    diagonal,
    resolution,
    material,
    operationSystem,
    cpu,
    gpu,
    ram,
    storage,
    backCameraQuality,
    frontCameraQuality,
    chargingPort,
    audioPort,
    batteryCapacity,
  };

  const photos: NewPhoto[] = [];
  $('a.item-card__carousel-el-link').each(function () {
    const photo: NewPhoto = { url: $(this).attr('data-img-gal') ?? '' };
    photos.push(photo);
  });

  const offer: NewOffer = {
    vendor: 'RBT.ru',
    description: $('div.item-set.page-item__item-set span.text.item-set__title')
      .first()
      .text()
      .trim(),
    url,
  };
  const offers: NewOffer[] = [offer];
  return { phone, characteristics, photos, offers };
}
