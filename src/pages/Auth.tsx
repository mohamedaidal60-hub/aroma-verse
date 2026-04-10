import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import { toast } from "sonner";
import { Gift, Star, ArrowRight, Eye, EyeOff, Shield } from "lucide-react";
import { api } from "@/lib/api";
import { useLang } from "@/contexts/LanguageContext";

const Auth = () => {
  const { t, lang } = useLang();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) {
        toast.error(error.message || "Email ou mot de passe incorrect");
      } else {
        toast.success("Bienvenue sur Perfume Nexus !");
        window.location.href = "/";
      }
    } else {
      // Use api.auth.register which sets 4-month trial
      const result = await api.auth.register(email, password, fullName);
      if (!result.success) {
        toast.error(result.error || "Erreur lors de l'inscription");
      } else {
        // Also create Supabase auth account
        const { error } = await signUp(email, password, fullName);
        if (error && !error.message?.includes("already registered")) {
          toast.error(error.message);
        } else {
          toast.success("Bienvenue ! Votre essai de 4 mois commence maintenant 🎉");
          window.location.href = "/";
        }
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background font-body overflow-hidden">
      <Navbar />

      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="pt-24 pb-16 flex items-center justify-center min-h-[90vh] px-4 relative z-10">
        <div className="w-full max-w-lg">

          {/* 4-Month FREE Banner (register mode) */}
          {!isLogin && (
            <div className="glass-card rounded-[32px] p-6 border border-gold/40 mb-8 bg-gradient-to-br from-gold/15 to-transparent animate-in slide-in-from-top-4 duration-500">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Gift size={24} className="text-black" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl text-white mb-1">
                    🎁 {t("auth.trial")}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Accès complet à toutes les fonctionnalités Nexus Pro : Lab moléculaire, Marketplace B2B, Investissements, et la communauté mondiale.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {["PubChem Lab", "Marketplace B2B", "Investissement", "Communauté"].map(feature => (
                      <span key={feature} className="text-[10px] bg-gold/10 text-gold px-3 py-1 rounded-full border border-gold/20 font-bold">{feature}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Card */}
          <div className="glass-card rounded-[40px] p-10 border border-white/10 shadow-elevated relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/3 blur-[80px] pointer-events-none"></div>

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-10">
                <div className="flex items-center justify-center mx-auto mb-6 h-20">
                  <Logo className="scale-125" showText={false} />
                </div>
                <h1 className="text-3xl font-display font-bold text-white mb-2">
                  {isLogin ? t("auth.submit.login") : t("auth.submit.register")}
                </h1>
                <p className="text-muted-foreground text-sm">
                  {isLogin ? "Accédez à votre espace professionnel" : t("auth.trial")}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {!isLogin && (
                  <div className="space-y-1.5">
                    <label className="text-xs text-muted-foreground uppercase font-bold tracking-widest ml-1">Nom complet</label>
                    <Input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="bg-black/40 border-white/10 h-14 rounded-2xl text-white placeholder:text-muted-foreground/50 focus-visible:ring-gold/50 focus-visible:border-gold/50"
                      placeholder="Votre nom et prénom"
                      required={!isLogin}
                    />
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground uppercase font-bold tracking-widest ml-1">Email</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-black/40 border-white/10 h-14 rounded-2xl text-white placeholder:text-muted-foreground/50 focus-visible:ring-gold/50 focus-visible:border-gold/50"
                    placeholder="vous@email.com"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground uppercase font-bold tracking-widest ml-1">Mot de passe</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-black/40 border-white/10 h-14 rounded-2xl text-white placeholder:text-muted-foreground/50 focus-visible:ring-gold/50 focus-visible:border-gold/50 pr-14"
                      placeholder="••••••••"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-gold transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 bg-gold hover:bg-gold/80 text-black font-black text-sm rounded-2xl shadow-gold transition-all duration-300 active:scale-[0.98] mt-2 flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="animate-pulse">Chargement...</span>
                  ) : (
                    <>
                      {isLogin ? t("auth.submit.login") : t("auth.submit.register")}
                      <ArrowRight size={18} />
                    </>
                  )}
                </Button>
              </form>

              {/* Ratings / Trust */}
              {!isLogin && (
                <div className="flex items-center justify-center gap-1.5 mt-6">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-gold fill-gold" />)}
                  <span className="text-xs text-muted-foreground ml-2">+12,000 experts de confiance</span>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-white/5 text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-muted-foreground hover:text-gold transition-colors font-medium"
                >
                  {isLogin ? "Pas de compte ? " : "Déjà membre ? "}
                  <span className="text-gold font-bold underline underline-offset-2">
                    {isLogin ? "Créer un compte gratuit" : "Connexion"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <p className="text-center text-[11px] text-muted-foreground mt-6">
            En vous inscrivant, vous acceptez nos{" "}
            <span className="text-gold cursor-pointer hover:underline">Conditions d'utilisation</span> et notre{" "}
            <span className="text-gold cursor-pointer hover:underline">Politique de confidentialité</span>.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Auth;
