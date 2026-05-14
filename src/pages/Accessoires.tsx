import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, ShoppingBag, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const Accessoires = () => {
  const accessories = [
    { title: "Bécher en Verre Borosilicaté", desc: "Pour préparations industrielles.", price: 2500, img: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&q=80&w=600" },
    { title: "Propipette de Précision", desc: "Pipetage de précision pour la chimie.", price: 1500, img: "https://images.unsplash.com/photo-1616644265434-7ad2a233bded?auto=format&fit=crop&q=80&w=600" },
    { title: "Tubes d'Analyse (Terre Cuite)", desc: "Traditionnel, idéal pour artisanat.", price: 800, img: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&q=80&w=600" }
  ];

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col font-body">
      <Navbar />
      <main className="flex-1 pt-28 pb-16 container mx-auto px-4 max-w-6xl">
        <div className="mb-12 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/10 mb-4">
               <Sparkles size={14} className="text-gold" />
               <span className="text-[10px] font-bold text-gold uppercase tracking-widest">Matériel & Équipement</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-black text-foreground mb-4">
              Outils & <span className="text-gold italic">Accessoires</span>
            </h1>
            <p className="text-foreground/60 max-w-xl mx-auto">
              Découvrez notre sélection de matériel industriel et traditionnel pour la formulation, allant du bécher aux tubes d'analyse en terre cuite artisanaux.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {accessories.map((item, i) => (
             <div key={i} className="glass-card rounded-[32px] overflow-hidden border border-emerald-100 bg-emerald-50 flex flex-col hover:border-gold/30 transition-all hover:-translate-y-2 group">
                <div className="aspect-square relative overflow-hidden">
                   <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-all z-10" />
                   <img src={item.img} className="w-full h-full object-cover" alt={item.title} />
                </div>
                <div className="p-6 flex flex-col flex-1">
                   <h3 className="font-bold text-lg text-foreground mb-2">{item.title}</h3>
                   <p className="text-xs text-emerald-700/70 mb-4 flex-1">{item.desc}</p>
                   <div className="flex justify-between items-center mt-auto">
                     <span className="font-black text-gold text-lg">{item.price} DA</span>
                     <Button size="sm" className="bg-emerald-100 hover:bg-gold hover:text-black text-foreground rounded-full"><ShoppingBag size={14} className="mr-2"/> Acheter</Button>
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

export default Accessoires;
