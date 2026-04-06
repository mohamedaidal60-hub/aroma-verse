import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Filter, ShoppingBag, Star, Beaker } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useLang } from "@/contexts/LanguageContext";

const Marketplace = () => {
  const { t } = useLang();
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<Record<string, string>>({});

  const categoryFilters = ["Tous", "Matières Premières", "Molécules de Synthèse", "Packaging", "Académique"];

  useEffect(() => {
    async function loadItems() {
      setLoading(true);
      try {
        const cat = activeFilter === "Tous" ? null : activeFilter;
        const data = await api.products.list(cat);
        setItems(data);
        
        // Default sizes
        const sizes: Record<string, string> = {};
        data.forEach(item => {
          if (item.inventory_data?.variants?.[0]) {
            sizes[item.id] = item.inventory_data.variants[0].size;
          }
        });
        setSelectedSize(sizes);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadItems();
  }, [activeFilter]);

  const getPriceForSize = (item: any, size: string) => {
    const variant = item.inventory_data?.variants?.find((v: any) => v.size === size);
    return variant ? variant.price : item.price;
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
            <div>
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-2">{t("nav.marketplace")} <span className="text-gold">Nexus</span></h1>
              <p className="text-muted-foreground text-lg">{t("features.desc")}</p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder={t("marketplace.search")} className="pl-12 h-12 bg-secondary/50 border-white/5 rounded-xl" />
              </div>
              <Button variant="outline" className="h-12 w-12 p-0 border-white/10 rounded-xl"><Filter className="w-5 h-5" /></Button>
            </div>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-6 mb-10 scrollbar-hide">
            {categoryFilters.map((filter) => (
              <Button 
                key={filter} 
                variant={activeFilter === filter ? "default" : "secondary"} 
                className={`rounded-full px-6 h-10 whitespace-nowrap transition-all ${activeFilter === filter ? "bg-gold text-black font-bold scale-105" : "bg-white/5 hover:bg-white/10 text-muted-foreground"}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>

          {loading ? (
            <div className="py-20 text-center text-muted-foreground animate-pulse font-body">{t("common.loading")}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {items.map((item) => (
                <div key={item.id} className="glass-card rounded-[32px] p-6 group hover:border-gold/30 transition-all flex flex-col relative overflow-hidden">
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-gold font-bold uppercase tracking-widest">
                    {item.category}
                  </div>

                  {/* Image Section with CSS Filters */}
                  <div className="aspect-[4/5] bg-secondary/30 rounded-2xl mb-6 overflow-hidden relative flex items-center justify-center border border-white/5 shadow-inner">
                    <img 
                      src="https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=600&q=80" 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      style={{
                        filter: item.slug === 'ambroxan' ? "hue-rotate(200deg) brightness(1.2)" : 
                               item.slug === 'iso-e-super' ? "grayscale(0.5) brightness(1.1)" : "none"
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                       <Button className="w-full bg-white text-black font-bold h-10 rounded-xl text-xs">{t("common.see_all")}</Button>
                    </div>
                  </div>

                  {/* Title & Rating */}
                  <div className="flex flex-col gap-1 mb-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-display font-bold text-2xl group-hover:text-gold transition-colors">{item.title}</h3>
                      <div className="flex items-center gap-1 text-gold">
                        <Star size={14} fill="currentColor" />
                        <span className="text-xs font-bold">{item.rating}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-muted-foreground">({item.reviews_count} avis vérifiés)</span>
                  </div>

                  {/* Technical Summary */}
                  <div className="bg-black/40 p-4 rounded-xl border border-white/5 mb-6 space-y-2">
                     <div className="flex justify-between items-center text-[10px]">
                        <span className="text-muted-foreground flex items-center gap-1"><Beaker size={10} /> Poids Moléculaire</span>
                        <span className="font-mono text-white/80">{item.technical_props?.molecular_weight || 'N/A'}</span>
                     </div>
                     <div className="flex justify-between items-center text-[10px]">
                        <span className="text-muted-foreground flex items-center gap-1"><Star size={10} /> Stabilité</span>
                        <span className="text-green-500 font-bold">{item.technical_props?.stability || 'High'}</span>
                     </div>
                  </div>

                  {/* Weight Selection Grid */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.inventory_data?.variants?.map((v: any) => (
                      <button 
                        key={v.size}
                        className={`h-7 px-3 rounded-lg text-[10px] font-bold border transition-all ${selectedSize[item.id] === v.size ? 'bg-gold border-gold text-black' : 'border-white/10 text-muted-foreground hover:border-gold/50'}`}
                        onClick={() => setSelectedSize({...selectedSize, [item.id]: v.size})}
                      >
                        {v.size}
                      </button>
                    ))}
                  </div>

                  {/* Footer Logic: Price & Add */}
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                    <div>
                      <p className="text-[10px] text-muted-foreground mb-0.5">À partir de</p>
                      <p className="font-bold text-2xl text-white">
                        ${getPriceForSize(item, selectedSize[item.id])}
                      </p>
                    </div>
                    <Button 
                      className="bg-gold hover:bg-gold/80 text-black font-bold h-12 w-12 p-0 rounded-xl shadow-gold transition-transform active:scale-95" 
                      onClick={() => toast.success(`${item.title} (${selectedSize[item.id]}) ajouté au panier!`)}
                    >
                      <ShoppingBag size={20} />
                    </Button>
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
