import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Hand, ShoppingBag, ChevronDown, Package, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const AccessoiresArtisanaux = () => {
  const [activeCategory, setActiveCategory] = useState("Tous");

  const categories = [
    "Tous",
    "Terre Cuite & Argile",
    "Cuivre & Laiton",
    "Mesure & Dosage",
    "Stockage Artisanal"
  ];

  const accessories = [
    { title: "Tubes d'Analyse (Terre Cuite)", desc: "Pipettes et tubes artisanaux absorbants pour maturation lente des huiles.", price: 800, img: "https://picsum.photos/seed/terrecuite1/800/800", category: "Terre Cuite & Argile" },
    { title: "Mortier en Argile Naturelle", desc: "Pour broyer délicatement les résines et concrètes organiques.", price: 3200, img: "https://picsum.photos/seed/argile2/800/800", category: "Terre Cuite & Argile" },
    { title: "Cuves de Distillation (Cuivre)", desc: "Petit alambic artisanal en cuivre pour hydrodistillation douce.", price: 45000, img: "https://picsum.photos/seed/cuivre1/800/800", category: "Cuivre & Laiton" },
    { title: "Flacons à Parfum en Grès", desc: "Conservation optimale à l'abri de la lumière et de la chaleur.", price: 2500, img: "https://picsum.photos/seed/gres1/800/800", category: "Stockage Artisanal" },
    { title: "Mesure Traditionnelle en Bois", desc: "Set de mesures anciennes pour dosage de poudres et copeaux.", price: 1800, img: "https://picsum.photos/seed/bois1/800/800", category: "Mesure & Dosage" }
  ];

  const filteredItems = activeCategory === "Tous" 
    ? accessories 
    : accessories.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col font-body">
      <Navbar />
      <main className="flex-1 pt-28 pb-16 container mx-auto px-4 max-w-7xl">
        
        <div className="mb-16 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/10 mb-6 animate-fade-up">
               <Hand size={14} className="text-gold" />
               <span className="text-[10px] font-bold text-gold uppercase tracking-widest">Patrimoine & Savoir-faire</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black text-foreground mb-6 tracking-tighter">
              Accessoires <span className="text-gold italic">Artisanaux</span>
            </h1>
            <p className="text-emerald-700/70 max-w-2xl mx-auto mb-10 text-lg">
              Redécouvrez l'essence de la parfumerie traditionnelle avec nos accessoires façonnés à la main par des maîtres artisans. 
              Instruments en argile, terre cuite et cuivre pour une maturation authentique.
            </p>
        </div>

        {/* Filters */}
        <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-8 border-b border-emerald-100 pb-8">
          <div className="w-full md:w-80 relative">
            <label className="text-[10px] font-black uppercase tracking-widest text-emerald-700/70 block mb-3 pl-1">Catégorie Traditionnelle</label>
            <div className="relative">
              <select 
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="w-full appearance-none bg-emerald-50 border border-emerald-200 rounded-2xl h-14 px-6 text-foreground text-lg font-bold outline-none focus:ring-2 focus:ring-gold/50 cursor-pointer transition-all hover:bg-emerald-100"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat} className="bg-white text-foreground">{cat}</option>
                ))}
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gold">
                <ChevronDown size={20} />
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 px-6 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-[10px] font-bold uppercase tracking-widest text-gold italic">
            <ShieldCheck size={18} /> Pièces Uniques & Certifiées
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredItems.map((item, i) => (
             <div key={i} className="glass-card rounded-[40px] overflow-hidden border border-emerald-100 bg-white/40 flex flex-col hover:border-gold/30 transition-all hover:scale-[1.02] duration-500 group relative shadow-2xl">
                <div className="aspect-square relative overflow-hidden m-4 rounded-[32px]">
                   <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-all z-10" />
                   <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 bg-white" alt={item.title} />
                   <div className="absolute top-6 right-6 px-3 py-1 bg-white/60 backdrop-blur-md rounded-full border border-emerald-200 z-20 text-[8px] font-black text-foreground uppercase tracking-widest">
                      {item.category}
                   </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                   <h3 className="font-display font-medium text-2xl text-foreground mb-3 group-hover:text-gold transition-colors">{item.title}</h3>
                   <p className="text-sm text-emerald-700/70 mb-8 flex-1 leading-relaxed">{item.desc}</p>
                   <div className="flex justify-between items-center mt-auto pt-6 border-t border-emerald-200">
                     <div>
                        <span className="text-[8px] font-black uppercase text-emerald-700/70 block">Prix Unitaire</span>
                        <div className="font-black text-2xl text-gold">{item.price.toLocaleString()} DA</div>
                     </div>
                     <Button className="bg-gold hover:bg-gold-light text-black font-black uppercase tracking-widest text-[10px] h-12 px-6 rounded-xl shadow-gold flex items-center gap-2">
                        <ShoppingBag size={14} /> COMMANDER
                     </Button>
                   </div>
                </div>
             </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccessoiresArtisanaux;
