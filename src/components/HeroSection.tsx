import { ArrowRight, Sparkles, Zap, Award, BarChart3, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLang } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const navigate = useNavigate();
  const { t, dir } = useLang();

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden font-body">
      {/* Background with Ambient light */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#f1f5f9]/40 z-10" />
        <img 
          src="https://picsum.photos/seed/hero-perfume/1920/1080" 
          alt="Nexus Parfumerie" 
          className="w-full h-full object-cover opacity-30 grayscale hover:grayscale-0 transition-all duration-1000"
        />
        <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-gold/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gold/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Zap size={14} className="text-gold" fill="currentColor" />
              <span className="text-[10px] font-bold text-gold uppercase tracking-[0.2em]">{t("hero.badge")}</span>
            </div>
            
            <h1 className="text-6xl md:text-9xl font-display font-black mb-6 tracking-tighter leading-none animate-in fade-in slide-in-from-bottom-6 duration-1000">
              {t("hero.title")}
            </h1>
            
            <p className="text-2xl md:text-3xl text-foreground font-medium mb-4 leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
              {t("hero.subtitle")}
            </p>
            
            <p className={`text-xl text-emerald-700/70 mb-12 italic ${dir === "rtl" ? "font-arabic" : ""}`}>
              {t("hero.tagline")}
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <Button 
                onClick={() => navigate('/auth')}
                className="h-16 px-10 bg-gold hover:bg-gold/80 text-black font-black text-sm uppercase tracking-widest rounded-2xl shadow-gold transition-all hover:scale-105 active:scale-95"
              >
                <Gift size={18} className={dir === "rtl" ? "ml-2" : "mr-2"} /> {t("hero.cta.trial")}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => navigate('/marketplace')}
                className="h-16 px-10 border-emerald-900/10 hover:bg-emerald-100 text-emerald-900 font-bold text-sm uppercase tracking-widest rounded-2xl transition-all"
              >
                {t("hero.cta.catalogue")} <ArrowRight size={18} className={dir === "rtl" ? "mr-2 rotate-180" : "ml-2"} />
              </Button>
            </div>
          </div>

          {/* Right Presentation - The Nexus Pass Card */}
          <div className="relative group animate-in fade-in zoom-in duration-1000 delay-300">
            <div className="absolute -inset-1 bg-gradient-to-r from-gold/50 to-transparent blur opacity-20 group-hover:opacity-40 transition-opacity" />
            
            <div className="relative glass-card rounded-[48px] p-10 md:p-12 border border-emerald-200 overflow-hidden bg-gradient-to-br from-secondary/80 to-background/90">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-3xl -mr-32 -mt-32" />
              
              <div className="flex justify-between items-start mb-12">
                <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold border border-gold/20">
                  <Sparkles size={32} />
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black tracking-widest text-gold uppercase mb-1">{t("hero.pass.offer")}</p>
                  <p className="text-4xl font-black text-foreground">{t("hero.pass.price")}</p>
                </div>
              </div>

              <h2 className="text-4xl font-display font-bold mb-8">{t("hero.pass.title")}</h2>
              
              <div className="space-y-6">
                {[
                  { icon: Gift, text: t("hero.pass.academy") },
                  { icon: Award, text: t("hero.pass.commission") },
                  { icon: BarChart3, text: t("hero.pass.invest") }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-5 p-4 rounded-3xl bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center text-gold">
                      <item.icon size={20} />
                    </div>
                    <span className="font-bold text-foreground/80">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* NFC Chip visual decorator */}
              <div className="mt-12 h-1 px-8">
                <div className="h-full bg-emerald-50 rounded-full relative">
                  <div className="absolute inset-y-0 left-0 w-1/3 bg-gold/50 rounded-full" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
