import { useState, useEffect } from "react";
import { ArrowRight, Star, ShoppingBag, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { toast } from "sonner";

const MarketplacePreview = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.products.list();
        setProducts(data.slice(0, 4));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <section className="py-32 relative bg-black/20 font-body overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gold/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 mb-6 w-fit">
              <Zap size={14} className="text-gold" fill="currentColor" />
              <span className="text-[10px] font-bold text-gold uppercase tracking-[0.2em]">Latest Arrivals</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-black mb-4">
              Marketplace <span className="text-gold">Nexus</span>
            </h2>
            <p className="text-xl text-muted-foreground font-arabic">اكتشف أحدث المواد الخام والجزيئات العطرية</p>
          </div>
          
          <Button 
            variant="ghost" 
            className="group h-14 px-8 rounded-2xl border border-white/10 hover:border-gold/50 text-white font-bold transition-all"
            onClick={() => navigate('/marketplace')}
          >
            CATALOGUE COMPLET <ArrowRight size={20} className="ml-3 group-hover:translate-x-2 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="glass-card h-96 rounded-[40px] animate-pulse border border-white/5" />
            ))
          ) : (
            products.map((p) => (
              <div 
                key={p.id} 
                className="glass-card rounded-[40px] p-6 border border-white/5 hover:border-gold/30 group transition-all duration-500 cursor-pointer bg-black/40"
                onClick={() => navigate('/marketplace')}
              >
                <div className="aspect-[4/5] rounded-[32px] overflow-hidden mb-6 relative bg-white/5 border border-white/5">
                   <img 
                    src="https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=600&q=80" 
                    alt={p.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80"
                    style={{
                      filter: p.slug === 'ambroxan' ? "hue-rotate(200deg) brightness(1.2)" : 
                             p.slug === 'iso-e-super' ? "grayscale(0.5) brightness(1.1)" : "none"
                    }}
                   />
                   <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-[9px] font-black text-gold uppercase tracking-widest">{p.category}</div>
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button className="w-full h-12 bg-white text-black font-black text-xs rounded-2xl">AJOUTER AU PANIER</Button>
                   </div>
                </div>

                <div className="flex justify-between items-start mb-2">
                   <h3 className="text-xl font-display font-bold text-white group-hover:text-gold transition-colors truncate pr-2">{p.title}</h3>
                   <div className="flex items-center gap-1 text-gold">
                      <Star size={14} fill="currentColor" />
                      <span className="text-xs font-bold">{p.rating}</span>
                   </div>
                </div>
                
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-6">
                   <Globe size={12} className="text-gold" /> {p.inventory_data?.variants?.[0]?.origin || 'Origine certifiée'}
                </div>

                <div className="flex items-end justify-between border-t border-white/5 pt-4">
                   <div className="text-2xl font-black text-white">${p.price}<span className="text-xs text-muted-foreground font-normal ml-1">/{p.inventory_data?.variants?.[0]?.size || '1g'}</span></div>
                   <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-colors shadow-sm">
                      <ShoppingBag size={18} />
                   </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* B2B callout */}
        <div className="mt-20 p-10 glass-card rounded-[48px] border border-white/5 bg-gradient-to-br from-white/5 to-transparent flex flex-col md:flex-row items-center justify-between gap-10 group overflow-hidden">
           <div className="flex-1">
              <h3 className="text-2xl font-display font-bold mb-4 flex items-center gap-3">
                <Globe className="text-gold" size={28} /> Moteur Global B2B
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Vous ne trouvez pas un ingrédient ? Interrogez instantanément les 6 plus grands annuaires mondiaux (Alibaba, Indiamart, ThomasNet, etc.) via notre moteur B2B intégré. Exclusif aux membres **Nexus Pro**.
              </p>
           </div>
           <Button 
            className="h-16 px-12 bg-white/5 hover:bg-gold hover:text-black text-white font-black rounded-[24px] border border-white/10 hover:border-gold transition-all"
            onClick={() => navigate('/store')}
           >
             ACTIVER LE MOTEUR B2B
           </Button>
           <div className="absolute right-0 top-0 w-64 h-full bg-gold/5 blur-[80px] pointer-events-none group-hover:bg-gold/10 transition-all"></div>
        </div>

      </div>
    </section>
  );
};

export default MarketplacePreview;
