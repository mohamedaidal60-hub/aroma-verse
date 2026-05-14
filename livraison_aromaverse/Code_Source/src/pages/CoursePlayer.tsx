import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Play, SkipForward, SkipBack, CheckCircle2, Lock, ArrowLeft, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const CoursePlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [completed, setCompleted] = useState<number[]>(() => {
    const saved = localStorage.getItem("academy_completed");
    return saved ? JSON.parse(saved) : [];
  });
  const [currentLesson, setCurrentLesson] = useState(0);

  const lessons = [
    { title: "Introduction aux Molécules", duration: "12:45", video: "https://vimeo.com/76979871" },
    { title: "La Pyramide Olfactive", duration: "18:20", video: "#" },
    { title: "Matières Premières Naturelles", duration: "25:00", video: "#" },
    { title: "Les Synthétiques de Luxe", duration: "22:15", video: "#" },
  ];

  const handleComplete = () => {
    if (!completed.includes(currentLesson)) {
      const newCompleted = [...completed, currentLesson];
      setCompleted(newCompleted);
      localStorage.setItem("academy_completed", JSON.stringify(newCompleted));
      toast.success("Leçon terminée ! Progression sauvegardée.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-body">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          
          <button onClick={() => navigate("/academy")} className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest mb-10 hover:translate-x-1 transition-all">
             <ArrowLeft size={16}/> Retour à l'Académie
          </button>

          <div className="grid lg:grid-cols-3 gap-12">
             
             {/* Player Area */}
             <div className="lg:col-span-2 space-y-8">
                <div className="aspect-video bg-forest-deep rounded-[48px] overflow-hidden shadow-2xl relative border-4 border-primary/20 bg-gradient-to-br from-primary/10 to-transparent flex flex-col items-center justify-center group cursor-pointer">
                   <div className="w-24 h-24 bg-gold rounded-full flex items-center justify-center text-white shadow-gold animate-bounce group-hover:scale-125 transition-transform">
                      <Play size={40} className="ml-2" />
                   </div>
                   <div className="absolute bottom-10 left-10 text-white/40 text-[10px] font-black uppercase tracking-widest">Leçon {currentLesson + 1} de {lessons.length} • HD 4K Streaming Mode</div>
                </div>

                <div className="flex justify-between items-center bg-white p-10 rounded-[40px] border border-primary/10 shadow-xl">
                   <div className="max-w-xl">
                      <h1 className="text-3xl font-display font-black text-primary mb-3 tracking-tighter uppercase">{lessons[currentLesson].title}</h1>
                      <p className="text-primary/60 text-sm font-medium leading-relaxed">Apprenez les fondamentaux chimiques et olfactifs qui définissent la haute parfumerie moderne. Cette leçon couvre la structure des esters et des aldéhydes.</p>
                   </div>
                   <Button onClick={handleComplete} className="h-16 px-10 bg-primary hover:bg-gold text-white hover:text-black font-black uppercase tracking-widest rounded-2xl shadow-xl transition-all">
                      {completed.includes(currentLesson) ? "DÉJÀ TERMINÉ" : "TERMINER LA LEÇON"}
                   </Button>
                </div>

                <div className="glass-card p-12 rounded-[48px] border-primary/10 bg-white/40 shadow-xl">
                   <h3 className="text-xl font-display font-black text-primary mb-8 tracking-tighter uppercase flex items-center gap-3">
                      <Sparkles className="text-gold" size={24} /> Discussion Nexus
                   </h3>
                   <div className="space-y-6 mb-10">
                      <div className="flex gap-4">
                         <div className="w-10 h-10 rounded-2xl bg-primary/10 flex-shrink-0 animate-pulse"></div>
                         <div className="bg-primary/5 p-5 rounded-2xl border border-primary/5">
                            <p className="text-xs font-black text-primary mb-1 uppercase">Amina Redouane <span className="text-primary/30 ml-2 font-bold tracking-widest">il y a 2h</span></p>
                            <p className="text-sm font-medium text-primary">La section sur la distillation fractionnée est incroyable, elle clarifie beaucoup de choses sur la concentration.</p>
                         </div>
                      </div>
                   </div>
                   <div className="relative group">
                      <Input placeholder="Un feedback sur ce cours ?" className="h-16 pl-6 pr-20 bg-white border-primary/10 rounded-2xl font-bold focus-visible:ring-primary/20 text-primary" />
                      <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform"><Send size={18}/></button>
                   </div>
                </div>
             </div>

             {/* Lesson List */}
             <div className="space-y-8 lg:sticky lg:top-24 lg:self-start">
               <div className="glass-card p-10 rounded-[48px] border-primary/10 bg-white shadow-2xl relative overflow-hidden">
                  <div className="flex justify-between items-center mb-8">
                     <h3 className="text-xl font-display font-black text-primary tracking-tighter uppercase italic">Sommaire</h3>
                     <span className="text-xs font-black text-primary/40 uppercase tracking-widest">{completed.length}/{lessons.length} Terminé</span>
                  </div>
                  <Progress value={(completed.length / lessons.length) * 100} className="h-2 bg-primary/10 mb-10" indicatorClassName="bg-gold" />
                  
                  <div className="space-y-4">
                    {lessons.map((lesson, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => setCurrentLesson(idx)}
                        className={`p-6 rounded-[32px] cursor-pointer transition-all border flex items-center justify-between group ${currentLesson === idx ? 'bg-primary border-primary shadow-xl scale-[1.03]' : 'bg-primary/5 border-primary/5 hover:border-primary/20 hover:-translate-x-2'}`}
                      >
                         <div className="flex items-center gap-5">
                            {completed.includes(idx) ? (
                              <div className={currentLesson === idx ? 'text-white' : 'text-primary'}><CheckCircle2 size={24}/></div>
                            ) : (
                              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black ${currentLesson === idx ? 'bg-white/10 text-white' : 'bg-primary/10 text-primary'}`}>{idx + 1}</div>
                            )}
                            <div>
                               <p className={`font-black uppercase tracking-tight text-sm ${currentLesson === idx ? 'text-white' : 'text-primary'}`}>{lesson.title}</p>
                               <span className={`text-[10px] font-black uppercase tracking-widest ${currentLesson === idx ? 'text-white/60' : 'text-primary/40'}`}>{lesson.duration}</span>
                            </div>
                         </div>
                         <Play size={16} className={`group-hover:translate-x-1 transition-transform ${currentLesson === idx ? 'text-white' : 'text-primary'}`} />
                      </div>
                    ))}
                  </div>
               </div>

               <div className="glass-card p-10 rounded-[48px] border-primary/10 bg-forest-deep text-white shadow-2xl text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl -mr-16 -mt-16"></div>
                  <Lock size={48} className="mx-auto text-gold mb-6 animate-glow" />
                  <h4 className="text-2xl font-black uppercase tracking-tighter mb-4">Chapitre 2 : Verrouillé</h4>
                  <p className="text-xs text-white/40 font-bold uppercase tracking-widest leading-relaxed mb-8">Obtenez le badge "Initié Junior" pour accéder au chapitre suivant sur le marketing olfactif.</p>
                  <Button variant="outline" className="w-full h-12 border-white/20 text-white hover:bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">Obtenir le Badge</Button>
               </div>
             </div>

          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CoursePlayer;
