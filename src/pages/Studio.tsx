import { useState } from "react";
import { Droplets, Plus, X, Sparkles, Save, BrainCircuit, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ingredients = {
  "Notes de tête": [
    { name: "Bergamote", color: "hsl(55, 80%, 60%)" },
    { name: "Citron", color: "hsl(50, 90%, 55%)" },
    { name: "Néroli", color: "hsl(30, 70%, 65%)" },
    { name: "Pamplemousse", color: "hsl(15, 80%, 60%)" },
    { name: "Mandarine", color: "hsl(25, 85%, 55%)" },
    { name: "Petit grain", color: "hsl(100, 40%, 50%)" },
  ],
  "Notes de cœur": [
    { name: "Rose", color: "hsl(340, 60%, 55%)" },
    { name: "Jasmin", color: "hsl(45, 70%, 75%)" },
    { name: "Ylang-Ylang", color: "hsl(50, 60%, 60%)" },
    { name: "Iris", color: "hsl(270, 40%, 60%)" },
    { name: "Tubéreuse", color: "hsl(320, 50%, 70%)" },
    { name: "Géranium", color: "hsl(350, 50%, 55%)" },
  ],
  "Notes de fond": [
    { name: "Oud", color: "hsl(30, 50%, 30%)" },
    { name: "Ambre", color: "hsl(35, 80%, 45%)" },
    { name: "Musc", color: "hsl(0, 10%, 50%)" },
    { name: "Vanille", color: "hsl(40, 70%, 50%)" },
    { name: "Santal", color: "hsl(25, 60%, 40%)" },
    { name: "Vétiver", color: "hsl(120, 30%, 35%)" },
  ],
};

type Selected = { name: string; color: string; category: string };

const Studio = () => {
  const [selected, setSelected] = useState<Selected[]>([]);
  const [recipeName, setRecipeName] = useState("");
  const [saving, setSaving] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [aiReport, setAiReport] = useState<any>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (selected.length < 3) return;
    setAnalyzing(true);
    // Simulate AI analysis querying db sources
    setTimeout(() => {
      const baseCost = selected.length * 12.5 + Math.random() * 10;
      setAiReport({
        cost: baseCost.toFixed(2),
        recommendation: "Équilibre olfactif intéressant. Formule viable pour le marché européen (selon les standards RIFM).",
        sources: ["Alibaba", "TradeIndia", "RIFM Database"]
      });
      setAnalyzing(false);
      toast.success("Analyse IA terminée avec succès");
    }, 2000);
  };

  const addIngredient = (name: string, color: string, category: string) => {
    if (selected.find((s) => s.name === name)) return;
    if (selected.length >= 8) return;
    setSelected([...selected, { name, color, category }]);
  };

  const removeIngredient = (name: string) => {
    setSelected(selected.filter((s) => s.name !== name));
  };

  const handleSave = async () => {
    if (!user) {
      toast.error("Connectez-vous pour sauvegarder");
      navigate("/auth");
      return;
    }
    if (!recipeName.trim()) {
      toast.error("Donnez un nom à votre création");
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("recipes").insert({
      user_id: user.id,
      name: recipeName,
      ingredients: selected as any,
      is_public: true,
    });
    if (error) {
      toast.error("Erreur : " + error.message);
    } else {
      toast.success("Création sauvegardée !");
      setSelected([]);
      setRecipeName("");
      setAiReport(null);
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">
            Studio de <span className="text-gradient-gold">Création</span>
          </h1>
          <p className="text-muted-foreground mb-10">Composez votre parfum virtuel en sélectionnant vos ingrédients.</p>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {Object.entries(ingredients).map(([category, items]) => (
                <div key={category}>
                  <h3 className="font-display text-lg font-semibold mb-4">{category}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                    {items.map((ing) => {
                      const isSelected = selected.find((s) => s.name === ing.name);
                      return (
                        <button
                          key={ing.name}
                          onClick={() => isSelected ? removeIngredient(ing.name) : addIngredient(ing.name, ing.color, category)}
                          className={`p-4 rounded-xl border transition-all duration-200 text-left ${
                            isSelected
                              ? "border-primary bg-primary/10"
                              : "border-border bg-card hover:border-primary/30"
                          }`}
                        >
                          <div className="w-8 h-8 rounded-full mb-2" style={{ backgroundColor: ing.color }} />
                          <span className="text-xs font-medium">{ing.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-card rounded-xl p-6 h-fit sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Droplets size={20} className="text-primary" />
                <h3 className="font-display text-lg font-semibold">Votre composition</h3>
              </div>

              {selected.length === 0 ? (
                <div className="text-center py-8">
                  <Plus size={32} className="mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Sélectionnez des ingrédients</p>
                </div>
              ) : (
                <div className="space-y-3 mb-6">
                  {selected.map((s) => (
                    <div key={s.name} className="flex items-center justify-between bg-secondary/50 rounded-lg px-3 py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: s.color }} />
                        <div>
                          <span className="text-sm font-medium">{s.name}</span>
                          <span className="text-xs text-muted-foreground ml-2">{s.category}</span>
                        </div>
                      </div>
                      <button onClick={() => removeIngredient(s.name)} className="text-muted-foreground hover:text-foreground">
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-3">
                <Input
                  placeholder="Nom de votre création"
                  value={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                  className="bg-secondary border-border"
                />
                <Button className="w-full bg-secondary text-primary hover:bg-secondary/80 font-semibold" disabled={selected.length < 3 || analyzing} onClick={handleAnalyze}>
                  <BrainCircuit size={16} className="mr-2" />
                  {analyzing ? "Analyse en cours..." : "Faire analyser par l'IA"}
                </Button>

                {aiReport && (
                  <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 space-y-3 mt-4">
                    <h4 className="font-bold flex items-center gap-2 text-primary">
                      <Sparkles size={16} /> Rapport IA
                    </h4>
                    <div className="flex items-center gap-2 text-sm">
                      <Activity size={14} className="text-muted-foreground" />
                      <span>Coût de fabrication estimé: <strong>{aiReport.cost}€ / L</strong></span>
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed italic border-l-2 border-primary/30 pl-2">
                      "{aiReport.recommendation}"
                    </p>
                    <div className="text-xs text-muted-foreground">
                      Sources interrogées: {aiReport.sources.join(", ")}
                    </div>
                  </div>
                )}
                
                <Button className="w-full bg-gradient-gold font-semibold shadow-gold mt-4" disabled={selected.length < 3 || saving} onClick={handleSave}>
                  <Save size={16} className="mr-2" />
                  {saving ? "Sauvegarde..." : "Sauvegarder la création"}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Min. 3 ingrédients · Max. 8
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Studio;
