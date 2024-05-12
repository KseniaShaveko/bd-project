import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const articleTable = sqliteTable('article', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  body: text('body').notNull(),
});

export type Article = typeof articleTable.$inferSelect;
export type NewArticle = typeof articleTable.$inferInsert;