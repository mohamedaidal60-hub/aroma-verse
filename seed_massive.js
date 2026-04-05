import { neon } from '@neondatabase/serverless';

const sql = neon("postgresql://neondb_owner:npg_mOD0Ykjcp2VE@ep-falling-mountain-anm7xje6-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require");

async function seedMassive() {
  console.log("Starting massive seeding...");
  
  // 1. Recreate marketplace
  await sql`DROP TABLE IF EXISTS marketplace_items CASCADE`;
  await sql`
    CREATE TABLE marketplace_items (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255),
      description TEXT,
      price DECIMAL,
      creator VARCHAR(255),
      image_url TEXT,
      category VARCHAR(100)
    );
  `;
  const market = [
    { title: "Oud Saphir Absolu", desc: "Formule inédite boisée intense, 15% concentration.", price: 290, creator: "Nez Créatif", cat: "Parfums" },
    { title: "Pack Base Florale Orientale", desc: "Formule open-source prête pour l'industrialisation locale.", price: 1500, creator: "Laboratoires Elixir", cat: "Matières premières" },
    { title: "Kit Parfumeur Débutant", desc: "Essences de Grasse, 20 fioles.", price: 450, creator: "AromaTools", cat: "Matières premières" },
    { title: "Musc Blanc Synthétique", desc: "Galaxolide pur 100%.", price: 80, creator: "ChemFrag", cat: "Matières premières" },
    { title: "Design Flacon 'Larme'", desc: "Modélisation 3D pour moulage verre.", price: 850, creator: "DesignStudio", cat: "Packaging" },
    { title: "Néroli Premium", desc: "Huile essentielle Tunisie, certifiée bio.", price: 420, creator: "AgriOdor", cat: "Matières premières" }
  ];
  for (const m of market) {
    await sql`INSERT INTO marketplace_items (title, description, price, creator, category) VALUES (${m.title}, ${m.desc}, ${m.price}, ${m.creator}, ${m.cat})`;
  }

  // 2. Recreate investments
  await sql`DROP TABLE IF EXISTS investments CASCADE`;
  await sql`
    CREATE TABLE investments (
      id SERIAL PRIMARY KEY,
      project_name VARCHAR(255),
      description TEXT,
      goal_amount DECIMAL,
      current_amount DECIMAL,
      roi_percentage DECIMAL,
      founder VARCHAR(255)
    );
  `;
  const invest = [
    { name: "Distillerie de Lavande (Algérie)", desc: "Création d'une ferme de 50 hectares et distillerie sur place. Fort potentiel B2B.", goal: 150000, cur: 45000, roi: 12.5, founder: "Farid H." },
    { name: "Laboratoire Synthèse Éco-Responsable", desc: "Recherche sur les substituts d'ambre gris.", goal: 300000, cur: 210000, roi: 18, founder: "BioFragrances" },
    { name: "Boutique Niche Paris-Dubaï", desc: "Ouverture de deux concepts stores spécialisés dans le parfum sur mesure.", goal: 500000, cur: 100000, roi: 15, founder: "Luxury Retail" },
    { name: "Plantation de Vétiver (Madagascar)", desc: "Soutien aux agriculteurs locaux et extraction au CO2 supercritique.", goal: 80000, cur: 80000, roi: 9, founder: "Terre & Senteur" }
  ];
  for (const i of invest) {
    await sql`INSERT INTO investments (project_name, description, goal_amount, current_amount, roi_percentage, founder) VALUES (${i.name}, ${i.desc}, ${i.goal}, ${i.cur}, ${i.roi}, ${i.founder})`;
  }

  // 3. Expand B2B Products
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
  const b2b = [
    {name: "Flacons 50ml Verre Noir Mat", sup: "Alibaba Glassware", p: 0.85, u: "pc", c: "Packaging", o: "Chine"},
    {name: "Flacons 100ml Cristal Luxe", sup: "Alibaba Premium", p: 2.10, u: "pc", c: "Packaging", o: "Chine"},
    {name: "Capsules Magnétiques Zamac", sup: "TradeIndia Metals", p: 1.50, u: "pc", c: "Packaging", o: "Inde"},
    {name: "Pompes Spray Invisibles", sup: "ThomasNet Plastics", p: 0.45, u: "pc", c: "Packaging", o: "USA"},
    {name: "Boîtes Carton Rigide (Sur Mesure)", sup: "Europages Print", p: 3.50, u: "pc", c: "Packaging", o: "Europe"},
    {name: "Huile de Santal Album", sup: "Go4WorldBusiness", p: 2800, u: "L", c: "Matière Première", o: "Australie"},
    {name: "Huile de Rose Centifolia", sup: "Europages Grasse", p: 8500, u: "L", c: "Matière Première", o: "France"},
    {name: "Absolue de Jasmin Grandiflorum", sup: "TradeIndia Naturals", p: 3200, u: "L", c: "Matière Première", o: "Inde"},
    {name: "Huile Essentielle de Géranium", sup: "AfricaYellowPages", p: 180, u: "L", c: "Matière Première", o: "Égypte"},
    {name: "Résinoïde Encens Oliban", sup: "GoAfricaOnline", p: 450, u: "kg", c: "Matière Première", o: "Somalie"},
    {name: "Alcool Éthylique Agricole 96%", sup: "Kompass EU Chemicals", p: 4.2, u: "L", c: "Solvant", o: "Pologne"},
    {name: "Dipropylène Glycol (DPG)", sup: "Manta Chemicals", p: 3.8, u: "L", c: "Solvant", o: "USA"},
    {name: "Filtres UV industriels (Parfumerie)", sup: "Manta Chemicals", p: 85, u: "kg", c: "Chimie", o: "USA"}
  ];
  for (const b of b2b) {
    await sql`INSERT INTO b2b_products (name, supplier, price_per_unit, unit, category, origin) VALUES (${b.name}, ${b.sup}, ${b.p}, ${b.u}, ${b.c}, ${b.o})`;
  }

  // 4. Expand Academy intensely
  await sql`DROP TABLE IF EXISTS academy_courses CASCADE`;
  await sql`
    CREATE TABLE academy_courses (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        content TEXT,
        source VARCHAR(255),
        estimated_time VARCHAR(50)
    );
  `;
  const ac = [
    {t: "Données RIFM : Réglementation du Coumarin", s: "RIFM", time: "10 min", c: "La concentration maximale autorisée dans les produits de catégorie 4 (parfums hydro-alcooliques) est strictement limitée à cause des risques de sensibilisation cutanée croisée détectés lors d'analyses épidémiologiques menées par Elsevier..."},
    {t: "Knowde: Fiches de Solvants DPG", s: "Knowde", time: "5 min", c: "Le Dipropylène Glycol de grade fragrance est inodore et d'une grande pureté. Il est utilisé comme co-solvant pour réduire la volatilité des notes de tête trop aiguës."},
    {t: "Scentree : Cartographie des Agrumes", s: "Scentree", time: "15 min", c: "Bergamote, Citron, Limette, Mandarine, Pamplemousse. Scentree répertorie plus de 145 variations moléculaires (limonène, linalool)."},
    {t: "Base SGC : Aldéhyde C12 MNA", s: "The Good Scents Company", time: "12 min", c: "Odeur forte, métallique, ambrée, musquée et boisée. Dosage recommandé : 0.1 à 1%. Très puissant."},
    {t: "Base SGC : Iso E Super", s: "The Good Scents Company", time: "8 min", c: "Composé synthétique au profil boisé doux et ambré avec un effet velours. Souvent utilisé comme noyau structurel en très grande quantité moléculaire (jusqu'à 25%)."}
  ];
  for (const c of ac) {
    await sql`INSERT INTO academy_courses (title, content, source, estimated_time) VALUES (${c.t}, ${c.c}, ${c.s}, ${c.time})`;
  }

  console.log("Massive DB Seeding completely finished!");
}

seedMassive().catch(console.error);
