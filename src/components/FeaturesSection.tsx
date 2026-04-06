import { Palette, ShoppingBag, TrendingUp, Award, GraduationCap, Beaker, Globe2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLang } from "@/contexts/LanguageContext";

const FeaturesSection = () => {
  const navigate = useNavigate();
  const { t, dir } = useLang();

  const modules = [
    {
      icon: Palette,
      titleKey: "features.studio.title",
      descKey: "features.studio.desc",
      btnKey: "studio.simulation.action",
      path: "/studio",
      color: "from-purple-500/20 to-transparent",
      img: "https://images.unsplash.com/photo-1595151402017-40c291109a20?auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: ShoppingBag,
      titleKey: "features.marketplace.title",
      descKey: "features.marketplace.desc",
      btnKey: "marketplace.view_all",
      path: "/marketplace",
      color: "from-gold/20 to-transparent",
      img: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: TrendingUp,
      titleKey: "features.invest.title",
      descKey: "features.invest.desc",
      btnKey: "invest.cta.buy",
      path: "/investir",
      color: "from-green-500/20 to-transparent",
      img: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=800&q=80"
    },
  ];

  const extras = [
    {
      icon: GraduationCap,
      titleKey: "features.academy.title",
      descKey: "features.academy.desc",
    },
    {
      icon: Globe2,
      titleKey: "features.store.title",
      descKey: "features.store.desc",
    },
    {
      icon: Users,
      titleKey: "features.community.title",
      descKey: "features.community.desc",
    },
  ];

  return (
    <section className="py-32 relative font-body overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container mx-auto px-4 max-w-7xl">
        
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 mb-6">
            <Beaker size={14} className="text-gold" />
            <span className="text-[10px] font-bold text-gold uppercase tracking-[0.2em]">{t("features.badge")}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black mb-6">
            {t("features.title.1")} <span className="text-gold">{t("features.title.2")}</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {t("features.desc")}
          </p>
        </div>

        {/* Major Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {modules.map((m, i) => (
            <div
              key={i}
              className="group glass-card rounded-[48px] overflow-hidden border border-white/5 hover:border-gold/30 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full bg-black/40"
            >
              <div className="h-64 overflow-hidden relative">
                <img src={m.img} alt={t(m.titleKey)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60" />
                <div className={`absolute inset-0 bg-gradient-to-t ${m.color} to-transparent`} />
                <div className="absolute top-6 left-6 w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white">
                  <m.icon size={24} />
                </div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-display font-bold mb-4 text-white group-hover:text-gold transition-colors">{t(m.titleKey)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-10 flex-1">{t(m.descKey)}</p>
                
                <Button
                  className="w-full h-14 bg-white/5 hover:bg-gold hover:text-black font-black text-xs uppercase tracking-widest rounded-2xl border border-white/10 hover:border-gold transition-all"
                  onClick={() => navigate(m.path)}
                >
                  {t(m.btnKey)}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {extras.map((e, i) => (
            <div key={i} className="glass-card rounded-[32px] p-8 border border-white/5 hover:bg-gold/5 hover:border-gold/20 transition-all flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center mb-6 text-gold">
                <e.icon size={20} />
              </div>
              <h3 className="text-xl font-display font-bold mb-4 text-white">{t(e.titleKey)}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{t(e.descKey)}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-24 glass-card rounded-[40px] p-8 border border-gold/30 bg-gradient-to-r from-gold/5 to-transparent flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <Award size={40} className="text-gold flex-shrink-0" />
            <div>
              <p className="text-xl font-bold">{t("features.bottom.title")}</p>
              <p className="text-sm text-muted-foreground">{t("features.bottom.desc")}</p>
            </div>
          </div>
          <Button className="bg-gold text-black font-black px-12 h-14 rounded-2xl shadow-gold whitespace-nowrap" onClick={() => navigate('/auth')}>
            {t("features.cta")}
          </Button>
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
