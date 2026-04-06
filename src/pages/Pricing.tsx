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
      duration: "4 mois",
      features: [
        t("hero.pass.academy"),
        t("hero.pass.commission"),
        t("pricing.continents"),
        "Support Standard 24/7",
        "Accès Beta Studio Lab"
      ],
      cta: t("pricing.trial.activate"),
      highlight: true
    },
    {
      name: "Nexus Master",
      price: "199",
      duration: "par mois",
      features: [
        "Tout du plan Explorer",
        "Certification Master Parfumeur",
        "Accès VIP Sourcing Global",
        "Analyse IA Illimitée",
        "Assistance Juridique IFRA"
      ],
      cta: "Bientôt disponible",
      highlight: false
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col font-body overflow-x-hidden">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-6xl relative">
          
          <div className="text-center mb-20">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 mb-8">
               <Award size={14} className="text-gold" />
               <span className="text-[10px] font-bold text-gold uppercase tracking-[0.2em]">Offre de Lancement Mondiale</span>
             </div>
             <h1 className="text-5xl md:text-8xl font-display font-black mb-6 tracking-tighter">
               {t("nav.pricing")}
             </h1>
             <p className={`text-xl text-muted-foreground max-w-2xl mx-auto ${dir === "rtl" ? "font-arabic" : ""}`}>
               Accédez à l'intégralité de l'écosystème avec notre offre exclusive de 4 mois gratuits. 
               {isAdmin && <span className="block mt-4 text-green-400 font-bold">✓ {t("pricing.admin_view")}</span>}
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {plans.map((plan, i) => (
              <div 
                key={i} 
                className={`glass-card rounded-[48px] p-12 border-2 transition-all duration-500 hover:-translate-y-2 flex flex-col ${plan.highlight ? 'border-gold shadow-gold/20' : 'border-white/5 bg-black/40'}`}
              >
                {plan.highlight && (
                  <div className="bg-gold text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest w-fit mb-8 shadow-gold">
                    Recommandé
                  </div>
                )}
                
                <h3 className="text-3xl font-display font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-10">
                  <span className="text-6xl font-black text-white">{plan.price}€</span>
                  <span className="text-muted-foreground font-bold italic">{plan.duration}</span>
                </div>

                <div className="space-y-6 mb-12 flex-1">
                   {plan.features.map((feature, j) => (
                     <div key={j} className="flex gap-4">
                        <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                           <Check size={14} className="text-gold" />
                        </div>
                        <span className="text-sm font-medium text-white/80">{feature}</span>
                     </div>
                   ))}
                </div>

                <Button 
                   onClick={handleStartTrial}
                   disabled={loading || i === 1}
                   className={`h-16 px-10 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${plan.highlight ? 'bg-gold hover:bg-gold/80 text-black shadow-gold' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}`}
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>

          {/* Admin override section */}
          {isAdmin && (
            <div className="mt-16 glass-card rounded-[40px] p-10 border-2 border-green-500/30 bg-green-500/5 animate-pulse">
               <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-6">
                    <Shield size={48} className="text-green-500" />
                    <div>
                       <h4 className="text-2xl font-display font-black uppercase tracking-tighter text-white">Privilèges Administrateur</h4>
                       <p className="text-sm text-muted-foreground">Votre compte est configuré pour avoir une visibilité <strong className="text-white">TOUTES ZONES</strong> et un accès illimité sans facturation.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="flex items-center gap-2 px-4 py-2 bg-black/40 rounded-xl border border-green-500/20">
                        <Globe size={16} className="text-green-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Global Scan Active</span>
                     </div>
                  </div>
               </div>
            </div>
          )}

        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
