import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLang } from "@/contexts/LanguageContext";
import CartSheet from "@/components/CartSheet";
import Logo from "@/components/Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const { t, lang, setLang, dir } = useLang();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { labelKey: "nav.marketplace", path: "/marketplace" },
    { labelKey: "nav.store", path: "/store" },
    { labelKey: "nav.academy", path: "/academy" },
    { labelKey: "nav.studio", path: "/studio" },
    { labelKey: "nav.database", path: "/database" },
    { labelKey: "nav.invest", path: "/investir" },
    { labelKey: "nav.community", path: "/community" },
    { labelKey: "Cosmétiques (C2C)", path: "/cosmetiques" },
    { labelKey: "Acc. Industriels", path: "/accessoires-industriels" },
    { labelKey: "Acc. Artisanaux", path: "/accessoires-artisanaux" },
    { labelKey: "Blog", path: "/blog" },
    { labelKey: "nav.pricing", path: "/pricing" },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(6, 33, 18, 0.75)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(184,142,45,0.12)" : "none",
      }}
      dir="ltr"
    >
      <div className="container mx-auto flex items-center justify-between h-20 md:h-24 px-4">
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>

        <div className="flex items-center gap-3 md:gap-5">
          {/* Desktop Only Buttons (Language, Profile, Carts) */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "fr" ? "ar" : "fr")}
              className="flex items-center gap-1.5 text-xs font-black text-gold border border-gold/30 px-3 py-1.5 rounded-full hover:bg-gold hover:text-black transition-all"
              title="Changer la langue"
            >
              <Globe size={12} />
              {lang === "fr" ? "عربي" : "Français"}
            </button>

            <CartSheet />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-foreground hover:text-primary gap-2 px-3 rounded-full border border-gold/20 bg-gold/5">
                    <User size={16} className="text-gold" />
                    <span className="max-w-[100px] truncate font-bold text-[10px] uppercase tracking-widest">{profile?.full_name || user.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card border-border">
                  <DropdownMenuItem onClick={() => navigate("/dashboard")} className="cursor-pointer">
                    {t("nav.dashboard")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/admin")} className="cursor-pointer font-bold text-primary">
                    {t("nav.admin")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                    <LogOut size={14} className="mr-2" />
                    {t("nav.logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-foreground hover:text-primary px-4 border border-gold/10 rounded-full" onClick={() => navigate("/auth")}>
                   {t("nav.login")}
                </Button>
                <Button size="sm" className="bg-gradient-gold font-bold text-xs uppercase tracking-widest px-6 rounded-full shadow-gold" onClick={() => navigate("/auth")}>
                  Aroma Pass
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Only Cart / Lang */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => setLang(lang === "fr" ? "ar" : "fr")}
              className="text-xs font-black text-gold border border-gold/30 px-2 py-1 rounded-full"
            >
              {lang === "fr" ? "ع" : "Fr"}
            </button>
            <CartSheet />
          </div>

          {/* Menu Hamburger (ALL SCREENS) */}
          <button className="text-gold hover:text-primary transition-colors p-2" onClick={() => setOpen(!open)}>
            {open ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Global Dropdown Navigation */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-white/5 border-b shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-40 max-h-[80vh] overflow-y-auto">
           <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className="group flex flex-col p-4 rounded-3xl hover:bg-white/5 transition-all border border-transparent hover:border-gold/20"
                >
                  <span className={`text-xl font-display font-black tracking-widest transition-colors mb-1 ${location.pathname === item.path ? 'text-gold' : 'text-foreground group-hover:text-gold'}`}>
                     {t(item.labelKey)}
                  </span>
                  <span className="text-[10px] uppercase text-muted-foreground font-bold tracking-widest">
                     Accéder au module
                  </span>
                </Link>
              ))}

              {/* Mobile links inside drawer if not logged in */}
              <div className="lg:hidden col-span-1 border-t border-white/5 pt-6 mt-4 flex flex-col gap-4">
               {user ? (
                 <>
                   <button onClick={() => { navigate("/dashboard"); setOpen(false); }} className="text-left font-black tracking-widest text-lg hover:text-gold">
                     {t("nav.dashboard")}
                   </button>
                   <button onClick={() => { navigate("/admin"); setOpen(false); }} className="text-left font-black tracking-widest text-lg text-primary hover:text-gold">
                     {t("nav.admin")}
                   </button>
                   <button onClick={() => { handleSignOut(); setOpen(false); }} className="text-left font-black tracking-widest text-lg text-destructive">
                     {t("nav.logout")}
                   </button>
                 </>
               ) : (
                 <>
                  <Button variant="outline" className="w-full justify-start h-14 border-white/10" onClick={() => { navigate("/auth"); setOpen(false); }}>
                    {t("nav.login")}
                  </Button>
                  <Button className="w-full justify-start h-14 bg-gradient-gold" onClick={() => { navigate("/auth"); setOpen(false); }}>
                    Nexus Pass
                  </Button>
                 </>
               )}
              </div>
           </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
