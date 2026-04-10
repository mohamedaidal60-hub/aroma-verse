import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const AccessoiresIndustriels = () => {
  const accessories = [
    { title: "Bécher en Verre Borosilicaté (1L)", desc: "Idéal pour vos mélanges chimiques et compositions. Résistant à la chaleur.", price: 2500, img: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&q=80&w=600" },
    { title: "Propipette de Précision", desc: "Pipetage chirurgical, embout adapté à toute verrerie standard.", price: 1500, img: "https://images.unsplash.com/photo-1616644265434-7ad2a233bded?auto=format&fit=crop&q=80&w=600" },
    { title: "Agitateur Magnétique", desc: "Agitateur chauffant pour la macération accélérée. Mode professionnel.", price: 22000, img: "https://images.unsplash.com/photo-1582719478250-c89402bb73e9?auto=format&fit=crop&q=80&w=600" }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col font-body">
      <Navbar />
      <main className="flex-1 pt-28 pb-16 container mx-auto px-4 max-w-6xl">
        <div className="mb-12 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/10 mb-4">
               <Sparkles size={14} className="text-gold" />
               <span className="text-[10px] font-bold text-gold uppercase tracking-widest">Équipement Pro</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-black text-white mb-4">
              Accessoires <span className="text-gold italic">Industriels</span>
            </h1>
            <p className="text-white/60 max-w-xl mx-auto">
              Instruments de laboratoire, verrerie et machinerie industrielle pour équiper vos ateliers de création.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {accessories.map((item, i) => (
             <div key={i} className="glass-card rounded-[32px] overflow-hidden border border-white/5 bg-white/5 flex flex-col hover:border-gold/30 transition-all hover:scale-105 duration-500 group">
                <div className="aspect-square relative overflow-hidden">
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10" />
                   <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title} />
                </div>
                <div className="p-6 flex flex-col flex-1 bg-black/40">
                   <h3 className="font-bold text-lg text-white mb-2">{item.title}</h3>
                   <p className="text-xs text-muted-foreground mb-4 flex-1">{item.desc}</p>
                   <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/10">
                     <span className="font-black text-gold text-lg">{item.price} DA</span>
                     <Button size="sm" className="bg-gold hover:bg-gold/80 text-black text-[10px] font-bold uppercase tracking-widest rounded-full"><ShoppingBag size={12} className="mr-1"/> Commander</Button>
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
