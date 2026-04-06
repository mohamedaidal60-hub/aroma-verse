import { Palette, ShoppingBag, TrendingUp, BookOpen, Users, Award, GraduationCap, Beaker, Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const modules = [
  {
    icon: Palette,
    title: "Nexus Lab Studio",
    ar: "مختبر نكسوس للإبداع",
    desc: "Concevez vos parfums virtuellement avec notre simulateur IA moléculaire. Analyse de stabilité et conformité IFRA en temps réel.",
    btn: "Créer une formule",
    path: "/studio",
    color: "from-purple-500/20 to-transparent",
    img: "https://images.unsplash.com/photo-1595151402017-40c291109a20?auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: ShoppingBag,
    title: "Global Marketplace",
    ar: "سوق العطور العالمي",
    desc: "Matières premières rares, packaging de luxe et logistique intégrée. Accès direct aux plus grands fournisseurs mondiaux.",
    btn: "Explorer les stocks",
    path: "/marketplace",
    color: "from-gold/20 to-transparent",
    img: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: TrendingUp,
    title: "Impact Invest",
    ar: "استثمارات نكسوس",
    desc: "Investissez dans la production agricole durable (Oud, Rose, Jasmin) et suivez vos rendements sur votre dashboard.",
    btn: "Investir dès 100€",
    path: "/investir",
    color: "from-green-500/20 to-transparent",
    img: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=800&q=80"
  },
];

const extras = [
  { 
    icon: GraduationCap, 
    title: "Nexus Academy", 
    ar: "أكاديمية نكسوس",
    desc: "Formation certifiante en 3 niveaux : du socle commun à l'expertise master. 4 mois gratuits inclus." 
  },
  { 
    icon: Globe2, 
    title: "Store B2B", 
    ar: "المتجر الاحترافي B2B",
    desc: "Moteur de recherche exclusif interrogeant 6 annuaires mondiaux pour vos besoins en gros volume." 
  },
  { 
    icon: Users, 
    title: "Communauté & Votes", 
    ar: "المجتمع والتصويت",
    desc: "Participez aux classements trimestriels et votez pour les meilleurs créateurs du réseau." 
  },
];

const FeaturesSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-32 relative font-body overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container mx-auto px-4 max-w-7xl">
        
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 mb-6">
            <Beaker size={14} className="text-gold" />
            <span className="text-[10px] font-bold text-gold uppercase tracking-[0.2em]">Full Value Chain</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black mb-6">
            L'écosystème <span className="text-gold">Interconnecté</span>
          </h2>
          <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-4">نظام بيئي متكامل لصناعة العطور</p>
          <p className="text-xl text-muted-foreground font-arabic leading-relaxed">
            Six modules synchronisés pour couvrir chaque étape, de la culture de la matière première à la certification finale.
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
                <img src={m.img} alt={m.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60" />
                <div className={`absolute inset-0 bg-gradient-to-t ${m.color} to-transparent`} />
                <div className="absolute top-6 left-6 w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white">
                  <m.icon size={24} />
                </div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-display font-bold mb-1 text-white group-hover:text-gold transition-colors">{m.title}</h3>
                <p className="text-[10px] text-muted-foreground font-arabic mb-4">{m.ar}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-10">{m.desc}</p>
                
                <div className="mt-auto">
                   <Button 
                    className="w-full h-14 bg-white/5 hover:bg-gold hover:text-black font-black text-xs uppercase tracking-widest rounded-2xl border border-white/10 hover:border-gold transition-all"
                    onClick={() => navigate(m.path)}
                   >
                     {m.btn}
                   </Button>
                </div>
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
              <h3 className="text-xl font-display font-bold mb-1 text-white leading-none">{e.title}</h3>
              <p className="text-[10px] text-muted-foreground font-arabic mb-4 tracking-widest">{e.ar}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{e.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-24 glass-card rounded-[40px] p-8 border border-gold/30 bg-gradient-to-r from-gold/5 to-transparent flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-6">
              <Award size={40} className="text-gold" />
              <div>
                 <p className="text-xl font-bold">Zéro Limite. Zéro Commission.</p>
                 <p className="text-sm text-muted-foreground">Profitez de l'écosystème complet gratuitement pendant 120 jours.</p>
              </div>
           </div>
           <Button className="bg-gold text-black font-black px-12 h-14 rounded-2xl shadow-gold" onClick={() => navigate('/auth')}>
              ACTIVER MON NEXUS PASS
           </Button>
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
