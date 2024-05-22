import db from '$lib/db/db';
import { phoneTable, type Phone } from '$lib/db/schema.js';
import { asc, desc } from 'drizzle-orm';

export async function load({ url }) {
  const search = url.searchParams.get('search');
  const sortBy: keyof Phone =
    (url.searchParams.get('sortBy') as keyof Phone) || 'id';
  const sortOrder = url.searchParams.get('sortOrder');
  const manufacturer = url.searchParams.get('manufacturer') || '';

  // const filteredArray = data.phones.filter((value) =>
  //   search ? value.body.includes(search) || value.title.includes(search) : true
  // );
  // const sortedArray = filteredArray.toSorted((a, b) =>
  //   sortBy === 'desc' ? b.id - a.id : a.id - b.id
  // );

  const phones = await db.query.phoneTable.findMany({
    orderBy:
      sortOrder === 'desc' ? desc(phoneTable[sortBy]) : asc(phoneTable[sortBy]),
    where: (value, { like, and, eq }) => {
      const searchCondition = like(value.name, `%${search}%`);
      const manufacturerCondition = eq(value.manufacturer, manufacturer);
      return and(
        ...[
          search ? searchCondition : undefined,
          manufacturer ? manufacturerCondition : undefined,
        ]
      );
    },
  });

  const allPhones = await db.query.phoneTable.findMany();

  const manufacturers = new Set(allPhones.map((phone) => phone.manufacturer));

  return {
    phones,
    manufacturers,
  };
}

// export const actions = {
//   default: () => {

//   },
// };
