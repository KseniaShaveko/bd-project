// import data from '$lib/data.json';
import db from '$lib/db/db';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const { slug } = params;
  const article = await db.query.articleTable.findFirst({
    where: (value, { eq }) => eq(value.id, Number(slug)),
  });
  if (!article) {
    error(404, 'Не найдено');
  }
  return { article };
}
