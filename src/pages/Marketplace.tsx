import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Filter, ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { sql } from "@/lib/neon";
import { toast } from "sonner";

const categoryFilters = ["Tous", "Parfums", "Huiles essentielles", "Matières premières", "Packaging", "Machines"];

const Marketplace = () => {
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadItems() {
      try {
        let data = [];
        if (activeFilter === "Tous") {
          data = await sql`SELECT * FROM marketplace_items ORDER BY id DESC`;
        } else {
          data = await sql`SELECT * FROM marketplace_items WHERE category = ${activeFilter} ORDER BY id DESC`;
        }
        setItems(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadItems();
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">Marketplace</h1>
              <p className="text-muted-foreground">Achetez et vendez des produits, formules et équipements.</p>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 cursor-pointer" />
                <Input placeholder="Rechercher..." className="pl-9 bg-secondary border-border" />
              </div>
              <Button variant="outline" className="gap-2 border-border"><Filter className="w-4 h-4" /> Filtres</Button>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
            {categoryFilters.map((filter) => (
              <Button key={filter} variant={activeFilter === filter ? "default" : "secondary"} className={activeFilter === filter ? "bg-primary text-primary-foreground" : "text-muted-foreground"} onClick={() => setActiveFilter(filter)}>
                {filter}
              </Button>
            ))}
          </div>
          {loading ? (
            <div className="py-20 text-center text-muted-foreground">Chargement des articles...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {items.map((item) => (
                <div key={item.id} className="glass-card rounded-2xl p-4 group cursor-pointer hover:border-primary/50 transition-colors flex flex-col">
                  <div className="aspect-square bg-secondary rounded-xl mb-4 overflow-hidden relative flex text-primary/10 items-center justify-center">
                    {item.title.toLowerCase().includes("oud") ? (
                      <img src="https://images.unsplash.com/photo-1616406432452-07bc5938759d?auto=format&fit=crop&w=400&q=80" alt={item.title} className="w-full h-full object-cover" />
                    ) : item.title.toLowerCase().includes("flacon") || item.title.toLowerCase().includes("design") ? (
                      <img src="https://images.unsplash.com/photo-1594035987133-0d7b22554c9c?auto=format&fit=crop&w=400&q=80" alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <img src="https://images.unsplash.com/photo-1615397323145-120019fa300e?auto=format&fit=crop&w=400&q=80" alt={item.title} className="w-full h-full object-cover fallback-image" />
                    )}
                    <ShoppingBag size={80} className="absolute hidden text-primary/10" />
                  </div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-display font-bold text-lg group-hover:text-primary transition-colors">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.description}</p>
                  <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
                    <div><p className="text-xs text-muted-foreground">Prix</p><p className="font-bold text-gradient-gold">{item.price} €</p></div>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-gold" onClick={() => toast.success("Ajouté au panier!")}>Ajouter</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Marketplace;
