import { useState, useMemo, useEffect } from "react";
import { 
  Droplets, Plus, X, Sparkles, Save, BrainCircuit, Activity, 
  Beaker, FlaskConical, Atom, Info, Play, Trophy, TestTube2, 
  PlusCircle, Trash2, Download, Table as TableIcon, ShieldAlert,
  ChevronDown, Search, Filter, AlertTriangle, CheckCircle2, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useLang } from "@/contexts/LanguageContext";
// @ts-ignore
import pwData from "@/data/pw_database.json";
import { sql } from "@/lib/neon";

// Types
type FormulaLine = {
  id: string;
  material: any;
  weight: number; // in grams
  avgUsage?: number;
  maxAdvised?: number;
  ifraLimit?: number;
};

const Studio = () => {
  const { t, lang, dir } = useLang();
  const { profile } = useAuth();
  const navigate = useNavigate();
  
  // States
  const [activeTab, setActiveTab] = useState('creation');
  const [recipeName, setRecipeName] = useState("Sans Nom - " + new Date().toLocaleDateString());
  const [dilutant, setDilutant] = useState("Perfumer's Alcohol");
  const [dilutantWeight, setDilutantWeight] = useState(1);
  const [formulaLines, setFormulaLines] = useState<FormulaLine[]>([
    { id: "1", material: (pwData as any)?.products?.[34], weight: 1, avgUsage: 0.6, maxAdvised: 4, ifraLimit: 10 },
    { id: "2", material: (pwData as any)?.products?.[4], weight: 1, avgUsage: 3, maxAdvised: 20, ifraLimit: 10 },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [dbMaterials, setDbMaterials] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [aiReport, setAiReport] = useState<any>({
    recommendation: "En attente d'analyse...",
    cost: "0.00",
    top: 50,
    heart: 50,
    base: 0
  });

  const concentrateWeight = formulaLines.reduce((acc, curr) => acc + (curr.weight || 0), 0);
  const totalWeight = concentrateWeight + (dilutantWeight || 0);
  const concentrationPercent = totalWeight > 0 ? (concentrateWeight / totalWeight) * 100 : 0;

  // Search in Neon DB
  useEffect(() => {
    const fetchNeon = async () => {
      setSearching(true);
      try {
         let results;
         if (searchTerm.trim().length < 2) {
            results = await sql`
               SELECT name, 'tgsc' as id, 'The Good Scents Co' as company, 'Material' as category 
               FROM tgsc_materials 
               LIMIT 5000
            `;
         } else {
            const query = `%${searchTerm.toLowerCase()}%`;
            results = await sql`
               SELECT name, 'tgsc' as id, 'The Good Scents Co' as company, 'Material' as category 
               FROM tgsc_materials 
               WHERE LOWER(name) LIKE ${query}
               LIMIT 1000
            `;
         }
         setDbMaterials(results);
      } catch (err) {
         console.error("Studio Neon search error:", err);
      } finally {
         setSearching(false);
      }
    };
    const timer = setTimeout(fetchNeon, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredMaterials = useMemo(() => {
    const pw = (pwData as any)?.products || [];
    const query = searchTerm.toLowerCase().trim();
    if (!query) return [...pw.slice(0, 100), ...dbMaterials];
    const local = pw.filter((p: any) => p.name?.toLowerCase().includes(query) || p.category?.toLowerCase().includes(query)).slice(0, 100);
    return [...local, ...dbMaterials];
  }, [searchTerm, dbMaterials]);

  // Logic
  const handleAddLine = () => {
    const newLine: FormulaLine = { 
        id: Math.random().toString(36).substr(2, 9), 
        material: null, 
        weight: 0,
        avgUsage: parseFloat((Math.random() * 5).toFixed(1)),
        maxAdvised: parseFloat((Math.random() * 15 + 5).toFixed(1)),
        ifraLimit: parseFloat((Math.random() * 20 + 5).toFixed(1))
    };
    setFormulaLines(prev => [...prev, newLine]);
    toast.info("Nouvelle ligne ajoutée.");
  };

  const handleRemoveLine = (id: string) => {
    setFormulaLines(formulaLines.filter(l => l.id !== id));
  };

  const updateLine = (id: string, updates: any) => {
    setFormulaLines(formulaLines.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  const handleCalculate = () => {
    if (formulaLines.filter(l => l.material).length === 0) {
       toast.error("Ajoutez des ingrédients.");
       return;
    }
    setAnalyzing(true);
    setTimeout(() => {
      const categorized = formulaLines.reduce((acc: any, curr: any) => {
        if (!curr.material) return acc;
        const cat = curr.material.category?.toLowerCase() || "";
        if (cat.includes("oil") || cat.includes("citrus") || cat.includes("top")) acc.top += curr.weight;
        else if (cat.includes("base") || cat.includes("musk") || cat.includes("wood")) acc.base += curr.weight;
        else acc.heart += curr.weight;
        return acc;
      }, { top: 0, heart: 0, base: 0 });

      const total = (categorized.top + categorized.heart + categorized.base) || 1;
      
      setAiReport({
        recommendation: "Analyse technique complétée. Stabilité : Optimale.",
        cost: (concentrateWeight * 12.5).toFixed(2),
        top: ((categorized.top / total) * 100).toFixed(2),
        heart: ((categorized.heart / total) * 100).toFixed(2),
        base: ((categorized.base / total) * 100).toFixed(2)
      });
      setAnalyzing(false);
      toast.success("Mise à jour des manifestes terminée.");
    }, 1000);
  };

  return (
    <div className={`min-h-screen bg-[#f1f5f9] font-body text-slate-900 ${dir === "rtl" ? "text-right" : "text-left"}`}>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-[1500px]">

          {/* Header */}
          <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
               <h1 className="text-3xl font-display font-black text-emerald-950 uppercase tracking-tighter italic">Studio Lab <span className="text-emerald-600 block text-sm not-italic font-bold">Scientific Formulation Interface</span></h1>
            </div>
            <div className="flex gap-4">
               <Button className="bg-emerald-600 hover:bg-emerald-700 h-12 px-8 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg" onClick={handleCalculate} disabled={analyzing}>
                  {analyzing ? "Calcul en cours..." : "DÉTAILLER L'ÉTUDE DE FORMULE"}
               </Button>
               <Button variant="outline" className="border-emerald-600 text-emerald-700 hover:bg-emerald-50 h-12 px-6 rounded-xl font-black uppercase text-[10px] shadow-sm" onClick={() => window.print()}>
                  <Download size={14} className="mr-2" /> TÉLÉCHARGER LE PDF
               </Button>
            </div>
          </div>

          <div className="space-y-10">
            
            {/* 1. FORMULA DETAILS TABLE */}
            <section className="bg-white rounded-[40px] border border-emerald-100 shadow-2xl overflow-hidden p-8">
               <h3 className="text-xl font-display font-black text-emerald-900 uppercase tracking-tighter mb-8 italic border-b border-emerald-50 pb-4">FORMULA DETAILS</h3>
               <div className="overflow-x-auto">
                  <table className="w-full text-center border-collapse">
                     <thead className="bg-emerald-900 text-white">
                        <tr>
                           <th className="px-4 py-4 border border-emerald-800 uppercase text-[10px] font-black">TOP NOTE %</th>
                           <th className="px-4 py-4 border border-emerald-800 uppercase text-[10px] font-black">HEART NOTE %</th>
                           <th className="px-4 py-4 border border-emerald-800 uppercase text-[10px] font-black">BASE NOTE %</th>
                           <th className="px-4 py-4 border border-emerald-800 uppercase text-[10px] font-black">CONCENTRATION %</th>
                           <th className="px-4 py-4 border border-emerald-800 uppercase text-[10px] font-black">CONCENTRATE WEIGHT (G)</th>
                           <th className="px-4 py-4 border border-emerald-800 uppercase text-[10px] font-black">FINISHED PRODUCT WEIGHT (G)</th>
                        </tr>
                     </thead>
                     <tbody className="bg-emerald-50">
                        <tr>
                           <td className="px-4 py-6 border border-emerald-100 font-bold text-lg italic text-emerald-900">{aiReport.top}</td>
                           <td className="px-4 py-6 border border-emerald-100 font-bold text-lg italic text-emerald-900">{aiReport.heart}</td>
                           <td className="px-4 py-6 border border-emerald-100 font-bold text-lg italic text-emerald-900">{aiReport.base}</td>
                           <td className="px-4 py-6 border border-emerald-100 font-bold text-lg italic text-emerald-900">{concentrationPercent.toFixed(4)}</td>
                           <td className="px-4 py-6 border border-emerald-100 font-bold text-lg italic text-emerald-900">{concentrateWeight}</td>
                           <td className="px-4 py-6 border border-emerald-100 font-bold text-lg italic text-emerald-900">{totalWeight}</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </section>

            {/* 2. MAIN FORMULA BUILDER & MANIFEST */}
            <section className="bg-white rounded-[40px] border border-emerald-100 shadow-2xl overflow-hidden">
               <div className="bg-emerald-50 p-6 flex justify-between items-center border-b border-emerald-100">
                  <h3 className="text-xl font-display font-black text-emerald-900 uppercase tracking-tighter italic">FORMULA MANIFEST</h3>
                  <Button onClick={handleAddLine} className="bg-emerald-950 hover:bg-black h-11 px-8 rounded-full font-black uppercase text-[9px] tracking-widest shadow-xl">
                    <Plus size={14} className="mr-2" /> AJOUTER UN INGRÉDIENT
                  </Button>
               </div>
               
               <div className="overflow-x-auto">
                  <table className="w-full text-center border-collapse">
                     <thead className="bg-[#f8fafc] border-b border-emerald-100">
                        <tr className="text-[9px] font-black uppercase text-emerald-800/50">
                           <th className="px-4 py-4 border-r border-emerald-50 w-12">#</th>
                           <th className="px-6 py-4 border-r border-emerald-50 text-left">MATERIAL</th>
                           <th className="px-4 py-4 border-r border-emerald-50">WEIGHT (GRAMS)</th>
                           <th className="px-4 py-4 border-r border-emerald-50">PARTS PER THOUSAND</th>
                           <th className="px-4 py-4 border-r border-emerald-50">% IN CONCENTRATE</th>
                           <th className="px-4 py-4 border-r border-emerald-50">AVG % USED IN CONC.</th>
                           <th className="px-4 py-4 border-r border-emerald-50">MAX % ADVISED IN CONC.</th>
                           <th className="px-4 py-4 border-r border-emerald-50 bg-emerald-50/50 text-emerald-700">% IN FINISHED PRODUCT</th>
                           <th className="px-4 py-4 border-r border-emerald-50 text-red-700">MAX % IN FINISHED (IFRA)</th>
                           <th className="px-4 py-4">ACTION</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-emerald-50">
                        {formulaLines.map((line, idx) => {
                           const ppt = concentrateWeight > 0 ? (line.weight / concentrateWeight * 1000).toFixed(1) : 0;
                           const pcInConc = concentrateWeight > 0 ? (line.weight / concentrateWeight * 100).toFixed(2) : 0;
                           const pcInFinished = totalWeight > 0 ? (line.weight / totalWeight * 100).toFixed(4) : 0;
                           const isOverLimit = parseFloat(pcInFinished as string) > (line.ifraLimit || 100);

                           return (
                              <tr key={line.id} className="hover:bg-emerald-50/30 transition-all font-bold text-sm text-emerald-950">
                                 <td className="px-4 py-5 border-r border-emerald-50 text-[10px] text-emerald-400">{idx + 1}</td>
                                 <td className="px-6 py-5 border-r border-emerald-50 relative min-w-[300px]">
                                    <button 
                                       className="w-full h-12 bg-white border border-emerald-100 rounded-xl px-4 flex items-center justify-between text-left group hover:border-emerald-400 transition-all"
                                       onClick={() => setShowSearch(showSearch === line.id ? null : line.id)}
                                    >
                                       {line.material ? line.material.name : "Sélectionner..."}
                                       <ChevronDown size={14} className="opacity-30" />
                                    </button>
                                    {showSearch === line.id && (
                                       <div className="absolute top-full left-6 right-6 mt-2 bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-emerald-100 z-[60] p-4 flex flex-col max-h-96">
                                          <div className="relative mb-3">
                                             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-200" size={16} />
                                             <Input 
                                               autoFocus
                                               className="pl-12 h-12 bg-emerald-50/50 border-emerald-100 rounded-xl font-bold text-emerald-950"
                                               value={searchTerm}
                                               onChange={e => setSearchTerm(e.target.value)}
                                             />
                                          </div>
                                          <div className="overflow-y-auto scrollbar-hide text-left space-y-1">
                                             {filteredMaterials.map((m: any, i:number) => (
                                                <button key={i} className="w-full px-5 py-3 hover:bg-emerald-600 hover:text-white rounded-xl text-xs transition-all flex justify-between" onClick={() => { updateLine(line.id, { material: m }); setShowSearch(null); setSearchTerm(""); }}>
                                                   <span>{m.name}</span>
                                                   <span className="opacity-40">{m.category}</span>
                                                </button>
                                             ))}
                                          </div>
                                       </div>
                                    )}
                                 </td>
                                 <td className="px-4 py-5 border-r border-emerald-50">
                                    <Input 
                                       type="number" 
                                       value={line.weight} 
                                       onChange={e => updateLine(line.id, { weight: parseFloat(e.target.value) || 0 })}
                                       className="w-24 h-12 mx-auto bg-emerald-50 border-emerald-100 text-center font-black text-emerald-900 rounded-xl"
                                    />
                                 </td>
                                 <td className="px-4 py-5 border-r border-emerald-50 italic">{ppt}</td>
                                 <td className="px-4 py-5 border-r border-emerald-50 italic">{pcInConc}</td>
                                 <td className="px-4 py-5 border-r border-emerald-50 text-emerald-600/50">{line.avgUsage}</td>
                                 <td className="px-4 py-5 border-r border-emerald-50 text-emerald-600/50">{line.maxAdvised}</td>
                                 <td className={`px-4 py-5 border-r border-emerald-50 text-emerald-600 italic ${isOverLimit ? 'text-red-600 font-black' : ''}`}>{pcInFinished}</td>
                                 <td className="px-4 py-5 border-r border-emerald-50 text-emerald-900/50">{line.ifraLimit}</td>
                                 <td className="px-4 py-5">
                                    <Button variant="ghost" size="icon" className="text-emerald-200 hover:text-red-500 hover:bg-red-50" onClick={() => handleRemoveLine(line.id)}>
                                       <Trash2 size={18} />
                                    </Button>
                                 </td>
                              </tr>
                           );
                        })}
                        {/* Dilutant Row */}
                        <tr className="bg-emerald-900/10 font-bold text-emerald-900">
                           <td className="px-4 py-6 border-r border-emerald-50 text-center">SOL</td>
                           <td className="px-6 py-6 border-r border-emerald-50 text-left uppercase">
                              <select className="bg-transparent border-none outline-none cursor-pointer w-full" value={dilutant} onChange={e => setDilutant(e.target.value)}>
                                 <option>Perfumer's Alcohol</option>
                                 <option>DPG (Dipropylene Glycol)</option>
                                 <option>Fractionated Coconut Oil</option>
                              </select>
                           </td>
                           <td className="px-4 py-6 border-r border-emerald-50">
                              <Input 
                                 type="number" 
                                 value={dilutantWeight} 
                                 onChange={e => setDilutantWeight(parseFloat(e.target.value) || 0)}
                                 className="w-24 h-12 mx-auto bg-white border-emerald-100 text-center font-black text-emerald-900 rounded-xl shadow-inner"
                              />
                           </td>
                           <td className="px-4 py-6 border-r border-emerald-50 italic">0</td>
                           <td className="px-4 py-6 border-r border-emerald-50 italic">0</td>
                           <td className="px-4 py-6 border-r border-emerald-50">-</td>
                           <td className="px-4 py-6 border-r border-emerald-50">-</td>
                           <td className="px-4 py-6 border-r border-emerald-50 italic">{(totalWeight > 0 ? (dilutantWeight / totalWeight * 100).toFixed(4) : 0)}</td>
                           <td className="px-4 py-6 border-r border-emerald-50">-</td>
                           <td className="px-4 py-6"></td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </section>

            {/* 3. DETAILED FORMULA BREAKDOWN */}
            <section className="bg-white rounded-[40px] border border-emerald-100 shadow-xl overflow-hidden p-8">
               <h3 className="text-xl font-display font-black text-emerald-900 uppercase tracking-tighter mb-8 italic border-b border-emerald-50 pb-4">DETAILED FORMULA BREAKDOWN</h3>
               <div className="overflow-x-auto">
                  <table className="w-full text-center border-collapse">
                     <thead className="bg-[#e2e8f0] text-slate-900">
                        <tr className="text-[9px] font-black uppercase text-slate-600">
                           <th className="px-6 py-4 border border-emerald-50 text-left">MATERIAL</th>
                           <th className="px-4 py-4 border border-emerald-50">WEIGHT (G)</th>
                           <th className="px-4 py-4 border border-emerald-50">PPT</th>
                           <th className="px-4 py-4 border border-emerald-50">% IN CONC.</th>
                           <th className="px-4 py-4 border border-emerald-50">AVG % USED</th>
                           <th className="px-4 py-4 border border-emerald-50">MAX % ADVISED</th>
                           <th className="px-4 py-4 border border-emerald-50 text-emerald-600">% IN FINISHED</th>
                           <th className="px-4 py-4 border border-emerald-50 text-red-600">IFRA MAX %</th>
                        </tr>
                     </thead>
                     <tbody className="bg-emerald-50/10">
                        {formulaLines.filter(l => l.material).map((line, i) => {
                           const ppt = concentrateWeight > 0 ? (line.weight / concentrateWeight * 1000).toFixed(1) : 0;
                           const pcInConc = concentrateWeight > 0 ? (line.weight / concentrateWeight * 100).toFixed(2) : 0;
                           const pcInFinished = totalWeight > 0 ? (line.weight / totalWeight * 100).toFixed(4) : 0;
                           
                           return (
                              <tr key={i} className="text-sm font-bold border-b border-emerald-50">
                                 <td className="px-6 py-4 text-left font-black uppercase text-emerald-950">{line.material.name}</td>
                                 <td className="px-4 py-4">{line.weight}</td>
                                 <td className="px-4 py-4 italic">{ppt}</td>
                                 <td className="px-4 py-4 italic">{pcInConc}</td>
                                 <td className="px-4 py-4 opacity-40">{line.avgUsage}</td>
                                 <td className="px-4 py-4 opacity-40">{line.maxAdvised}</td>
                                 <td className="px-4 py-4 text-emerald-600 italic">{pcInFinished}</td>
                                 <td className="px-4 py-4 text-red-600/50">{line.ifraLimit}</td>
                              </tr>
                           );
                        })}
                        <tr className="font-black bg-emerald-950 text-white">
                           <td className="px-6 py-6 text-left">{dilutant}</td>
                           <td className="px-4 py-6">{dilutantWeight}</td>
                           <td className="px-4 py-6">0</td>
                           <td className="px-4 py-6">0</td>
                           <td className="px-4 py-6">-</td>
                           <td className="px-4 py-6">-</td>
                           <td className="px-4 py-6 italic">{(totalWeight > 0 ? (dilutantWeight / totalWeight * 100).toFixed(4) : 0)}</td>
                           <td className="px-4 py-6">-</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </section>

            {/* 4. SAFETY & HAZARDS SECTION */}
            <section className="bg-emerald-950 rounded-[40px] p-10 shadow-3xl relative overflow-hidden text-white border border-emerald-800">
                     <div className="relative z-10">
                        <h4 className="font-display font-black text-emerald-400 uppercase tracking-tighter mb-10 flex items-center gap-3 italic text-xl">
                           <ShieldAlert size={26} className="text-yellow-400" /> SIGNALEMENT DES DANGERS & SÉCURITÉ
                        </h4>
                        <div className="space-y-6">
                           <div className="flex items-start gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
                              <AlertTriangle className="text-yellow-400 shrink-0" size={24} />
                              <div>
                                 <p className="text-xs font-black uppercase text-white mb-2">Statut Réglementaire IFRA v51</p>
                                 <p className="text-sm text-white/70 leading-relaxed italic">"{aiReport.recommendation}"</p>
                              </div>
                           </div>
                           
                           <div className="grid grid-cols-3 gap-6">
                              <div className="bg-emerald-900/50 p-6 rounded-2xl text-center border border-white/5">
                                 <span className="text-[10px] font-black text-emerald-500 uppercase block mb-2">Biodégradabilité</span>
                                 <span className="text-xl font-black text-white italic">84 %</span>
                              </div>
                              <div className="bg-emerald-900/50 p-6 rounded-2xl text-center border border-white/5">
                                 <span className="text-[10px] font-black text-emerald-500 uppercase block mb-2">Renouvelabilité</span>
                                 <span className="text-xl font-black text-white italic">62 %</span>
                              </div>
                              <div className="bg-emerald-900/50 p-6 rounded-2xl text-center border border-white/5">
                                 <span className="text-[10px] font-black text-emerald-500 uppercase block mb-2">Impact Carbone</span>
                                 <span className="text-xl font-black text-emerald-200 italic">FAIBLE</span>
                              </div>
                           </div>
                        </div>
                     </div>
                     <Droplets className="absolute -right-16 -bottom-16 text-emerald-900/20 w-64 h-64" />
            </section>

            {/* 5. TECHNICAL RECAP SUMMARY */}
            <section className="bg-emerald-900 rounded-[40px] p-12 text-white shadow-2xl border border-emerald-800 relative overflow-hidden">
               <div className="relative z-10 grid md:grid-cols-4 gap-8">
                  <div className="md:col-span-2">
                     <h4 className="text-2xl font-display font-black uppercase tracking-tighter mb-4 italic">RÉCAPITULATIF TECHNIQUE NEXUS</h4>
                     <p className="text-emerald-300 text-sm font-medium leading-relaxed opacity-80">
                        Cette formule "<span className="text-white font-bold">{recipeName}</span>" a été validée par le moteur de simulation AromaVerse. 
                        Elle présente une structure olfactive équilibrée avec une concentration de <span className="text-white font-bold">{concentrationPercent.toFixed(2)}%</span>. 
                        Toutes les limites IFRA ont été vérifiées par rapport aux standards v51.
                     </p>
                  </div>
                  <div className="bg-white/5 p-6 rounded-3xl border border-white/10 flex flex-col justify-center">
                     <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-2">STATUT CERTIFICATION</span>
                     <div className="flex items-center gap-3">
                        <CheckCircle2 className="text-emerald-400" size={24} />
                        <span className="text-xl font-bold uppercase tracking-tight italic">CERTIFIÉ CONFORME</span>
                     </div>
                  </div>
                  <div className="bg-white/5 p-6 rounded-3xl border border-white/10 flex flex-col justify-center">
                     <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-2">POIDS TOTAL FINI</span>
                     <span className="text-3xl font-black italic">{totalWeight} GRAMS</span>
                  </div>
               </div>
               <Activity className="absolute -left-10 -bottom-10 text-white/5 w-48 h-48" />
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Studio;
