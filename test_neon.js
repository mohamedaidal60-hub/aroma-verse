const { neon } = require('@neondatabase/serverless');

const DATABASE_URL = "postgresql://neondb_owner:npg_mOD0Ykjcp2VE@ep-falling-mountain-anm7xje6-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require";
const sql = neon(DATABASE_URL);

async function main() {
  try {
    const res = await sql`SELECT COUNT(*) FROM tgsc_materials`;
    console.log("Count:", res[0].count);
    
    const sample = await sql`SELECT * FROM tgsc_materials LIMIT 1`;
    console.log("Sample:", sample);
  } catch (err) {
    console.error("Error:", err);
  }
}
main();
