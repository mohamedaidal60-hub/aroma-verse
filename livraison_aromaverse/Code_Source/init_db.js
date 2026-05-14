import { neon } from '@neondatabase/serverless';

const sql = neon("postgresql://neondb_owner:npg_mOD0Ykjcp2VE@ep-falling-mountain-anm7xje6-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require");

async function init() {
  try {
    console.log("Creation de la table tgsc_materials...");
    await sql`
      CREATE TABLE IF NOT EXISTS tgsc_materials (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        cas TEXT,
        scent TEXT,
        note TEXT,
        longevity TEXT,
        impact TEXT,
        ifra_restricted BOOLEAN DEFAULT FALSE,
        tags TEXT[],
        usage_text TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    await sql`CREATE INDEX IF NOT EXISTS idx_tgsc_name ON tgsc_materials(name);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_tgsc_cas ON tgsc_materials(cas);`;
    
    console.log("Table tgsc_materials initialisée avec succès !");
  } catch (err) {
    console.error("Erreur lors de la création de la table:", err);
  }
}

init();
