import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Store as StoreIcon, ExternalLink, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const b2bPlatforms = [
  { name: "Alibaba", url: "https://www.alibaba.com/", region: "Global" },
  { name: "TradeIndia", url: "https://www.tradeindia.com/", region: "Inde" },
  { name: "Go4WorldBusiness", url: "https://www.go4worldbusiness.com/", region: "Global" },
  { name: "B2BMap", url: "https://b2bmap.com/", region: "Global" },
  { name: "Kompass", url: "https://www.kompass.com/", region: "Europe / Global" },
  { name: "Europages", url: "https://www.europages.com/", region: "Europe" },
  { name: "GoAfricaOnline", url: "https://www.goafricaonline.com/", region: "Afrique" },
  { name: "AfricaYellowPages", url: "https://africayellowpagesonline.com/", region: "Afrique" },
  { name: "ShowroomAfrica", url: "https://showroomafrica.com/", region: "Afrique" },
  { name: "Manta", url: "https://www.manta.com/", region: "USA" },
  { name: "ThomasNet", url: "https://www.thomasnet.com/", region: "USA" }
];

const mockProducts = [
  { term: "Huile Essentielle de Rose", platformIndex: 0 },
  { term: "Flacons en verre 50ml", platformIndex: 4 },
  { term: "Alcool parfumeur (Éthanol agricole)", platformIndex: 5 },
  { term: "Huile de bois de Santal B2B", platformIndex: 1 },
  { term: "Packaging parfum luxe", platformIndex: 2 }
];

const Store = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl text-primary">
                <StoreIcon size={32} />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-display font-bold">
                  Boutique <span className="text-gradient-gold">B2B</span>
                </h1>
                <p className="text-muted-foreground mt-2 text-lg">Trouvez vos approvisionnements parmi nos partenaires et fournisseurs mondiaux.</p>
              </div>
            </div>
            
            <div className="relative w-full md:w-auto min-w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input placeholder="Rechercher des flacons, huiles..." className="pl-10 mr-4 w-full bg-secondary/50" />
            </div>
          </div>

          <h2 className="text-xl font-display font-semibold mb-6">Idées d'approvisionnement (Matières premières & Packaging)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {mockProducts.map((prod, idx) => {
              const platform = b2bPlatforms[prod.platformIndex];
              return (
                <div key={idx} className="glass-card p-5 rounded-2xl flex flex-col items-start gap-4 hover:border-primary/40 transition-colors">
                  <div className="w-full aspect-video bg-secondary/80 rounded-xl flex items-center justify-center text-muted-foreground">
                    <StoreIcon size={40} className="opacity-20" />
                  </div>
                  <div className="flex flex-col flex-1 w-full">
                    <h3 className="font-bold text-lg leading-tight mb-1">{prod.term}</h3>
                    <p className="text-xs text-muted-foreground mb-4">Fournisseurs via {platform.name} ({platform.region})</p>
                    <a href={`${platform.url}`} target="_blank" rel="noopener noreferrer" className="mt-auto w-full">
                      <Button size="sm" className="w-full bg-secondary hover:bg-primary hover:text-white font-medium">
                        Voir les fournisseurs <ExternalLink size={14} className="ml-2" />
                      </Button>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-border pt-10">
            <h2 className="text-2xl font-display font-semibold mb-6">Explorez nos annuaires B2B recommandés</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {b2bPlatforms.map((p, idx) => (
                <a key={idx} href={p.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-4 border border-border rounded-xl bg-card hover:bg-secondary/50 hover:border-primary/50 transition-all text-center group">
                  <span className="font-bold mb-1 text-sm group-hover:text-primary transition-colors">{p.name}</span>
                  <span className="text-[10px] text-muted-foreground uppercase">{p.region}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Store;
