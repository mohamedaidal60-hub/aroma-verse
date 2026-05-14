-- AROMAVERSE - SCRIPT D'INITIALISATION DE LA BASE DE DONNEES
-- Architecture : Perfume Nexus
-- Destination : Data Center Sidi Abdallah (GDA)

-- 1. Gestion des Utilisateurs et Administration
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin'
);

INSERT INTO admin_users (email, password) 
VALUES ('admin@aroma-verse.com', 'Aroma@2026_SBA')
ON CONFLICT (email) DO NOTHING;

-- 2. Marketplace B2B
CREATE TABLE IF NOT EXISTS b2b_products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    supplier VARCHAR(255),
    price_per_unit DECIMAL,
    unit VARCHAR(50),
    category VARCHAR(100),
    image_url TEXT,
    origin VARCHAR(100)
);

-- 3. Académie (Cours et Formation)
CREATE TABLE IF NOT EXISTS academy_courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    source VARCHAR(255),
    estimated_time VARCHAR(50),
    level VARCHAR(50) DEFAULT 'Initié'
);

-- 4. Projets d'Investissement
CREATE TABLE IF NOT EXISTS investment_projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    target_amount DECIMAL,
    current_amount DECIMAL DEFAULT 0,
    expected_roi VARCHAR(50),
    description TEXT,
    image_url TEXT
);

INSERT INTO investment_projects (name, location, target_amount, expected_roi, description)
VALUES 
('Culture Intensive Oud Malais', 'Malaisie / Zone Premium', 500000, '12-18%', 'Projet de plantation d''arbres Aquilaria pour la production d''huile d''Oud de grade A.'),
('Distillerie Rose de Damas', 'Bulgarie / Vallée des Roses', 250000, '8-10%', 'Modernisation d''une unité de distillation pour extraits naturels.');

-- 5. Studio & Formules (Nexus Data Lake)
CREATE TABLE IF NOT EXISTS fragrance_formula (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    creator_id INTEGER,
    ingredients JSONB, -- Stockage des composants et pourcentages
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Fin du script
