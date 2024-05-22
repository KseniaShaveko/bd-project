import db from '$lib/db/db';
import {
  characteristicsTable,
  offerTable,
  phoneTable,
  photoTable,
} from '$lib/db/schema';
import type { FullPhone } from './scraper';

async function insertPhone(fullPhone: FullPhone) {
  const { phone, offers, characteristics, photos } = fullPhone;
  const savedPhone = (
    await db
      .insert(phoneTable)
      .values(phone)
      .onConflictDoUpdate({ target: [phoneTable.name], set: phone })
      .returning()
  )[0];
  await db
    .insert(characteristicsTable)
    .values({ ...characteristics, phoneId: savedPhone.id })
    .onConflictDoUpdate({
      target: [characteristicsTable.phoneId],
      set: characteristics,
    });
  for (const i in offers) {
    const offer = offers[i];
    await db
      .insert(offerTable)
      .values({ ...offer, phoneId: savedPhone.id })
      .onConflictDoUpdate({
        target: [offerTable.phoneId, offerTable.vendor],
        set: offer,
      });
  }
  for (const i in photos) {
    const photo = photos[i];
    await db
      .insert(photoTable)
      .values({ ...photo, phoneId: savedPhone.id })
      .onConflictDoUpdate({
        target: [photoTable.phoneId, photoTable.url],
        set: photo,
      });
  }
  console.log(`${phone.name} СОХРАНЕНО!!!!!!!!!!!!!!!!!!!`);
}

export async function insertTransaction(fullPhone: FullPhone) {
  await db.transaction(async (tx) => {
    try {
      insertPhone(fullPhone);
    } catch (error) {
      console.log(error);
      await tx.rollback();
    }
  });
}
