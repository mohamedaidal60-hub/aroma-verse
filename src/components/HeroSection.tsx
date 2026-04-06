import { ArrowRight, Sparkles, GraduationCap, ShoppingBag, TrendingUp, Gift, ShieldCheck, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden font-body">
      {/* Background with parallax effect simulation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1920" 
          alt="Luxury perfume collection" 
          className="w-full h-full object-cover animate-slow-zoom" 
        />
        {/* Animated gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-20 pt-20">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left animate-fade-up">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-gold/30 bg-gold/10 mb-8 backdrop-blur-md">
                <Sparkles size={16} className="text-gold" fill="currentColor" />
                <span className="text-[10px] font-black text-gold tracking-[0.2em] uppercase">The Nexus Ecosystem v2.0</span>
              </div>

              <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black leading-[0.9] mb-8 text-white tracking-tighter">
                PERFUME <br />
                <span className="text-gradient-gold">NEXUS</span>
              </h1>
              
              <p className="text-2xl md:text-3xl text-white/70 font-display mb-6 max-w-2xl mx-auto lg:mx-0">
                L'excellence moléculaire au service de l'industrie mondiale du parfum.
              </p>
              
              <div className="space-y-2 mb-12">
                <p className="text-2xl md:text-3xl font-arabic text-gold/80 leading-relaxed font-bold" dir="rtl">
                  حيث تلتقي رائحة الإبداع بطعم المعرفة
                </p>
                <p className="text-lg font-arabic text-muted-foreground/60" dir="rtl">
                  المنصة المتكاملة للمحترفين والمستثمرين في عالم العطور
                </p>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12">
                <Button 
                  size="lg" 
                  className="bg-gold hover:bg-gold/80 text-black font-black h-16 px-10 rounded-2xl shadow-gold transition-all hover:scale-105 group"
                  onClick={() => navigate("/auth")}
                >
                  <Gift size={20} className="mr-3 group-hover:rotate-12 transition-transform" />
                  ESSAI GRATUIT 4 MOIS
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg" 
                  className="bg-white/5 hover:bg-white/10 backdrop-blur-md text-white border-white/20 h-16 px-10 rounded-2xl transition-all hover:scale-105"
                  onClick={() => navigate("/marketplace")}
                >
                  EXAMINER LE CATALOGUE
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-8 opacity-60">
                 <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-gold"/> <span className="text-[10px] font-bold uppercase tracking-widest">ISO 9001 Certified</span></div>
                 <div className="flex items-center gap-2"><Globe size={18} className="text-gold"/> <span className="text-[10px] font-bold uppercase tracking-widest">Global Supply Chain</span></div>
                 <div className="flex items-center gap-2 text-gold"><span className="text-[10px] font-bold uppercase tracking-widest">★★★★★ Elite Rating</span></div>
              </div>
            </div>

            {/* Right Card (Nexus Pass) */}
            <div className="hidden lg:block w-96 animate-float">
               <div className="glass-card rounded-[48px] p-10 border-2 border-gold/30 bg-gradient-to-br from-gold/15 to-transparent shadow-elevated relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-3xl group-hover:bg-gold/20 transition-all"></div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-12">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-black font-black">N</div>
                      <div className="text-right">
                        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Nexus Pass</p>
                        <p className="text-xs text-gold font-bold">VIP ACCESS</p>
                      </div>
                    </div>

                    <div className="space-y-6 mb-12">
                       <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold"><GraduationCap size={16} /></div>
                          <p className="text-xs font-bold text-white/80">Accès Academy Illimité</p>
                       </div>
                       <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold"><ShoppingBag size={16} /></div>
                          <p className="text-xs font-bold text-white/80">0% Commission Marketplace</p>
                       </div>
                       <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold"><TrendingUp size={16} /></div>
                          <p className="text-xs font-bold text-white/80">Priorité Investissement</p>
                       </div>
                    </div>

                    <div className="pt-8 border-t border-white/10">
                       <p className="text-center text-[10px] text-muted-foreground uppercase tracking-widest mb-4">Offre de lancement</p>
                       <div className="flex justify-center items-end gap-1 mb-2">
                          <span className="text-4xl font-black text-white">0€</span>
                          <span className="text-xs text-muted-foreground mb-1">/ 4 mois</span>
                       </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-6xl mx-auto mt-24 pt-16 border-t border-white/10">
            {[
              { label: "Membres actifs", value: "125k+", ar: "مستخدم" },
              { label: "Outils Lab", value: "12", ar: "أداة مخبرية" },
              { label: "Matières premières", value: "8,500+", ar: "مادة خام" },
              { label: "ROI Moyen", value: "14%", ar: "عائد متوسط" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center lg:items-start">
                <span className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white mb-2 leading-none group-hover:text-gold transition-colors">{stat.value}</span>
                <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">{stat.label}</span>
                <span className="text-gold font-arabic text-lg leading-none">{stat.ar}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
