import { neon } from '@neondatabase/serverless';

const DATABASE_URL = "postgresql://neondb_owner:npg_mOD0Ykjcp2VE@ep-falling-mountain-anm7xje6-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require";
const sql = neon(DATABASE_URL);

async function main() {
  try {
    let q1 = '%nero%';
    const resultsNero = await sql`SELECT COUNT(*) FROM tgsc_materials WHERE LOWER(name) LIKE ${q1}`;
    console.log("Count nero:", resultsNero[0].count);

    let q2 = '%neroli%';
    const resultsNeroli = await sql`SELECT COUNT(*) FROM tgsc_materials WHERE LOWER(name) LIKE ${q2}`;
    console.log("Count neroli:", resultsNeroli[0].count);
  } catch (err) {
    console.error("Error:", err);
  }
}
main();
