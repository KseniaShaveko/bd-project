import db from '$lib/db/db';
import { phoneTable, type NewPhone } from '$lib/db/schema';

async function insertPhone(phone: NewPhone) {
  await db
    .insert(phoneTable)
    .values(phone)
    .onConflictDoUpdate({ target: [phoneTable.name], set: phone });

  console.log(`${phone.name} СОХРАНЕНО!!!!!!!!!!!!!!!!!!!`);
}

export async function insertTransaction(phone: NewPhone) {
  await db.transaction(async (tx) => {
    try {
      insertPhone(phone);
    } catch (error) {
      console.log(error);
      await tx.rollback();
    }
  });
}
