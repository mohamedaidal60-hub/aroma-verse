import { ArrowRight, Gift, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLang } from "@/contexts/LanguageContext";

const CTASection = () => {
  const navigate = useNavigate();
  const { t } = useLang();

  return (
    <section className="py-32 relative font-body overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="relative rounded-[64px] overflow-hidden border-2 border-gold/30 bg-black/40 p-12 md:p-24 text-center shadow-2xl group">
          
          {/* Animated background effects */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-50 transition-opacity group-hover:opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-gold/10 pointer-events-none" />
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-gold/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-gold/15 transition-all duration-1000" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gold/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-gold/15 transition-all duration-1000" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-gold/40 bg-gold/10 mb-10 backdrop-blur-md animate-bounce-slow">
              <Gift size={18} className="text-gold" />
              <span className="text-[10px] font-black text-gold uppercase tracking-[0.2em]">{t("auth.trial")}</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-display font-black mb-6 text-white tracking-tight">
              {t("auth.title")}
            </h2>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto">
              {t("features.desc")}
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <Button 
                size="lg" 
                className="bg-gold hover:bg-gold/80 text-black font-black text-sm uppercase tracking-widest h-16 px-12 rounded-[24px] shadow-gold transition-all hover:scale-105 active:scale-95 group"
                onClick={() => navigate("/auth")}
              >
                {t("auth.submit.register")}
                <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={20} />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/5 h-16 px-12 rounded-[24px] font-bold text-sm tracking-widest"
                onClick={() => navigate("/pricing")}
              >
                {t("nav.pricing")}
              </Button>
            </div>

            <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
               <div className="flex items-center gap-2"><ShieldCheck size={18} /> <span className="text-[11px] font-black text-white">Sécurité Bancaire</span></div>
               <div className="flex items-center gap-2"><Sparkles size={18} /> <span className="text-[11px] font-black text-white">Support 24/7 Experts</span></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CTASection;
