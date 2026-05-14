import { neon } from '@neondatabase/serverless';

const DATABASE_URL = "postgresql://neondb_owner:npg_mOD0Ykjcp2VE@ep-falling-mountain-anm7xje6-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require";
const sql = neon(DATABASE_URL);

async function main() {
  try {
    const res = await sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `;
    console.log("Tables:", res.map(row => row.table_name));
    
    // check row counts
    for (let row of res) {
      if (!row.table_name.startsWith('pg_')) {
        const countRes = await sql(`SELECT COUNT(*) FROM "${row.table_name}"`);
        console.log(`Table ${row.table_name}: ${countRes[0].count} rows`);
      }
    }
  } catch (err) {
    console.error("Error:", err);
  }
}
main();
