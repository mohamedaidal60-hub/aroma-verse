import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-perfume.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Luxury perfume collection" width={1920} height={1080} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-16">
        <div className="max-w-2xl animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
            <Sparkles size={14} className="text-primary" />
            <span className="text-xs font-medium text-primary">L'écosystème complet du parfum</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
            Créez, vendez,{" "}
            <span className="text-gradient-gold">investissez</span>{" "}
            dans le parfum
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
            AromaVerse réunit parfumeurs, fournisseurs, agriculteurs et investisseurs dans un écosystème digital unique dédié à l'univers olfactif.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-gradient-gold font-semibold shadow-gold text-base px-8" onClick={() => window.location.href = "/marketplace"}>
              Explorer la marketplace
              <ArrowRight className="ml-2" size={18} />
            </Button>
            <Button size="lg" variant="outline" className="border-primary/30 text-foreground hover:bg-primary/10 text-base" onClick={() => window.location.href = "/studio"}>
              Créer un parfum
            </Button>
          </div>

          <div className="flex items-center gap-8 mt-12 text-sm text-muted-foreground">
            <div>
              <span className="block text-2xl font-display font-bold text-foreground">500+</span>
              Ingrédients
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <span className="block text-2xl font-display font-bold text-foreground">2K+</span>
              Créateurs
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <span className="block text-2xl font-display font-bold text-foreground">50+</span>
              Fournisseurs
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
