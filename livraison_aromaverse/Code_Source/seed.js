import { neon } from '@neondatabase/serverless';

const sql = neon("postgresql://neondb_owner:npg_mOD0Ykjcp2VE@ep-falling-mountain-anm7xje6-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require");

async function seed() {
  console.log("Seeding Neon DB...");
  
  // 1. Admin Users
  await sql`
    CREATE TABLE IF NOT EXISTS admin_users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'admin'
    );
  `;
  await sql`DELETE FROM admin_users WHERE email = 'mohamed@aroma-verse.com'`;
  await sql`
    INSERT INTO admin_users (email, password) 
    VALUES ('mohamed@aroma-verse.com', '@sba-Trs2026')
  `;
  console.log("Admin user created.");

  // 2. Products (from B2B)
  await sql`DROP TABLE IF EXISTS b2b_products CASCADE`;
  await sql`
    CREATE TABLE b2b_products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      supplier VARCHAR(255),
      price_per_unit DECIMAL,
      unit VARCHAR(50),
      category VARCHAR(100),
      image_url TEXT,
      origin VARCHAR(100)
    );
  `;
  
  const products = [
    { name: "Flacons en gros (Verre 50ml)", supplier: "Alibaba Glassware Co.", price: 0.85, unit: "pièce", category: "Packaging", img: "https://images.unsplash.com/photo-1594035987133-0d7b22554c9c?auto=format&fit=crop&w=400&q=80", origin: "Chine" },
    { name: "Huile Essentielle de Rose de Damas", supplier: "TradeIndia Naturals", price: 2500, unit: "litre", category: "Matière Première", img: "https://images.unsplash.com/photo-1588865611100-3490aa1841cf?auto=format&fit=crop&w=400&q=80", origin: "Inde" },
    { name: "Alcool Éthylique 96% Parfumerie", supplier: "Kompass EU Chemicals", price: 4.5, unit: "litre", category: "Solvant", img: "https://images.unsplash.com/photo-1620849206713-3cc18e950882?auto=format&fit=crop&w=400&q=80", origin: "France" },
    { name: "Huile Essentielle de Santal D'Australie", supplier: "B2BMap Exporters", price: 1800, unit: "litre", category: "Matière Première", img: "https://images.unsplash.com/photo-1595982855799-7dd215bda1d0?auto=format&fit=crop&w=400&q=80", origin: "Australie" },
    { name: "Bouchons Magnétiques Or/Argent", supplier: "Go4WorldBusiness", price: 1.20, unit: "pièce", category: "Packaging", img: "https://images.unsplash.com/photo-1623910376822-6e2794c48ce4?auto=format&fit=crop&w=400&q=80", origin: "Turquie" },
    { name: "Essence de Bergamote Bio", supplier: "Europages Citrus", price: 350, unit: "litre", category: "Matière Première", img: "https://images.unsplash.com/photo-1579726244464-500b462c82b0?auto=format&fit=crop&w=400&q=80", origin: "Italie" }
  ];

  for (const p of products) {
    await sql`
      INSERT INTO b2b_products (name, supplier, price_per_unit, unit, category, image_url, origin)
      VALUES (${p.name}, ${p.supplier}, ${p.price}, ${p.unit}, ${p.category}, ${p.img}, ${p.origin})
    `;
  }
  console.log("Products populated.");

  // 3. Academy Courses
  await sql`DROP TABLE IF EXISTS academy_courses CASCADE`;
  await sql`
    CREATE TABLE academy_courses (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content TEXT,
      source VARCHAR(255),
      estimated_time VARCHAR(50)
    );
  `;

  const courses = [
    {
      title: "La Pyramide Olfactive : Notes de Tête, Cœur et Fond",
      source: "Scentree",
      time: "15 min",
      content: "La pyramide olfactive décrit la structure d'un parfum selon le temps d'évaporation de ses notes.\n- **Notes de Tête** : Légères et volatiles (Agrumes, Aromates). Elles durent de quelques minutes à 2 heures.\n- **Notes de Cœur** : Le caractère du parfum (Fleurs, Fruits). Durent de 2 à 4 heures.\n- **Notes de Fond** : Fixateurs lourds (Bois, Épices, Musc). Durent plusieurs heures voire des jours."
    },
    {
      title: "Normes IFRA et Sécurité des Matériaux",
      source: "RIFM / Elsevier",
      time: "25 min",
      content: "L'IFRA (International Fragrance Association) régule l'utilisation des ingrédients. Le RIFM évalue scientifiquement leur innocuité. \nPar exemple, des ingrédients comme la mousse de chêne ou le coumarin ont des limites strictes d'utilisation dans les parfums à cause de leurs propriétés allergènes. Avant toute formulation, les parfumeurs doivent valider les niveaux maximaux autorisés par catégorie de produit final (Catégorie 4 pour les parfums alcooliques purs)."
    },
    {
      title: "Extraction des Huiles Essentielles",
      source: "The Good Scents Company",
      time: "20 min",
      content: "Les méthodes d'extraction varient selon la sensibilité de la plante :\n- **Distillation à la vapeur** : Méthode la plus courante pour les bois et plantes robustes (Lavande, Santal).\n- **Expression à froid** : Pour les écorces d'agrumes (Orange, Bergamote).\n- **Extraction au solvant (Absolue)** : Pour les fleurs trop fragiles pour la vapeur (Jasmin, Rose).\n- **CO2 Supercritique** : Méthode moderne permettant des extraits très purs et sans résidus."
    }
  ];

  for (const c of courses) {
    await sql`
      INSERT INTO academy_courses (title, content, source, estimated_time)
      VALUES (${c.title}, ${c.content}, ${c.source}, ${c.time})
    `;
  }
  console.log("Academy planted.");

  console.log("Neon DB Seeding completely finished!");
}

seed().catch(console.error);
