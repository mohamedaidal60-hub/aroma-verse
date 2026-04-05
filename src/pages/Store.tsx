import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Store as StoreIcon, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sql } from "@/lib/neon";
import { toast } from "sonner";

const Store = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await sql`SELECT * FROM b2b_products ORDER BY id ASC`;
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const handleBuy = (name: string) => {
    toast.success(`${name} ajouté à votre panier`);
  };

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
                <p className="text-muted-foreground mt-2 text-lg">Matières premières et équipements récupérés directement de nos partenaires mondiaux.</p>
              </div>
            </div>
            
            <div className="relative w-full md:w-auto min-w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input placeholder="Rechercher des flacons, huiles..." className="pl-10 mr-4 w-full bg-secondary/50" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {loading ? (
              <p>Chargement des produits depuis les sources B2B (Neon DB)...</p>
            ) : (
              products.map((prod) => (
                <div key={prod.id} className="glass-card rounded-2xl flex flex-col items-start hover:border-primary/40 transition-colors overflow-hidden relative">
                  <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold shadow-sm z-10 border border-border">
                    {prod.origin}
                  </div>
                  <div className="w-full flex-shrink-0 aspect-video bg-secondary/80 flex justify-center items-center overflow-hidden">
                    {prod.image_url ? (
                      <img src={prod.image_url} alt={prod.name} className="w-full h-full object-cover" />
                    ) : (
                      <StoreIcon size={40} className="text-muted-foreground opacity-20" />
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1 w-full relative">
                    <h3 className="font-bold text-lg leading-tight mb-1">{prod.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1 mb-2">Fournisseur: <span className="text-foreground font-medium">{prod.supplier}</span></p>
                    
                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-gradient-gold">
                          {prod.price_per_unit}€ 
                          <span className="text-sm text-muted-foreground ml-1 font-normal">/ {prod.unit}</span>
                        </p>
                      </div>
                      <Button size="icon" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-10 h-10 shadow-gold" onClick={() => handleBuy(prod.name)}>
                        <ShoppingBag size={18} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Store;
