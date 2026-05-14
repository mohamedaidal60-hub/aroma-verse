import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, Zap, Shield, Globe, Award, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useLang } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

const Pricing = () => {
  const { t, dir } = useLang();
  const { profile } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const isAdmin = profile?.role === "admin";

  const handleStartTrial = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(t("pricing.trial.activated"));
    }, 1500);
  };

  const plans = [
    {
      name: "Nexus Explorer",
      price: "0",
      description: "L'éveil olfactif",
      duration: "Gratuit / 4 mois",
      features: [
        "Accès complet à l'Académie",
        "Studio Lab (Version Beta)",
        "0% commission sur Marketplace",
        "Matching Sourcing (Basic)",
        "Support Standard 24/7"
      ],
      cta: "Découvrir gratuitement",
      highlight: true
    },
    {
      name: "Nexus Mastermind",
      price: "199",
      description: "Pour les industriels",
      duration: "par mois",
      features: [
        "Tout du plan Explorer",
        "Sourcing Premium Certifié",
        "IFRA Legal Shield (Assistance)",
        "Analyses Lab IA Illimitées",
        "Ventes Prioritaires Globales"
      ],
      cta: "Contacter pour démo",
      highlight: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col font-body overflow-x-hidden">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-6xl relative">
          
          <div className="text-center mb-24">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8">
               <Award size={16} className="text-primary" />
               <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Offre de Lancement • Nexus 4.0</span>
             </div>
             <h1 className="text-5xl md:text-8xl font-display font-black mb-8 tracking-tighter text-foreground">
               Choisir mon <span className="text-primary italic">Plan</span>
             </h1>
             <p className={`text-xl text-primary/60 max-w-2xl mx-auto font-medium ${dir === "rtl" ? "font-arabic" : ""}`}>
               L'écosystème B2B définitif pour la parfumerie moderne. Sans abonnement caché, sans frictions.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <div 
                key={i} 
                className={`group rounded-[56px] p-12 border-2 transition-all duration-700 hover:-translate-y-4 flex flex-col relative overflow-hidden ${plan.highlight ? 'bg-forest-deep border-primary shadow-2xl shadow-primary/20' : 'bg-white border-primary/10 shadow-xl'}`}
              >
                {/* Background Decor */}
                {plan.highlight && (
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 blur-[100px] -mr-32 -mt-32"></div>
                )}
                
                {plan.highlight && (
                  <div className="absolute top-8 right-12">
                     <Sparkles className="text-gold animate-pulse" size={40} />
                  </div>
                )}
                
                <h3 className={`text-3xl font-display font-black mb-1 uppercase tracking-tighter ${plan.highlight ? 'text-foreground' : 'text-primary'}`}>{plan.name}</h3>
                <p className={`text-xs font-bold uppercase tracking-widest mb-10 ${plan.highlight ? 'text-foreground/40' : 'text-primary/40'}`}>{plan.description}</p>
                
                <div className="flex items-baseline gap-2 mb-12">
                  <span className={`text-7xl font-black tracking-tighter ${plan.highlight ? 'text-foreground' : 'text-primary'}`}>{plan.price}€</span>
                  <span className={`font-black uppercase text-[10px] tracking-widest ${plan.highlight ? 'text-foreground/60' : 'text-primary/60'}`}>{plan.duration}</span>
                </div>

                <div className="space-y-6 mb-16 flex-1">
                   {plan.features.map((feature, j) => (
                     <div key={j} className="flex gap-5 items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${plan.highlight ? 'bg-emerald-100 text-gold' : 'bg-primary/10 text-primary'}`}>
                           <Check size={14} className="font-bold" />
                        </div>
                        <span className={`text-sm font-bold ${plan.highlight ? 'text-foreground/80' : 'text-primary'}`}>{feature}</span>
                     </div>
                   ))}
                </div>

                <Button 
                   onClick={handleStartTrial}
                   disabled={loading || i === 1}
                   className={`h-20 px-10 rounded-[32px] font-black text-xs uppercase tracking-[0.3em] transition-all relative overflow-hidden group shadow-2xl ${plan.highlight ? 'bg-white text-primary hover:bg-gold hover:text-black' : 'bg-primary text-foreground hover:bg-gold hover:text-black'}`}
                >
                  <span className="relative z-10">{plan.highlight && !loading ? "ACTIVER MON PASS" : plan.cta}</span>
                  {plan.highlight && (
                    <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  )}
                </Button>
              </div>
            ))}
          </div>

          {/* Special Case: Enterprise */}
          <div className="mt-20 glass-card rounded-[56px] p-12 md:p-20 border border-primary/10 bg-white relative overflow-hidden shadow-2xl group">
             <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] group-hover:bg-primary/10 transition-colors"></div>
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="flex-1 text-center md:text-left">
                   <h2 className="text-4xl md:text-5xl font-display font-black text-primary mb-6 tracking-tighter">Échelle <span className="italic">Pro & Multinationale</span></h2>
                   <p className="text-primary/60 text-lg font-medium leading-relaxed max-w-xl">
                      Besoin de formations sur mesure ou d'un sytème de supply chain automatisé ? Nos experts déploient Nexus sur vos serveurs privés.
                   </p>
                </div>
                <Button variant="outline" className="h-16 px-12 border-primary/20 rounded-[28px] font-black text-xs uppercase tracking-widest text-primary hover:bg-primary/5 shadow-xl transition-all hover:scale-105 active:scale-95">
                   Demander une Consultation
                </Button>
             </div>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
