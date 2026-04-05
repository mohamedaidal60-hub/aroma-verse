import { neon } from '@neondatabase/serverless';

// Warning: In production, secret connection strings should not be placed in the frontend.
// This is done for rapid prototyping and demonstration purposes as requested.
const DATABASE_URL = "postgresql://neondb_owner:npg_mOD0Ykjcp2VE@ep-falling-mountain-anm7xje6-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require";

export const sql = neon(DATABASE_URL);

export async function setupDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin'
      );
    `;
    
    // Check if admin exists
    const users = await sql`SELECT * FROM admin_users WHERE email = 'mohamed@aroma-verse.com'`;
    if (users.length === 0) {
      await sql`
        INSERT INTO admin_users (email, password) 
        VALUES ('mohamed@aroma-verse.com', '@sba-Trs2026')
      `;
    }

    // Courses for Academy
    await sql`
      CREATE TABLE IF NOT EXISTS courses (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        source VARCHAR(255),
        description TEXT,
        url VARCHAR(255)
      );
    `;

    // Try seeding some courses
    const courses = await sql`SELECT * FROM courses LIMIT 1`;
    if (courses.length === 0) {
      const seedCourses = [
        { title: "Introduction à la Chimie des Parfums", source: "The Good Scents Company", url: "https://www.thegoodscentscompany.com/" },
        { title: "Comprendre les Notes Olfactives", source: "Scentree", url: "https://www.scentree.com/" },
        { title: "La Science des Arômes", source: "Scents and Flavors", url: "https://scentsandflavors.com" },
        { title: "Sécurité des Ingrédients", source: "RIFM", url: "https://www.rifm.org/" }
      ];
      for (const c of seedCourses) {
        await sql`INSERT INTO courses (title, source, url) VALUES (${c.title}, ${c.source}, ${c.url})`;
      }
    }

    return { success: true };
  } catch (err) {
    console.error("Neon DB Setup error:", err);
    return { success: false, error: err };
  }
}
