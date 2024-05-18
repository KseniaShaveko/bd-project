import db from '$lib/db/db';
import { phoneTable } from '$lib/db/schema.js';
import { asc, desc } from 'drizzle-orm';

export async function load({ url }) {
  const sortBy = url.searchParams.get('sortBy');
  const search = url.searchParams.get('search');

  // const filteredArray = data.phones.filter((value) =>
  //   search ? value.body.includes(search) || value.title.includes(search) : true
  // );
  // const sortedArray = filteredArray.toSorted((a, b) =>
  //   sortBy === 'desc' ? b.id - a.id : a.id - b.id
  // );

  const phones = await db.query.phoneTable.findMany({
    orderBy: sortBy === 'desc' ? desc(phoneTable.id) : asc(phoneTable.id),
    where: (value, { like, or }) => {
      const searchText = search ? `%${search}%` : '%';
      return like(value.name, searchText);
    },
  });

  return {
    array: phones,
  };
}

// export const actions = {
//   default: () => {

//   },
// };
