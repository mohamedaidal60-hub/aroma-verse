import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkle, ShoppingBag, Crown, Filter, ChevronDown, User, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const Cosmetiques = () => {
  const [activeCategory, setActiveCategory] = useState("Tous");

  const categories = [
    "Tous",
    "Sérums & Soins",
    "Crèmes Hydratantes",
    "Parfums Finis",
    "Maquillage",
    "Hygiène",
    "Autre"
  ];

  const cosmetics = [
    { title: "Sérum Anti-Âge Externe", desc: "Marque internationale de renom. Effet liftant visible dès 7 jours.", price: 9500, img: "https://picsum.photos/seed/serum1/800/1000", brand: "L'Essence", category: "Sérums & Soins" },
    { title: "Crème Hydratante de Nuit", desc: "Hydratation profonde enrichie en acide hyaluronique.", price: 4200, img: "https://picsum.photos/seed/cream1/800/1000", brand: "PureBeauté", category: "Crèmes Hydratantes" },
    { title: "Lotion Exfoliante Éclat", desc: "Gamme prestige, affine le grain de peau et illumine.", price: 3000, img: "https://picsum.photos/seed/lotion1/800/1000", brand: "GlowLab", category: "Sérums & Soins" },
    { title: "Eau de Parfum 'Nuit d'Orient'", desc: "Composition artisanale, 30% de concentration.", price: 12000, img: "https://picsum.photos/seed/perfum1/800/1000", brand: "Atelier Nexus", category: "Parfums Finis" },
    { title: "Fond de Teint Lumineux", desc: "Haute couvrance avec fini naturel satiné.", price: 5500, img: "https://picsum.photos/seed/makeup1/800/1000", brand: "Vénus Lux", category: "Maquillage" },
  ];

  const filteredCosmetics = activeCategory === "Tous" 
    ? cosmetics 
    : cosmetics.filter(c => c.category === activeCategory);

  return (
    <div className="min-h-screen bg-background flex flex-col font-body text-foreground">
      <Navbar />
      <main className="flex-1 pt-28 pb-16 container mx-auto px-4 max-w-7xl">
        
        {/* Header Section */}
        <div className="mb-16 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/10 mb-6 animate-fade-up">
               <Crown size={14} className="text-gold" />
               <span className="text-[10px] font-bold text-gold uppercase tracking-widest">Marché de Prestige C2C</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6 tracking-tighter">
              Cosmétiques <span className="text-gold italic underline decoration-gold/30 underline-offset-8">Abonnés</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
              Vente et achat direct de produits cosmétiques haut de gamme entre membres certifiés. 
              Plateforme sécurisée garantissant l'origine des produits.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button className="bg-gold hover:bg-gold/80 hover:scale-105 transition-all text-black font-black uppercase tracking-widest h-14 px-10 rounded-2xl shadow-gold flex items-center gap-2">
                 + Publier une annonce
              </Button>
              <div className="flex items-center gap-2 px-6 h-14 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-muted-foreground whitespace-nowrap">
                <ShieldCheck className="text-gold" size={18} /> Transactions Sécurisées
              </div>
            </div>
        </div>

        {/* Categories Bar */}
        <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-8 border-b border-white/5 pb-8">
          <div className="w-full md:w-80 relative group">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block mb-3 pl-1">Filtrer par catégorie</label>
            <div className="relative">
              <select 
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="w-full appearance-none bg-white/5 border border-white/10 rounded-2xl h-14 px-6 text-white text-lg font-bold outline-none focus:ring-2 focus:ring-gold/50 cursor-pointer transition-all hover:bg-white/10"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat} className="bg-black text-white">{cat}</option>
                ))}
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gold">
                <ChevronDown size={20} />
              </div>
            </div>
          </div>
          
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-3">
            <span className="w-8 h-[1px] bg-gold/50" />
            {filteredCosmetics.length} PRODUITS DISPONIBLES
            <span className="w-8 h-[1px] bg-gold/50" />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredCosmetics.map((item, i) => (
            <div key={i} className="glass-card rounded-[40px] overflow-hidden border border-white/5 bg-black/40 flex flex-col hover:border-gold/40 transition-all group duration-500 shadow-elevated">
               <div className="absolute top-6 left-6 z-20">
                  <div className="bg-black/60 backdrop-blur-xl px-4 py-1.5 rounded-2xl border border-white/5 shadow-xl">
                    <span className="text-[9px] font-black tracking-widest uppercase text-gold leading-none">{item.brand}</span>
                  </div>
               </div>
               
               <div className="aspect-[4/5] relative overflow-hidden m-3 rounded-[32px]">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity z-10" />
                  <img 
                    src={item.img} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 bg-black" 
                    alt={item.title} 
                    loading="lazy"
                  />
                  <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2">
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[8px] font-black text-white uppercase tracking-widest border border-white/10">
                      {item.category}
                    </span>
                  </div>
               </div>
               
               <div className="p-8 flex flex-col flex-1">
                  <h3 className="font-display font-medium text-2xl text-white mb-3 group-hover:text-gold transition-colors">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-8 flex-1 leading-relaxed opacity-80">{item.desc}</p>
                  
                  <div className="mt-auto flex justify-between items-center bg-white/5 p-5 rounded-[24px] border border-white/5 group-hover:bg-white/10 transition-all">
                    <div>
                      <span className="text-[8px] font-black uppercase text-muted-foreground block mb-0.5">Prix d'échange</span>
                      <div className="font-black text-2xl text-gold">{item.price.toLocaleString()} DA</div>
                    </div>
                    <Button className="bg-gold hover:bg-gold-light hover:scale-105 active:scale-95 text-black rounded-xl font-black uppercase tracking-widest text-[10px] h-12 px-6 shadow-gold transition-all">
                      ACHETER
                    </Button>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-center gap-2 text-muted-foreground opacity-40 group-hover:opacity-80 transition-opacity">
                    <User size={12} />
                    <span className="text-[9px] font-bold uppercase tracking-widest">En vente par: {item.brand}</span>
                  </div>
               </div>
            </div>
          ))}
        </div>
        
        {/* Empty State */}
        {filteredCosmetics.length === 0 && (
          <div className="py-24 text-center">
            <ShoppingBag size={64} className="mx-auto text-white/5 mb-6" />
            <h3 className="text-2xl font-display font-bold text-white mb-2">Aucun produit trouvé</h3>
            <p className="text-muted-foreground">Désolé, aucune annonce ne correspond à cette catégorie pour le moment.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cosmetiques;
