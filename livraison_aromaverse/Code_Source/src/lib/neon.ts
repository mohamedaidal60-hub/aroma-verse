import { neon } from '@neondatabase/serverless';

// Warning: In production, secret connection strings should not be placed in the frontend.
// This is done for rapid prototyping and demonstration purposes as requested.
const DATABASE_URL = "postgresql://neondb_owner:npg_mOD0Ykjcp2VE@ep-falling-mountain-anm7xje6-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require";

export const sql = neon(DATABASE_URL);

export async function setupDatabase() {
  try {
    // 1. Admin Users
    await sql`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin'
      );
    `;

    // 2. Main Users Table
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

    // 3. Products
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

    // 4. Courses
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

    // 5. Lab Formulas
    await sql`
      CREATE TABLE IF NOT EXISTS lab_formulas (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id),
        title VARCHAR(255) NOT NULL,
        formula_data JSONB NOT NULL,
        is_public BOOLEAN DEFAULT false,
        likes INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 6. Investments
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

    // 7. Blog
    await sql`
      CREATE TABLE IF NOT EXISTS blog_articles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        content TEXT NOT NULL,
        author VARCHAR(255),
        tags JSONB DEFAULT '[]',
        likes INTEGER DEFAULT 0,
        comments JSONB DEFAULT '[]',
        image_url TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 8. Suppliers
    await sql`
      CREATE TABLE IF NOT EXISTS suppliers (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        location VARCHAR(255),
        is_certified BOOLEAN DEFAULT false,
        products_offered JSONB DEFAULT '[]',
        contact_info JSONB DEFAULT '{}',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Ensure default admin exists
    const adminExists = await sql`SELECT * FROM admin_users WHERE email = 'mohamed@aroma-verse.com'`;
    if (adminExists.length === 0) {
      await sql`INSERT INTO admin_users (email, password) VALUES ('mohamed@aroma-verse.com', '@sba-Trs2026')`;
    }

    return { success: true };
  } catch (err) {
    console.error("Neon DB Setup error:", err);
    return { success: false, error: err };
  }
}
