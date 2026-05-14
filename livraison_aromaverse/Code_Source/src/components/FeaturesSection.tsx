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
      title: "Perfume Studio Lab",
      desc: "Création de parfums 3D et analyses ISO E.",
      btnText: "Ouvrir",
      path: "/studio",
      color: "from-purple-500/20 to-transparent",
      img: "https://picsum.photos/seed/studio/800/600"
    },
    {
      icon: ShoppingBag,
      title: "Marché Central B2B",
      desc: "Échanges professionnels et gros volumes.",
      btnText: "Explorer",
      path: "/marketplace",
      color: "from-gold/20 to-transparent",
      img: "https://picsum.photos/seed/market/800/600"
    },
    {
      icon: TrendingUp,
      title: "Investissement",
      desc: "Parcelles de terre agricole en Algérie (0 DA pour pass).",
      btnText: "Investir",
      path: "/investir",
      color: "from-green-500/20 to-transparent",
      img: "https://picsum.photos/seed/invest/800/600"
    },
    {
      icon: Globe2,
      title: "Boutique Officielle",
      desc: "Achetez les produits finis officiels d'NEXUS.",
      btnText: "Acheter",
      path: "/store",
      color: "from-blue-500/20 to-transparent",
      img: "https://picsum.photos/seed/boutique/800/600"
    },
    {
      icon: Beaker,
      title: "Acc. Industriels",
      desc: "Béchers, propipettes, agitateurs.",
      btnText: "Voir",
      path: "/accessoires-industriels",
      color: "from-slate-500/20 to-transparent",
      img: "https://picsum.photos/seed/science/800/600"
    },
    {
      icon: Users,
      title: "Acc. Artisanaux",
      desc: "Tubes en terre, mortiers, cuves traditionnelles.",
      btnText: "Voir",
      path: "/accessoires-artisanaux",
      color: "from-amber-600/20 to-transparent",
      img: "https://picsum.photos/seed/artisanat/800/600"
    },
    {
      icon: ShoppingBag,
      title: "Cosmétiques C2C",
      desc: "Vente et achat entre abonnés.",
      btnText: "Parcourir",
      path: "/cosmetiques",
      color: "from-rose-500/20 to-transparent",
      img: "https://picsum.photos/seed/cosmetics/800/600"
    },
    {
      icon: GraduationCap,
      title: "Aroma Academy",
      desc: "Formations certifiantes en parfumerie.",
      btnText: "Apprendre",
      path: "/academy",
      color: "from-indigo-500/20 to-transparent",
      img: "https://picsum.photos/seed/academy/800/600"
    },
    {
      icon: Award,
      title: "Nexus Blog",
      desc: "Dernières recherches, législation et IFRA.",
      btnText: "Lire",
      path: "/blog",
      color: "from-teal-500/20 to-transparent",
      img: "https://picsum.photos/seed/journal/800/600"
    }
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
            Plongez dans un écosystème globalisé couvrant toutes vos opérations.
          </p>
        </div>

        {/* Major Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {modules.map((m, i) => (
            <div
              key={i}
              className="group glass-card rounded-[48px] overflow-hidden border border-white/5 hover:border-gold/30 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full bg-black/40"
            >
              <div className="h-64 overflow-hidden relative">
                <img src={m.img} alt={m.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 bg-black" />
                <div className={`absolute inset-0 bg-gradient-to-t ${m.color} to-transparent`} />
                <div className="absolute top-6 left-6 w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white">
                  <m.icon size={24} />
                </div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-display font-bold mb-4 text-white group-hover:text-gold transition-colors">{m.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-10 flex-1">{m.desc}</p>
                
                <Button
                  className="w-full h-14 bg-white/5 hover:bg-gold hover:text-black font-black text-xs uppercase tracking-widest rounded-2xl border border-white/10 hover:border-gold transition-all"
                  onClick={() => navigate(m.path)}
                >
                  {m.btnText}
                </Button>
              </div>
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
