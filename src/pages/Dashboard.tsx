import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Package, TrendingUp, Palette, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { user, profile, loading } = useAuth();

  const { data: orders = [] } = useQuery({
    queryKey: ["my-orders", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*, products(name))")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: investments = [] } = useQuery({
    queryKey: ["my-investments", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("investments")
        .select("*, investment_projects(name, estimated_roi)")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: recipes = [] } = useQuery({
    queryKey: ["my-recipes", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  if (loading) return null;
  if (!user) return <Navigate to="/auth" />;

  const totalInvested = investments.reduce((s, i: any) => s + Number(i.amount), 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-display font-bold mb-2">
            Bonjour, <span className="text-gradient-gold">{profile?.full_name || "Utilisateur"}</span>
          </h1>
          <p className="text-muted-foreground mb-10">Votre espace personnel AromaVerse</p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { icon: ShoppingBag, label: "Commandes", value: String(orders.length) },
              { icon: TrendingUp, label: "Investissements", value: `${totalInvested.toFixed(0)} €` },
              { icon: Palette, label: "Créations", value: String(recipes.length) },
              { icon: Package, label: "Rôle", value: profile?.role || "client" },
            ].map((s) => (
              <div key={s.label} className="glass-card rounded-xl p-5">
                <s.icon size={20} className="text-primary mb-2" />
                <div className="text-xl font-display font-bold">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Orders */}
          <section className="mb-12">
            <h2 className="text-2xl font-display font-bold mb-4">Mes commandes</h2>
            {orders.length === 0 ? (
              <p className="text-muted-foreground text-sm">Aucune commande pour le moment.</p>
            ) : (
              <div className="space-y-3">
                {orders.map((o: any) => (
                  <div key={o.id} className="bg-gradient-card rounded-xl border border-border p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">Commande #{o.id.slice(0, 8)}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(o.created_at).toLocaleDateString("fr-FR")} · {o.order_items?.length || 0} article(s)
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold">{Number(o.total).toFixed(2)} €</span>
                      <span className={`block text-xs font-medium ${o.status === "delivered" ? "text-green-500" : "text-primary"}`}>
                        {o.status === "pending" ? "En attente" : o.status === "confirmed" ? "Confirmée" : o.status === "shipped" ? "Expédiée" : o.status === "delivered" ? "Livrée" : o.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Recipes */}
          <section className="mb-12">
            <h2 className="text-2xl font-display font-bold mb-4">Mes créations</h2>
            {recipes.length === 0 ? (
              <p className="text-muted-foreground text-sm">Aucune création pour le moment.</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recipes.map((r: any) => {
                  const ings = Array.isArray(r.ingredients) ? r.ingredients : [];
                  return (
                    <div key={r.id} className="bg-gradient-card rounded-xl border border-border p-4">
                      <h3 className="font-display font-semibold">{r.name}</h3>
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {ings.map((ing: any, idx: number) => (
                          <div key={idx} className="w-5 h-5 rounded-full border border-border" style={{ backgroundColor: ing.color }} title={ing.name} />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">{ings.length} ingrédients · {r.is_public ? "Public" : "Privé"}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Investments */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Mes investissements</h2>
            {investments.length === 0 ? (
              <p className="text-muted-foreground text-sm">Aucun investissement pour le moment.</p>
            ) : (
              <div className="space-y-3">
                {investments.map((inv: any) => (
                  <div key={inv.id} className="bg-gradient-card rounded-xl border border-border p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{inv.investment_projects?.name || "Projet"}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(inv.created_at).toLocaleDateString("fr-FR")} · ROI estimé : {inv.investment_projects?.estimated_roi || "—"}%
                      </p>
                    </div>
                    <span className="text-lg font-bold text-gradient-gold">{Number(inv.amount).toFixed(0)} €</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
