import { useState } from "react";
import { Droplets, Plus, X, Sparkles, Save, BrainCircuit, Activity, Beaker, FlaskConical, Atom, Info, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useLang } from "@/contexts/LanguageContext";

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
  const { t, lang, dir } = useLang();
  const [selected, setSelected] = useState<Selected[]>([]);
  const [recipeName, setRecipeName] = useState("");
  const [saving, setSaving] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [simulating, setSimulating] = useState(false);
  const [simProgress, setSimProgress] = useState(0);
  const [aiReport, setAiReport] = useState<any>(null);
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (selected.length < 3) return;
    setAnalyzing(true);
    setTimeout(() => {
      const baseCost = selected.length * 12.5 + Math.random() * 10;
      setAiReport({
        cost: baseCost.toFixed(2),
        ifra: "Conform",
        recommendation: "Formule parfaitement équilibrée en pyramide olfactive. Viable pour le marché (RIFM).",
        sources: ["RIFM 2024", "IFRA 2023", "Nexus ML v2.1"]
      });
      setAnalyzing(false);
      toast.success(t("studio.simulation.complete"));
    }, 1500);
  };

  const handleSimulate3D = () => {
    if (selected.length < 1) {
      toast.error(t("studio.add_ingredient"));
      return;
    }
    setSimulating(true);
    setSimProgress(0);
    const interval = setInterval(() => {
      setSimProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setSimulating(false);
          toast.success(t("studio.simulation.complete"));
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const addIngredient = (name: string, color: string, category: string, cas: string, mw: string) => {
    if (selected.find((s) => s.name === name)) return;
    if (selected.length >= 12) { toast.error("Maximum 12 ingrédients"); return; }
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
    <div className={`min-h-screen bg-background font-body ${dir === "rtl" ? "text-right" : "text-left"}`}>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">

          {/* Hero */}
          <div className="mb-16">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/10 mb-6 w-fit">
              <FlaskConical size={14} className="text-gold" />
              <span className="text-[10px] font-bold text-gold uppercase tracking-widest">{t("studio.badge")}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-black mb-3 italic tracking-tighter">
              {t("studio.title")} <span className="text-gold">{t("studio.title2")}</span>
            </h1>
            <p className={`text-xl text-muted-foreground ${dir === "rtl" ? "font-arabic" : ""}`}>{t("studio.desc")}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Ingredient Picker */}
            <div className="lg:col-span-2 space-y-12">
              {Object.entries(ingredients).map(([category, items]) => (
                <div key={category}>
                  <div className="flex items-center gap-3 mb-8">
                     <div className="w-2 h-10 rounded-full bg-gold opacity-60"></div>
                     <h3 className="font-display text-2xl font-bold tracking-tight">{category}</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
                    {items.map((ing) => {
                      const isSelected = selected.find((s) => s.name === ing.name);
                      return (
                        <button
                          key={ing.name}
                          onClick={() => isSelected ? removeIngredient(ing.name) : addIngredient(ing.name, ing.color, category, ing.cas, ing.mw)}
                          className={`p-6 rounded-[32px] border transition-all duration-300 text-left group relative overflow-hidden ${
                            isSelected
                              ? "border-gold bg-gold/10 shadow-gold scale-105"
                              : "border-white/5 bg-black/30 hover:border-gold/40 hover:scale-105 hover:bg-black/50"
                          }`}
                        >
                          <div className="w-12 h-12 rounded-2xl mb-4 shadow-lg border border-white/10" style={{ backgroundColor: ing.color }} />
                          <span className="text-xs font-black block text-white uppercase">{ing.name}</span>
                          <span className="text-[8px] text-muted-foreground font-mono mt-1 block">{ing.cas}</span>
                          {isSelected && (
                            <div className="absolute top-3 right-3 w-6 h-6 bg-gold rounded-full flex items-center justify-center shadow-lg transform scale-110">
                              <X size={12} className="text-black font-bold" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Panel */}
            <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <div className="glass-card rounded-[48px] p-8 md:p-10 border border-white/10 bg-gradient-to-br from-secondary/80 to-background/90 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-3xl -mr-32 -mt-32" />
                
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold border border-gold/20">
                    <Droplets size={24} />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold">Lab Editor</h3>
                    <span className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{selected.length}/12 ingrédients</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {selected.length === 0 ? (
                    <div className="text-center py-16 border-2 border-dashed border-white/5 rounded-[32px] bg-black/20">
                       <Atom size={40} className="mx-auto text-muted-foreground/30 mb-4 animate-spin-slow" />
                       <p className="text-sm text-muted-foreground font-bold">{t("studio.add_ingredient")}</p>
                    </div>
                  ) : (
                    selected.map((s) => (
                      <div key={s.name} className="flex items-center justify-between bg-white/5 rounded-2xl px-5 py-4 border border-white/5 group hover:border-gold/30 transition-all">
                        <div className="flex items-center gap-4">
                           <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: s.color }} />
                           <span className="text-sm font-black text-white uppercase">{s.name}</span>
                        </div>
                        <button onClick={() => removeIngredient(s.name)} className="text-muted-foreground hover:text-red-400 group-hover:scale-125 transition-all"><X size={16} /></button>
                      </div>
                    ))
                  )}
                </div>

                <div className="space-y-4">
                  <Input
                    placeholder={dir === "rtl" ? "اسم العطر..." : "Nommez votre création..."}
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                    className="bg-black/60 border-white/10 h-14 rounded-2xl focus-visible:ring-gold/50 text-white placeholder:text-muted-foreground/40 font-bold"
                  />
                  
                  {/* 3D Simulation Button - FIXED */}
                  <div className="space-y-3">
                    <Button
                      onClick={handleSimulate3D}
                      className="w-full h-14 bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest transition-all"
                      disabled={simulating}
                    >
                      {simulating ? (
                        <div className="flex flex-col items-center gap-1 w-full">
                           <span className="animate-pulse">{t("studio.simulation.running")}</span>
                           <Progress value={simProgress} className="h-1 w-full bg-white/10" indicatorClassName="bg-gold" />
                        </div>
                      ) : (
                        <><Sparkles size={18} className="mr-2 text-gold" /> {t("studio.simulation.action")}</>
                      )}
                    </Button>

                    <Button
                      className="w-full h-14 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest transition-all"
                      disabled={selected.length < 3 || analyzing}
                      onClick={handleAnalyze}
                    >
                      <BrainCircuit size={18} className="mr-2 text-gold" />
                      {analyzing ? t("studio.analyzing") : t("studio.analyze")}
                    </Button>
                    
                    <Button
                      className="w-full h-16 bg-gold hover:bg-gold/80 text-black font-black text-sm uppercase tracking-[0.2em] rounded-2xl shadow-gold transition-all active:scale-95"
                      disabled={selected.length < 3 || saving}
                      onClick={handleSave}
                    >
                      <Save size={20} className="mr-2" />
                      {saving ? "..." : t("common.save")}
                    </Button>
                  </div>
                </div>
              </div>

              {aiReport && (
                <div className="glass-card rounded-[40px] p-10 border border-gold/40 bg-gradient-to-br from-gold/10 to-transparent animate-in zoom-in duration-500">
                   <h4 className="font-display font-black text-2xl mb-8 flex items-center gap-3">
                     <Activity className="text-gold" size={28} /> {t("studio.analyze.result")}
                   </h4>
                   <div className="space-y-4">
                      <div className="p-5 bg-black/40 rounded-2xl border border-white/5 flex justify-between items-center">
                         <span className="text-xs text-muted-foreground font-black uppercase">Coût estimé</span>
                         <span className="font-black text-xl text-white tracking-widest">{aiReport.cost}€/kg</span>
                      </div>
                      <div className="p-5 bg-black/40 rounded-2xl border border-green-500/20 flex justify-between items-center">
                         <span className="text-xs text-muted-foreground font-black uppercase tracking-widest">IFRA Cert.</span>
                         <span className="font-black text-green-400">PASSED v51</span>
                      </div>
                      <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
                        <p className="text-sm font-bold leading-relaxed text-gold italic">"{aiReport.recommendation}"</p>
                      </div>
                   </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Studio;
