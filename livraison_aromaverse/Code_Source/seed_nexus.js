import { neon } from '@neondatabase/serverless';

const DATABASE_URL = "postgresql://neondb_owner:npg_mOD0Ykjcp2VE@ep-falling-mountain-anm7xje6-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require";
const sql = neon(DATABASE_URL);

async function run() {
  console.log("Setting up schema and seeding...");

  try {
    // CREATE TABLES
    await sql`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`;

    await sql`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin'
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255),
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        current_plan VARCHAR(50) DEFAULT 'free',
        trial_until TIMESTAMP WITH TIME ZONE,
        avatar_url TEXT,
        cover_url TEXT,
        achievements JSONB DEFAULT '[]',
        social_stats JSONB DEFAULT '{"followers": 0, "following": 0}',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        category VARCHAR(100),
        price DECIMAL(10,2),
        rating DECIMAL(3,2) DEFAULT 0,
        reviews_count INTEGER DEFAULT 0,
        inventory_data JSONB DEFAULT '{"stock": 100, "variants": []}',
        technical_props JSONB DEFAULT '{}',
        reviews JSONB DEFAULT '[]',
        is_featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS courses (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        level INTEGER DEFAULT 0,
        description TEXT,
        progress_data JSONB DEFAULT '{"total_lessons": 0}',
        lessons JSONB DEFAULT '[]',
        url VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS investment_projects (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        location VARCHAR(255),
        roi_range VARCHAR(50),
        duration_years INTEGER,
        progress INTEGER DEFAULT 0,
        total_funding DECIMAL(15,2),
        current_funding DECIMAL(15,2) DEFAULT 0,
        investor_count INTEGER DEFAULT 0,
        images JSONB DEFAULT '[]',
        report_url TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // SEED DATA
    const products = [
      {
        title: "Ambroxan",
        slug: "ambroxan",
        category: "Matières Premières",
        price: 2.50,
        rating: 4.9,
        reviews_count: 2847,
        technical_props: {
          molecular_weight: "290.48 g/mol",
          boiling_point: "320°C",
          stability: "High (>400h)",
          cas: "6790-58-5"
        },
        inventory_data: {
          stock: 500,
          variants: [
            { size: "1g", price: 2.50 },
            { size: "5g", price: 9.00 },
            { size: "25g", price: 23.75 },
            { size: "100g", price: 75.00 }
          ]
        }
      }
    ];

    for (const p of products) {
      await sql`
        INSERT INTO products (title, slug, category, price, rating, reviews_count, technical_props, inventory_data)
        VALUES (${p.title}, ${p.slug}, ${p.category}, ${p.price}, ${p.rating}, ${p.reviews_count}, ${p.technical_props}, ${p.inventory_data})
        ON CONFLICT (slug) DO UPDATE SET 
          technical_props = EXCLUDED.technical_props,
          inventory_data = EXCLUDED.inventory_data
      `;
    }

    console.log("Database schema created and data seeded successfully.");
  } catch (err) {
    console.error("Error during setup/seeding:", err);
  }
}

run();
