import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, Shield, Star, Gift, Globe, Zap, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { sql } from "@/lib/neon";

const PLANS = [
  {
    id: "free",
    name: "Découverte",
    nameAr: "الاكتشاف",
    price: 0,
    period: "Gratuit pour toujours",
    color: "border-white/10",
    icon: <Globe size={24} />,
    features: [
      "Accès Studio limité (1 formule)",
      "Aperçu de l'Academy (3 cours)",
      "Consultation Marketplace",
      "Communauté en lecture seule",
    ],
    cta: "Plan Actuel",
    ctaVariant: "outline" as const,
  },
  {
    id: "trial",
    name: "Essai Pro",
    nameAr: "تجربة 4 أشهر",
    price: 0,
    period: "4 mois offerts à l'inscription",
    color: "border-gold/40",
    badge: "🎁 OFFERT",
    icon: <Gift size={24} />,
    features: [
      "Toutes les fonctionnalités Pro",
      "Lab PubChem illimité",
      "Marketplace B2B + 0% commission",
      "Communauté + vote mensuel",
      "Investissements & Portfolio",
    ],
    cta: "Commencer l'essai gratuit",
    ctaVariant: "default" as const,
    highlight: true,
  },
  {
    id: "pro",
    name: "Nexus Pro",
    nameAr: "الاشتراك السنوي",
    basePrice: { Africa: 10, Asia: 20, Europe: 30 },
    period: "/ an",
    color: "border-gold/20",
    icon: <Star size={24} />,
    features: [
      "Studio + Analyse IA illimitée",
      "Accès Moteur B2B Global (6 annuaires)",
      "Academy complète + certifications",
      "Investissements + Marché secondaire",
      "Badge Profil Or + support prioritaire",
      "API Nexus sécurisée",
    ],
    cta: "S'abonner",
    ctaVariant: "default" as const,
  },
];

export default function Pricing() {
  const { user } = useAuth();
  const [continent, setContinent] = useState("Europe");
  const [proPrice, setProPrice] = useState(30);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => {
        const cont = data.continent_name || "Europe";
        setContinent(cont);
        if (["Africa", "Afrique"].includes(cont)) setProPrice(10);
        else if (["Asia", "Asie", "South America", "Amérique du Sud"].includes(cont)) setProPrice(20);
        else setProPrice(30);
      })
      .catch(() => { setContinent("Europe"); setProPrice(30); });
  }, []);

  const handleSubscribe = async () => {
    if (!user) { toast.error("Connectez-vous d'abord !"); return; }
    try {
      await sql`INSERT INTO subscriptions (email, continent, status) VALUES (${user.email}, ${continent}, 'En attente')`;
      toast.success("Demande envoyée à l'administrateur !");
    } catch (e: any) {
      toast.error("Erreur : " + e.message);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-body">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Hero */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 mb-6">
              <Zap size={14} className="text-gold" fill="currentColor" />
              <span className="text-[10px] font-bold text-gold uppercase tracking-widest">Tarification Equitable</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              Plans & <span className="text-gold">Abonnements</span>
            </h1>
            <p className="text-xl text-muted-foreground font-arabic mb-4">اشتراكات مرنة تتكيف مع منطقتك الجغرافية</p>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-muted-foreground">
              <Globe size={14} className="text-gold" />
              Votre région : <span className="text-white font-bold ml-1">{continent}</span>
              <span className="text-gold ml-2">→ Tarif Pro : {proPrice}€/an</span>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Free */}
            <div className="glass-card p-8 rounded-[40px] border border-white/5 flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-muted-foreground mb-6">
                <Globe size={24} />
              </div>
              <h2 className="text-2xl font-display font-bold mb-1">Découverte</h2>
              <p className="text-[10px] text-muted-foreground font-arabic mb-6">الاكتشاف</p>
              <div className="text-5xl font-black text-white mb-1">0€</div>
              <div className="text-xs text-muted-foreground mb-10 uppercase tracking-widest">Gratuit pour toujours</div>
              <ul className="space-y-4 mb-10 flex-1">
                {["Accès Studio (1 formule)", "3 cours Academy", "Consultation Marketplace", "Communauté en lecture"].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Check size={16} className="text-white/30 flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full h-12 rounded-2xl border-white/10 text-muted-foreground">Plan actuel</Button>
            </div>

            {/* Trial - HIGHLIGHTED */}
            <div className="glass-card p-8 rounded-[40px] border-2 border-gold/50 bg-gradient-to-br from-gold/10 to-transparent flex flex-col relative shadow-2xl shadow-gold/10 -translate-y-4">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-black text-[10px] font-black uppercase tracking-widest px-6 py-1.5 rounded-full shadow-gold whitespace-nowrap">
                🎁 4 Mois OFFERTS
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gold/20 flex items-center justify-center text-gold mb-6 border border-gold/30">
                <Gift size={24} />
              </div>
              <h2 className="text-2xl font-display font-bold mb-1 text-white">Essai Pro</h2>
              <p className="text-[10px] text-gold font-arabic mb-6">تجربة 4 أشهر مجانية</p>
              <div className="text-5xl font-black text-gold mb-1">0€</div>
              <div className="text-xs text-muted-foreground mb-10 uppercase tracking-widest">Pour 4 mois, puis {proPrice}€/an</div>
              <ul className="space-y-4 mb-10 flex-1">
                {[
                  "Toutes les fonctions Pro",
                  "Lab PubChem illimité",
                  "Marketplace 0% commission",
                  "Votes mensuels communauté",
                  "Investissements & Portfolio",
                ].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm font-medium text-white">
                    <Check size={16} className="text-gold flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full h-14 bg-gold hover:bg-gold/80 text-black font-black text-sm rounded-2xl shadow-gold transition-transform active:scale-95"
                onClick={() => !user ? window.location.href = '/auth' : toast.success("Essai activé !")}
              >
                Commencer l'essai gratuit
              </Button>
            </div>

            {/* Pro Annual */}
            <div className="glass-card p-8 rounded-[40px] border border-white/10 flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold mb-6 border border-gold/20">
                <Star size={24} />
              </div>
              <h2 className="text-2xl font-display font-bold mb-1">Nexus Pro</h2>
              <p className="text-[10px] text-muted-foreground font-arabic mb-6">الاشتراك السنوي المهني</p>
              <div className="text-5xl font-black text-white mb-1">{proPrice}€</div>
              <div className="text-xs text-muted-foreground mb-10 uppercase tracking-widest">/ an · Adapté à {continent}</div>
              <ul className="space-y-4 mb-10 flex-1">
                {[
                  "Studio IA illimité",
                  "Moteur B2B (6 annuaires)",
                  "Academy + Certifications",
                  "Investissements & Marché secondaire",
                  "Badge Profil Or",
                  "API Nexus sécurisée",
                ].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm font-medium">
                    <Shield size={16} className="text-gold flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full h-12 bg-white/10 hover:bg-gold hover:text-black font-bold rounded-2xl border border-white/10 hover:border-gold transition-all"
                onClick={handleSubscribe}
              >
                S'abonner à Nexus Pro
              </Button>
            </div>
          </div>

          {/* Trust Bar */}
          <div className="mt-20 glass-card rounded-[40px] p-10 border border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { label: "Membres actifs", value: "12,800+", icon: <Users size={28} className="text-gold" />, sub: "عضو نشط" },
                { label: "Tarification équitable", value: "3 zones", icon: <Globe size={28} className="text-gold" />, sub: "منطقة تسعير عادلة" },
                { label: "Annulation gratuite", value: "30 jours", icon: <Shield size={28} className="text-gold" />, sub: "إلغاء مجاني" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  {item.icon}
                  <span className="text-3xl font-black text-white">{item.value}</span>
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-[10px] text-gold/60 font-arabic">{item.sub}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
