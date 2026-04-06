import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  BookOpen, Clock, ChevronDown, ChevronUp, Beaker, 
  Search, AlertCircle, CheckCircle2, Lock, PlayCircle, 
  Calendar, Users, Trophy
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { api } from "@/lib/api";

const Academy = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // PubChem API State
  const [chemQuery, setChemQuery] = useState("");
  const [chemData, setChemData] = useState<any>(null);
  const [chemLoading, setChemLoading] = useState(false);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await api.academy.listCourses();
        setCourses(res);
      } catch (err) {
        console.error("Error fetching courses", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  const handlePubChemSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chemQuery.trim()) return;
    setChemLoading(true);
    setChemData(null);
    try {
      const response = await fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(chemQuery)}/property/MolecularFormula,MolecularWeight,IUPACName,CanonicalSMILES/JSON`);
      if (!response.ok) throw new Error("Introuvable");
      const data = await response.json();
      if (data.PropertyTable?.Properties?.[0]) {
        setChemData({
          ...data.PropertyTable.Properties[0],
          image: `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(chemQuery)}/PNG`
        });
        toast.success("Données moléculaires récupérées !");
      }
    } catch (err: any) {
      toast.error("Analyse échouée");
    } finally {
      setChemLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-body">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Header & Overall Progress */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold flex items-center gap-4">
                <GraduationCap className="text-gold" size={48} />
                PERFUME NEXUS <span className="text-gold">ACADEMY</span>
              </h1>
              <p className="text-muted-foreground mt-2 text-lg">Maîtrisez l'art de la parfumerie avec les meilleurs experts.</p>
            </div>
            
            <div className="w-full md:w-80 bg-secondary/30 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Votre Progression</span>
                <span className="text-gold font-bold">45%</span>
              </div>
              <Progress value={45} className="h-2 bg-white/10" indicatorClassName="bg-gold" />
              <div className="mt-2 text-[10px] text-muted-foreground font-arabic text-right">تقدمي: 45%</div>
            </div>
          </div>

          {/* Promotion Banner */}
          <div className="bg-gradient-to-r from-gold/20 via-gold/10 to-transparent border border-gold/30 rounded-2xl p-6 mb-12 relative overflow-hidden group">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
                  🎉 Offre Spéciale : 4 mois GRATUITS !
                </h2>
                <p className="text-gold/80 font-arabic text-lg leading-relaxed">
                  سجل الآن واستمتع بجميع المسارات التعليمية مجاناً لمدة 4 أشهر
                </p>
              </div>
              <Button size="lg" className="bg-gold hover:bg-gold/80 text-black font-bold px-8 rounded-full shadow-gold">
                S'inscrire maintenant
              </Button>
            </div>
            <div className="absolute top-0 right-0 w-64 h-full bg-gold/5 blur-3xl rounded-full -mr-32 group-hover:bg-gold/10 transition-all"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Left: Course Tracks */}
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-3">
                <BookOpen className="text-gold" /> المسارات التعليمية
              </h2>

              <div className="space-y-4">
                {/* Level 0 */}
                <div className="glass-card rounded-2xl p-6 border-l-4 border-l-green-500 hover:translate-x-1 transition-transform">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded bg-green-500/20 text-green-500 text-[10px] font-bold uppercase mb-2">Niveau 0</span>
                      <h3 className="text-xl font-bold">Initiation & Socle Commun</h3>
                      <p className="text-sm text-muted-foreground font-arabic">تمهيدي – مجاني</p>
                    </div>
                    <div className="flex items-center gap-2 text-green-500 text-sm font-bold">
                      <CheckCircle2 size={18} /> MOCK COMPLÉTÉ
                    </div>
                  </div>
                  <Progress value={100} className="h-1.5 bg-white/5" indicatorClassName="bg-green-500" />
                </div>

                {/* Level 1 */}
                <div className="glass-card rounded-2xl p-6 border-l-4 border-l-blue-500 group cursor-pointer hover:bg-white/5 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded bg-blue-500/20 text-blue-500 text-[10px] font-bold uppercase mb-2">Niveau 1</span>
                      <h3 className="text-xl font-bold">Matières Premières & Accords</h3>
                      <p className="text-sm text-muted-foreground font-arabic">مبتدئ معتمد – ضمن الـ 4 أشهر المجانية</p>
                    </div>
                    <Button variant="ghost" size="sm" className="group-hover:text-gold">
                      Continuer <PlayCircle size={16} className="ml-2" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-4">
                    <Progress value={40} className="h-1.5 bg-white/5 flex-1" indicatorClassName="bg-blue-500" />
                    <span className="text-xs text-muted-foreground">40%</span>
                  </div>
                </div>

                {/* Level 2 */}
                <div className="glass-card rounded-2xl p-6 border-l-4 border-l-yellow-500 opacity-80">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-500 text-[10px] font-bold uppercase mb-2">Niveau 2</span>
                      <h3 className="text-xl font-bold">Architecture du Parfum</h3>
                      <p className="text-sm text-muted-foreground font-arabic">متوسط متقدم – ضمن الـ 4 أشهر المجانية</p>
                    </div>
                    <Button variant="outline" size="sm">Détails</Button>
                  </div>
                  <div className="flex items-center gap-4">
                    <Progress value={20} className="h-1.5 bg-white/5 flex-1" indicatorClassName="bg-yellow-500" />
                    <span className="text-xs text-muted-foreground">20%</span>
                  </div>
                </div>

                {/* Level 3 */}
                <div className="glass-card rounded-2xl p-6 border-l-4 border-l-orange-500 bg-black/40 relative group overflow-hidden">
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button className="bg-gold text-black font-bold">
                      <Lock size={16} className="mr-2" /> Passer au Premium
                    </Button>
                  </div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded bg-orange-500/20 text-orange-500 text-[10px] font-bold uppercase mb-2">Niveau 3</span>
                      <h3 className="text-xl font-bold text-white/50">Expertise Master & Chimie</h3>
                      <p className="text-sm text-muted-foreground font-arabic">محترف – بعد الاشتراك</p>
                    </div>
                    <Lock className="text-muted-foreground" size={20} />
                  </div>
                  <div className="inline-flex items-center gap-2 text-xs text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full">
                    <Clock size={12} /> 120 Heures de contenu
                  </div>
                </div>
              </div>

              {/* Lab Section */}
              <div className="mt-16 bg-gradient-to-br from-secondary/40 to-background border border-white/5 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute -right-20 -bottom-20 opacity-10 pointer-events-none">
                  <Beaker size={300} />
                </div>
                
                <div className="relative z-10">
                  <h2 className="text-3xl font-display font-bold mb-4 flex items-center gap-3">
                    <Beaker className="text-gold" /> المختبر الافتراضي
                  </h2>
                  <p className="text-muted-foreground mb-8 max-w-xl">
                    Utilisez notre moteur de simulation IA pour créer des formules virtuelles et analyser leur stabilité chimique instantanément.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                       <h4 className="text-sm font-bold uppercase tracking-widest text-gold/60">Analyse Moléculaire</h4>
                       <form onSubmit={handlePubChemSearch} className="flex gap-2">
                        <Input 
                          placeholder="Ex: Vanillin, Linalool..." 
                          className="bg-black/40 border-white/10 h-10"
                          value={chemQuery}
                          onChange={e => setChemQuery(e.target.value)}
                        />
                        <Button type="submit" disabled={chemLoading} className="bg-gold text-black h-10 px-4">
                          {chemLoading ? "..." : <Search size={18} />}
                        </Button>
                       </form>

                       {chemData ? (
                         <div className="bg-black/40 p-4 rounded-xl border border-white/5 animate-fade-up">
                            <div className="flex gap-4">
                              <img src={chemData.image} className="w-16 h-16 bg-white rounded p-1" />
                              <div>
                                <h5 className="font-bold text-gold capitalize">{chemQuery}</h5>
                                <p className="text-[10px] text-muted-foreground">{chemData.MolecularWeight} g/mol</p>
                                <p className="text-[10px] font-mono text-primary truncate w-40">{chemData.CanonicalSMILES}</p>
                              </div>
                            </div>
                         </div>
                       ) : (
                         <div className="p-8 border-2 border-dashed border-white/5 rounded-xl flex flex-col items-center justify-center text-muted-foreground text-xs text-center">
                            <AlertCircle size={24} className="mb-2 opacity-20" />
                            Entrez une molécule pour voir sa structure technique
                         </div>
                       )}
                    </div>

                    <div className="bg-black/40 rounded-2xl p-6 border border-white/5 flex flex-col items-center justify-center text-center">
                       <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mb-4 group cursor-pointer hover:bg-gold/20 transition-all">
                          <PlayCircle size={48} className="text-gold" />
                       </div>
                       <h4 className="font-bold mb-1">Simulateur de Mélange 3D</h4>
                       <p className="text-xs text-muted-foreground mb-6">Interface visuelle interactive pour tester vos accords.</p>
                       <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="text-[10px] h-8">[أضف مادة]</Button>
                          <Button size="sm" variant="outline" className="text-[10px] h-8">[احسب النسب]</Button>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Sidebar */}
            <div className="space-y-10">
               {/* Upcoming Workshops */}
               <div className="glass-card rounded-3xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Calendar className="text-gold" size={20} /> 🎥 الورش القادمة
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                      <p className="text-gold text-xs font-bold mb-1">Mercredi 19:00 (Paris)</p>
                      <h4 className="font-bold text-sm mb-2">Design des Parfums Orientaux</h4>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Users size={12}/> 124 inscrits</span>
                        <Button size="sm" className="h-7 text-[10px] bg-gold/10 text-gold border border-gold/20 hover:bg-gold hover:text-black">S'inscrire</Button>
                      </div>
                    </div>

                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                      <p className="text-gold text-xs font-bold mb-1">Samedi 10:30 (Paris)</p>
                      <h4 className="font-bold text-sm mb-2">Introduction aux Muscs Blancs</h4>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Users size={12}/> 56 inscrits</span>
                        <Button size="sm" className="h-7 text-[10px] bg-gold/10 text-gold border border-gold/20 hover:bg-gold hover:text-black">S'inscrire</Button>
                      </div>
                    </div>
                  </div>
               </div>

               {/* Hall of Fame / Leaderboard */}
               <div className="glass-card rounded-3xl p-6 border border-white/10 bg-gradient-to-b from-transparent to-gold/5">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Trophy className="text-gold" size={20} /> Top Créateurs (Mois)
                  </h3>
                  
                  <div className="space-y-5">
                    {[
                      {name: "K. Al-Fahad", score: "9.8/10", rank: 1},
                      {name: "M. Lefebvre", score: "9.5/10", rank: 2},
                      {name: "Sara J.", score: "9.2/10", rank: 3}
                    ].map(user => (
                      <div key={user.rank} className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${user.rank === 1 ? 'bg-gold text-black' : 'bg-white/10'}`}>
                          {user.rank}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold">{user.name}</p>
                          <p className="text-[10px] text-muted-foreground">Expert en notes de tête</p>
                        </div>
                        <span className="text-xs font-bold text-gold">{user.score}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="ghost" className="w-full mt-6 text-xs text-muted-foreground hover:text-gold">
                    Voir tout le classement
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

// Add missing GraduationCap import if needed, but it should be standard lucide
import { GraduationCap } from "lucide-react";

export default Academy;
