import postgres from "postgres";
import { readFile } from "node:fs/promises";

const sql = postgres(); // project.env থেকে DATABASE_URL নেয়

async function runMigrations() {
  const migrations = ["V1__todos.sql", "V2__ratings.sql"];
  for (const migration of migrations) {
    const sqlContent = await readFile(`../database-migrations/${migration}`, "utf8");
    await sql`BEGIN`;
    await sql.unsafe(sqlContent);
    await sql`COMMIT`;
    console.log(`Applied ${migration}`);
  }
  await sql.end();
}

runMigrations().catch(console.error);