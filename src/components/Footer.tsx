import { Link } from "react-router-dom";
import { Globe, ShieldCheck, Mail, Phone, MapPin, Instagram, Twitter, Linkedin } from "lucide-react";
import { Logo } from "./Logo";

const Footer = () => {
  return (
    <footer className="border-t border-white/5 py-20 bg-black/20 font-body">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="inline-block scale-110 origin-left">
              <Logo />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Le premier écosystème décentralisé dédié à l'industrie mondiale du parfum. Sourcing, éducation et investissement durable.
            </p>
            <p className="text-xs text-gold font-arabic" dir="rtl">نظام بيئي عالمي متكامل لصناعة العطور الاحترافية</p>
            <div className="flex gap-4 pt-4">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-gold hover:text-black transition-all"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-gold hover:text-black transition-all"><Twitter size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-gold hover:text-black transition-all"><Linkedin size={18} /></a>
            </div>
          </div>

          {/* Ecosystem Column */}
          <div>
            <h4 className="font-display font-bold text-lg mb-8 text-white">Écosystème Nexus</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link to="/marketplace" className="hover:text-gold transition-all flex items-center gap-2">Marketplace Sourcing</Link></li>
              <li><Link to="/studio" className="hover:text-gold transition-all flex items-center gap-2">Nexus Lab Studio</Link></li>
              <li><Link to="/academy" className="hover:text-gold transition-all flex items-center gap-2">Academy & Certifications</Link></li>
              <li><Link to="/investir" className="hover:text-gold transition-all flex items-center gap-2">Portefeuille Invest</Link></li>
              <li><Link to="/community" className="hover:text-gold transition-all flex items-center gap-2">Communauté Hub</Link></li>
              <li><Link to="/store" className="hover:text-gold transition-all flex items-center gap-2">Moteur B2B Global</Link></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-display font-bold text-lg mb-8 text-white">Soutien & Info</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-center gap-3"><Mail size={14} className="text-gold" /> support@perfumenexus.com</li>
              <li className="flex items-center gap-3"><Phone size={14} className="text-gold" /> +33 7 67 09 91 15</li>
              <li className="flex items-center gap-3"><MapPin size={14} className="text-gold" /> 88 Avenue des Parfums, Grasse</li>
              <li className="pt-4"><Link to="/pricing" className="text-gold font-bold hover:underline">Voir les abonnements Pro</Link></li>
              <li><span className="flex items-center gap-2"><ShieldCheck size={14} className="text-green-500" /> Paiements Sécurisés</span></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-display font-bold text-lg mb-8 text-white">Juridique</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link to="/auth" className="hover:text-gold transition-all">S'inscrire (4 mois gratuits)</Link></li>
              <li><a href="#" className="hover:text-gold transition-all">CGU & Conditions</a></li>
              <li><a href="#" className="hover:text-gold transition-all">Politique de Confidentialité</a></li>
              <li><a href="#" className="hover:text-gold transition-all">Régulation B2B Export</a></li>
              <li className="pt-6">
                 <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/5">
                    <Globe size={14} className="text-gold" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">Nexus Global Network</span>
                 </div>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/5 mt-20 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.3em]">
            © 2026 PERFUME NEXUS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
             <span className="hover:text-gold cursor-pointer transition-colors">Cookies</span>
             <span className="hover:text-gold cursor-pointer transition-colors">Sitemap</span>
             <span className="hover:text-gold cursor-pointer transition-colors">Press Kit</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
