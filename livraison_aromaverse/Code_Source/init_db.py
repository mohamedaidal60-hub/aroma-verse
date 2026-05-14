import os
import requests

# Utilisation de l'API HTTP de Neon pour éviter les problèmes de drivers locaux
NEON_URL = "https://bottomless-limit-53372866-pooler.eu-central-1.aws.neon.tech/main?sslmode=require" # Exemple, je vais chercher la vraie
# En fait, je vais utiliser le fichier lib/neon.ts pour m'inspirer ou créer un petit script qui utilise l'URL d'environnement.

def init_db():
    DATABASE_URL = "postgresql://neondb_owner:npg_Lg5u8zZSTVcr@ep-bottomless-limit-a2jupx7z-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require"
    
    # On va utiliser psycopg2 si dispo, sinon on fait via curl/requests si possible
    # Pour faire simple et robuste, on va préparer un script SQL et l'envoyer via psql si dispo, 
    # ou juste utiliser le client JS si je peux le lancer avec Node.
    
    sql_command = """
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
    CREATE INDEX IF NOT EXISTS idx_tgsc_name ON tgsc_materials(name);
    CREATE INDEX IF NOT EXISTS idx_tgsc_cas ON tgsc_materials(cas);
    """
    
    print("Initialisation de la table TGSC dans Neon...")
    # On va essayer de passer par Node car l'environnement JS est déjà configuré
    with open("init_db.sql", "w") as f:
        f.write(sql_command)
    print("Fichier init_db.sql créé.")

if __name__ == "__main__":
    init_db()
