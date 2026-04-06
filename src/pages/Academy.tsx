import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  BookOpen, Clock, Beaker, 
  Search, AlertCircle, CheckCircle2, Lock, PlayCircle, 
  Calendar, Users, Trophy, GraduationCap, Star, Zap
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useLang } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const Academy = () => {
  const navigate = useNavigate();
  const { t, lang, dir } = useLang();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState<number[]>([]);
  
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

  const handleEnroll = (id: number) => {
    if (enrolledCourses.includes(id)) {
      toast.info(t("academy.enrolled"));
      return;
    }
    setEnrolledCourses(prev => [...prev, id]);
    toast.success(t("academy.enroll") + " : Success!");
  };

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
        toast.success("Structure Moléculaire Détectée !");
      }
    } catch (err: any) {
      toast.error("Analyse échouée");
    } finally {
      setChemLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-background flex flex-col font-body ${dir === "rtl" ? "text-right" : "text-left"}`}>
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 mb-6">
                <Star size={14} className="text-gold" fill="currentColor" />
                <span className="text-[10px] font-bold text-gold uppercase tracking-[0.2em]">Nexus Learning Center</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-display font-black mb-6 tracking-tighter leading-none">
                {t("features.academy.title")}
              </h1>
              <p className={`text-2xl text-muted-foreground leading-relaxed ${dir === "rtl" ? "font-arabic" : ""}`}>
                {t("features.academy.desc")}
              </p>
            </div>
            
            <div className="w-full lg:w-96 glass-card p-8 rounded-[40px] border border-gold/20 bg-gold/5 shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-black uppercase tracking-widest text-gold">{t("academy.progress")}</span>
                <span className="text-2xl font-black text-white italic">45%</span>
              </div>
              <Progress value={45} className="h-2 bg-white/10" indicatorClassName="bg-gold" />
              <p className="text-[10px] text-muted-foreground mt-4 font-bold uppercase tracking-widest">Niveau : Intermédiaire Alpha</p>
            </div>
          </div>

          {/* Promotion Banner */}
          <div className="bg-gradient-to-r from-gold/30 via-gold/10 to-transparent border-2 border-gold/40 rounded-[48px] p-10 md:p-16 mb-20 relative overflow-hidden group shadow-2xl">
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                  <Zap size={14} fill="currentColor" /> {t("hero.pass.offer")}
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-4 tracking-tighter leading-tight">
                  {t("academy.enroll")}
                </h2>
                <p className="text-gold text-lg font-bold leading-relaxed max-w-2xl">
                  {t("features.bottom.desc")}
                </p>
              </div>
              <Button onClick={() => handleEnroll(999)} className="h-16 px-12 bg-gold hover:bg-gold/80 text-black font-black uppercase tracking-[0.2em] rounded-2xl shadow-gold text-sm transition-transform active:scale-95">
                {enrolledCourses.includes(999) ? "INSCRIT ✓" : t("academy.enroll")}
              </Button>
            </div>
            <div className="absolute top-0 right-0 w-96 h-full bg-gold/10 blur-[100px] rounded-full -mr-32 group-hover:scale-110 transition-transform"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left: Tracks */}
            <div className="lg:col-span-2 space-y-12">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-10 h-10 rounded-2xl bg-gold/10 flex items-center justify-center text-gold border border-gold/20"><BookOpen size={24}/></div>
                 <h2 className="text-3xl font-display font-black uppercase tracking-tighter uppercase">{t("academy.tracks")}</h2>
              </div>

              <div className="grid gap-6">
                {[
                  { id: 1, level: 0, title: "Initiation & Socle Commun", progress: 100, color: "green-500", icon: <CheckCircle2 size={24}/> },
                  { id: 2, level: 1, title: "Matières Premières & Accords", progress: 40, color: "blue-500", icon: <PlayCircle size={24}/> },
                  { id: 3, level: 2, title: "Architecture du Parfum", progress: 15, color: "gold", icon: <PlayCircle size={24}/> },
                  { id: 4, level: 3, title: "Expertise Master & Chimie", progress: 0, color: "orange-500", locked: true, icon: <Lock size={24}/> },
                ].map((track) => (
                  <div key={track.id} className={`glass-card rounded-[32px] p-8 border-2 transition-all group relative overflow-hidden ${track.locked ? 'bg-black/60 border-white/5 opacity-80' : 'bg-black/30 border-white/5 hover:border-gold/30 hover:translate-x-2'}`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                      <div className="flex items-center gap-6">
                        <div className={`w-14 h-14 bg-${track.color}/10 rounded-2xl flex items-center justify-center text-${track.color} border border-${track.color}/20 group-hover:scale-110 transition-transform`}>
                          {track.icon}
                        </div>
                        <div>
                          <span className={`text-[10px] font-black uppercase tracking-widest text-${track.color}`}>STAGE {track.level}</span>
                          <h3 className={`text-2xl font-bold ${track.locked ? 'text-white/40' : 'text-white'}`}>{track.title}</h3>
                        </div>
                      </div>
                      <Button 
                        disabled={track.locked}
                        onClick={() => handleEnroll(track.id)}
                        className={`h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest ${track.progress === 100 ? 'bg-green-500/10 text-green-500 border border-green-500/20' : enrolledCourses.includes(track.id) ? 'bg-gold/10 text-gold border border-gold/20' : 'bg-white hover:bg-gold text-black'}`}
                      >
                        {track.progress === 100 ? "TERMINÉ" : enrolledCourses.includes(track.id) ? "CONTINUER" : t("academy.enroll")}
                      </Button>
                    </div>
                    {track.locked ? (
                      <div className="flex items-center gap-3 text-orange-500 bg-orange-500/5 px-4 py-2 rounded-xl w-fit border border-orange-500/20">
                         <Lock size={14}/> <span className="text-[10px] font-black uppercase tracking-widest">Contenu Premium / Abonnement Requis</span>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                           <span>Progression</span>
                           <span>{track.progress}%</span>
                        </div>
                        <Progress value={track.progress} className="h-1.5 bg-white/5" indicatorClassName={`bg-${track.color}`} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Molecular Engine */}
              <div className="mt-20 glass-card rounded-[48px] p-10 md:p-16 border border-white/5 bg-gradient-to-br from-secondary/40 to-background relative overflow-hidden group">
                 <div className="absolute -right-20 -top-20 opacity-10 pointer-events-none group-hover:rotate-12 transition-transform duration-700">
                    <Beaker size={400} />
                 </div>
                 
                 <div className="relative z-10 grid lg:grid-cols-2 gap-16">
                    <div>
                      <h2 className="text-3xl font-display font-black mb-6 tracking-tighter uppercase">{t("studio.badge")}</h2>
                      <p className="text-xl text-muted-foreground leading-relaxed mb-10">
                        {t("features.studio.desc")}
                      </p>
                      
                      <form onSubmit={handlePubChemSearch} className="relative group">
                        <Input 
                          placeholder="Recherche Moléculaire (Ex: Limonene, Geraniol...)" 
                          className="h-16 bg-black/60 border-2 border-white/5 rounded-2xl pl-6 pr-20 text-white font-bold placeholder:text-muted-foreground/30 focus-visible:ring-gold"
                          value={chemQuery}
                          onChange={e => setChemQuery(e.target.value)}
                        />
                        <Button type="submit" disabled={chemLoading} className="absolute right-2 top-2 h-12 w-12 bg-gold hover:bg-gold/80 text-black rounded-xl shadow-gold">
                          {chemLoading ? "..." : <Search size={20} />}
                        </Button>
                      </form>
                    </div>

                    <div className="flex flex-col justify-center">
                       {chemData ? (
                         <div className="glass-card p-8 rounded-[32px] border border-gold/30 bg-black animate-in zoom-in duration-500 shadow-2xl">
                            <div className="flex gap-8">
                               <img src={chemData.image} className="w-24 h-24 bg-white rounded-2xl p-2 shadow-inner" alt="Structure" />
                               <div>
                                  <h5 className="text-2xl font-black text-gold uppercase mb-2">{chemQuery}</h5>
                                  <div className="space-y-2">
                                     <p className="text-xs text-muted-foreground">MW: <span className="text-white font-bold">{chemData.MolecularWeight} g/mol</span></p>
                                     <p className="text-xs text-muted-foreground">SMILES: <span className="text-primary font-mono block break-all mt-1">{chemData.CanonicalSMILES}</span></p>
                                  </div>
                               </div>
                            </div>
                         </div>
                       ) : (
                         <div className="h-full min-h-[200px] border-2 border-dashed border-white/5 rounded-[32px] flex flex-col items-center justify-center text-center p-10 bg-black/20">
                            <AlertCircle size={48} className="text-muted-foreground/20 mb-6" />
                            <p className="text-xs font-black uppercase text-muted-foreground/40 tracking-widest leading-relaxed">Entrez le nom d'un composé chimique pour extraire ses propriétés structurelles globales.</p>
                         </div>
                       )}
                    </div>
                 </div>
              </div>
            </div>

            {/* Right: Sidebar */}
            <div className="space-y-12">
               {/* Upcoming Workshops */}
               <div className="glass-card rounded-[40px] p-10 border border-white/10 bg-black/40">
                  <h3 className="text-2xl font-display font-black mb-10 flex items-center gap-3 uppercase tracking-tighter">
                    <Calendar className="text-gold" size={24} /> Workshops
                  </h3>
                  
                  <div className="space-y-6">
                    {[
                      { title: "Design des Parfums Orientaux", time: "Mercredi 19:00", members: 124 },
                      { title: "Introduction aux Muscs Blancs", time: "Samedi 10:30", members: 56 }
                    ].map((ws, i) => (
                      <div key={i} className="bg-white/5 p-6 rounded-[28px] border border-white/5 hover:bg-gold/5 hover:border-gold/30 transition-all group">
                        <p className="text-gold text-[10px] font-black mb-2 uppercase tracking-widest">{ws.time} (UTC+1)</p>
                        <h4 className="font-bold text-lg mb-6 leading-tight text-white group-hover:text-gold transition-colors">{ws.title}</h4>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-muted-foreground uppercase flex items-center gap-2"><Users size={14}/> {ws.members} Inscrits</span>
                          <Button size="sm" onClick={() => toast.success("Place réservée !")} className="h-9 px-6 bg-gold/10 text-gold border border-gold/20 hover:bg-gold hover:text-black rounded-xl text-[10px] font-black">RESERVER</Button>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>

               {/* Ranking */}
               <div className="glass-card rounded-[40px] p-10 border border-gold/40 bg-gradient-to-br from-gold/10 to-transparent shadow-2xl">
                  <h3 className="text-2xl font-display font-black mb-10 flex items-center gap-3 uppercase tracking-tighter">
                    <Trophy className="text-gold" size={28} /> {t("academy.leaderboard")}
                  </h3>
                  
                  <div className="space-y-6">
                    {[
                      {name: "K. Al-Fahad", score: "9.8/10", rank: 1},
                      {name: "M. Lefebvre", score: "9.5/10", rank: 2},
                      {name: "Sara J.", score: "9.2/10", rank: 3}
                    ].map(user => (
                      <div key={user.rank} className="flex items-center gap-5 p-4 rounded-2xl hover:bg-black/40 transition-all cursor-pointer border border-transparent hover:border-white/5 group">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shadow-lg transform transition-transform group-hover:scale-110 ${user.rank === 1 ? 'bg-gold text-black' : 'bg-white/10 text-white'}`}>
                          {user.rank}
                        </div>
                        <div className="flex-1">
                          <p className="font-black text-white text-sm uppercase tracking-tight">{user.name}</p>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-40">Pro Designer</p>
                        </div>
                        <span className="text-lg font-black text-gold italic">{user.score}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="ghost" className="w-full mt-10 h-14 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-gold hover:bg-white/5 rounded-2xl" onClick={() => navigate('/community')}>
                    {t("common.see_all")}
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

export default Academy;
