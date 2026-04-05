import { neon } from '@neondatabase/serverless';

const sql = neon("postgresql://neondb_owner:npg_mOD0Ykjcp2VE@ep-falling-mountain-anm7xje6-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require");

async function seedV2() {
  console.log("Adding Orders and Subscriptions tables...");
  
  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255),
      continent VARCHAR(100),
      items TEXT,
      total_price DECIMAL,
      status VARCHAR(50) DEFAULT 'En attente'
    );
  `;
  
  await sql`
    CREATE TABLE IF NOT EXISTS subscriptions (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255),
      continent VARCHAR(100),
      status VARCHAR(50) DEFAULT 'En attente'
    );
  `;

  console.log("V2 Tables successfully created!");
}

seedV2().catch(console.error);
