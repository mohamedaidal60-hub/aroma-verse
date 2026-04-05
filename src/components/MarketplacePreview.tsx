import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  { name: "Rose de Damas", category: "Huile essentielle", price: "89,00 €", rating: 4.9, origin: "Maroc" },
  { name: "Oud Royal", category: "Matière première", price: "245,00 €", rating: 5.0, origin: "Inde" },
  { name: "Essence Néroli", category: "Huile essentielle", price: "125,00 €", rating: 4.8, origin: "Tunisie" },
  { name: "Kit Distillation Pro", category: "Machine", price: "1 890,00 €", rating: 4.7, origin: "France" },
];

const MarketplacePreview = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl font-display font-bold mb-2">
              Produits <span className="text-gradient-gold">populaires</span>
            </h2>
            <p className="text-muted-foreground">Découvrez notre sélection de produits premium.</p>
          </div>
          <Button variant="ghost" className="hidden md:flex text-primary hover:text-primary/80">
            Voir tout <ArrowRight size={16} className="ml-1" />
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div key={p.name} className="bg-gradient-card rounded-xl border border-border p-5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
              <div className="h-40 rounded-lg bg-muted mb-4 flex items-center justify-center overflow-hidden">
                <div className="w-16 h-20 rounded-md bg-primary/10 animate-float" />
              </div>
              <span className="text-xs text-primary font-medium">{p.category}</span>
              <h3 className="font-display font-semibold mt-1 mb-1">{p.name}</h3>
              <p className="text-xs text-muted-foreground mb-3">Origine : {p.origin}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-foreground">{p.price}</span>
                <div className="flex items-center gap-1 text-primary">
                  <Star size={12} fill="currentColor" />
                  <span className="text-xs font-medium">{p.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketplacePreview;
