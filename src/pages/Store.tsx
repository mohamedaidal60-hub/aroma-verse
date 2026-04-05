import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Store as StoreIcon, Search, ExternalLink, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const b2bPlatforms = [
  { id: "alibaba", name: "Alibaba", baseUrl: "https://www.alibaba.com/trade/search?SearchText=", region: "Global" },
  { id: "tradeindia", name: "TradeIndia", baseUrl: "https://www.tradeindia.com/search.html?keyword=", region: "Inde" },
  { id: "europages", name: "Europages", baseUrl: "https://www.europages.com/search/?q=", region: "Europe" },
  { id: "go4world", name: "Go4WorldBusiness", baseUrl: "https://www.go4worldbusiness.com/find?sq=", region: "Global" },
  { id: "kompass", name: "Kompass", baseUrl: "https://www.kompass.com/searchCompanies?text=", region: "Europe / Global" },
  { id: "thomasnet", name: "ThomasNet", baseUrl: "https://www.thomasnet.com/search.html?cov=NA&what=", region: "USA" }
];

const Store = () => {
  const [query, setQuery] = useState("");
  const [activeSearches, setActiveSearches] = useState<any[]>([]);

  const handleSearchAll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Generate links for all the platforms based on the search term
    const searches = b2bPlatforms.map(platform => ({
        ...platform,
        searchUrl: `${platform.baseUrl}${encodeURIComponent(query)}`
    }));
    setActiveSearches(searches);
  };

  const handleOpenAll = () => {
      activeSearches.forEach(search => {
          window.open(search.searchUrl, "_blank");
      });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col items-center justify-center mb-16 text-center">
            <div className="p-4 bg-primary/10 rounded-2xl text-primary mb-6">
              <Globe size={48} />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Moteur de Recherche <span className="text-gradient-gold">B2B Global</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Ne soyez pas limité à quelques produits. Recherchez dans les bases de données entières des plus grands fournisseurs mondiaux d'un seul coup.
            </p>
          </div>

          <form onSubmit={handleSearchAll} className="glass-card p-4 rounded-full flex items-center mb-12 shadow-xl  border-primary/20 max-w-3xl mx-auto ring-1 ring-primary/10 focus-within:ring-primary/50 transition-all">
            <Search className="text-muted-foreground ml-4 mr-2" />
            <Input 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ex: Ambergris substitute, 50ml glass bottle, Rose essential oil..." 
                className="border-0 bg-transparent focus-visible:ring-0 shadow-none text-lg flex-1 h-12"
            />
            <Button type="submit" className="rounded-full bg-gradient-gold px-8 h-12 font-bold shadow-gold">
                Lancer la recherche globale
            </Button>
          </form>

          {activeSearches.length > 0 ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-display font-bold">
                        Résultats d'annuaires pour : <span className="text-primary">"{query}"</span>
                    </h2>
                    <Button variant="outline" onClick={handleOpenAll} className="gap-2">
                        Ouvrir tous les onglets <ExternalLink size={16}/>
                    </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {activeSearches.map(search => (
                        <a 
                            key={search.id} 
                            href={search.searchUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="glass-card p-6 rounded-2xl hover:border-primary/50 transition-all group flex flex-col items-start gap-4"
                        >
                            <div className="flex justify-between w-full items-start">
                                <h3 className="font-bold text-xl group-hover:text-primary transition-colors">{search.name}</h3>
                                <ExternalLink size={20} className="text-muted-foreground group-hover:text-primary" />
                            </div>
                            <p className="text-sm text-muted-foreground flex-1">
                                Interroger les millions de produits B2B situés en {search.region}.
                            </p>
                            <div className="w-full bg-secondary text-foreground text-sm font-medium py-2 text-center rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                                Voir les fournisseurs
                            </div>
                        </a>
                    ))}
                </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60 pointer-events-none mt-20">
                <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center">
                    <StoreIcon size={32} className="mb-4 text-muted-foreground" />
                    <h3 className="font-bold mb-2">Connecté aux APIs mondiales</h3>
                    <p className="text-sm text-muted-foreground">Une seule recherche interroge la totalité du catalogue d'Alibaba, TradeIndia, Europages, etc.</p>
                </div>
                <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center">
                    <Globe size={32} className="mb-4 text-muted-foreground" />
                    <h3 className="font-bold mb-2">Pas de limites</h3>
                    <p className="text-sm text-muted-foreground">Des dizaines de millions de produits et fournisseurs d'équipements parfum accessibles instantanément.</p>
                </div>
                <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center">
                    <Search size={32} className="mb-4 text-muted-foreground" />
                    <h3 className="font-bold mb-2">Générez des opportunités</h3>
                    <p className="text-sm text-muted-foreground">Ouvrez les résultats dans différents onglets pour comparer les devis grossistes du monde entier.</p>
                </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Store;
