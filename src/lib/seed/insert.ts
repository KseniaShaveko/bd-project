import db from '$lib/db/db';
import { articleTable, type NewArticle } from '$lib/db/schema';

async function insertArticle(article: NewArticle) {
  await db.insert(articleTable).values(article);
  console.log(`${article.title} СОХРАНЕНО!!!!!!!!!!!!!!!!!!!`);
  
}

export async function insertTransaction(article: NewArticle) {
  await db.transaction(async (tx) => {
    try {
      insertArticle(article);
    } catch (error) {
      console.log(error);
      await tx.rollback();
    }
  });
}
