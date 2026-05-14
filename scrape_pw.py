import requests
from bs4 import BeautifulSoup
import json
import time
import os
import re

def scrape_pw():
    print("=======================================================")
    print("  AROMAVERSE - PERFUMERSWORLD (PW) SCRAPER V2")
    print("=======================================================")

    # On utilise la page "FAST TRACK" pour avoir tous les produits d'un coup
    main_url = "https://www.perfumersworld.com/perfume-supplies.php"
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
    
    results = []
    
    try:
        print("[*] Récupération de la liste complète des produits...")
        response = requests.get(main_url, headers=headers, timeout=30)
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Trouver tous les liens de produits
        all_links = []
        for a in soup.find_all('a', href=True):
            href = a['href']
            if 'view.php?pro_id=' in href:
                if not href.startswith('http'):
                    href = "https://www.perfumersworld.com/" + href
                if href not in all_links:
                    all_links.append(href)
        
        print(f"[+] {len(all_links)} produits détectés au total.")
        
        # Catégories déduites par URL pour gagner du temps, ou par analyse de page
        # Pour faire propre, on va traiter les 100 premiers (ou plus si besoin)
        # Mais le user veut "beaucoup plus de produits", on va monter à 200 pour le test
        limit = 200
        
        for p_url in all_links[:limit]:
            try:
                p_resp = requests.get(p_url, headers=headers, timeout=15)
                p_soup = BeautifulSoup(p_resp.content, 'html.parser')
                
                # Nom
                title = "Produit Inconnu"
                if p_soup.find('h1'):
                    title = p_soup.find('h1').text.strip()
                elif p_soup.find('title'):
                    title = p_soup.find('title').text.replace('| PerfumersWorld', '').strip()

                # SKU
                sku_match = re.search(r'pro_id=([A-Z0-9]+)', p_url)
                sku = sku_match.group(1) if sku_match else "SKU"

                # Image Réelle
                image_url = "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&q=80&w=400" # Fallback
                for img in p_soup.find_all('img'):
                    src = img.get('src', '')
                    if 'images/product/' in src:
                        if not src.startswith('http'):
                            image_url = "https://www.perfumersworld.com/" + src
                        else:
                            image_url = src
                        break

                # Description
                desc = title
                desc_tag = p_soup.find('meta', {'name': 'description'})
                if desc_tag:
                    desc = desc_tag['content'].strip()
                
                # Prix
                base_price = 0.0
                price_match = re.search(r'US\$\s*([\d,]+\.?\d*)', p_soup.text)
                if price_match:
                    price_text = price_match.group(1).replace(',', '')
                    try:
                        base_price = float(price_text)
                    except:
                        pass
                
                # Catégorie (Déduction par SKU ou par analyse sommaire)
                category = "Matières Premières"
                if sku.startswith('7') or 'Essential Oil' in title:
                    category = "Essential Oils"
                elif sku.startswith('6') or 'Fleuressence' in title or 'F-TEC' in title:
                    category = "Compounds"
                elif 'Kit' in title:
                    category = "Kits"
                elif 'Bottle' in title or 'Equipment' in title:
                    category = "Equipment"

                if base_price > 0:
                    results.append({
                        "name": title,
                        "description": desc,
                        "category": category,
                        "base_price": base_price,
                        "display_price": round(base_price * 1.15, 2),
                        "source": "PerfumersWorld",
                        "url": p_url,
                        "image": image_url
                    })
                    print(f"   [SUCCÈS] {title} - {base_price}$")
                
                time.sleep(0.1) # Plus rapide
                
                # Sauvegarde auto toutes les 10 entrées pour rassurer l'UI
                if len(results) % 10 == 0:
                    save_data(results)

            except Exception as e:
                print(f"   [ERREUR] {p_url}: {e}")

        save_data(results)
        print(f"\n[✓] Scraping terminé ! {len(results)} produits enregistrés.")

    except Exception as e:
        print(f"[!] Erreur générale: {e}")

def save_data(data):
    output_file = 'src/data/pw_database.json'
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump({"products": data}, f, indent=4, ensure_ascii=False)

if __name__ == "__main__":
    scrape_pw()
