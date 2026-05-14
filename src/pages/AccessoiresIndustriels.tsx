import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Factory, ShoppingBag, ChevronDown, Rocket, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const AccessoiresIndustriels = () => {
  const [activeCategory, setActiveCategory] = useState("Tous");

  const categories = [
    "Tous",
    "Verrerie Lab",
    "Mesure Précision",
    "Systèmes d'Extraction",
    "Conditionnement"
  ];

  const industrialItems = [
    { title: "Bécher Graduation Laser", desc: "Verre borosilicate 3.3, haute résistance thermique et chimique.", price: 1200, img: "https://picsum.photos/seed/beaker1/800/800", category: "Verrerie Lab" },
    { title: "Propipette Haute Précision", desc: "Équipement ergonomique pour dosage précis de molécules sensibles.", price: 2500, img: "https://picsum.photos/seed/pipette1/800/800", category: "Mesure Précision" },
    { title: "Densimètre de Précision", desc: "Indispensable pour le contrôle qualité des extraits naturels.", price: 8500, img: "https://picsum.photos/seed/density1/800/800", category: "Mesure Précision" },
    { title: "Extracteur Soxhlet 500ml", desc: "Kit complet pour extraction par solvant en laboratoire R&D.", price: 38000, img: "https://picsum.photos/seed/setup1/800/800", category: "Systèmes d'Extraction" },
    { title: "Agitateur Magnétique Chauffant", desc: "Contrôle électronique de température et vitesse de rotation.", price: 55000, img: "https://picsum.photos/seed/stirrer1/800/800", category: "Systèmes d'Extraction" }
  ];

  const filteredItems = activeCategory === "Tous" 
    ? industrialItems 
    : industrialItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col font-body">
      <Navbar />
      <main className="flex-1 pt-28 pb-16 container mx-auto px-4 max-w-7xl">
        
        <div className="mb-16 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/10 mb-6 animate-fade-up">
               <Factory size={14} className="text-gold" />
               <span className="text-[10px] font-bold text-gold uppercase tracking-widest">Équipements Haute Technologie</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black text-foreground mb-6 tracking-tighter">
              Instruments <span className="text-gold italic underline decoration-gold/20 underline-offset-8">Industriels</span>
            </h1>
            <p className="text-emerald-700/70 max-w-2xl mx-auto mb-10 text-lg">
              Optimisez votre production avec nos instruments de laboratoire certifiés. 
              Verrerie de précision, systèmes de dosage et solutions d'extraction pour parfumeurs professionnels.
            </p>
        </div>

        {/* Filters */}
        <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-8 border-b border-emerald-100 pb-8">
          <div className="w-full md:w-80 relative">
            <label className="text-[10px] font-black uppercase tracking-widest text-emerald-700/70 block mb-3 pl-1">Standard de Laboratoire</label>
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
            <Rocket size={18} /> Expédition High-Speed Global
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredItems.map((item, i) => (
             <div key={i} className="glass-card rounded-[40px] overflow-hidden border border-emerald-100 bg-white/40 flex flex-col hover:border-gold/30 transition-all hover:translate-y-[-10px] duration-500 group relative shadow-2xl">
                <div className="aspect-square relative overflow-hidden m-4 rounded-[32px]">
                   <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-all z-10" />
                   <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 bg-white" alt={item.title} />
                   <div className="absolute top-6 right-6 px-3 py-1 bg-gold/20 backdrop-blur-md rounded-full border border-gold/40 z-20 text-[8px] font-black text-gold uppercase tracking-widest">
                      {item.category}
                   </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                   <h3 className="font-display font-medium text-2xl text-foreground mb-3 group-hover:text-gold transition-colors">{item.title}</h3>
                   <p className="text-sm text-emerald-700/70 mb-8 flex-1 leading-relaxed">{item.desc}</p>
                   <div className="flex justify-between items-center mt-auto pt-6 border-t border-emerald-200">
                     <div>
                        <span className="text-[8px] font-black uppercase text-secondary-foreground block mb-0.5 opacity-50">Tarif Industriel</span>
                        <div className="font-black text-2xl text-foreground tracking-tight">{item.price.toLocaleString()} DA</div>
                     </div>
                     <Button className="bg-gold hover:bg-gold-light text-black font-black uppercase tracking-widest text-[10px] h-12 px-6 rounded-xl shadow-gold flex items-center gap-2">
                        <ShoppingBag size={14} /> ACHETER
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

export default AccessoiresIndustriels;
