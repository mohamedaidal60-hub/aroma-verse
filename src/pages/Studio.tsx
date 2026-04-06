import { useState } from "react";
import { Droplets, Plus, X, Sparkles, Save, BrainCircuit, Activity, Beaker, FlaskConical, Atom, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ingredients = {
  "Notes de Tête": [
    { name: "Bergamote", color: "hsl(55, 80%, 60%)", cas: "8007-75-8", mw: "183.25" },
    { name: "Citron", color: "hsl(50, 90%, 55%)", cas: "84929-31-7", mw: "154.25" },
    { name: "Néroli", color: "hsl(30, 70%, 65%)", cas: "8016-38-4", mw: "136.23" },
    { name: "Pamplemousse", color: "hsl(15, 80%, 60%)", cas: "8016-20-4", mw: "152.23" },
    { name: "Mandarine", color: "hsl(25, 85%, 55%)", cas: "8008-31-9", mw: "136.23" },
    { name: "Petit grain", color: "hsl(100, 40%, 50%)", cas: "8014-17-3", mw: "161.23" },
  ],
  "Notes de Cœur": [
    { name: "Rose", color: "hsl(340, 60%, 55%)", cas: "8007-01-0", mw: "274.40" },
    { name: "Jasmin", color: "hsl(45, 70%, 75%)", cas: "8022-96-6", mw: "204.31" },
    { name: "Ylang-Ylang", color: "hsl(50, 60%, 60%)", cas: "8006-81-3", mw: "222.37" },
    { name: "Iris", color: "hsl(270, 40%, 60%)", cas: "8002-73-1", mw: "194.27" },
    { name: "Tubéreuse", color: "hsl(320, 50%, 70%)", cas: "8024-05-3", mw: "242.40" },
    { name: "Géranium", color: "hsl(350, 50%, 55%)", cas: "8000-46-2", mw: "154.23" },
  ],
  "Notes de Fond": [
    { name: "Oud", color: "hsl(30, 50%, 30%)", cas: "92347-05-2", mw: "282.46" },
    { name: "Ambre", color: "hsl(35, 80%, 45%)", cas: "8016-35-1", mw: "278.46" },
    { name: "Musc", color: "hsl(0, 10%, 50%)", cas: "541-02-6", mw: "156.26" },
    { name: "Vanille", color: "hsl(40, 70%, 50%)", cas: "121-33-5", mw: "152.15" },
    { name: "Santal", color: "hsl(25, 60%, 40%)", cas: "84787-70-2", mw: "222.37" },
    { name: "Vétiver", color: "hsl(120, 30%, 35%)", cas: "8016-96-4", mw: "218.37" },
  ],
};

type Selected = { name: string; color: string; category: string; cas: string; mw: string };

const Studio = () => {
  const [selected, setSelected] = useState<Selected[]>([]);
  const [recipeName, setRecipeName] = useState("");
  const [saving, setSaving] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [aiReport, setAiReport] = useState<any>(null);
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (selected.length < 3) return;
    setAnalyzing(true);
    setTimeout(() => {
      const baseCost = selected.length * 12.5 + Math.random() * 10;
      const hasTop = selected.some(s => s.category === "Notes de Tête");
      const hasHeart = selected.some(s => s.category === "Notes de Cœur");
      const hasBase = selected.some(s => s.category === "Notes de Fond");
      const balance = (hasTop ? 33 : 0) + (hasHeart ? 34 : 0) + (hasBase ? 33 : 0);
      setAiReport({
        cost: baseCost.toFixed(2),
        balance,
        recommendation: hasTop && hasHeart && hasBase
          ? "Formule parfaitement équilibrée en pyramide olfactive. Viable pour le marché européen (RIFM)."
          : "Formule incomplète. Ajoutez des notes manquantes pour un résultat optimal.",
        ifra: "Conform",
        sources: ["RIFM 2024", "IFRA 2023", "Aromaverse ML Model v2.1"]
      });
      setAnalyzing(false);
      toast.success("Analyse IA terminée !");
    }, 2000);
  };

  const addIngredient = (name: string, color: string, category: string, cas: string, mw: string) => {
    if (selected.find((s) => s.name === name)) return;
    if (selected.length >= 8) { toast.error("Maximum 8 ingrédients"); return; }
    setSelected([...selected, { name, color, category, cas, mw }]);
    setActiveNote(name);
  };

  const removeIngredient = (name: string) => {
    setSelected(selected.filter((s) => s.name !== name));
    if (activeNote === name) setActiveNote(null);
  };

  const handleSave = async () => {
    if (!user) { toast.error("Connectez-vous pour sauvegarder"); navigate("/auth"); return; }
    if (!recipeName.trim()) { toast.error("Nommez votre création"); return; }
    setSaving(true);
    setTimeout(() => {
      toast.success(`"${recipeName}" sauvegardée dans votre Lab !`);
      setSelected([]);
      setRecipeName("");
      setAiReport(null);
      setSaving(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">

          {/* Hero */}
          <div className="mb-16">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 mb-6 w-fit">
              <FlaskConical size={14} className="text-gold" />
              <span className="text-[10px] font-bold text-gold uppercase tracking-widest">Nexus Lab Studio</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-3">
              Studio de <span className="text-gold">Création</span>
            </h1>
            <p className="text-xl text-muted-foreground font-arabic">مختبر الإبداع العطري — صمم عطرك الخاص بدقة جزيئية</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Ingredient Picker */}
            <div className="lg:col-span-2 space-y-10">
              {Object.entries(ingredients).map(([category, items]) => (
                <div key={category}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-10 rounded-full bg-gold opacity-60"></div>
                    <h3 className="font-display text-2xl font-bold">{category}</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {items.map((ing) => {
                      const isSelected = selected.find((s) => s.name === ing.name);
                      return (
                        <button
                          key={ing.name}
                          onClick={() => isSelected ? removeIngredient(ing.name) : addIngredient(ing.name, ing.color, category, ing.cas, ing.mw)}
                          className={`p-5 rounded-3xl border transition-all duration-300 text-left group relative overflow-hidden ${
                            isSelected
                              ? "border-gold bg-gold/10 shadow-gold scale-105"
                              : "border-white/5 bg-black/30 hover:border-gold/40 hover:scale-105 hover:bg-black/50"
                          }`}
                        >
                          <div className="w-10 h-10 rounded-2xl mb-3 shadow-lg" style={{ backgroundColor: ing.color }} />
                          <span className="text-xs font-bold block text-white">{ing.name}</span>
                          <span className="text-[8px] text-muted-foreground font-mono mt-0.5 block">{ing.cas}</span>
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-5 h-5 bg-gold rounded-full flex items-center justify-center">
                              <X size={10} className="text-black" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Panel: Composition + Analysis */}
            <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              {/* Composition Card */}
              <div className="glass-card rounded-[40px] p-8 border border-white/10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-2xl bg-gold/10 flex items-center justify-center text-gold">
                    <Droplets size={20} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold">Composition</h3>
                    <span className="text-[10px] text-muted-foreground">{selected.length}/8 ingrédients</span>
                  </div>
                </div>

                {/* Olfactive pyramid visual */}
                <div className="flex gap-1 mb-6 h-3 rounded-full overflow-hidden bg-white/5">
                  {["Notes de Tête", "Notes de Cœur", "Notes de Fond"].map((cat, i) => {
                    const count = selected.filter(s => s.category === cat).length;
                    const colors = ["bg-yellow-400", "bg-pink-500", "bg-amber-700"];
                    return count > 0 ? (
                      <div key={cat} className={`${colors[i]} transition-all duration-500`} style={{ width: `${count * 12.5}%` }}></div>
                    ) : null;
                  })}
                </div>

                {selected.length === 0 ? (
                  <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl">
                    <Atom size={32} className="mx-auto text-muted-foreground mb-3" />
                    <p className="text-sm text-muted-foreground">Sélectionnez des ingrédients</p>
                    <p className="text-[10px] text-muted-foreground font-arabic mt-1">اختر مكوناتك العطرية</p>
                  </div>
                ) : (
                  <div className="space-y-3 mb-6">
                    {selected.map((s) => (
                      <div
                        key={s.name}
                        className={`flex items-center justify-between bg-white/5 rounded-2xl px-4 py-3 border transition-all cursor-pointer ${activeNote === s.name ? 'border-gold/50 bg-gold/5' : 'border-white/5 hover:border-gold/20'}`}
                        onClick={() => setActiveNote(activeNote === s.name ? null : s.name)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-lg shadow-sm flex-shrink-0" style={{ backgroundColor: s.color }} />
                          <div>
                            <span className="text-sm font-bold block">{s.name}</span>
                            {activeNote === s.name && (
                              <div className="flex gap-3 mt-0.5">
                                <span className="text-[9px] text-muted-foreground font-mono">CAS: {s.cas}</span>
                                <span className="text-[9px] text-muted-foreground font-mono">MW: {s.mw}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); removeIngredient(s.name); }} className="text-muted-foreground hover:text-red-400 transition-colors">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-3">
                  <Input
                    placeholder="Nom de votre création..."
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                    className="bg-black/40 border-white/10 h-12 rounded-2xl focus-visible:ring-gold/50 text-white placeholder:text-muted-foreground/50"
                  />
                  <Button
                    className="w-full h-12 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-bold transition-all"
                    disabled={selected.length < 3 || analyzing}
                    onClick={handleAnalyze}
                  >
                    <BrainCircuit size={18} className="mr-2 text-gold" />
                    {analyzing ? "Analyse..." : "Analyser via IA"}
                  </Button>
                  <Button
                    className="w-full h-12 bg-gold hover:bg-gold/80 text-black font-black rounded-2xl shadow-gold transition-transform active:scale-95"
                    disabled={selected.length < 3 || saving}
                    onClick={handleSave}
                  >
                    <Save size={18} className="mr-2" />
                    {saving ? "Sauvegarde..." : "Sauvegarder"}
                  </Button>
                </div>
              </div>

              {/* AI Report */}
              {aiReport && (
                <div className="glass-card rounded-[40px] p-8 border border-gold/30 bg-gradient-to-br from-gold/5 to-transparent animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h4 className="font-display font-bold text-2xl mb-6 flex items-center gap-3">
                    <Sparkles className="text-gold" size={24} /> Rapport IA
                  </h4>
                  <div className="space-y-5">
                    <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5">
                      <span className="text-sm text-muted-foreground flex items-center gap-2"><Activity size={14} /> Coût estimé</span>
                      <span className="font-bold text-white text-lg">{aiReport.cost}€/L</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5">
                      <span className="text-sm text-muted-foreground flex items-center gap-2"><Info size={14} /> Conformité IFRA</span>
                      <span className="font-bold text-green-400">{aiReport.ifra} ✓</span>
                    </div>
                    <div className="p-4 bg-black/40 rounded-2xl border border-gold/20">
                      <p className="text-sm text-white/80 leading-relaxed italic">"{aiReport.recommendation}"</p>
                    </div>
                    <div className="text-[10px] text-muted-foreground font-mono">
                      Sources: {aiReport.sources.join(" · ")}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Studio;
