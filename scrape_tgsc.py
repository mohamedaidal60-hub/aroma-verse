import requests
from bs4 import BeautifulSoup
import json
import time

print("\n=======================================================")
print("  AROMAVERSE - TGSC (The Good Scents Company) SCRAPER")
print("=======================================================\n")
print("ATTENTION: Le site The Good Scents Company est très volumineux.")
print("Ce script est un point de départ pour extraire les données CAS et Profils.\n")

# URL de départ (exemple : liste alphabétique des matériaux - Lettre A)
BASE_URL = "http://www.thegoodscentscompany.com/allprod-a.html"

# Liste pour stocker toutes nos futures données
extracted_materials = []

def scrape_tgsc_page(url):
    print(f"[*] Analyse de la page : {url}")
    try:
        # Fait une requête vers le site (avec un User-Agent pour simuler un navigateur)
        # Certains sites anciens bloquent les robots sans User-Agent
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
        response = requests.get(url, headers=headers)
        
        # Vérifie que la page répond en succès
        if response.status_code != 200:
            print(f"[!] Erreur de connexion ({response.status_code})")
            return

        # Parsing du code HTML
        soup = BeautifulSoup(response.content, "html.parser")
        
        # TGSC liste souvent les matériaux dans de grands tableaux.
        # Ici, nous cherchons les liens qui mènent vers les profils individuels (ex: /data/rwXXXXX.html)
        links = soup.find_all('a', href=True)
        
        material_links = []
        for link in links:
            onclick = link.get('onclick', '')
            if 'openMainWindow' in onclick:
                # Exemple de structure : onclick="openMainWindow('/data/rs1914541.html');return false;"
                start = onclick.find("'") + 1
                end = onclick.find("'", start)
                if start > 0 and end > start:
                    path = onclick[start:end]
                    full_link = f"http://www.thegoodscentscompany.com{path}"
                    if full_link not in material_links:
                        material_links.append(full_link)
        
        print(f"[+] {len(material_links)} molécules trouvées sur cette page d'index.")
        
        # Nous parcourons TOUTES les molécules trouvées (sans limite)
        for mat_url in material_links:
            scrape_individual_profile(mat_url)
            time.sleep(1) # PAUSE de 1 seconde pour ne pas surcharger leur serveur (très important !)

    except Exception as e:
        print(f"[!] Erreur critique : {e}")

def scrape_individual_profile(url):
    print(f"   -> Extraction du profil : {url}")
    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        res = requests.get(url, headers=headers)
        soup = BeautifulSoup(res.content, "html.parser")
        
        # EXTRACTION DE DONNÉES (Adapter selon la structure 1990s du site)
        
        # 1. Obtenir le nom (Généralement dans le <title>)
        name = soup.title.string.strip() if soup.title else "Nom inconnu"
        
        # 2. Chercher le CAS Number. TGSC met souvent "CAS Number:" dans des <td>
        cas_number = "N/A"
        # 3. Chercher l'odeur (Odor Type)
        scent_profile = "N/A"
        
        # On fouille tous les tableaux à la recherche des mots clés "CAS Number:" et "Odor:"
        tds = soup.find_all('td')
        for i, td in enumerate(tds):
            text = td.get_text(strip=True).lower()
            if text == "cas number:":
                # Le numéro CAS est généralement dans la case suivante <td>
                if i + 1 < len(tds):
                    cas_number = tds[i+1].get_text(strip=True)
            elif text == "odor type:":
                if i + 1 < len(tds):
                    scent_profile = tds[i+1].get_text(strip=True)

        data = {
            "name": name,
            "cas": cas_number,
            "scent": scent_profile,
            "url_source": url
        }
        
        print(f"      [SUCCÈS] Trouvé: {name} | CAS: {cas_number}")
        extracted_materials.append(data)

    except Exception as e:
        print(f"      [!] Impossible de lire {url} : {e}")

# Lancer le scraper
scrape_tgsc_page(BASE_URL)

# Sauvegarder dans un fichier JSON pour AromaVerse !
print(f"\n[*] Sauvegarde de {len(extracted_materials)} matériaux dans 'tgsc_database_export.json'")
with open('tgsc_database_export.json', 'w', encoding='utf-8') as f:
    json.dump({"materials": extracted_materials}, f, ensure_ascii=False, indent=4)

print("[✓] Processus terminé ! Vous pouvez importer ce fichier dans AromaVerse.")
