import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-card border border-border p-12 md:p-20 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Rejoignez l'univers <span className="text-gradient-gold">AromaVerse</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              Que vous soyez parfumeur, fournisseur, agriculteur ou investisseur — votre place est ici.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-gradient-gold font-semibold shadow-gold text-base px-8">
                Créer un compte gratuit
                <ArrowRight className="ml-2" size={18} />
              </Button>
              <Button size="lg" variant="outline" className="border-primary/30 text-foreground hover:bg-primary/10 text-base">
                En savoir plus
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
