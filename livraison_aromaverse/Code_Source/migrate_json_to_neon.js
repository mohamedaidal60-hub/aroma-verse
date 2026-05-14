import { neon } from '@neondatabase/serverless';
import fs from 'fs';

const sql = neon("postgresql://neondb_owner:npg_mOD0Ykjcp2VE@ep-falling-mountain-anm7xje6-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require");

async function migrate() {
  try {
    const data = JSON.parse(fs.readFileSync('./src/data/tgsc_database.json', 'utf8'));
    const materials = data.materials || [];
    
    console.log(`Migration de ${materials.length} produits vers Neon...`);
    
    // Insertion par lots (batch) de 50 pour éviter les timeouts
    for (let i = 0; i < materials.length; i += 50) {
      const batch = materials.slice(i, i + 50);
      
      for (const m of batch) {
        await sql`
          INSERT INTO tgsc_materials (name, cas, scent, note, ifra_restricted)
          VALUES (${m.name}, ${m.cas || 'N/A'}, ${m.scent || ''}, ${m.note || 'BASE'}, ${m.ifra_restricted || false})
          ON CONFLICT DO NOTHING
        `;
      }
      process.stdout.write(`\rProgress: ${Math.min(i + 50, materials.length)} / ${materials.length}`);
    }
    
    console.log("\nMigration terminée !");
  } catch (err) {
    console.error("Erreur migration:", err);
  }
}

migrate();
