import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  BookOpen, Clock, Beaker, 
  Search, AlertCircle, CheckCircle2, Lock, PlayCircle, 
  Calendar, Users, Trophy, GraduationCap, Star, Zap, Download
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useLang } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Academy = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { t, lang, dir } = useLang();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState<number[]>([]);
  
  // PubChem API State
  const [chemQuery, setChemQuery] = useState("");
  const [chemData, setChemData] = useState<any>(null);
  const [chemLoading, setChemLoading] = useState(false);
  
  // States pour Certificat
  const [showCertificate, setShowCertificate] = useState(false);
  const [certifiedCourse, setCertifiedCourse] = useState<any>(null);

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
      navigate(`/academy/courses/${id}`);
      return;
    }
    setEnrolledCourses(prev => [...prev, id]);
    toast.success("Inscription validée !");
    setTimeout(() => navigate(`/academy/courses/${id}`), 500);
  };

  const handleGetBadge = (track: any) => {
    setCertifiedCourse(track);
    setShowCertificate(true);
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

  const [completedIds, setCompletedIds] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("academy_completed");
    if (saved) {
      setCompletedIds(JSON.parse(saved));
    }
  }, []);

  const tracks = [
    { id: 1, level: 0, title: "Initiation & Socle Commun", progress: Math.min(100, Math.round((completedIds.filter(id => id <= 4).length / 4) * 100)), color: "green-500", icon: <CheckCircle2 size={24}/> },
    { id: 2, level: 1, title: "Matières Premières & Accords", progress: Math.min(100, Math.round((completedIds.filter(id => id > 4 && id <= 8).length / 4) * 100)), color: "blue-500", icon: <PlayCircle size={24}/> },
    { id: 3, level: 2, title: "Architecture du Parfum", progress: 0, color: "primary", icon: <PlayCircle size={24}/> },
    { id: 4, level: 3, title: "Expertise Master & Chimie", progress: 0, color: "orange-500", locked: true, icon: <Lock size={24}/> },
  ];

  const totalProgress = Math.round((completedIds.length / 16) * 100); // Assuming 16 total lessons

  const [academyProgress, setAcademyProgress] = useState(0);

  // Helper to get total academy progress
  useEffect(() => {
    setAcademyProgress(Math.round((completedIds.length / 16) * 100));
  }, [completedIds]);

  return (
    <div className={`min-h-screen bg-[#f1f5f9] flex flex-col font-body ${dir === "rtl" ? "text-right" : "text-left"}`}>
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 mb-6">
                <Star size={14} className="text-primary" fill="currentColor" />
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Nexus Learning Center</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-display font-black mb-6 tracking-tighter leading-none text-foreground">
                {t("features.academy.title")}
              </h1>
              <p className={`text-2xl text-foreground/60 leading-relaxed font-medium ${dir === "rtl" ? "font-arabic" : ""}`}>
                {t("features.academy.desc")}
              </p>
            </div>
            
            <div className="w-full lg:w-96 glass-card p-8 rounded-[40px] border border-primary/20 bg-primary/5 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-black uppercase tracking-widest text-primary">Progression Totale</span>
                <span className="text-2xl font-black text-foreground italic">{totalProgress}%</span>
              </div>
              <Progress value={totalProgress} className="h-2 bg-primary/10" indicatorClassName="bg-gold" />
              <p className="text-[10px] text-foreground/40 mt-4 font-bold uppercase tracking-widest">Niveau : {totalProgress === 100 ? "Certifié Maître" : totalProgress > 0 ? "Apprenti Nexus" : "Novice"}</p>
            </div>
          </div>

          {/* Promotion Banner */}
          <div className="bg-gradient-to-r from-primary/20 via-primary/5 to-transparent border-2 border-primary/20 rounded-[48px] p-10 md:p-16 mb-20 relative overflow-hidden group shadow-xl">
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary text-foreground rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                  <Zap size={14} fill="currentColor" /> {t("hero.pass.offer")}
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-black text-foreground mb-4 tracking-tighter leading-tight">
                  {t("academy.enroll")}
                </h2>
                <p className="text-primary/70 text-lg font-bold leading-relaxed max-w-2xl">
                  {t("features.bottom.desc")}
                </p>
              </div>
              <Button onClick={() => handleEnroll(999)} className="h-16 px-12 bg-primary hover:bg-primary/90 text-foreground font-black uppercase tracking-[0.2em] rounded-2xl shadow-lg text-sm transition-transform active:scale-95">
                {enrolledCourses.includes(999) ? "INSCRIT ✓" : t("academy.enroll")}
              </Button>
            </div>
            <div className="absolute top-0 right-0 w-96 h-full bg-primary/5 blur-[100px] rounded-full -mr-32 group-hover:scale-110 transition-transform"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
            
            {/* Left: Tracks */}
            <div className="lg:col-span-2 space-y-12">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20"><BookOpen size={24}/></div>
                 <h2 className="text-3xl font-display font-black uppercase tracking-tighter text-foreground uppercase">Parcours de Formation</h2>
              </div>

              <div className="grid gap-6">
                {tracks.map((track) => (
                  <div key={track.id} className={`glass-card rounded-[32px] p-8 border-2 transition-all group relative overflow-hidden ${track.locked ? 'bg-white/20 border-primary/5 opacity-80' : 'bg-white/40 border-primary/5 hover:border-primary/30 hover:translate-x-2'}`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                      <div className="flex items-center gap-6">
                        <div className={`w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary border border-primary/10 group-hover:scale-110 transition-transform`}>
                          {track.icon}
                        </div>
                        <div>
                          <span className={`text-[10px] font-black uppercase tracking-widest text-[#10b981]`}>STAGE {track.level}</span>
                          <h3 className={`text-2xl font-bold ${track.locked ? 'text-foreground/40' : 'text-foreground'}`}>{track.title}</h3>
                        </div>
                      </div>
                      <Button 
                        disabled={track.locked}
                        onClick={() => track.progress === 100 ? handleGetBadge(track) : handleEnroll(track.id)}
                        className={`h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest ${track.progress === 100 ? 'bg-gold text-foreground shadow-lg shadow-gold/20' : enrolledCourses.includes(track.id) ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-primary hover:bg-primary/90 text-foreground'}`}
                      >
                        {track.progress === 100 ? "OBTENIR LE BADGE" : enrolledCourses.includes(track.id) ? "CONTINUER" : t("academy.enroll")}
                      </Button>
                    </div>
                    {track.locked ? (
                      <div className="flex items-center gap-3 text-orange-600 bg-orange-600/5 px-4 py-2 rounded-xl w-fit border border-orange-600/20">
                         <Lock size={14}/> <span className="text-[10px] font-black uppercase tracking-widest">Contenu Premium / Abonnement Requis</span>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-foreground/40">
                           <span>Progression</span>
                           <span>{track.progress}%</span>
                        </div>
                        <Progress value={track.progress} className="h-1.5 bg-primary/10" indicatorClassName={`bg-[#10b981]`} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Molecular Engine */}
              <div className="mt-20 glass-card rounded-[48px] p-10 md:p-16 border border-primary/10 bg-white/40 relative overflow-hidden group shadow-xl">
                 <div className="absolute -right-20 -top-20 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform duration-700 text-primary">
                    <Beaker size={400} />
                 </div>
                 
                 <div className="relative z-10 grid lg:grid-cols-2 gap-16">
                    <div>
                      <h2 className="text-3xl font-display font-black mb-6 tracking-tighter uppercase text-foreground">{t("studio.badge")}</h2>
                      <p className="text-xl text-foreground/60 leading-relaxed mb-10 font-medium">
                        Explorez la structure moléculaire et la conformité IFRA en temps réel.
                      </p>
                      
                      <form onSubmit={handlePubChemSearch} className="relative group">
                        <Input 
                          placeholder="Recherche Moléculaire (Ex: Limonene, Geraniol...)" 
                          className="h-16 bg-white/60 border-2 border-primary/10 rounded-2xl pl-6 pr-20 text-foreground font-bold placeholder:text-foreground/20 focus-visible:ring-primary"
                          value={chemQuery}
                          onChange={e => setChemQuery(e.target.value)}
                        />
                        <Button type="submit" disabled={chemLoading} className="absolute right-2 top-2 h-12 w-12 bg-primary hover:bg-primary/80 text-foreground rounded-xl shadow-lg">
                          {chemLoading ? "..." : <Search size={20} />}
                        </Button>
                      </form>
                    </div>

                    <div className="flex flex-col justify-center">
                       {chemData ? (
                         <div className="glass-card p-8 rounded-[32px] border border-primary/30 bg-primary/5 animate-in zoom-in duration-500 shadow-xl">
                            <div className="flex gap-8">
                               <img src={chemData.image} className="w-24 h-24 bg-white rounded-2xl p-2 shadow-inner" alt="Structure" />
                               <div>
                                  <h5 className="text-2xl font-black text-primary uppercase mb-2">{chemQuery}</h5>
                                  <div className="space-y-2">
                                     <p className="text-xs text-foreground/60">MW: <span className="text-foreground font-bold">{chemData.MolecularWeight} g/mol</span></p>
                                     <p className="text-xs text-foreground/60">SMILES: <span className="text-primary font-mono block break-all mt-1">{chemData.CanonicalSMILES}</span></p>
                                  </div>
                               </div>
                            </div>
                         </div>
                       ) : (
                         <div className="h-full min-h-[200px] border-2 border-dashed border-primary/10 rounded-[32px] flex flex-col items-center justify-center text-center p-10 bg-white/20">
                            <AlertCircle size={48} className="text-primary/20 mb-6" />
                            <p className="text-xs font-black uppercase text-foreground/40 tracking-widest leading-relaxed">Entrez le nom d'un composé chimique pour extraire ses propriétés structurelles globales.</p>
                         </div>
                       )}
                    </div>
                 </div>
              </div>
            </div>

            {/* Right: Sidebar */}
            <div className="space-y-12">
               <div className="glass-card rounded-[40px] p-10 border border-primary/10 bg-white/40 shadow-lg">
                  <h3 className="text-2xl font-display font-black mb-10 flex items-center gap-3 uppercase tracking-tighter text-foreground">
                    <Calendar className="text-primary" size={24} /> Workshops
                  </h3>
                  
                  <div className="space-y-6">
                    {[
                      { title: "Design des Parfums Orientaux", time: "Mercredi 19:00", members: 124 },
                      { title: "Introduction aux Muscs Blancs", time: "Samedi 10:30", members: 56 }
                    ].map((ws, i) => (
                      <div key={i} className="bg-primary/5 p-6 rounded-[28px] border border-primary/5 hover:bg-primary/10 hover:border-primary/30 transition-all group">
                        <p className="text-primary text-[10px] font-black mb-2 uppercase tracking-widest">{ws.time}</p>
                        <h4 className="font-bold text-lg mb-6 leading-tight text-foreground group-hover:text-primary transition-colors">{ws.title}</h4>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-foreground/40 uppercase flex items-center gap-2"><Users size={14}/> {ws.members} Inscrits</span>
                          <Button size="sm" onClick={() => toast.success("Place réservée !")} className="h-9 px-6 bg-primary text-foreground hover:bg-primary/80 rounded-xl text-[10px] font-black">RESERVER</Button>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="glass-card rounded-[40px] p-10 border border-primary/40 bg-gradient-to-br from-primary/10 to-transparent shadow-xl">
                  <h3 className="text-2xl font-display font-black mb-10 flex items-center gap-3 uppercase tracking-tighter text-foreground">
                    <Trophy className="text-primary" size={28} /> Leaderboard
                  </h3>
                  
                  <div className="space-y-6">
                    {[
                      {name: "K. Al-Fahad", score: "9.8/10", rank: 1},
                      {name: "M. Lefebvre", score: "9.5/10", rank: 2},
                      {name: "Sara J.", score: "9.2/10", rank: 3}
                    ].map(user => (
                      <div key={user.rank} className="flex items-center gap-5 p-4 rounded-2xl hover:bg-white/40 transition-all cursor-pointer border border-transparent hover:border-primary/10 group">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shadow-md transform transition-transform group-hover:scale-110 ${user.rank === 1 ? 'bg-primary text-foreground' : 'bg-primary/10 text-primary'}`}>
                          {user.rank}
                        </div>
                        <div className="flex-1">
                          <p className="font-black text-foreground text-sm uppercase tracking-tight">{user.name}</p>
                          <p className="text-[10px] font-bold text-foreground/40 uppercase">Pro Designer</p>
                        </div>
                        <span className="text-lg font-black text-primary italic">{user.score}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="ghost" className="w-full mt-10 h-14 text-xs font-black uppercase tracking-widest text-foreground/40 hover:text-primary rounded-2xl" onClick={() => navigate('/community')}>
                    Voir tout le réseau
                  </Button>
               </div>
            </div>

          </div>
        </div>

        {/* Modal Certificat */}
        {showCertificate && certifiedCourse && (
          <div className="fixed inset-0 z-[100] bg-white/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto" onClick={() => setShowCertificate(false)}>
             <div className="max-w-4xl w-full bg-white rounded-none p-1 shadow-2xl" onClick={e => e.stopPropagation()}>
                {/* Printable Content */}
                <div id="print-certificate" className="relative border-[16px] border-[#1a3a3a] p-16 text-center text-[#1a3a3a] bg-[#fdfcf9] font-serif overflow-hidden">
                   {/* Background Graphics */}
                   <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
                      <img src="/logo-official.png" className="w-[80%] rotate-[-15deg]" />
                   </div>
                   
                   <div className="relative z-10">
                      <img src="/logo-official.png" className="w-24 mx-auto mb-10" />
                      
                      <p className="text-[10px] font-black uppercase tracking-[0.5em] mb-4 text-[#c5a059]">Certification Officielle NEXUS</p>
                      <h2 className="text-5xl font-bold mb-2 tracking-tight">CERTIFICAT DE RÉUSSITE</h2>
                      <div className="w-48 h-1 bg-[#c5a059] mx-auto mb-12"></div>
                      
                      <p className="text-xl italic mb-4">Ce document certifie que l'étudiant(e)</p>
                      <h3 className="text-4xl font-bold uppercase mb-4 tracking-tighter text-[#1a3a3a]">{profile?.full_name || "Nexus Designer"}</h3>
                      
                      <p className="max-w-xl mx-auto text-lg leading-relaxed mb-12">
                         A complété avec succès le cursus de formation supérieure : <br />
                         <span className="font-bold text-2xl">"{certifiedCourse.title}"</span><br />
                         <span className="text-sm">incluant les modules de formulation moléculaire et conformité technique.</span>
                      </p>
                      
                      <div className="flex justify-between items-end mt-20 px-10">
                         <div className="text-left">
                            <p className="text-[10px] font-black uppercase tracking-widest mb-1">Délivré le :</p>
                            <p className="font-bold border-b border-[#1a3a3a] pb-1">{new Date().toLocaleDateString()}</p>
                         </div>
                         <div className="flex flex-col items-center">
                            <div className="w-24 h-24 rounded-full border-4 border-[#c5a059] flex items-center justify-center text-[#c5a059] font-black text-[10px] uppercase leading-none text-center p-2 mb-2 rotate-12">
                               Nexus<br />Verified<br />Badge
                            </div>
                            <p className="text-[8px] font-black uppercase tracking-widest">Sceau d'authenticité</p>
                         </div>
                         <div className="text-right">
                            <p className="text-[10px] font-black uppercase tracking-widest mb-2">Signature du Recteur :</p>
                            <div className="font-handwriting text-3xl mb-1 italic opacity-80" style={{ fontFamily: 'Dancing Script, cursive' }}>Expert Master - NEXUS</div>
                            <div className="w-48 h-[1px] bg-[#1a3a3a] ml-auto"></div>
                         </div>
                      </div>
                      
                      <div className="mt-20 text-[8px] font-black uppercase tracking-[0.2em] opacity-40">
                         ID Certification: NEX-ACAD-{certifiedCourse.id}-{Math.random().toString(36).substring(7).toUpperCase()}
                      </div>
                   </div>
                </div>

                {/* Control Buttons (Not printed) */}
                <div className="p-6 bg-gray-50 flex gap-4 no-print">
                   <Button className="flex-1 h-14 bg-emerald-950 text-foreground font-black uppercase tracking-widest rounded-xl shadow-xl" onClick={() => window.print()}>
                      <Download size={20} className="mr-2" /> Imprimer / Télécharger PDF
                   </Button>
                   <Button variant="outline" className="flex-1 h-14 border-gray-200 text-gray-500 rounded-xl" onClick={() => setShowCertificate(false)}>
                      Fermer
                   </Button>
                </div>
             </div>
             
             <style>{`
                @media print {
                   body * { visibility: hidden; }
                   #print-certificate, #print-certificate * { visibility: visible; }
                   #print-certificate {
                      position: fixed;
                      top: 0;
                      left: 0;
                      width: 100%;
                      height: 100%;
                      border: none;
                      padding: 2cm;
                   }
                   .no-print { display: none !important; }
                }
             `}</style>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Academy;
