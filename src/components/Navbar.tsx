import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import CartSheet from "@/components/CartSheet";
import { Logo } from "@/components/Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { label: "Accueil", path: "/" },
  { label: "Marketplace", path: "/marketplace" },
  { label: "Boutique B2B", path: "/store" },
  { label: "Académie", path: "/academy" },
  { label: "Studio", path: "/studio" },
  { label: "Investir", path: "/investir" },
  { label: "Communauté", path: "/community" },
  { label: "Abonnements", path: "/pricing" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === item.path ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
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
                  Mon espace
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/admin")} className="cursor-pointer font-bold text-primary">
                  Administration
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                  <LogOut size={14} className="mr-2" />
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" onClick={() => navigate("/auth")}>
                Connexion
              </Button>
              <Button size="sm" className="bg-gradient-gold font-semibold" onClick={() => navigate("/auth")}>
                Commencer
              </Button>
            </div>
          )}
        </div>

        <div className="flex md:hidden items-center gap-3">
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
              {item.label}
            </Link>
          ))}
          {user ? (
            <div className="pt-2 border-t border-border mt-2">
              <button onClick={() => { navigate("/dashboard"); setOpen(false); }} className="block py-3 text-sm font-medium text-muted-foreground hover:text-primary">Mon espace</button>
              <button onClick={() => { handleSignOut(); setOpen(false); }} className="block py-3 text-sm font-medium text-destructive">Déconnexion</button>
            </div>
          ) : (
            <div className="flex gap-3 mt-3">
              <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => { navigate("/auth"); setOpen(false); }}>Connexion</Button>
              <Button size="sm" className="bg-gradient-gold font-semibold" onClick={() => { navigate("/auth"); setOpen(false); }}>Commencer</Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
