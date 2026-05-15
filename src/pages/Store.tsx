import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, ExternalLink, Globe, Zap, ShieldCheck, Factory, Box, Droplets, Ship, Building, Handshake, BrainCircuit, Shield, FileSignature, Check, Video, MessageSquare, Info, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useLang } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
// @ts-ignore
import pwData from "@/data/pw_database.json" assert { type: "json" };
// Note: Le fichier sera généré par le robot python

const Store = () => {
  const { t, dir } = useLang();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("Huile essentielle");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  // Simulation Produits Officiels (Admin) + Données PW Réelles
  const initialProducts = [
    { id: "admin1", name: "Ambroxan (Pure)", category: "Matières Premières", price: 65.00, displayPrice: 65.00 * 1.15, image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=600", source: "NEXUS", desc: "Substitut d'ambre gris synthétique, puissance et sillage." }
  ];

  const externalProducts = (pwData as any)?.products?.map((p: any, i:number) => ({
      ...p,
      id: `pw-${i}`,
      displayPrice: p.display_price
  })) || [];

  const products = [...initialProducts, ...externalProducts];

  // Catégories Dynamiques
  const categoryMapping: {[key: string]: string} = {
    "Essential Oils": "Huile essentielle",
    "Kits": "parfum Fini",
    "Compounds": "parfum Fini",
    "Aroma Materials": "Aromas chemicals",
    "Specialty Bases": "Aromas chemicals",
    "Equipment": "equipment (laboratoire)",
    "Additives": "Aromas chemicals",
    "Matières Premières": "Aromas chemicals"
  };

  const getMappedCategory = (rawCat: string) => categoryMapping[rawCat] || rawCat;

  const categories = [
    "Huile essentielle",
    "Huile absolut",
    "Hydrolat",
    "Aromas chemicals",
    "equipment (laboratoire)",
    "sourcing Materieres solid (plants aromatiques et médicinales)",
    "parfum Fini",
    "Cosmétiques"
  ];

  // Animating stats
  const [stats, setStats] = useState({ companies: 0, deals: 0, countries: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({ companies: 845, deals: 1240, countries: 34 });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = products
    .filter(p => {
      const matchesCategory = (activeCategory === "" || getMappedCategory(p.category) === activeCategory);
      const matchesSearch = (p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.category.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      const catA = getMappedCategory(a.category);
      const catB = getMappedCategory(b.category);
      if (catA < catB) return -1;
      if (catA > catB) return 1;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="min-h-screen font-body overflow-x-hidden bg-[#f1f5f9]">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/10 to-transparent blur-[120px] rounded-full"></div>
      </div>

      <Navbar />
      
      <main className="flex-1 pt-24 pb-16 relative z-10">
        <div className="bg-emerald-900/10 backdrop-blur-md text-emerald-900 text-center py-2 text-xs md:text-sm border-y border-emerald-900/10 shadow-sm">
          <div className="container mx-auto flex items-center justify-center gap-2">
            <ShieldCheck className="text-emerald-600 w-4 h-4" /> 
            <span className="opacity-90 tracking-wide font-medium">Boutique Officielle NEXUS | Certifiée Qualité Nexus</span>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-7xl pt-16">
          
          <div className="flex flex-col items-center justify-center mb-20 text-center">
            <h1 className="text-5xl md:text-7xl font-display font-black mb-6 tracking-tighter text-foreground">
               Boutique <span className="text-gold italic">Officielle</span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-12 font-medium">
               Matières premières d'excellence sourcées auprès de nos partenaires mondiaux. Commission fixe de 15% appliquée pour le soutien aux agriculteurs du réseau.
            </p>
            
            <div className="w-full max-w-xl relative group">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-700/70 group-focus-within:text-gold transition-colors" size={20} />
               <Input 
                 placeholder="Chercher une molécule, un kit ou une huile..." 
                 className="h-16 pl-14 pr-6 rounded-full bg-emerald-500 border-emerald-300 shadow-xl focus-visible:ring-gold font-bold text-lg"
                 value={searchTerm}
                 onChange={e => setSearchTerm(e.target.value)}
               />
            </div>
          </div>

          {/* Catalogue */}
          <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between">
              <div className="w-full md:w-1/3">
                 <label className="text-[10px] font-black uppercase tracking-widest text-emerald-700/70 block mb-3 pl-2">Filtrer par catégorie</label>
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
                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                 </div>
              </div>
             <div className="text-[10px] font-black uppercase tracking-widest text-emerald-700/70 flex items-center gap-2">
                <Info size={14} className="text-gold" /> Partenariat Direct: PerfumersWorld, TGSC, Grasse Lab
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
             {filteredProducts.map(product => (
                <div key={product.id} className="glass-card rounded-[32px] overflow-hidden group border border-emerald-100 hover:border-gold/30 transition-all flex flex-col shadow-xl bg-white/40" onClick={() => setSelectedProduct(product)}>
                    <div className="aspect-square relative overflow-hidden">
                       <img 
                         src={encodeURI(product.image)} 
                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 bg-white" 
                         alt={product.name} 
                         onError={(e) => { (e.target as HTMLImageElement).src = "https://picsum.photos/seed/store/800/600"; }}
                       />
                       <div className="absolute top-4 right-4 bg-white/60 backdrop-blur px-3 py-1 rounded-full text-[8px] font-black text-gold uppercase tracking-widest border border-gold/20">
                          {product.source}
                       </div>
                    </div>
                   <div className="p-6 flex-1 flex flex-col">
                      <p className="text-[9px] font-black uppercase tracking-widest text-emerald-700/70 mb-1">{product.category}</p>
                      <h3 className="text-lg font-bold text-foreground mb-4 line-clamp-1">{product.name}</h3>
                      <div className="mt-auto flex items-end justify-between border-t border-black/5 pt-4">
                         <div>
                            <span className="text-[8px] font-black uppercase text-emerald-700/70 block">Prix Nexus</span>
                            <div className="text-xl font-black text-primary italic leading-none">{product.displayPrice.toFixed(2)} €</div>
                         </div>
                         <Button 
                            className="w-10 h-10 rounded-full bg-gold/10 text-gold p-0 border border-gold/20 hover:bg-gold hover:text-foreground"
                            onClick={(e) => {
                              e.stopPropagation();
                              toast.success(`${product.name} ajouté au panier B2B !`);
                            }}
                          >
                             <ShoppingCart size={16} />
                          </Button>
                      </div>
                   </div>
                </div>
             ))}
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32 relative z-20">
              <div className="glass-card p-8 rounded-[32px] text-center border border-emerald-900/5 bg-emerald-500/5">
                  <div className="text-4xl font-black mb-1 text-primary">{stats.companies}+</div>
                  <p className="text-primary/60 font-black uppercase tracking-widest text-[10px]">Sociétés Vérifiées</p>
              </div>
              <div className="glass-card p-8 rounded-[32px] text-center border border-gold/20 bg-gold/5">
                  <div className="text-4xl font-black mb-1 text-primary">{stats.deals}+</div>
                  <p className="text-primary/60 font-black uppercase tracking-widest text-[10px]">Contrats Sécurisés</p>
              </div>
              <div className="glass-card p-8 rounded-[32px] text-center border border-blue-500/10 bg-blue-500/5">
                  <div className="text-4xl font-black mb-1 text-primary">{stats.countries}</div>
                  <p className="text-primary/60 font-black uppercase tracking-widest text-[10px]">Pays Couverts</p>
              </div>
          </div>

          <div className="text-center mb-24 bg-gradient-to-b from-primary/10 to-transparent p-16 rounded-[48px] border border-primary/10">
              <h2 className="text-4xl font-display font-black text-foreground mb-4 italic">Sourcing Industriel <span className="text-gold">Sur Mesure</span></h2>
              <p className="text-emerald-700/70 text-lg max-w-2xl mx-auto font-medium mb-10">
                 Vous cherchez un volume massif ou une molécule rare absente du catalogue ? Nos Key Account Managers négocient pour vous.
              </p>
              <Button 
                className="h-16 px-12 bg-primary text-foreground font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl hover:scale-105 transition-transform"
                onClick={() => toast.info("Un Expert Nexus va vous recontacter par message privé.")}
               >
                  <MessageSquare size={20} className="mr-3" /> Parler à un Expert Nexus
               </Button>
          </div>
        </div>

        {/* Modal Détails */}
        {selectedProduct && (
           <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-white/95 backdrop-blur-xl" onClick={() => setSelectedProduct(null)}>
              <div className="glass-card max-w-4xl w-full flex flex-col md:flex-row overflow-hidden rounded-[40px] border border-emerald-200 shadow-3xl" onClick={e => e.stopPropagation()}>
                  <div className="w-full md:w-1/2 p-2">
                     <img 
                        src={selectedProduct.image} 
                        className="w-full h-full object-cover rounded-[36px]" 
                        onError={(e) => {
                           (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1616949755610-8c9bac08f9f8?auto=format&fit=crop&q=80&w=800";
                        }}
                     />
                  </div>
                 <div className="w-full md:w-1/2 p-10 flex flex-col">
                    <div className="mb-8">
                       <span className="inline-block px-3 py-1 bg-gold/20 text-gold rounded-full text-[10px] font-black uppercase tracking-widest mb-4">Produit Origine {selectedProduct.source}</span>
                       <h2 className="text-4xl font-display font-black text-foreground italic mb-2">{selectedProduct.name}</h2>
                       <p className="text-gold text-3xl font-black">{selectedProduct.displayPrice.toFixed(2)} € <span className="text-xs text-emerald-700/70 font-medium">HT</span></p>
                    </div>
                    
                    <div className="space-y-6 mb-10">
                       <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-700/70 border-b border-emerald-200 pb-2">Description Technique</h4>
                       <p className="text-foreground/70 leading-relaxed text-sm">{selectedProduct.desc}</p>
                       <div className="flex items-center gap-3">
                          <ShieldCheck className="text-emerald-500" size={20} />
                          <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Certifié Pur (Nexus Lab Check)</span>
                       </div>
                    </div>
                    
                    <div className="mt-auto flex flex-col gap-4">
                       <Button 
                          className="h-14 bg-white text-black font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-gold transition-all"
                          onClick={() => toast.success(`${selectedProduct.name} ajouté au panier B2B !`)}
                        >
                           Ajouter au Panier B2B
                        </Button>
                       <Button variant="outline" className="h-14 border-emerald-200 text-foreground rounded-2xl" onClick={() => setSelectedProduct(null)}>Retour au Catalogue</Button>
                    </div>
                 </div>
              </div>
           </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Store;

