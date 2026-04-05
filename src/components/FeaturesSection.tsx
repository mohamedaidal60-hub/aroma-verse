import { Palette, ShoppingBag, TrendingUp, BookOpen, Users, Award } from "lucide-react";
import studioImg from "@/assets/studio-preview.jpg";
import marketplaceImg from "@/assets/marketplace-preview.jpg";
import investImg from "@/assets/investment-field.jpg";

const modules = [
  {
    icon: Palette,
    title: "Studio de Création",
    desc: "Concevez vos parfums virtuellement avec notre outil de mixage IA. Notes de tête, cœur et fond — simulez votre fragrance idéale.",
    image: studioImg,
  },
  {
    icon: ShoppingBag,
    title: "Marketplace",
    desc: "Parfums, huiles essentielles, matières premières, packaging et machines de distillation. Tout en un seul endroit.",
    image: marketplaceImg,
  },
  {
    icon: TrendingUp,
    title: "Investissement Agricole",
    desc: "Investissez dans des projets agricoles liés aux matières premières du parfum. Suivi transparent du ROI.",
    image: investImg,
  },
];

const extras = [
  { icon: BookOpen, title: "Blog & Recherche", desc: "Articles éducatifs, analyses scientifiques et archive mondiale des odeurs." },
  { icon: Users, title: "Communauté", desc: "Challenges mensuels, votes, classements et partage des profits entre créateurs." },
  { icon: Award, title: "Certifications", desc: "Traçabilité complète, certificats qualité et QR codes sur chaque produit." },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Un écosystème <span className="text-gradient-gold">complet</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Cinq modules interconnectés pour couvrir toute la chaîne de valeur du parfum.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {modules.map((m) => (
            <div key={m.title} className="group bg-gradient-card rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 shadow-elevated">
              <div className="h-48 overflow-hidden">
                <img src={m.image} alt={m.title} loading="lazy" width={800} height={600} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <m.icon size={20} className="text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">{m.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {extras.map((e) => (
            <div key={e.title} className="glass-card rounded-xl p-6 hover:border-primary/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <e.icon size={20} className="text-primary" />
              </div>
              <h3 className="text-lg font-display font-semibold mb-2">{e.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
