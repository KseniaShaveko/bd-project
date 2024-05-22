import { relations } from 'drizzle-orm';
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';

export const phoneTable = sqliteTable(
  'phone',
  {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    manufacturer: text('manufacturer').notNull(),
    year: integer('year').notNull(),
    price: integer('price').notNull(),
    url: text('url'),
  },
  (phone) => ({
    nameIndex: uniqueIndex('phone_unique_name').on(phone.name),
  })
);

export const phoneRelations = relations(phoneTable, ({ many, one }) => ({
  photos: many(photoTable),
  offers: many(offerTable),
  characteristics: one(characteristicsTable),
}));

export type Phone = typeof phoneTable.$inferSelect;
export type NewPhone = typeof phoneTable.$inferInsert;

export const photoTable = sqliteTable(
  'photo',
  {
    id: integer('id').primaryKey(),
    url: text('url').notNull(),
    phoneId: integer('phoneId').references(() => phoneTable.id, {
      onDelete: 'cascade',
    }),
  },
  (photo) => ({
    urlIndex: uniqueIndex('photo_unique_url').on(photo.url, photo.phoneId),
  })
);

export const photoRelations = relations(photoTable, ({ one }) => ({
  phone: one(phoneTable, {
    fields: [photoTable.phoneId],
    references: [phoneTable.id],
  }),
}));

export type Photo = typeof photoTable.$inferSelect;
export type NewPhoto = typeof photoTable.$inferInsert;

export const offerTable = sqliteTable(
  'offer',
  {
    id: integer('id').primaryKey(),
    vendor: text('vendor').notNull(),
    url: text('url').notNull(),
    description: text('description').notNull(),
    phoneId: integer('phoneId').references(() => phoneTable.id, {
      onDelete: 'cascade',
    }),
  },
  (offer) => ({
    vendorIndex: uniqueIndex('offer_unique_vendor').on(
      offer.vendor,
      offer.phoneId
    ),
  })
);

export const offerRelations = relations(offerTable, ({ one }) => ({
  phone: one(phoneTable, {
    fields: [offerTable.phoneId],
    references: [phoneTable.id],
  }),
}));

export type Offer = typeof offerTable.$inferSelect;
export type NewOffer = typeof offerTable.$inferInsert;

export const characteristicsTable = sqliteTable(
  'characteristics',
  {
    id: integer('id').primaryKey(),
    color: text('color'),
    simCards: text('simCards'),
    diagonal: text('diagonal'),
    resolution: text('resolution'),
    material: text('material'),
    operationSystem: text('operationSystem'),
    cpu: text('cpu'),
    gpu: text('gpu'),
    ram: text('ram'),
    storage: text('storage'),
    backCameraQuality: text('backCameraQuality'),
    frontCameraQuality: text('frontCameraQuality'),
    chargingPort: text('chargingPort'),
    audioPort: text('audioPort'),
    batteryCapacity: text('batteryCapacity'),
    phoneId: integer('phoneId').references(() => phoneTable.id, {
      onDelete: 'cascade',
    }),
  },
  (characteristics) => ({
    phoneIdIndex: uniqueIndex('characteristics_unique_phone_id').on(
      characteristics.phoneId
    ),
  })
);

export const characteristicsRelations = relations(
  characteristicsTable,
  ({ one }) => ({
    phone: one(phoneTable, {
      fields: [characteristicsTable.phoneId],
      references: [phoneTable.id],
    }),
  })
);

export type Characteristics = typeof characteristicsTable.$inferSelect;
export type NewCharacteristics = typeof characteristicsTable.$inferInsert;
