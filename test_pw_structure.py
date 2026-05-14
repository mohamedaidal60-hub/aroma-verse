import requests
from bs4 import BeautifulSoup

def test_pw():
    url = 'https://www.perfumersworld.com/product-list.php?type=essential-oils'
    headers = {'User-Agent': 'Mozilla/5.0'}
    try:
        r = requests.get(url, headers=headers, timeout=10)
        soup = BeautifulSoup(r.content, 'html.parser')
        # On cherche les lignes de produits typiques de PW (souvent des tableaux ou divs)
        products = soup.find_all('a', href=True)
        with open('pw_sample.txt', 'w', encoding='utf-8') as f:
            for p in products[:50]:
                if 'view-product' in p['href'] or 'product-details' in p['href']:
                    f.write(f"Link: {p['href']} | Text: {p.text.strip()}\n")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_pw()
