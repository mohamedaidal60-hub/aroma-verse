import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLang } from "@/contexts/LanguageContext";
import CartSheet from "@/components/CartSheet";
import { Logo } from "@/components/Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const { t, lang, setLang, dir } = useLang();

  const navItems = [
    { labelKey: "nav.marketplace", path: "/marketplace" },
    { labelKey: "nav.store", path: "/store" },
    { labelKey: "nav.academy", path: "/academy" },
    { labelKey: "nav.studio", path: "/studio" },
    { labelKey: "nav.invest", path: "/investir" },
    { labelKey: "nav.community", path: "/community" },
    { labelKey: "nav.pricing", path: "/pricing" },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card" dir="ltr">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === item.path ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {/* Language Toggle */}
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
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-2">
                  <User size={16} />
                  <span className="max-w-[120px] truncate">{profile?.full_name || user.email}</span>
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
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" onClick={() => navigate("/auth")}>
                {t("nav.login")}
              </Button>
              <Button size="sm" className="bg-gradient-gold font-semibold" onClick={() => navigate("/auth")}>
                Nexus Pass
              </Button>
            </div>
          )}
        </div>

        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setLang(lang === "fr" ? "ar" : "fr")}
            className="text-xs font-black text-gold border border-gold/30 px-2 py-1 rounded-full"
          >
            {lang === "fr" ? "ع" : "Fr"}
          </button>
          <CartSheet />
          <button className="text-foreground" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-card border-t border-border px-4 pb-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {t(item.labelKey)}
            </Link>
          ))}
          {user ? (
            <div className="pt-2 border-t border-border mt-2">
              <button onClick={() => { navigate("/dashboard"); setOpen(false); }} className="block py-3 text-sm font-medium text-muted-foreground hover:text-primary">
                {t("nav.dashboard")}
              </button>
              <button onClick={() => { handleSignOut(); setOpen(false); }} className="block py-3 text-sm font-medium text-destructive">
                {t("nav.logout")}
              </button>
            </div>
          ) : (
            <div className="flex gap-3 mt-3">
              <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => { navigate("/auth"); setOpen(false); }}>
                {t("nav.login")}
              </Button>
              <Button size="sm" className="bg-gradient-gold font-semibold" onClick={() => { navigate("/auth"); setOpen(false); }}>
                Nexus Pass
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
