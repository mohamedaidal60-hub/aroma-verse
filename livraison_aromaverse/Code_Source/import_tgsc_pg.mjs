import fs from 'fs';
import pkg from 'pg';
const { Client } = pkg;

const DATABASE_URL = "postgresql://neondb_owner:npg_mOD0Ykjcp2VE@ep-falling-mountain-anm7xje6-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require";

async function main() {
    console.log("Starting massive import...");
    const client = new Client({
        connectionString: DATABASE_URL,
    });
    
    try {
        await client.connect();
        console.log("Connected to Neon DB via pg.");
        
        let fileContent = fs.readFileSync('tgsc_massive_import_v2.sql', 'utf8');
        // The file has statements divided by newlines
        let lines = fileContent.split('\n').filter(l => l.trim().length > 0);
        console.log(`Found ${lines.length} lines to execute.`);
        
        const BATCH_SIZE = 1000;
        let inserted = 0;
        
        for (let i = 0; i < lines.length; i += BATCH_SIZE) {
            let batch = lines.slice(i, i + BATCH_SIZE).join('\n');
            await client.query(batch);
            inserted += batch.split('\n').length;
            console.log(`Executed ${inserted}/${lines.length} statements.`);
        }
        
        console.log("Massive import finished successfully!");
    } catch (err) {
        console.error("Error during import:", err);
    } finally {
        await client.end();
    }
}

main();
