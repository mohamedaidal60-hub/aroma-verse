import { neon } from '@neondatabase/serverless';

const DATABASE_URL = "postgresql://neondb_owner:npg_mOD0Ykjcp2VE@ep-falling-mountain-anm7xje6-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require";
const sql = neon(DATABASE_URL);

async function main() {
  try {
    const results = await sql`
              SELECT name, cas, scent, note, 'The Good Scents Co' as company, true as "isTGSC", ifra_restricted 
              FROM tgsc_materials 
              LIMIT 3000 OFFSET 0
            `;
    console.log("Returned:", results.length);
  } catch (err) {
    console.error("Error:", err);
  }
}
main();
