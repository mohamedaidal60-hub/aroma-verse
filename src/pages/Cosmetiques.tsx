import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkle, ShoppingBag, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Cosmetiques = () => {
  const cosmetics = [
    { title: "Sérum Anti-Âge Externe", desc: "Marque internationale de renom. Effet liftant.", price: 9500, img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600", brand: "L'Essence" },
    { title: "Crème Hydratante (Nuit)", desc: "Hydratation profonde de grande marque.", price: 4200, img: "https://images.unsplash.com/photo-1611077544941-477543a01099?auto=format&fit=crop&q=80&w=600", brand: "PureBeauté" },
    { title: "Lotion Exfoliante", desc: "Produit cosmétique de la gamme prestige.", price: 3000, img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600", brand: "GlowLab" }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col font-body">
      <Navbar />
      <main className="flex-1 pt-28 pb-16 container mx-auto px-4 max-w-6xl">
        <div className="mb-12 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/10 mb-4">
               <Crown size={14} className="text-gold" />
               <span className="text-[10px] font-bold text-gold uppercase tracking-widest">Marques Prestigieuses</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-black text-white mb-4">
              Produits <span className="text-gold italic">Cosmétiques</span> (C2C)
            </h1>
            <p className="text-white/60 max-w-xl mx-auto mb-6">
              Vendez et achetez des produits cosmétiques entre abonnés du Nexus (C2C). Partagez vos créations, poudres, sérums ou achats non utilisés avec la communauté.
            </p>
            <Button className="bg-gold hover:bg-gold/80 text-black font-bold uppercase tracking-widest text-[10px] rounded-full shadow-gold">
               + Publier une annonce
            </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cosmetics.map((item, i) => (
             <div key={i} className="glass-card rounded-[32px] overflow-hidden border border-white/5 bg-white/5 flex flex-col hover:border-gold/30 transition-all hover:scale-105 duration-500 group relative">
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 z-20">
                   <span className="text-[10px] font-black tracking-widest uppercase text-white">{item.brand}</span>
                </div>
                <div className="aspect-[4/5] relative overflow-hidden">
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10" />
                   <img src={item.img} className="w-full h-full object-cover" alt={item.title} />
                </div>
                <div className="p-6 flex flex-col flex-1 bg-black/40">
                   <h3 className="font-bold text-lg text-white mb-2">{item.title}</h3>
                   <p className="text-xs text-muted-foreground mb-4 flex-1">{item.desc}</p>
                   <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/10">
                     <span className="font-black text-gold text-lg">{item.price} DA</span>
                     <Button size="sm" className="bg-gold hover:bg-gold/80 text-black rounded-full font-bold uppercase tracking-widest text-[10px]"><ShoppingBag size={12} className="mr-1"/> Ajouter</Button>
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

export default Cosmetiques;
