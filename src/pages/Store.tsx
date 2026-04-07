import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, ExternalLink, Globe, Zap, ShieldCheck, Factory, Box, Droplets, Ship, Building, Handshake, BrainCircuit, Shield, FileSignature, Check, Video, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const Store = () => {
  const { t, dir } = useLang();
  const navigate = useNavigate();

  // Animating stats
  const [stats, setStats] = useState({ companies: 0, deals: 0, countries: 0 });

  useEffect(() => {
    // Simulate loading stats with a small animation
    const timer = setTimeout(() => {
      setStats({ companies: 845, deals: 1240, countries: 34 });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen font-body overflow-x-hidden bg-background">
      {/* Background Gradient Vert Naturel (Soothing Natural Green) */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/10 to-transparent blur-[120px] rounded-full"></div>
      </div>

      <Navbar />
      
      <main className="flex-1 pt-24 pb-16 relative z-10">
        
        {/* Top Security Banner */}
        <div className="bg-emerald-900/10 backdrop-blur-md text-emerald-900 text-center py-2 text-xs md:text-sm border-y border-emerald-900/10 shadow-sm">
          <div className="container mx-auto flex items-center justify-center gap-2">
            <ShieldCheck className="text-emerald-600 w-4 h-4" /> 
            <span className="opacity-90 tracking-wide font-medium">Cryptage Militaire AES-256 | SSL/TLS | Protection des Données B2B</span>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-7xl pt-16">
          
          {/* Hero Section */}
          <div className="flex flex-col items-center justify-center mb-24 text-center">
            <div className="inline-flex items-center gap-2 bg-[#10B981]/10 backdrop-blur-sm rounded-full px-5 py-2 mb-8 border border-[#10B981]/30">
              <BrainCircuit className="text-gold w-4 h-4" />
              <span className="text-xs font-bold text-gold uppercase tracking-[0.1em]">Intelligence Artificielle de Sourcing</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black mb-6 tracking-tighter text-foreground leading-[1.1]">
               NEXUS <br className="hidden md:block"/>
               <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-gold to-amber-600">
                 Supply Chain
               </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
               Connectez votre entreprise aux meilleurs fournisseurs et acheteurs mondiaux via notre plateforme B2B intelligente et sécurisée. Transaction garantie, frais réduits.
            </p>
            
            <div className="flex justify-center gap-4 flex-col sm:flex-row w-full sm:w-auto">
                <Button 
                    onClick={() => navigate("/auth")}
                    className="h-14 px-8 bg-gradient-gold hover:opacity-90 text-black font-black text-sm uppercase tracking-widest rounded-full shadow-gold shadow-lg flex items-center gap-3 transition-transform hover:scale-105"
                >
                    <Zap className="fill-black" size={18} />
                    Inscrire ma société
                </Button>
                <Button 
                    variant="outline"
                    className="h-14 px-8 border-emerald-900/20 text-emerald-900 hover:bg-emerald-50 font-bold text-sm uppercase tracking-widest rounded-full transition-colors"
                >
                    <Video size={18} className="mr-2" /> Voir la Démo
                </Button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32 relative z-20">
              <div className="glass-card p-8 rounded-[32px] text-center border border-emerald-900/5 hover:border-emerald-500/30 transition-all hover:-translate-y-2 duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/5 flex items-center justify-center mx-auto mb-6 text-emerald-600">
                      <Building size={32} />
                  </div>
                  <div className="text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-gold">
                      {stats.companies}+
                  </div>
                  <p className="text-foreground/60 font-bold uppercase tracking-widest text-sm">Sociétés Vérifiées</p>
              </div>

              <div className="glass-card bg-[#05110B]/60 p-8 rounded-[32px] text-center border border-emerald-900/50 hover:border-emerald-500/50 transition-all hover:-translate-y-2 duration-300 delay-100">
                  <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-6 text-gold">
                      <Handshake size={32} />
                  </div>
                  <div className="text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-500">
                      {stats.deals}+
                  </div>
                  <p className="text-emerald-100/60 font-bold uppercase tracking-widest text-sm">Contrats Sécurisés</p>
              </div>

              <div className="glass-card bg-[#05110B]/60 p-8 rounded-[32px] text-center border border-emerald-900/50 hover:border-emerald-500/50 transition-all hover:-translate-y-2 duration-300 delay-200">
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-6 text-blue-400">
                      <Globe size={32} />
                  </div>
                  <div className="text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                      {stats.countries}
                  </div>
                  <p className="text-emerald-100/60 font-bold uppercase tracking-widest text-sm">Pays Couverts</p>
              </div>
          </div>

          {/* Features */}
          <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">Le Choix Stratégique de l'Industrie</h2>
              <p className="text-foreground/60 text-lg max-w-2xl mx-auto">Une infrastructure B2B complète pour sourcer, négocier et contractualiser en toute sérénité.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
             <div className="group bg-gradient-card p-10 rounded-[40px] border border-white/5 hover:border-gold/30 transition-all text-center">
                 <div className="w-20 h-20 bg-[#10B981]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#10B981]/20 transition-colors">
                     <BrainCircuit className="text-[#10B981] w-10 h-10" />
                 </div>
                 <h3 className="text-2xl font-bold mb-4 text-foreground">Matching Hyper-Précis (IA)</h3>
                 <p className="text-muted-foreground leading-relaxed">
                     Nos algorithmes propriétaires vous suggèrent les 3 meilleurs partenaires certifiés en moins de 24h, selon vos cahiers des charges.
                 </p>
             </div>

             <div className="group bg-gradient-card p-10 rounded-[40px] border border-white/5 hover:border-gold/30 transition-all text-center">
                 <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gold/20 transition-colors">
                     <Shield className="text-gold w-10 h-10" />
                 </div>
                 <h3 className="text-2xl font-bold mb-4 text-foreground">Chambres Fortes Digitales</h3>
                 <p className="text-muted-foreground leading-relaxed">
                     Négociation en salons privés avec chiffrement de bout en bout (AES-256). Vos données industrielles restent strictement confidentielles.
                 </p>
             </div>

             <div className="group bg-gradient-card p-10 rounded-[40px] border border-white/5 hover:border-gold/30 transition-all text-center">
                 <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-500/20 transition-colors">
                     <FileSignature className="text-blue-400 w-10 h-10" />
                 </div>
                 <h3 className="text-2xl font-bold mb-4 text-foreground">E-Contrats Légaux</h3>
                 <p className="text-muted-foreground leading-relaxed">
                     Signature de LOI et contrats finaux intégrée à la plateforme avec validité juridique internationale, sans sortir de votre espace.
                 </p>
             </div>
          </div>

          {/* Pricing */}
          <div className="text-center mb-16 relative">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-gold/10 blur-[100px] rounded-full pointer-events-none"></div>
             <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 relative">Partenariat Sur-Mesure</h2>
             <p className="text-emerald-100/60 text-lg max-w-2xl mx-auto relative">De la découverte au déploiement multinational, un modèle transparent.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 max-w-6xl mx-auto items-stretch">
             {/* Plan 1 */}
              <div className="bg-white/40 backdrop-blur-sm p-8 md:p-10 rounded-[40px] border border-emerald-900/10 flex flex-col mt-4 shadow-sm">
                 <div className="mb-8">
                     <h3 className="text-2xl font-bold text-foreground mb-2">Découverte</h3>
                     <p className="text-foreground/50 text-sm">Pour tester le marché</p>
                 </div>
                 <div className="text-4xl font-black text-foreground mb-8">
                     Gratuit
                 </div>
                 <ul className="space-y-4 mb-10 flex-1">
                     <li className="flex gap-3 text-sm text-foreground/70"><Check className="text-emerald-600 w-5 h-5 flex-shrink-0"/>1 publication d'offre/demande</li>
                     <li className="flex gap-3 text-sm text-foreground/70"><Check className="text-emerald-600 w-5 h-5 flex-shrink-0"/>Accès au registre public</li>
                     <li className="flex gap-3 text-sm text-foreground/70 opacity-40"><span className="w-5 flex justify-center text-red-500">×</span>Pas de salon virtuel privé</li>
                 </ul>
                 <Button variant="outline" className="w-full h-12 rounded-2xl border-emerald-900/10 hover:bg-emerald-50 text-emerald-900">Créer un profil</Button>
             </div>

             {/* Plan 2 */}
             <div className="bg-white p-10 rounded-[40px] border-2 border-gold flex flex-col relative transform md:-translate-y-4 shadow-xl z-10">
                 <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-gold">
                    Le Standard B2B
                 </div>
                 <div className="mb-8 mt-2">
                     <h3 className="text-2xl font-bold text-foreground mb-2">Nexus Pro</h3>
                     <p className="text-foreground/50 text-sm">Pour les acteurs établis</p>
                 </div>
                 <div className="flex items-baseline gap-2 mb-8">
                     <span className="text-5xl font-black text-gold">Sur Devis</span>
                 </div>
                 <ul className="space-y-4 mb-10 flex-1">
                     <li className="flex gap-3 text-sm text-foreground/90"><Check className="text-gold w-5 h-5 flex-shrink-0"/>Publications illimitées</li>
                     <li className="flex gap-3 text-sm text-foreground/90"><Check className="text-gold w-5 h-5 flex-shrink-0"/>Salons virtuels & Visioconférence</li>
                     <li className="flex gap-3 text-sm text-foreground/90"><Check className="text-gold w-5 h-5 flex-shrink-0"/>Badge "Fournisseur Vérifié"</li>
                     <li className="flex gap-3 text-sm text-foreground/90"><Check className="text-gold w-5 h-5 flex-shrink-0"/>Support prioritaire 24/7</li>
                 </ul>
                 <Button className="w-full h-14 rounded-2xl bg-gradient-gold text-black font-black uppercase tracking-widest hover:scale-105 transition-transform">
                     Contacter l'équipe
                 </Button>
             </div>

             {/* Plan 3 */}
             <div className="bg-white/40 backdrop-blur-sm p-8 md:p-10 rounded-[40px] border border-emerald-900/10 flex flex-col mt-4 shadow-sm">
                 <div className="mb-8">
                     <h3 className="text-2xl font-bold text-foreground mb-2">Enterprise</h3>
                     <p className="text-foreground/50 text-sm">Volume massif & Intégration</p>
                 </div>
                 <div className="text-4xl font-black text-foreground mb-8">
                     Custom
                 </div>
                 <ul className="space-y-4 mb-10 flex-1">
                     <li className="flex gap-3 text-sm text-foreground/70"><Check className="text-emerald-600 w-5 h-5 flex-shrink-0"/>API intégration ERP/CRM</li>
                     <li className="flex gap-3 text-sm text-foreground/70"><Check className="text-emerald-600 w-5 h-5 flex-shrink-0"/>Key Account Manager dédié</li>
                     <li className="flex gap-3 text-sm text-foreground/70"><Check className="text-emerald-600 w-5 h-5 flex-shrink-0"/>Conditions tarifaires sur-mesure</li>
                 </ul>
                 <Button variant="outline" className="w-full h-12 rounded-2xl border-emerald-900/10 hover:bg-emerald-50 text-emerald-900">Organiser un appel</Button>
             </div>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Store;
