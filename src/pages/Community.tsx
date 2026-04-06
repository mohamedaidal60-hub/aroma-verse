import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Globe2, MapPin, MessageSquare, Heart, Trophy, Plus, ArrowLeft, UserPlus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Community() {
  const [continent, setContinent] = useState("Loading...");
  const [activeChannel, setActiveChannel] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => {
        setContinent(data.continent_name || "Europe");
      })
      .catch(() => setContinent("Europe"));
  }, []);

  const dummyPosts = [
    { id: 1, author: "Jean D.", avatar: 30, text: "Je cherche un fournisseur fiable pour l'absolue de rose de mai.", likes: 45, comments: 12, followed: false },
    { id: 2, author: "Sarah M.", avatar: 35, text: "Mon dernier prototype Oud & Vanille vient de passer les tests de macération ! Résultat bluffant. استكشاف جديد للعود", likes: 120, comments: 34, followed: true },
    { id: 3, author: "AromaCorp", avatar: 25, text: "Attention à la nouvelle régulation IFRA concernant les muscs polycycliques. Mettez à jour vos formules.", likes: 89, comments: 5, followed: false },
    { id: 4, author: "Alex R.", avatar: 40, text: "Qui a une bonne alternative synthétique au santal albun ?", likes: 12, comments: 8, followed: false },
  ];

  const topCreators = [
    { name: "Sarah M.", points: 1540, avatar: 35 },
    { name: "Léonard F.", points: 1320, avatar: 36 },
    { name: "AromaCorp", points: 980, avatar: 25 },
    { name: "Jean D.", points: 850, avatar: 30 },
    { name: "Nez_Anonyme", points: 640, avatar: 28 },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col font-body">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {!activeChannel ? (
            <>
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 mb-6">
                  <Star size={14} className="text-gold" fill="currentColor" />
                  <span className="text-[10px] font-bold text-gold uppercase tracking-widest leading-none">Nexus Social Hub</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">Communauté <span className="text-gold">Nexus</span></h1>
                <p className="text-xl text-muted-foreground font-arabic">اكتشف، تواصل، وشارك تجاربك avec la communauté mondiale</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                <div onClick={() => setActiveChannel("Globale")} className="glass-card p-10 rounded-[40px] border border-white/5 hover:border-gold/40 transition-all cursor-pointer group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl group-hover:bg-gold/10 transition-colors"></div>
                  <div className="w-20 h-20 bg-gold/10 rounded-3xl flex items-center justify-center text-gold mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                    <Globe2 size={40} />
                  </div>
                  <h2 className="text-3xl font-bold mb-3 font-display">Global Nexus</h2>
                  <p className="text-muted-foreground mb-8 text-sm leading-relaxed">Hub international (85K+ membres). Partagez vos formules, vos découvertes et vos projets.</p>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-3">
                      {[1,2,3,4,5].map(i => <img key={i} src={`https://i.pravatar.cc/100?img=${i + 20}`} className="w-12 h-12 rounded-2xl border-4 border-background" alt="avatar" />)}
                    </div>
                    <span className="text-sm font-bold text-gold flex items-center gap-2">Entrer <Plus size={16}/></span>
                  </div>
                </div>

                <div onClick={() => setActiveChannel(continent)} className="glass-card p-10 rounded-[40px] border border-white/5 hover:border-gold/40 transition-all cursor-pointer group bg-gradient-to-br from-gold/5 to-transparent relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-3xl"></div>
                  <div className="w-20 h-20 bg-gold rounded-3xl flex items-center justify-center text-black mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-transform shadow-gold">
                    <MapPin size={40} />
                  </div>
                  <h2 className="text-3xl font-bold mb-3 font-display text-white">Zone : {continent}</h2>
                  <p className="text-muted-foreground mb-8 text-sm leading-relaxed">Focus régional. Discutez des fournisseurs locaux et de la logistique.</p>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-3">
                      {[1,2,3,4,5].map(i => <img key={i} src={`https://i.pravatar.cc/100?img=${i + 30}`} className="w-12 h-12 rounded-2xl border-4 border-background" alt="avatar" />)}
                    </div>
                    <span className="text-sm font-bold text-gold flex items-center gap-2">Rejoindre <Plus size={16}/></span>
                  </div>
                </div>
            </div>
            </>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
               <button onClick={() => setActiveChannel(null)} className="mb-10 flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors font-bold uppercase text-xs tracking-tighter">
                   <ArrowLeft size={16}/> Retour aux Canaux
               </button>
               
               <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                   <div className="flex items-center gap-6">
                       <div className="w-20 h-20 rounded-[28px] bg-gold/10 flex items-center justify-center text-gold border border-gold/20">
                           {activeChannel === "Globale" ? <Globe2 size={40}/> : <MapPin size={40}/>}
                       </div>
                       <div>
                           <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{activeChannel} Community</h1>
                           <p className="text-lg text-muted-foreground font-arabic">تواصل، تعلّم، شارك وتفرّد بمكانتك بين المبدعين</p>
                       </div>
                   </div>
                   <Button className="h-12 px-8 bg-gold hover:bg-gold/80 text-black font-bold rounded-2xl shadow-gold" onClick={() => toast.success("Publication disponible prochainement")}>
                      Publier Maintenant <Plus size={18} className="ml-2" />
                   </Button>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                   <div className="lg:col-span-8 flex flex-col gap-8">
                       <div className="glass-card p-6 rounded-3xl flex items-center gap-5 border border-white/5">
                           <div className="w-12 h-12 rounded-2xl bg-secondary overflow-hidden">
                              <img src="https://i.pravatar.cc/100?img=11" className="w-full h-full object-cover" alt="Mon profil" />
                           </div>
                           <input type="text" placeholder="Une nouvelle formule ?" className="flex-1 bg-transparent border-0 focus:ring-0 text-white placeholder:text-muted-foreground/50 h-10" />
                       </div>

                       {dummyPosts.map(post => (
                           <div key={post.id} className="glass-card p-8 rounded-[40px] border border-white/5 hover:border-white/10 transition-all flex flex-col">
                               <div className="flex items-center justify-between mb-8">
                                   <div className="flex items-center gap-4">
                                       <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-gold/20">
                                         <img src={`https://i.pravatar.cc/100?img=${post.avatar}`} className="w-full h-full object-cover" alt={post.author} />
                                       </div>
                                       <div>
                                           <h4 className="font-bold text-lg text-white">{post.author}</h4>
                                           <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Membre Vérifié • 2h</span>
                                       </div>
                                   </div>
                                   <Button variant="ghost" className={`rounded-xl px-4 h-10 hover:bg-gold/10 hover:text-gold gap-2 ${post.followed ? 'text-gold' : 'text-muted-foreground'}`}>
                                       {post.followed ? <Users size={16} /> : <UserPlus size={16} />}
                                       <span className="text-xs font-bold leading-none">{post.followed ? 'Suivi' : 'Suivre'}</span>
                                   </Button>
                               </div>
                               <p className="text-lg text-white/90 leading-relaxed mb-10 font-medium">{post.text}</p>
                               
                               <div className="flex items-center gap-8 pt-8 border-t border-white/5">
                                   <button className="flex items-center gap-2.5 text-muted-foreground hover:text-gold transition-colors font-bold text-sm">
                                       <Heart size={20} className={post.likes > 100 ? 'text-red-500 fill-red-500' : ''} /> {post.likes}
                                   </button>
                                   <button className="flex items-center gap-2.5 text-muted-foreground hover:text-gold transition-colors font-bold text-sm">
                                       <MessageSquare size={20}/> {post.comments}
                                   </button>
                                   <button className="ml-auto px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold transition-all" onClick={() => toast.success("Vote enregistré !")}>
                                       Vote mensuel
                                   </button>
                               </div>
                           </div>
                       ))}
                   </div>

                   <div className="lg:col-span-4 flex flex-col gap-8">
                       <div className="glass-card p-10 rounded-[48px] border border-gold/30 bg-gradient-to-br from-gold/10 to-transparent relative overflow-hidden group">
                           <h3 className="font-display font-bold text-2xl mb-2 flex items-center gap-3">
                               <Trophy className="text-gold" size={28} /> Top Créateurs
                           </h3>
                           <p className="text-xs text-muted-foreground mb-10 leading-relaxed">Les 10 meilleurs membres recevront le badge "Nexus Pro".</p>
                           
                           <div className="space-y-4">
                               {topCreators.map((creator, index) => (
                                   <div key={creator.name} className="flex items-center justify-between p-4 bg-black/40 rounded-3xl border border-white/5 hover:border-gold/30 transition-all">
                                       <div className="flex items-center gap-4">
                                           <img src={`https://i.pravatar.cc/100?img=${creator.avatar}`} className="w-12 h-12 rounded-xl object-cover" alt={creator.name}/>
                                           <span className="font-bold block text-sm">{creator.name}</span>
                                       </div>
                                       <div className="text-right">
                                          <span className="text-xs font-black text-gold">{creator.points} pts</span>
                                       </div>
                                   </div>
                               ))}
                           </div>
                           <Button className="w-full mt-10 h-14 bg-white hover:bg-white/90 text-black font-black uppercase tracking-widest rounded-2xl group-hover:scale-105 transition-transform">
                             Ranking Complet
                           </Button>
                       </div>
                   </div>
               </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
