import { insertTransaction } from './insert';
import { parseHabr, scrape } from './scraper';

async function seed() {
  const habrLinks = await getHabrLinks();
  habrLinks.forEach(async (url) => {
    const article = await parseHabr(url);
    console.log(article);
    await insertTransaction(article);
  });
}

async function getHabrLinks() {
  const listUrl = 'https://habr.com/ru/feed/';
  const $ = await scrape(listUrl);
  const links: string[] = [];
  $('a.tm-title__link').each(function (i) {
    links[i] = 'https://habr.com' + ($(this).attr('href') as string);
  });
  console.log(links);
  return links;
}

seed();
