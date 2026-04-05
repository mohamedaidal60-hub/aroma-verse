import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/contexts/CartContext";

const categoryFilters = ["Tous", "Parfums", "Huiles essentielles", "Matières premières", "Packaging", "Machines"];
const categorySlugMap: Record<string, string> = {
  "Parfums": "parfums",
  "Huiles essentielles": "huiles-essentielles",
  "Matières premières": "matieres-premieres",
  "Packaging": "packaging",
  "Machines": "machines",
};

const Marketplace = () => {
  const [active, setActive] = useState("Tous");
  const [search, setSearch] = useState("");
  const { addItem } = useCart();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*, categories(name, slug)")
        .eq("is_active", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const filtered = products.filter((p: any) => {
    const catName = p.categories?.name || "";
    const matchCat = active === "Tous" || catName === active;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">
            Market<span className="text-gradient-gold">place</span>
          </h1>
          <p className="text-muted-foreground mb-8">Parfums, huiles, matières premières, packaging et machines.</p>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Rechercher un produit..."
                className="pl-10 bg-card border-border"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" className="border-border text-muted-foreground">
              <Filter size={16} className="mr-2" /> Filtres
            </Button>
          </div>

          <div className="flex gap-2 flex-wrap mb-10">
            {categoryFilters.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  active === cat
                    ? "bg-gradient-gold text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-gradient-card rounded-xl border border-border p-5 animate-pulse">
                  <div className="h-40 rounded-lg bg-muted mb-4" />
                  <div className="h-4 bg-muted rounded w-1/3 mb-2" />
                  <div className="h-5 bg-muted rounded w-2/3 mb-4" />
                  <div className="h-6 bg-muted rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((p: any) => (
                <div key={p.id} className="bg-gradient-card rounded-xl border border-border p-5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group">
                  <div className="h-40 rounded-lg bg-muted mb-4 flex items-center justify-center">
                    <div className="w-14 h-18 rounded-md bg-primary/10 animate-float" />
                  </div>
                  <span className="text-xs text-primary font-medium">{p.categories?.name || "Produit"}</span>
                  <h3 className="font-display font-semibold mt-1">{p.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {p.origin}{p.extraction_method ? ` · ${p.extraction_method}` : ""}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-bold">{Number(p.price).toFixed(2)} €</span>
                    <div className="flex items-center gap-2">
                      {p.rating && (
                        <div className="flex items-center gap-1 text-primary">
                          <Star size={12} fill="currentColor" />
                          <span className="text-xs">{Number(p.rating).toFixed(1)}</span>
                        </div>
                      )}
                      <Button
                        size="icon"
                        variant="ghost"
                        className="w-8 h-8 text-muted-foreground hover:text-primary"
                        onClick={() => addItem({ id: p.id, name: p.name, price: Number(p.price), origin: p.origin })}
                      >
                        <ShoppingCart size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg">Aucun produit trouvé</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Marketplace;
