import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display text-xl font-bold text-gradient-gold mb-3">AromaVerse</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              L'écosystème digital du parfum. Création, commerce, investissement.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3 text-foreground">Plateforme</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/marketplace" className="hover:text-primary transition-colors">Marketplace</Link></li>
              <li><Link to="/studio" className="hover:text-primary transition-colors">Studio</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/investir" className="hover:text-primary transition-colors">Investir</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3 text-foreground">Ressources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span className="hover:text-primary transition-colors cursor-pointer">Documentation</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">API</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">Partenaires</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3 text-foreground">Légal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span className="hover:text-primary transition-colors cursor-pointer">CGU</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">CGV</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">Confidentialité</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-center text-xs text-muted-foreground">
          © 2026 AromaVerse. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
