// import data from '$lib/data.json';
import db from '$lib/db/db';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const { slug } = params;
  const phone = await db.query.phoneTable.findFirst({
    where: (value, { eq }) => eq(value.id, Number(slug)), with: {
      characteristics: true,
      offers: true,
      photos: true,
    }
  });
  if (!phone) {
    error(404, 'Не найдено');
  }
  return { phone };
}
