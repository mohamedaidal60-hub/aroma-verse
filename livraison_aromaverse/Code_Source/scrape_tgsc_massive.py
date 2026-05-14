import requests
from bs4 import BeautifulSoup
import json
import time
import os
import re

# CONFIGURATION NEON (Via SQL Batch)
OUTPUT_SQL = "tgsc_massive_import_v2.sql"

def scrape_tgsc_massive():
    print("=======================================================")
    print("  AROMAVERSE - TGSC MASSIVE SCRAPER V2 (50,000+ TARGET)")
    print("=======================================================")

    base_url = "http://www.thegoodscentscompany.com/"
    # Index alphabétique
    letters = 'abcdefghijklmnopqrstuvwxyz'
    
    total_collected = 0
    
    for char in letters:
        print(f"[*] Traitement de la lettre: {char.upper()}")
        index_url = f"{base_url}allprod-{char}.html"
        
        try:
            resp = requests.get(index_url, timeout=30)
            soup = BeautifulSoup(resp.content, 'html.parser')
            
            # Extraction des liens via onclick="openMainWindow('/data/...')
            all_links = []
            for a in soup.find_all('a', onclick=True):
                onclick = a['onclick']
                match = re.search(r"'/data/(.*?)'", onclick)
                if match:
                    path = match.group(1)
                    full_url = base_url + "data/" + path
                    name = a.text.strip()
                    if full_url not in [l[0] for l in all_links]:
                        all_links.append((full_url, name))
            
            print(f"   [+] {len(all_links)} ingrédients détectés pour '{char.upper()}'")
            
            batch_data = []
            for p_url, p_name in all_links:
                try:
                    # On ne scrappe pas tout le détail tout de suite pour aller vite, 
                    # mais on pourrait si besoin. On prend au moins les infos dispos sur l'index (CAS)
                    # Sur l'index, le CAS est juste après le lien.
                    # On va essayer de trouver le parent et le texte suivant.
                    
                    # Pour l'instant on prend juste l'URL et le nom pour remplir la base massive rapidement
                    batch_data.append({
                        "name": p_name,
                        "url": p_url
                    })
                    
                    if len(batch_data) >= 100:
                        save_to_sql(batch_data)
                        total_collected += len(batch_data)
                        batch_data = []
                        print(f"      [STREAM] Total: {total_collected}...")

                except:
                    continue
            
            if batch_data:
                save_to_sql(batch_data)
                total_collected += len(batch_data)

        except Exception as e:
            print(f"   [!] Erreur sur la lettre {char}: {e}")

    print(f"\n[✓] Terminage ! {total_collected} produits indexés dans {OUTPUT_SQL}")

def save_to_sql(data):
    with open(OUTPUT_SQL, "a", encoding="utf-8") as f:
        for item in data:
            name = item['name'].replace("'", "''")
            url = item['url']
            # On insère le nom et l'URL. Le reste (CAS, Scent) pourra être enrichi ou est déjà dispo si on veut.
            sql = f"INSERT INTO tgsc_materials (name, usage_text) VALUES ('{name}', 'Source: {url}') ON CONFLICT DO NOTHING;\n"
            f.write(sql)

if __name__ == "__main__":
    if os.path.exists(OUTPUT_SQL):
        os.remove(OUTPUT_SQL)
    scrape_tgsc_massive()
