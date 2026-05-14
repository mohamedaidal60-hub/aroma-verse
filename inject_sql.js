import { neon } from '@neondatabase/serverless';
import fs from 'fs';

const sql = neon("postgresql://neondb_owner:npg_mOD0Ykjcp2VE@ep-falling-mountain-anm7xje6-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require");

async function inject() {
  try {
    const content = fs.readFileSync('tgsc_massive_import_v2.sql', 'utf8');
    const lines = content.split('\n').filter(l => l.trim().length > 0 && l.startsWith("INSERT INTO"));
    console.log(`Préparation de ${lines.length} lignes pour l'injection...`);

    const batchSize = 100;
    for (let i = 0; i < lines.length; i += batchSize) {
      const batch = lines.slice(i, i + batchSize);
      let queryStr = batch.join('\n');
      try {
        await sql(queryStr);
      } catch (err) {
        for (const line of batch) {
           try { await sql(line); } catch(e) {}
        }
      }
      process.stdout.write(`\rProgress: ${Math.min(i + batchSize, lines.length)} / ${lines.length}`);
    }
    console.log("\nInjection terminée !");
  } catch(e) {
    console.error(e);
  }
}
inject();
