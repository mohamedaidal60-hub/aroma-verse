import requests
from bs4 import BeautifulSoup
import psycopg2
from psycopg2.extras import DictCursor
import time
import os
from concurrent.futures import ThreadPoolExecutor

DB_URL = "postgresql://neondb_owner:npg_mOD0Ykjcp2VE@ep-falling-mountain-anm7xje6-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require"

def ensure_columns():
    """Adds missing detail columns to tgsc_materials table."""
    try:
        conn = psycopg2.connect(DB_URL)
        cur = conn.cursor()
        print("Ensuring columns exist...")
        columns_to_add = [
            ("molecular_weight", "VARCHAR(255)"),
            ("boiling_point", "VARCHAR(255)"),
            ("flash_point", "VARCHAR(255)"),
            ("specific_gravity", "VARCHAR(255)"),
            ("ifra_recommendation", "VARCHAR(255)"),
            ("organoleptic_details", "TEXT")
        ]
        for col_name, col_type in columns_to_add:
            cur.execute(f"ALTER TABLE tgsc_materials ADD COLUMN IF NOT EXISTS {col_name} {col_type};")
        conn.commit()
        cur.close()
        conn.close()
        print("Columns guaranteed.")
    except Exception as e:
        print(f"Error ensuring columns: {e}")

def scrape_and_update(record):
    """Fetches details from TGSC url and updates the record in NeonDB."""
    id, name, usage_text = record[0], record[1], record[2]
    
    if not usage_text or "Source:" not in usage_text:
        return

    url = usage_text.replace("Source:", "").strip()
    
    try:
        # Avoid ban by spoofing UA
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
        response = requests.get(url, headers=headers, timeout=10)
        
        if response.status_code != 200:
            print(f"Failed {url}")
            return
            
        soup = BeautifulSoup(response.text, 'html.parser')
        
        metrics = {
            "molecular_weight": "", "boiling_point": "", "flash_point": "", 
            "specific_gravity": "", "ifra_recommendation": "", "organoleptic_details": ""
        }
        
        # Parse physical properties table typically found on TGSC
        for tr in soup.find_all('tr'):
            text = tr.text.lower()
            if "molecular weight:" in text:
                metrics['molecular_weight'] = tr.find_all('td')[1].text.strip()
            elif "boiling point:" in text:
                metrics['boiling_point'] = tr.find_all('td')[1].text.strip()
            elif "flash point:" in text:
                metrics['flash_point'] = tr.find_all('td')[1].text.strip()
            elif "specific gravity:" in text:
                metrics['specific_gravity'] = tr.find_all('td')[1].text.strip()
            elif "ifra" in text and "recommendation" in text:
                try: 
                    metrics['ifra_recommendation'] = tr.find_all('td')[1].text.strip()
                except:
                    pass
            elif "odor description:" in text:
                try:
                    metrics['organoleptic_details'] = tr.find_all('td')[1].text.strip()
                except:
                    pass
        
        # Fallbacks or generic filling
        if not metrics['ifra_recommendation'] and soup.find(text=lambda x: x and 'IFRA' in x):
            metrics['ifra_recommendation'] = "Restricted - See IFRA Standards"

        # Update DB
        conn = psycopg2.connect(DB_URL)
        cur = conn.cursor()
        cur.execute("""
            UPDATE tgsc_materials 
            SET molecular_weight = %s, boiling_point = %s, flash_point = %s, 
                specific_gravity = %s, ifra_recommendation = %s, organoleptic_details = %s
            WHERE id = %s
        """, (metrics['molecular_weight'], metrics['boiling_point'], metrics['flash_point'], 
              metrics['specific_gravity'], metrics['ifra_recommendation'], metrics['organoleptic_details'], id))
        conn.commit()
        cur.close()
        conn.close()
        
        print(f"[SUCCESS] Updated details for {name}")
        
    except Exception as e:
        print(f"[ERROR] {name}: {e}")

def main():
    ensure_columns()
    
    conn = psycopg2.connect(DB_URL)
    cur = conn.cursor(cursor_factory=DictCursor)
    
    # We only select rows that haven't been updated with molecular_weight to allow resuming
    cur.execute("SELECT id, name, usage_text FROM tgsc_materials WHERE molecular_weight IS NULL AND usage_text LIKE '%%Source:%%'")
    records = cur.fetchall()
    
    print(f"[{len(records)}] Materials queue to scrape. Starting Multithreading...")
    
    # Use max 5 threads to avoid DDOSing The Good Scents and getting IP banned fast
    with ThreadPoolExecutor(max_workers=5) as executor:
        for record in records:
            executor.submit(scrape_and_update, record)
            time.sleep(0.5) # Gentle rate limiting
            
    cur.close()
    conn.close()
    print("FINISHED scraping!")

if __name__ == "__main__":
    main()
