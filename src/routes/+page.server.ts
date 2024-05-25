import db from '$lib/db/db';
import { phoneTable, type Phone } from '$lib/db/schema.js';
import { asc, desc } from 'drizzle-orm';

export async function load({ url }) {
  const search = url.searchParams.get('search');
  const sortBy: keyof Phone =
    (url.searchParams.get('sortBy') as keyof Phone) || 'id';
  const sortOrder = url.searchParams.get('sortOrder');
  const manufacturer = url.searchParams.get('manufacturer') || '';
  const page = Number(url.searchParams.get('page') ?? 1);

  // const filteredArray = data.phones.filter((value) =>
  //   search ? value.body.includes(search) || value.title.includes(search) : true
  // );
  // const sortedArray = filteredArray.toSorted((a, b) =>
  //   sortBy === 'desc' ? b.id - a.id : a.id - b.id
  // );

  const pageSize = 10;

  const foundPhones = await db.query.phoneTable.findMany({
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

  const offset = (page - 1) * pageSize;
  const phones = foundPhones.slice(offset, offset + pageSize);

  const allPhones = await db.query.phoneTable.findMany();

  const manufacturers = new Set(allPhones.map((phone) => phone.manufacturer));
  const pagesTotal = Math.ceil(foundPhones.length / pageSize);

  const prevPage = new URL(url);
  prevPage.searchParams.set('page', String(page - 1));
  const nextPage = new URL(url);
  nextPage.searchParams.set('page', String(page + 1));
  const firstPage = new URL(url);
  firstPage.searchParams.set('page', String(1));
  const lastPage = new URL(url);
  lastPage.searchParams.set('page', String(pagesTotal));

  return {
    phones,
    manufacturers,
    pagination: {
      pagesTotal,
      page,
      prevPage: prevPage.href,
      nextPage: nextPage.href,
      firstPage: firstPage.href,
      lastPage: lastPage.href,
    },
  };
}

// export const actions = {
//   default: () => {

//   },
// };
