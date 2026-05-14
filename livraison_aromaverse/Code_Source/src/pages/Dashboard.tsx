import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Package, TrendingUp, Palette, ShoppingBag, BrainCircuit, 
  ChevronRight, Calendar, User, ShieldCheck, Globe, Star, Clock, ArrowRight 
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Navigate, useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { useLang } from "@/contexts/LanguageContext";

const Dashboard = () => {
  const { user, profile, loading } = useAuth();
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>({ order_count: 0, formula_count: 0, course_count: 0, total_invested: 0 });
  const [orders, setOrders] = useState<any[]>([]);
  const [formulas, setFormulas] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (user) {
      async function loadDashboard() {
        try {
          const [s, o, f] = await Promise.all([
            api.user.getDashboardStats(user.id),
            api.user.getOrders(user.id),
            api.user.getFormulas(user.id)
          ]);
          setStats(s);
          setOrders(o);
          setFormulas(f);
        } catch (err) {
          console.error(err);
        } finally {
          setFetching(false);
        }
      }
      loadDashboard();
    }
  }, [user]);

  if (loading) return null;
  if (!user) return <Navigate to="/auth" />;

  return (
    <div className="min-h-screen bg-background font-body overflow-x-hidden">
      <Navbar />
      
      {/* Dashboard Top & Welcome */}
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 mb-4">
                <Star size={14} className="text-gold" fill="currentColor" />
                <span className="text-[10px] font-bold text-gold uppercase tracking-widest leading-none">Nexus Member Portal</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold">
                {t("dashboard.welcome")}, <span className="text-gold text-gradient-gold">{profile?.full_name || user.email?.split('@')[0]}</span>
              </h1>
              <p className="text-xl text-muted-foreground mt-2">{t("dashboard.activity")}</p>
            </div>
            
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/5">
                <div className="w-12 h-12 bg-gold text-black rounded-2xl flex items-center justify-center">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">{t("dashboard.plan")}</p>
                  <p className="text-white font-black">{(profile as any)?.current_plan === 'pro' ? t("dashboard.plan.pro") : t("dashboard.plan.trial")}</p>
                </div>
                <Button variant="ghost" className="h-10 px-4 rounded-xl text-gold hover:bg-gold/10 ml-4 font-bold" onClick={() => navigate('/pricing')}>
                  {t("nav.pricing")}
                </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
             {[
               { icon: ShoppingBag, label: t("dashboard.orders"), value: stats.order_count, sub: "Suivi marketplace", color: "bg-blue-500/10 text-blue-500" },
               { icon: TrendingUp, label: t("dashboard.invested"), value: `${stats.total_invested}€`, sub: "Valeur actuelle", color: "bg-green-500/10 text-green-500" },
               { icon: Palette, label: t("dashboard.formulas"), value: stats.formula_count, sub: "Créations sauvegardées", color: "bg-gold/10 text-gold" },
               { icon: BrainCircuit, label: t("dashboard.courses"), value: stats.course_count, sub: "Cours en cours", color: "bg-purple-500/10 text-purple-500" },
             ].map((stat, i) => (
                <div key={i} className="glass-card p-6 rounded-[32px] border border-white/5 relative group hover:border-gold/30 transition-all">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${stat.color} transition-transform group-hover:scale-110`}>
                    <stat.icon size={22} />
                  </div>
                  <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground font-bold uppercase tracking-tight">{stat.label}</div>
                  <span className="text-[10px] text-muted-foreground/60">{stat.sub}</span>
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight size={16} />
                  </div>
               </div>
             ))}
          </div>

          {/* Gamification Banner */}
          <div className="glass-card mb-16 p-6 rounded-[32px] border border-green-500/30 bg-green-500/5 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-green-500/10 transition-colors">
            <div className="flex items-center gap-4 text-green-500">
               <Star size={32} />
               <div>
                 <h4 className="font-black text-xl">Programme de Fidélité Actif</h4>
                 <p className="text-sm text-muted-foreground">Transformez vos points de formulation en <strong className="text-green-500 font-black">Actions ou Parts d'Investissement Agricole</strong>.</p>
               </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                 <span className="text-2xl font-black text-white block leading-none">2,450 PTS</span>
                 <span className="text-[10px] uppercase tracking-widest text-muted-foreground">= 2 Actions Lavande</span>
              </div>
              <Button onClick={() => navigate('/investir')} className="h-12 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black font-black uppercase tracking-widest rounded-2xl shadow-elevated transition-colors bg-transparent">
                 Convertir
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* LEFT COLUMN: Activity & History */}
            <div className="lg:col-span-8 flex flex-col gap-10">
               
               {/* Recent Orders */}
               <section>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                      <ShoppingBag className="text-gold" /> {t("dashboard.orders")}
                    </h2>
                    <Button variant="ghost" className="text-muted-foreground font-bold" onClick={() => navigate('/marketplace')}>{t("common.see_all")}</Button>
                  </div>

                  {orders.length === 0 ? (
                    <div className="glass-card p-10 rounded-[32px] border-dashed border-white/10 text-center">
                       <ShoppingBag size={40} className="mx-auto text-muted-foreground/20 mb-4" />
                       <p className="text-muted-foreground mb-6">{t("common.no_data")}</p>
                       <Button className="bg-gold text-black font-bold h-12 rounded-2xl px-8" onClick={() => navigate('/marketplace')}>{t("hero.cta.catalogue")}</Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map(order => (
                        <div key={order.id} className="glass-card px-8 py-6 rounded-[32px] border border-white/5 hover:border-white/10 transition-all flex items-center justify-between">
                           <div className="flex items-center gap-6">
                              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-muted-foreground">
                                <Package size={24} />
                              </div>
                              <div>
                                 <p className="font-bold text-white leading-none mb-1 text-lg">Commande #{order.id.toString().slice(0, 8)}</p>
                                 <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                   <span className="flex items-center gap-1"><Calendar size={12}/> {new Date(order.created_at).toLocaleDateString()}</span>
                                   <span className="flex items-center gap-1"><Clock size={12}/> {order.status || 'Traitée'}</span>
                                 </div>
                              </div>
                           </div>
                           <div className="text-right">
                              <div className="text-xl font-black text-white">{order.total_amount || 0} €</div>
                              <span className="text-[10px] font-black text-gold uppercase tracking-widest">{order.payment_status || 'Payée'}</span>
                           </div>
                        </div>
                      ))}
                    </div>
                  )}
               </section>

               {/* Recent Formulas */}
               <section>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                      <Palette className="text-gold" /> {t("dashboard.formulas")}
                    </h2>
                    <Button variant="ghost" className="text-muted-foreground font-bold" onClick={() => navigate('/studio')}>{t("community.new_post")}</Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {formulas.length === 0 ? (
                       <div className="glass-card p-10 rounded-[32px] border-dashed border-white/10 text-center md:col-span-2">
                          <Palette size={40} className="mx-auto text-muted-foreground/20 mb-4" />
                          <p className="text-muted-foreground mb-6">{t("common.no_data")}</p>
                          <Button className="bg-gold text-black font-bold h-12 rounded-2xl px-8" onClick={() => navigate('/studio')}>{t("nav.studio")}</Button>
                       </div>
                     ) : (
                       formulas.map(formula => (
                         <div key={formula.id} className="glass-card p-6 rounded-[32px] border border-white/5 hover:border-gold/20 transition-all group">
                             <div className="flex justify-between items-start mb-6">
                               <h3 className="font-bold text-lg group-hover:text-gold transition-colors">{formula.name}</h3>
                               <div className="flex -space-x-2">
                                  {formula.structure?.map((ing: any, i: number) => (
                                    <div key={i} className="w-5 h-5 rounded-full border border-black shadow-lg" style={{ backgroundColor: ing.color }} />
                                  )).slice(0, 4)}
                               </div>
                             </div>
                             <p className="text-xs text-muted-foreground leading-relaxed mb-6">{formula.description || 'Formule olfactive enregistrée'}</p>
                             <Button variant="ghost" className="w-full justify-between h-10 px-0 hover:bg-transparent font-bold group-hover:text-gold">
                               Détails du projet <ArrowRight size={16} />
                             </Button>
                         </div>
                       ))
                     )}
                  </div>
               </section>
            </div>

            {/* RIGHT COLUMN: Notifications & Side Cards */}
            <div className="lg:col-span-4 flex flex-col gap-8">
               
               {/* Quick Tips / Announcements */}
               <div className="glass-card p-10 rounded-[48px] border-2 border-gold/30 bg-gradient-to-br from-gold/15 to-transparent relative overflow-hidden">
                  <h3 className="font-display font-bold text-2xl mb-4 flex items-center gap-3">
                    <Star className="text-gold" size={24} /> Spécial Membre
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                    Débloquez l'accès total à la base de données <strong>PubChem</strong> en activant votre certificat Academy niveau 2.
                  </p>
                  <Button className="w-full h-14 bg-gold hover:bg-gold/80 text-black font-black uppercase tracking-widest rounded-2xl shadow-gold" onClick={() => navigate('/academy')}>
                     Passer l'examen
                  </Button>
               </div>

               {/* Community Vote CTA */}
               <div className="glass-card p-6 rounded-[40px] border border-white/5">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                      <Globe size={24} />
                    </div>
                    <div>
                       <h4 className="font-black text-xs uppercase tracking-widest text-muted-foreground">{t("footer.ecosystem")}</h4>
                       <p className="font-bold text-white">Classement des Nez</p>
                    </div>
                 </div>
                 <p className="text-xs text-muted-foreground leading-relaxed mb-6">Votez pour les 10 meilleurs créateurs de ce trimestre et gagnez des points Nexus.</p>
                 <Button variant="outline" className="w-full rounded-2xl border-white/10 hover:border-gold/50 h-12 font-bold" onClick={() => navigate('/community')}>
                    Aller aux Votes
                 </Button>
               </div>

               {/* Seller Dashboard CTA */}
               <div className="glass-card p-8 rounded-[40px] border border-gold/30 bg-gold/5 relative overflow-hidden mt-2 group">
                  <div className="absolute top-0 right-0 p-6 opacity-10 blur-xl group-hover:opacity-30 transition-all">
                    <ShoppingBag size={100} className="text-gold" />
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-2 text-white">
                    Devenir Vendeur
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 relative z-10">
                    Abonnés exclusifs : ouvrez votre vitrine sur le <strong className="text-gold">Marché Indépendant</strong>. Vendez vos huiles ou formules à la communauté en toute sécurité (Commission NEXUS : 8%).
                  </p>
                  <Button className="w-full h-12 bg-white hover:bg-gold text-black font-black uppercase tracking-widest rounded-2xl shadow-elevated relative z-10 transition-colors">
                     + Vendre un produit
                  </Button>
               </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
