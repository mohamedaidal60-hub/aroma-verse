import { Link } from "react-router-dom";
import { Globe, ShieldCheck, Phone, Instagram, Twitter, Linkedin, MessageSquare } from "lucide-react";
import { Logo } from "./Logo";
import { useLang } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t, dir } = useLang();

  return (
    <footer className="border-t border-emerald-900/10 py-24 bg-emerald-900/5 font-body relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
          
          {/* Brand Column */}
          <div className="space-y-8">
            <Link to="/" className="inline-block hover:opacity-80 transition-opacity">
              <Logo />
            </Link>
            <p className={`text-sm text-muted-foreground leading-relaxed max-w-xs ${dir === "rtl" ? "font-arabic" : ""}`}>
              {t("footer.tagline")}
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-gold hover:text-black transition-all border border-white/5"><Instagram size={20} /></a>
              <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-gold hover:text-black transition-all border border-white/5"><Twitter size={20} /></a>
              <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-gold hover:text-black transition-all border border-white/5"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Ecosystem Column */}
          <div>
            <h4 className="font-display font-black text-xl mb-10 text-foreground uppercase tracking-tighter">{t("nav.home")}</h4>
            <ul className="space-y-5 text-sm font-bold text-muted-foreground">
              <li><Link to="/marketplace" className="hover:text-gold transition-all flex items-center gap-2">{t("nav.marketplace")}</Link></li>
              <li><Link to="/studio" className="hover:text-gold transition-all flex items-center gap-2">{t("nav.studio")}</Link></li>
              <li><Link to="/academy" className="hover:text-gold transition-all flex items-center gap-2">{t("nav.academy")}</Link></li>
              <li><Link to="/investir" className="hover:text-gold transition-all flex items-center gap-2">{t("nav.invest")}</Link></li>
              <li><Link to="/community" className="hover:text-gold transition-all flex items-center gap-2">{t("nav.community")}</Link></li>
            </ul>
          </div>

          {/* Support Column - WhatsApp Only */}
          <div>
            <h4 className="font-display font-black text-xl mb-10 text-foreground uppercase tracking-tighter">{t("footer.support_nexus")}</h4>
            <div className="glass-card p-6 rounded-3xl border border-green-500/20 bg-green-500/5 hover:bg-green-500/10 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-black shadow-lg">
                  <Phone size={20} />
                </div>
                <div>
                   <p className="text-xs font-black text-green-500 uppercase tracking-widest">{t("footer.whatsapp_support")}</p>
                   <p className="text-lg font-black text-foreground">+213 6 75 33 22 11</p>
                </div>
              </div>
              <a 
                href="https://wa.me/213675332211" 
                target="_blank" 
                className="inline-flex items-center gap-2 text-xs font-black text-gold hover:underline uppercase tracking-widest"
              >
                Ouvrir Chat de Support <MessageSquare size={14} />
              </a>
            </div>
          </div>

          {/* Global Column */}
          <div>
            <h4 className="font-display font-black text-xl mb-10 text-foreground uppercase tracking-tighter">Global</h4>
            <ul className="space-y-5 text-sm font-bold text-muted-foreground">
              <li><Link to="/pricing" className="text-gold font-black hover:scale-105 inline-block transition-transform">{t("nav.pricing")}</Link></li>
              <li><span className="flex items-center gap-3 text-green-500/80"><ShieldCheck size={18} /> Protocoles Certifiés</span></li>
              <li className="pt-6">
                 <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-2xl border border-white/5">
                    <Globe size={18} className="text-gold" />
                    <span className="text-[10px] font-black text-foreground uppercase tracking-widest leading-none">Nexus Global Network v3.0</span>
                 </div>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/5 mt-24 pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.4em]">
            {t("footer.copyright")}
          </p>
          <div className="flex gap-10 text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest">
             <span className="hover:text-gold cursor-pointer transition-colors">Confidentialité</span>
             <span className="hover:text-gold cursor-pointer transition-colors">Termes</span>
             <span className="hover:text-gold cursor-pointer transition-colors">Presse</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
