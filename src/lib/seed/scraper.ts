import * as cheerio from 'cheerio';
import type { NewArticle } from '../db/schema';

export async function scrape(url: string) {
  const response = await fetch(url);
  const body = await response.text();
  return cheerio.load(body);
}

export async function parseHabr(url: string): Promise<NewArticle> {
  const $ = await scrape(url);
  const title = $('h1').text().trim();
  const body = $('article.tm-article-presenter__content p').text().trim();
  return { title, body };
}
