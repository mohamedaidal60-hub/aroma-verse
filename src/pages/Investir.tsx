import { TrendingUp, MapPin, Leaf, BarChart3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import investImage from "@/assets/investment-field.jpg";
import { useQuery } from "@tanstack/react-query";
const supabase: any = { from: () => ({ select: () => ({ eq: () => ({ order: async () => ({data: []}) }), order: async () => ({data: []}) }), insert: async () => ({error: null}) }) };
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";

const Investir = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [investingId, setInvestingId] = useState<string | null>(null);

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["investment-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("investment_projects")
        .select("*")
        .eq("status", "open")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const totalFunded = projects.reduce((sum, p) => sum + Number(p.funded_amount), 0);

  const handleInvest = async (projectId: string, minInvest: number) => {
    if (!user) {
      toast.error("Connectez-vous pour investir");
      navigate("/auth");
      return;
    }
    setInvestingId(projectId);
    const { error } = await supabase.from("investments").insert({
      user_id: user.id,
      project_id: projectId,
      amount: minInvest,
    });
    if (error) {
      toast.error("Erreur : " + error.message);
    } else {
      toast.success("Investissement enregistré !");
    }
    setInvestingId(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="relative rounded-2xl overflow-hidden mb-16">
            <img src={investImage} alt="Champ de lavande" width={800} height={600} className="w-full h-64 md:h-80 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent flex items-center">
              <div className="p-8 md:p-12 max-w-lg">
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-3">
                  Investissement <span className="text-gradient-gold">Agricole</span>
                </h1>
                <p className="text-muted-foreground">
                  Participez au financement de projets agricoles liés aux matières premières du parfum.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { icon: Leaf, label: "Projets actifs", value: String(projects.length) },
              { icon: TrendingUp, label: "ROI moyen", value: projects.length ? `${(projects.reduce((s, p) => s + Number(p.estimated_roi || 0), 0) / projects.length).toFixed(0)}%` : "—" },
              { icon: BarChart3, label: "Capital total", value: `${(totalFunded / 1000).toFixed(0)}K €` },
              { icon: MapPin, label: "Pays", value: String(new Set(projects.map(p => p.location?.split(",").pop()?.trim())).size) },
            ].map((s) => (
              <div key={s.label} className="glass-card rounded-xl p-5 text-center">
                <s.icon size={24} className="text-primary mx-auto mb-2" />
                <div className="text-2xl font-display font-bold">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-display font-bold mb-8">Projets <span className="text-gradient-gold">disponibles</span></h2>

          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-gradient-card rounded-xl border border-border p-6 animate-pulse h-64" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((p) => {
                const funded = Number(p.target_amount) > 0 ? (Number(p.funded_amount) / Number(p.target_amount)) * 100 : 0;
                return (
                  <div key={p.id} className="bg-gradient-card rounded-xl border border-border p-6 hover:border-primary/30 transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin size={12} /> {p.location}
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">{p.crop_type}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                      <div>
                        <div className="text-sm font-bold">{Number(p.min_investment).toFixed(0)} €</div>
                        <div className="text-xs text-muted-foreground">Min.</div>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-primary">{Number(p.estimated_roi || 0).toFixed(0)}%</div>
                        <div className="text-xs text-muted-foreground">ROI estimé</div>
                      </div>
                      <div>
                        <div className="text-sm font-bold">{Number(p.target_amount).toLocaleString()} €</div>
                        <div className="text-xs text-muted-foreground">Objectif</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Financé</span>
                        <span className="font-medium">{funded.toFixed(0)}%</span>
                      </div>
                      <Progress value={funded} className="h-2" />
                    </div>

                    <Button
                      className="w-full bg-gradient-gold font-semibold shadow-gold"
                      size="sm"
                      onClick={() => handleInvest(p.id, Number(p.min_investment))}
                      disabled={investingId === p.id}
                    >
                      {investingId === p.id ? "En cours..." : "Investir"} <ArrowRight size={14} className="ml-1" />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Investir;
