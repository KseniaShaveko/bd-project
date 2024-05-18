import db from '$lib/db/db';
import { articleTable } from '$lib/db/schema.js';
import { asc, desc } from 'drizzle-orm';

export async function load({ url }) {
  const sortBy = url.searchParams.get('sortBy');
  const search = url.searchParams.get('search');

  // const filteredArray = data.articles.filter((value) =>
  //   search ? value.body.includes(search) || value.title.includes(search) : true
  // );
  // const sortedArray = filteredArray.toSorted((a, b) =>
  //   sortBy === 'desc' ? b.id - a.id : a.id - b.id
  // );

  const articles = await db.query.articleTable.findMany({
    orderBy: sortBy === 'desc' ? desc(articleTable.id) : asc(articleTable.id),
    where: (value, { like, or }) => {
      const searchText = search ? `%${search}%` : '%';
      return or(like(value.body, searchText), like(value.title, searchText));
    },
  });

  return {
    array: articles,
  };
}

// export const actions = {
//   default: () => {

//   },
// };
