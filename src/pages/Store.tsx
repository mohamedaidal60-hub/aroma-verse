import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Store as StoreIcon, Search, ExternalLink, Globe, Zap, ShieldCheck, Factory, Box, Droplets, Ship } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const b2bPlatforms = [
  { id: "alibaba", name: "Alibaba", baseUrl: "https://www.alibaba.com/trade/search?SearchText=", region: "Global / Asia", icon: <Globe size={20} /> },
  { id: "tradeindia", name: "TradeIndia", baseUrl: "https://www.tradeindia.com/search.html?keyword=", region: "Inde / Asia", icon: <Globe size={20} /> },
  { id: "europages", name: "Europages", baseUrl: "https://www.europages.com/search/?q=", region: "Europe", icon: <Globe size={20} /> },
  { id: "go4world", name: "Go4WorldBusiness", baseUrl: "https://www.go4worldbusiness.com/find?sq=", region: "Global", icon: <Globe size={20} /> },
  { id: "kompass", name: "Kompass", baseUrl: "https://www.kompass.com/searchCompanies?text=", region: "Europe / Global", icon: <Globe size={20} /> },
  { id: "thomasnet", name: "ThomasNet", baseUrl: "https://www.thomasnet.com/search.html?cov=NA&what=", region: "North America", icon: <Globe size={20} /> }
];

const Store = () => {
  const [query, setQuery] = useState("");
  const [activeSearches, setActiveSearches] = useState<any[]>([]);

  const handleSearchAll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error("Veuillez entrer un terme de recherche");
      return;
    }

    const searches = b2bPlatforms.map(platform => ({
        ...platform,
        searchUrl: `${platform.baseUrl}${encodeURIComponent(query)}`
    }));
    setActiveSearches(searches);
    toast.success("Moteur global synchronisé !");
  };

  const handleOpenAll = () => {
    if (activeSearches.length === 0) return;
    toast.info("Ouverture des 6 moteurs de recherche...");
    activeSearches.forEach(search => {
        window.open(search.searchUrl, "_blank");
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-body overflow-x-hidden">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl relative">
          
          {/* Hero Section */}
          <div className="flex flex-col items-center justify-center mb-20 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 mb-8">
              <Zap size={14} className="text-gold" fill="currentColor" />
              <span className="text-[10px] font-bold text-gold uppercase tracking-[0.2em]">Nexus B2B Supply Chain</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-display font-black mb-6 tracking-tighter">
              Moteur <span className="text-gold">Sourcing</span> Global
            </h1>
            
            <p className="text-2xl text-muted-foreground font-arabic max-w-3xl leading-relaxed">
              أكبر محرك بحث B2B في عالم العطور — ابحث في ملايين المنتجات من كبار الموردين العالميين
            </p>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl bg-white/5 py-4 px-8 rounded-3xl border border-white/5">
              Ne soyez plus limité par les stocks locaux. Interrogez instantanément les 6 plus grandes bases de données fournisseurs mondiales.
            </p>
          </div>

          {/* Search Form */}
          <div className="mb-24 relative max-w-4xl mx-auto">
             <div className="absolute inset-0 bg-gold/20 blur-[100px] opacity-20 pointer-events-none"></div>
             
             <form onSubmit={handleSearchAll} className="relative glass-card p-2 md:p-3 rounded-[32px] md:rounded-[48px] border-2 border-gold/40 shadow-2xl shadow-gold/10 flex flex-col md:flex-row items-center gap-2 transition-all focus-within:border-gold">
               <div className="flex items-center flex-1 w-full px-6">
                 <Search className="text-gold w-6 h-6 mr-4 flex-shrink-0" />
                 <Input 
                   value={query}
                   onChange={(e) => setQuery(e.target.value)}
                   placeholder="Ex: Rose essential oil bulk, 50ml luxury glass bottles, Distillation units..." 
                   className="border-0 bg-transparent focus-visible:ring-0 shadow-none text-xl text-white placeholder:text-muted-foreground/40 h-16 w-full"
                 />
               </div>
               <Button type="submit" className="w-full md:w-auto h-16 px-12 bg-gold hover:bg-gold/80 text-black font-black text-sm uppercase tracking-widest rounded-[32px] shadow-gold transition-transform active:scale-95">
                 Lancer le Sourcing
               </Button>
             </form>
             
             <div className="flex flex-wrap justify-center gap-4 mt-8 opacity-60">
                <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Inclus dans la recherche :</span>
                {b2bPlatforms.map(p => (
                  <span key={p.id} className="text-[10px] font-bold text-white bg-white/5 px-3 py-1 rounded-full border border-white/10">{p.name}</span>
                ))}
             </div>
          </div>

          {/* Results Grid */}
          {activeSearches.length > 0 ? (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 bg-gold/5 p-8 rounded-[40px] border border-gold/20">
                    <div className="flex items-center gap-4">
                       <div className="w-14 h-14 bg-gold rounded-2xl flex items-center justify-center text-black shadow-gold"><Ship size={28} /></div>
                       <div>
                          <h2 className="text-2xl font-display font-bold text-white">Résultats préréglés pour : <span className="text-gold">"{query}"</span></h2>
                          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">6 bases de données synchronisées</p>
                       </div>
                    </div>
                    <Button onClick={handleOpenAll} className="w-full md:w-auto h-14 bg-white hover:bg-gold text-black font-black px-10 rounded-2xl flex items-center gap-3 transition-colors">
                        OUVRIR TOUT DANS 6 ONGLETS <ExternalLink size={20}/>
                    </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {activeSearches.map(search => (
                        <a 
                            key={search.id} 
                            href={search.searchUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="glass-card p-10 rounded-[48px] border border-white/5 hover:border-gold/50 transition-all duration-500 group flex flex-col items-start gap-6 bg-black/40 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl group-hover:bg-gold/10 transition-all"></div>
                            
                            <div className="flex justify-between w-full items-start">
                                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-gold border border-white/10 group-hover:bg-gold group-hover:text-black transition-colors">{search.icon}</div>
                                <ExternalLink size={24} className="text-muted-foreground/30 group-hover:text-gold transition-colors" />
                            </div>
                            
                            <div>
                               <h3 className="font-display font-bold text-3xl text-white group-hover:text-gold transition-colors mb-2">{search.name}</h3>
                               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold text-muted-foreground group-hover:text-white transition-colors">
                                 <Globe size={10} /> Zone : {search.region}
                               </div>
                            </div>

                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Accédez aux catalogues de gros de milliers de fabricants en {search.region} spécialisés dans le sourcing industriel.
                            </p>
                            
                            <Button className="w-full h-12 bg-white/10 hover:bg-gold text-white hover:text-black font-black text-xs uppercase tracking-widest rounded-2xl border border-white/10 group-hover:border-gold transition-all mt-auto">
                                Consulter l'annuaire
                            </Button>
                        </a>
                    ))}
                </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
               {[
                 { icon: <Factory size={32} />, title: "Fabricants Certifiés", ar: "مصانع معتمدة", desc: "Un accès direct aux unités de distillation et de pressage à froid partout dans le monde." },
                 { icon: <Box size={32} />, title: "Sourcing Packaging", ar: "توريد التغليف", desc: "Trouvez des fournisseurs de flacons sur-mesure, pompes et capots de luxe aux tarifs d'usine." },
                 { icon: <Droplets size={32} />, title: "Matières Rares", ar: "مواد خام نادرة", desc: "Huiles essentielles pures, absolues et molécules de synthèse (Ambroxan, Muscs) en gros volumes." }
               ].map((item, i) => (
                <div key={i} className="glass-card p-10 rounded-[48px] border border-white/5 flex flex-col items-center text-center group hover:border-gold/30 transition-all opacity-80 hover:opacity-100">
                    <div className="w-20 h-20 bg-gold/5 rounded-[32px] flex items-center justify-center mb-8 text-gold border border-white/5 group-hover:bg-gold group-hover:text-black transition-all duration-500 shadow-sm">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-1 text-white">{item.title}</h3>
                    <p className="text-[10px] text-gold font-arabic mb-6 uppercase tracking-widest leading-none">{item.ar}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
               ))}
            </div>
          )}

          {/* Membership CTA */}
          <div className="mt-32 p-10 md:p-16 glass-card rounded-[64px] border-2 border-gold/30 bg-gradient-to-br from-gold/15 to-transparent relative group overflow-hidden">
             <div className="absolute -top-32 -right-32 w-96 h-96 bg-gold/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-gold/15 transition-all"></div>
             
             <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="flex-1 text-center lg:text-left">
                   <div className="flex items-center gap-3 justify-center lg:justify-start mb-6">
                      <ShieldCheck size={32} className="text-gold" />
                      <h3 className="text-3xl md:text-4xl font-display font-bold text-white leading-none">Protection Acheteur Nexus</h3>
                   </div>
                   <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                     Nos membres **Nexus Pro** bénéficient d'une assistance prioritaire lors de leurs transactions internationales et de modèles de contrats d'importation certifiés par nos juristes partenaires.
                   </p>
                </div>
                <div className="flex flex-col gap-4 w-full lg:w-auto">
                   <Button className="h-16 px-12 bg-gold hover:bg-gold/80 text-black font-black text-sm uppercase tracking-widest rounded-2xl shadow-gold" onClick={() => window.location.href = '/pricing'}>
                      MA CHERCHER DES FOURNISSEURS PRO
                   </Button>
                   <p className="text-center text-[10px] text-muted-foreground font-black uppercase tracking-widest leading-none">Inclus dans votre essai de 4 mois</p>
                </div>
             </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Store;
